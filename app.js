import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import activity from "./routes/activity.js";
import todo from "./routes/todo.js";
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route API
app.use("/activity-groups", activity);
app.use("/todo-items", todo);

app.listen(3000);
