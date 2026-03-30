const getCollection = (name) => {
  if (process.env.USE_FAKE_DB === "true") {
    return `fake${name}`;
  }
  return name;
};

module.exports = getCollection;