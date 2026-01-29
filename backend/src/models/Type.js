const mongoose = require("mongoose");

const typeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
		slug: {
			type: String,
			required: true,
			index: true,
		},
    label: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Type = mongoose.model("Type", typeSchema, "types");
module.exports = Type;

/**
 * Factory pour créer un modèle avec une collection donnée
 */
// function createTypeModel(collectionName) {
//   const modelName = `Type_${collectionName}`;

//   return mongoose.models[modelName]
//     || mongoose.model(modelName, typeSchema, collectionName);
// }

// // 👉 Par défaut, l’admin web travaille sur fakeproducts
// const Type = createTypeModel("faketypes");

// module.exports = {
//   Type,
//   createTypeModel,
// };
