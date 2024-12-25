exports.read = async (req, res) => {
  res.send("hello test beam jo");
};

exports.list = async (req, res) => {
  try {
    res.send("hello list");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
exports.create = async (req, res) => {
  try {
    res.send("hello create");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

exports.update = async (req, res) => {
  try {
    res.send("hello update");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

exports.remove = async (req, res) => {
  try {
    res.send("hello remove");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
