import "dotenv/config";
import express, { json } from "express";
import { distributeValue } from "./services.mjs";
const app = express();
const port = 3000;

app.use(json());

app.get("/", (_, res) => {
  res.json("Hello world");
});

app.post("/pay", async (req, res) => {
  const { value, projectId } = req.body;
  if (!value || !projectId) res.json("No value or projectId found on body");

  await distributeValue(value, projectId);
  res.json("Values distributed correctly");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
