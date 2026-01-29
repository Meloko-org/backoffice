const { validateCsvRow } = require("./csvValidator.service");
const { buildSlugs } = require("./buildSlugs.service");

const { upsertMarket } = require("./marketUpsert.service");
const { normalizeName } = require("../../../../utils/normalize");
const { resolveMarketAction } = require('../../../../utils/marketAction');


module.exports = async function importMarkets(rows, options = {}) {

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

    markets: { created: 0, updated: 0, existing: 0 },

    preview: {
			marketsCount: 0,
      markets: [],
			ignoredRows: 0,
    },

    warnings: [],
    errors: [],
  };

	const seenSlugs = {
		market: new Map(),
	}

	for (const [index, row] of rows.entries()) {
		const lineNumber = index + 2;

		try {
			// 1. Validation + extraction métier
			const { data, errors, warnings, isValid } = validateCsvRow(row);

			if (!isValid) {
				report.errors.push({ line: lineNumber, errors });
				continue;
			}

			if (warnings.length) {
				report.warnings.push({ line: lineNumber, warnings });
			}

			// 2. Nettoyage du nom
			data.name = normalizeName(data.name);
			data.city = normalizeName(data.city);

			console.log("name ", data.name);
			console.log("city ", data.city);

			// 3. Génération des slugs
			const dataWithSlugs = buildSlugs(data);

			console.log("datawithslugs :", dataWithSlugs);

			// 4. détection des doublons
			const marketSlug = dataWithSlugs.slug;
			let previewEntry;

			if (seenSlugs.market.has(marketSlug)) {
				const firstLine = seenSlugs.market.get(marketSlug);
				report.errors.push({
					line: index + 2,
					message: "Doublon market dans le CSV",
					details: [
						`Slug "${marketSlug}" déjà généré ligne ${firstLine}`,
					],
				});
				report.preview.ignoredRows++;
			} else {
				seenSlugs.market.set(marketSlug, index + 2)

				previewEntry = {
					market: dataWithSlugs,
					action: "create",
				}

				const action = await resolveMarketAction(dataWithSlugs)
				previewEntry.action = action;
			}


			// 5. DRY RUN -> simulation uniquement
			if (dryRun) {
				report.preview.marketsCount += 1;
				if (previewEntry) {
					report.preview.markets.push(previewEntry);
				}
				continue;
			}

			if (!dryRun && mode === "strict" && report.errors.length > 0) {
				throw new Error("Import bloqué : erreurs présentes");
			}


			// 6. UPSERT Market
			const marketResult = await upsertMarket(dataWithSlugs);
			report.markets[marketResult.status]++;


		} catch (error) {
			report.errors.push({
        line: lineNumber, // header = ligne 1
        message: error.message,
        details: error.details || null,
      });
		}
	}

	report.humanReport = buildHumanReport(report);

	return report;

}


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
