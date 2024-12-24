const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Welcome to the C Code Execution API. Use POST /run to execute C code.");
});

app.post("/run", (req, res) => {
  const code = req.body.code;
  const filePath = "temp.c";


  fs.writeFileSync(filePath, code);

  exec(`gcc ${filePath} -o temp && temp.exe`, (err, stdout, stderr) => {
    if (err) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }

    
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync("temp.exe")) fs.unlinkSync("temp.exe");
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
