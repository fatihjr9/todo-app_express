import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// API LIST
router.get("/", async (req, res) => {
  try {
    const activity = await prisma.activity.findMany();
    res.json({
      status: "success",
      message: "success",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const addActivity = await prisma.activity.create({
      data: {
        title: req.body.title,
        email: req.body.email,
      },
    });
    res.status(201).send({
      status: "success",
      message: "success",
      data: addActivity,
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
    const updateActivity = await prisma.activity.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
        email: req.body.email,
      },
    });

    res.status(200).send({
      status: "success",
      message: "success",
      data: updateActivity,
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
    const rmActivity = await prisma.activity.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send({
      status: "success",
      message: "success",
      data: rmActivity,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
