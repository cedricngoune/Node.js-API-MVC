const db = require("../Config/db.config");

//constructeur
const Users = function (user, role) {
  this.email = user.email;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.password = user.password;
  this.role = role;
};

Users.create = function (newUser, result) {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log(`error while creating user`);
      return result(err, null);
    } else {
      console.log("User created :", newUser);
      return result(null, res);
    }
  });
};
//Retrieve one user
Users.findById = function (id, result) {
  db.query("SELECT * FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("An error occured");
      return result(err, null);
    }
    console.log(`User found with id ${id}`);
    return result(null, res);
  });
};
//Retrieve all users
Users.findAll = function (result) {
  db.query("SELECT * FROM users ORDER BY id ASC", (err, res) => {
    if (err) {
      console.log(`Error : ${err}`);
      result(err, null);
    } else {
      console.log(`Users : ${res}`);
      result(null, res);
    }
  });
};

//Update user
Users.update = function (id, user, result) {
  db.query(
    "UPDATE users SET email=?, firstname=?, lastname=?, password=? WHERE id = ?",
    [user.email, user.firstname, user.lastname, user.password, id],
    (err, res) => {
      if (err) {
        console.log("Error while updaing", err);
        return result(err, null);
      } else {
        console.log("successfull updated user :", user);
        return result(null, res);
      }
    }
  );
};

//Delete user
Users.delete = function (id, result) {
  db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(`Error delete : ${err}`);
      result(err, null);
    } else {
      console.log(`Deleted user with id : ${id}`);
      result(res, null);
    }
  });
};

module.exports = Users;
