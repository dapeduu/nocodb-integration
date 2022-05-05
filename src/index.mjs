import "dotenv/config";
import express, { json } from "express";
import { distributeValue, getProjectById, payMember } from "./services.mjs";
import cors from "cors";
import pino from "express-pino-logger";
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS,
  })
);
// app.use(pino());
app.use(json());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get("/projects", async (req, res) => {
  const { projectId } = req.query;
  try {
    const result = await getProjectById(projectId);

    res.json(result);
  } catch (error) {
    res.status(error.response.status).json(error);
  }
});

app.post("/pay_member", async (req, res) => {
  const { memberId, value } = req.query;

  const result = await payMember(Number(value), memberId);

  res.json(result);
});

app.post("/pay", async (req, res) => {
  const { value, projectId } = req.query;
  if (!value || !projectId)
    res.status(400).json("No value or projectId found on body");

  try {
    await distributeValue(Number(value), Number(projectId));
    res.json("Values distributed correctly");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
