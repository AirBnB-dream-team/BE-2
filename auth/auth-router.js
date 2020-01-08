//Dependencies
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//Model for database
const db = require("../schema/auth-router-model");

//Hash
const bcrypt = require("../utils/bcryptHash.js");

//Get all users
router.get("/accounts", (req, res) => {
  db.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

//findById ===> get a user by its ID

router.get("/accounts/:id", (req, res) => {
  const id = req.params.id;
  // console.log(req.params)
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});
//Register new user
router.post("/register", (req, res) => {
  //TODO add the confirmUserEntry middleware here
  let user = req.body;
  const pass = bcrypt.hash(user.password);
  user.password = pass;

  db.addUser(user)
    .then(data => {
      res.status(201).json({ message: "Account Created Successfully", data });
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

//Delete Account
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "Account Deleted Successfully", user });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

// Update Account

router.put("/update/:id", (req, res) => {
  //TODO add the confirmUserEntry middleware here

  const id = req.params.id;
  const data = req.body;
  db.findById(id).then(user => {
    if (user) {
      db.update(id, data)
        .then(updated => {
          res
            .status(202)
            .json({ message: "Account updated successfully", updated });
        })
        .catch(error => {
          res.send({ message: "Unable to update info" });
        });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

module.exports = router;
