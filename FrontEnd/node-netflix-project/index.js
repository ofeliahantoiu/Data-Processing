import express from "express";
import open from "open";
import path from "path";

const app = express();
const __dirname = path.resolve();
const port = 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

// Serve the login page at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html")); // Serve login.html from the same directory
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // Open the default browser and go to the app's URL
  open(`http://localhost:${port}`);
});
