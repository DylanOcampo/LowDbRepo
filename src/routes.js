import { Router } from "express";
import { getConnection } from "./database.js";
const router = Router();

const getTask = (req, res) => {
  const userFound = getConnection().data.users.find(
    (t) => t._id === req.params._id
  );

  if (!userFound) res.sendStatus(404);
  res.json(userFound);
};
router.get("/user/:_id", getTask);

const updateTask = async (req, res) => {
  const { age, eyeColor, company, email, password, phone, address } = req.body;
  console.log(req.body);
  try {
    const db = getConnection();
    console.log(req.params._id);
    const user = db.data.users.find((t) => t._id === req.params._id);
    if (!user) return res.sendStatus(404);
    if (user.password === req.params.password) {
      user.age = age;
      user.eyeColor = eyeColor;
      user.company = company;
      user.email = email;
      user.phone = phone;
      user.address = address;
      user.password = password;
      user.phone = phone;

      db.data.users.map((t) => (t._id === req.params._id ? user : t));

      await db.write();

      res.json(user);
    } else {
      res.json(null);
    }

  } catch (error) {
    return res.status(500).send(error.message);
  }
};
router.put("/edit/:_id/:password", updateTask);

const UserAuth = (req, res) => {
  try {
    const emailFound = getConnection().data.users.find(
      (t) => t.email === req.params.email
    );
    if (emailFound.password === req.params.password) {
      res.json(emailFound);
    } else {
      res.json(null);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
router.get("/auth/:email/:password", UserAuth);

export default router;
