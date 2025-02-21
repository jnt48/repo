// const express = require("express");
// const bodyParser = require("body-parser");
// const { exec } = require("child_process");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();
// const fs= require("fs");
// app.use(cors());
// app.use(bodyParser.json());


// app.get("/", (req, res) => {
//   res.send("Welcome to the C Code Execution API. Use POST /run to execute C code.");
// });

// app.post("/run", (req, res) => {
//   const code = req.body.code;
//   const filePath = "temp.c";


//   fs.writeFileSync(filePath, code);

//   exec(`gcc ${filePath} -o temp && temp.exe`, (err, stdout, stderr) => {
//     if (err) {
//       res.json({ output: stderr });
//     } else {
//       res.json({ output: stdout });
//     }

    
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     if (fs.existsSync("temp.exe")) fs.unlinkSync("temp.exe");
//   });
// });

// const PORT = 5000;

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Code Execution API. Use the specific endpoints to execute code.");
});

// Endpoint for C
app.post("/run/c", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ output: "Code is required." });
  }
  const filePath = "temp.c";
  fs.writeFileSync(filePath, code);

  // For Windows, using temp.exe; change to "./temp" for Unix-based systems if needed.
  const compileAndRunCommand = `gcc ${filePath} -o temp && temp.exe`;

  exec(compileAndRunCommand, (err, stdout, stderr) => {
    // Cleanup
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync("temp.exe")) fs.unlinkSync("temp.exe");
    
    if (err) {
      return res.json({ output: stderr });
    } else {
      return res.json({ output: stdout });
    }
  });
});

// Endpoint for Python
app.post("/run/python", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ output: "Code is required." });
  }
  const filePath = "temp.py";
  fs.writeFileSync(filePath, code);
  
  // Use 'py -3' on Windows, otherwise use 'python3'
  const runCommand = process.platform === "win32" ? `py -3 ${filePath}` : `python3 ${filePath}`;

  exec(runCommand, (err, stdout, stderr) => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (err) {
      return res.json({ output: stderr });
    } else {
      return res.json({ output: stdout });
    }
  });
});

// Endpoint for JavaScript
app.post("/run/javascript", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ output: "Code is required." });
  }
  const filePath = "temp.js";
  fs.writeFileSync(filePath, code);
  const runCommand = `node ${filePath}`;

  exec(runCommand, (err, stdout, stderr) => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (err) {
      return res.json({ output: stderr });
    } else {
      return res.json({ output: stdout });
    }
  });
});

// Endpoint for Java
app.post("/run/java", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ output: "Code is required." });
  }
  // The file must be named Temp.java, and the public class should be Temp.
  const filePath = "Temp.java";
  fs.writeFileSync(filePath, code);
  const compileCommand = `javac ${filePath}`;

  exec(compileCommand, (err, stdout, stderr) => {
    if (err) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.json({ output: stderr });
    } else {
      const runCommand = `java Temp`;
      exec(runCommand, (err2, stdout2, stderr2) => {
        // Cleanup generated files
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (fs.existsSync("Temp.class")) fs.unlinkSync("Temp.class");
        if (err2) {
          return res.json({ output: stderr2 });
        } else {
          return res.json({ output: stdout2 });
        }
      });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
