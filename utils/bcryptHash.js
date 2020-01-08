const bcrypt = require("bcryptjs");

module.exports = {
  hash,
  unHash
};

function hash(passToHash) {
    let pass=bcrypt.hashSync(passToHash,10);
  return pass
}

function unHash(passToUnHash){

}