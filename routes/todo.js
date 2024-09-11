import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

export default router;

// Get todos by activity_group_id
router.get("/", async (req, res) => {
  try {
    const activityGroupId = parseInt(req.query.activity_group_id);

    if (!activityGroupId) {
      return res.status(400).json({
        status: "Error",
        message: "activity_group_id is required",
      });
    }

    const todos = await prisma.todo.findMany({
      where: { activity_group_id: activityGroupId },
    });

    return res.json({
      status: "Success",
      message: "Success",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});
// Get all todos
router.get("/", async (req, res) => {
  try {
    const todo = await prisma.todo.findMany();
    res.json({
      status: "success",
      message: "success",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const addTodo = await prisma.todo.create({
      data: {
        title: req.body.title,
        activity_group_id: req.body.activity_group_id,
        is_active: req.body.is_active,
      },
    });
    res.status(201).send({
      status: "success",
      message: "success",
      data: addTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
        priority: req.body.priority,
        is_active: req.body.is_active,
      },
    });

    res.status(200).send({
      status: "success",
      message: "success",
      data: updateTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rmTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send({
      status: "success",
      message: "success",
      data: rmTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
