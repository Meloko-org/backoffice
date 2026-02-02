const { validateCsvRow } = require("./csvValidator.service");
const { buildSlugs } = require("./buildSlugs.service");

const { normalizeSlug, normalizeName } = require("../../../../../src/utils/normalize");

const { upsertProduct } = require("./productUpsert.service");
const { upsertFamily } = require("./familyUpsert.service");
const { upsertCategory } = require("./categoryUpsert.service");
const { resolveProductAction } = require("../../../../utils/productAction");

module.exports = async function importProducts(rows, options = {}) {

	const {
		dryRun = true,
		mode = "strict"
	} = options;

  const report = {
    meta: {
      totalRows: rows.length,
      dryRun,
      mode,
    },

    categories: { created: 0, updated: 0, existing: 0 },
    families: { created: 0, updated: 0, existing: 0 },
    products: { created: 0, updated: 0, existing: 0 },

    preview: {
			productsCount: 0,
      products: [],
			ignoredRows: 0,
    },

    warnings: [],
    errors: [],
  };

	const seenSlugs = {
		category: new Map(),
		family: new Map(),
		product: new Map(),
	};

  for (const [index, row] of rows.entries()) {
		const lineNumber = index + 2; // ligne 1 = header CSV

    try {
      // 1. Validation + extraction métier
      const { data, warnings, errors, isValid } = validateCsvRow(row);

			if (!isValid) {
				for (const error of errors) {
					report.errors.push({
						line: lineNumber,
						message: error.message,
						details: error.details,
					})
				}
				// report.errors.push({ ...errors, line: lineNumber });
				report.preview.ignoredRows++;
				continue;
			}

			if (warnings.length) {
				report.warnings.push({ line: lineNumber, warnings });
			}

			// 2. Nettoyage des noms
			data.category.name = normalizeName(data.category.name);
			data.family.name = normalizeName(data.family.name);
			data.product.name = normalizeName(data.product.name);


			// 3. Génération des slugs
			const dataWithSlugs = buildSlugs(data);


			// 4. détection des doublons
			const productSlug = dataWithSlugs.product.slug;
			let previewEntry;

			if (seenSlugs.product.has(productSlug)) {
				const firstLine = seenSlugs.product.get(productSlug);
				report.errors.push({
					line: index + 2,
					message: "Doublon produit dans le CSV",
					details: [
						`Slug "${productSlug}" déjà généré ligne ${firstLine}`,
					],
				});
				report.preview.ignoredRows++;
			} else {
				seenSlugs.product.set(productSlug, index + 2);

				previewEntry = {
					category: dataWithSlugs.category.name,
					family: dataWithSlugs.family.name,
					product: dataWithSlugs.product.name,
					action: "create",  // valeur par défaut
				}

				const action = await resolveProductAction(dataWithSlugs.product.slug);
				previewEntry.action = action;
			}


			// 5. DRY RUN -> simulation uniquement
			if (dryRun) {
				report.preview.productsCount += 1;
				if (previewEntry) {
					report.preview.products.push(previewEntry);
				}
				continue;
			}

			if (!dryRun && mode === "strict" && report.errors.length > 0) {
				throw new Error("Import bloqué : erreurs présentes");
			}


			// 6. UPSERT Category
			const categoryResult = await upsertCategory(
				dataWithSlugs.category
			);
			report.categories[categoryResult.status]++;

			// 7. UPSERT Family (liée à la catégorie)
			const familyResult = await upsertFamily(
				{
					...dataWithSlugs.family,
					category: categoryResult.id,
				}
			);
			report.families[familyResult.status]++;

			// 8. UPSERT Product (liée à la famille)
			const productResult = await upsertProduct(
				{
					...dataWithSlugs.product,
					family: familyResult.id,
				}
			);
			report.products[productResult.status]++;

			


    } catch (error) {
      report.errors.push({
        line: lineNumber, // header = ligne 1
        message: error.message,
        details: error.details || null,
      });
			report.preview.ignoredRows++;
    }
  }

	report.humanReport = buildHumanReport(report);

  return report;
};



/**
 * Créer un report lisible pour un humain.
 * Pour utiliser ce report côté frontend, afficher humanReport.join("\n")
 * ou transformer summary en UI (badges, accordéons, etc.)
 */
function buildHumanReport(report) {
  const lines = [];

  lines.push(`❌ ${report.errors.length} lignes en erreur sur ${report.meta.totalRows}`);
  lines.push("");

  const counter = {};

  for (const error of report.errors) {
    for (const detail of error.details || []) {
      counter[detail] = (counter[detail] || 0) + 1;
    }
  }

  lines.push("Problèmes détectés :");
  for (const [message, count] of Object.entries(counter)) {
    lines.push(`  • ${message} (${count} lignes)`);
  }

  return lines;
}
