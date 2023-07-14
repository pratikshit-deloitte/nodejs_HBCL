import express from "express";
import router from "./routes/apiRoutes.js";
const app = express();
const PORT = 5000;
app.use(express.json());
app.use("/api", router);

app.listen(PORT, (req, res) => {
  console.log(`Server started on port`);
});
