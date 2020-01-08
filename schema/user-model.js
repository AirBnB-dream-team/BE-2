const db = require("../database/dbConfig.js");

module.exports = {
  addUser,
  remove,
  update,
  findAll,
  findById
};

async function addUser(usersInfo) {
  const [id] = await db("users").insert(usersInfo, "id");
  return findById(id);
}

async function remove(id) {
  const removed = await findById(id);

  await db("users")
    .where({ id })
    .del();

  return removed;
}

async function update (id, changes){

    await db('users')
        .where({id})
        .update(changes);

        return findById(id);
}

async function findAll (){
    let allUsers= await db('users')
    return allUsers;
}

 function findById(id){
     return db('users')
     .where({id})
     .first();
 }