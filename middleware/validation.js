//TODO intended to bring all validation together
module.exports = {
  validateInput,
  validateRegEntry,
};
function validateInput(req, res, next) {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ message: "Username or Password cannot be empty" });
  } else {
    next();
  }
}

function validateRegEntry(req, res, next) {
    let { username, password,email } = req.body;
    if (!username || !password ||!email) {
      res.status(404).json({ message: "Username or Password or email cannot be empty" });
    } else {
      next();
    }
  }