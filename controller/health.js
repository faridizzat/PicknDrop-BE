const healthCheck = (req, res) => {
  res.send("Hello World!");
};

const healthCheckJson = (req, res) => {
  res.json({ message: "Hello World!" });
};

export { healthCheck, healthCheckJson };
