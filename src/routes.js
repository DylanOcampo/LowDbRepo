import { Router } from "express";
import { getConnection } from "./database.js";
const router = Router();

const getTask = (req, res) => {
  const taskFound = getConnection().data.users.find(
    (t) => t._id === req.params._id
  );

  if (!taskFound) res.sendStatus(404);
  res.json(taskFound);
};
router.get("/tasks/:_id", getTask);

const updateTask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const db = getConnection();
    const taskFound = db.data.tasks.find((t) => t._id === req.params._id);
    if (!taskFound) return res.sendStatus(404);

    taskFound.name = name;
    taskFound.description = description;

    db.data.tasks.map((t) => (t._id === req.params._id ? taskFound : t));

    await db.write();

    res.json(taskFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
router.put("/tasks/:_id", updateTask);

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
