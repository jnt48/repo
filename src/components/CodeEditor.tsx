"use client";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

// Import language extensions (ensure these packages are installed)
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";

// Map each language to its CodeMirror extension
const languageExtensions = {
  c: cpp(),
  python: python(),
  javascript: javascript(),
  java: java(),
};

// Provide a default code snippet for each language
const initialCodeByLanguage = {
  c: `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  java: `public class Temp {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};

interface RunResponse {
  output: string;
}

const CodeEditor: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof languageExtensions>("c");
  const [code, setCode] = useState<string>(initialCodeByLanguage["c"]);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update language and reset code accordingly.
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as keyof typeof languageExtensions;
    setSelectedLanguage(lang);
    setCode(initialCodeByLanguage[lang]);
  };

  // On run, call the corresponding endpoint based on language
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("");
    try {
      const response = await fetch(`http://localhost:5000/run/${selectedLanguage}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: RunResponse = await response.json();
      setOutput(result.output);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#1e1e1e", minHeight: "100vh", color: "#fff" }}>
      <h1>Next.js Code Editor</h1>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="language-select">Select Language: </label>
        <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </div>
      <div style={{ border: "1px solid #333", borderRadius: "8px", overflow: "hidden", marginBottom: "10px" }}>
        <CodeMirror
          value={code}
          height="400px"
          theme={oneDark}
          extensions={[languageExtensions[selectedLanguage]]}
          onChange={(value) => setCode(value)}
        />
      </div>
      <button
        onClick={handleRunCode}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      {output && (
        <pre
          style={{
            marginTop: "20px",
            background: "#333",
            padding: "10px",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
          }}
        >
          {output}
        </pre>
      )}
    </div>
  );
};

export default CodeEditor;
