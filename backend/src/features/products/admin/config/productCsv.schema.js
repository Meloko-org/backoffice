module.exports = {
  category: {
    name: {
      column: "category_name",
      required: true,
    },
    type: {
      column: "category_type",
      required: true,
    },
    description: {
      column: "category_description",
      required: false,
    },
    image: {
      column: "category_image",
      required: false,
    },
  },

  family: {
    name: {
      column: "family_name",
      required: true,
    },
    productsTypes: {
      column: "family_products_types",
      required: true,
      enum: ["bulk", "classic", "both"],
    },
    description: {
      column: "family_description",
      required: false,
    },
    image: {
      column: "family_image",
      required: false,
    },
  },

  product: {
    name: {
      column: "product_name",
      required: true,
    },
    description: {
      column: "product_description",
      required: false,
    },
    image: {
      column: "product_image",
      required: false,
    },
    vatRate: {
      column: "product_vat_rate",
      required: true,
      type: "number",
    },
    weightUnit: {
      column: "product_weight_unit",
      required: true,
      enum: ["gr", "piece"],
    },
    weightMeasurement: {
      column: "product_weight_measurement",
      required: true,
      type: "number",
    },
  },
};
