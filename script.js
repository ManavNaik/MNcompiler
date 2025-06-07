const defaultCodes = {
    "python": `print("Hello, World!")`,
    "cpp": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    "java": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    "c": `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    "javascript": `console.log("Hello, World!");`
};

// var editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
//     mode: "text/x-python", 
//     theme: "dracula",
//     lineNumbers: true,
//     autoCloseBrackets: true,
//     matchBrackets: true,
//     extraKeys: { "Ctrl-Space": "autocomplete" }
// });


var editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    mode: "text/x-python",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    styleActiveLine: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    smartIndent: true,
    indentWithTabs: true,
    tabSize: 4,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: { 
        "Ctrl-Space": "autocomplete"
    }
});


editor.setValue(defaultCodes["python"]);

const languageModes = {
    "python": "text/x-python",
    "cpp": "text/x-c++src",
    "java": "text/x-java",
    "c": "text/x-csrc",
    "javascript": "text/javascript"
};

document.getElementById("languageSelect").addEventListener("change", function() {
    const selectedLanguage = this.value;
    editor.setOption("mode", languageModes[selectedLanguage]);
    editor.setValue(defaultCodes[selectedLanguage]);
});

const keywords = {
    "python": [
        "def", "class", "import", "from", "as", "return", "if", "else", "elif", "for", "while",
        "break", "continue", "pass", "try", "except", "finally", "raise", "with", "lambda",
        "yield", "global", "nonlocal", "assert", "async", "await", "print", "input", "open",
        "len", "range", "map", "filter", "zip", "sorted", "list", "dict", "set", "tuple",
        "bool", "int", "float", "str", "bytes", "complex", "None", "True", "False", "self", 
        "is", "not", "and", "or", "del", "eval", "exec", "chr", "ord", "abs", "all", "any", 
        "bin", "hex", "oct", "round", "min", "max", "sum", "divmod", "pow", "isinstance", 
        "issubclass", "id", "callable", "locals", "globals", "filter", "map", "reduce", 
        "repr", "format", "str.format", "super"
    ],
    "cpp": [
        "int", "float", "double", "char", "bool", "void", "string", "vector", "array", "set",
        "map", "unordered_map", "unordered_set", "stack", "queue", "deque", "priority_queue",
        "cout", "cin", "endl", "#include", "namespace", "using", "public", "private", "protected",
        "class", "struct", "template", "typename", "auto", "static", "const", "mutable", "virtual",
        "override", "final", "explicit", "friend", "operator", "this", "nullptr", "sizeof",
        "new", "delete", "try", "catch", "throw", "inline", "constexpr", "goto", "do", "while",
        "if", "else", "switch", "case", "default", "return", "continue", "break", "for", "foreach",
        "sizeof", "typeid", "alignas", "alignof", "noexcept", "thread_local"
    ],
    "java": [
        "public", "private", "protected", "static", "final", "void", "int", "double", "float",
        "char", "boolean", "long", "short", "byte", "String", "class", "interface", "abstract",
        "implements", "extends", "import", "package", "new", "return", "try", "catch", "finally",
        "throw", "throws", "synchronized", "volatile", "transient", "instanceof", "super",
        "this", "break", "continue", "default", "do", "while", "for", "if", "else", "switch",
        "case", "enum", "null", "true", "false", "assert", "strictfp", "native", "const", "goto", 
        "System", "out", "println", "in", "err", "Math", "Integer", "Double", "Character", "Object", 
        "Thread", "currentTimeMillis", "sleep", "parseInt", "valueOf", "toString", "length", 
        "substring", "charAt", "equals", "compareTo", "replace", "split", "toUpperCase", "toLowerCase", 
        "indexOf", "isEmpty", "trim", "contains", "join", "System.arraycopy", "System.getProperty", 
        "System.exit", "System.nanoTime", "System.gc", "Thread.sleep", "Thread.currentThread", 
        "Thread.yield", "Thread.interrupted", "Thread.isAlive", "Thread.setPriority", "Thread.join"
    ],
    "c": [
        "int", "float", "double", "char", "void", "short", "long", "signed", "unsigned",
        "struct", "union", "enum", "typedef", "static", "const", "volatile", "extern",
        "#include", "#define", "#ifdef", "#ifndef", "#endif", "return", "goto", "sizeof",
        "printf", "scanf", "gets", "puts", "fgets", "fputs", "main", "while", "do", "for",
        "if", "else", "switch", "case", "break", "continue", "default", "long long", "inline",
        "restrict", "alignas", "alignof", "typeof", "_Bool", "_Complex", "_Imaginary"
    ],
    "javascript": [
        "let", "const", "var", "function", "return", "if", "else", "switch", "case", "break",
        "continue", "for", "while", "do", "try", "catch", "finally", "throw", "new", "delete",
        "typeof", "instanceof", "in", "of", "this", "super", "class", "extends", "constructor",
        "static", "import", "export", "default", "async", "await", "yield", "Promise",
        "map", "set", "Array", "Object", "console", "log", "document", "window", "JSON",
        "fetch", "localStorage", "sessionStorage", "RegExp", "Date", "Error", "Function",
        "Symbol", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "Int8Array", "Uint8Array",
        "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array",
        "Float64Array", "BigInt", "Intl", "Reflect"
    ]
};


function languageHint(editor) {
    const lang = document.getElementById("languageSelect").value;
    const cur = editor.getCursor();
    const token = editor.getTokenAt(cur);
    const start = token.start;
    const end = token.end;
    const word = token.string;

    const list = keywords[lang].filter(keyword => keyword.startsWith(word));

    return { list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end) };
}

editor.on("inputRead", function(instance) {
    if (!instance.state.completionActive) {
        CodeMirror.showHint(instance, languageHint, { completeSingle: false });
    }
});

async function runCode() {
    const code = editor.getValue();
    const language = document.getElementById("languageSelect").value;
    const userInput = document.getElementById("userInput").value.trim();
    
    const formattedInput = userInput.replace(/,/g, "\n");

    const langMap = {
        "python": { lang: "python", ext: "py" },
        "cpp": { lang: "cpp", ext: "cpp" },
        "java": { lang: "java", ext: "java" },
        "c": { lang: "c", ext: "c" },
        "javascript": { lang: "javascript", ext: "js" }
    };

    const langConfig = langMap[language];

    const requestData = {
        language: langConfig.lang,
        version: "*",
        files: [{ name: `main.${langConfig.ext}`, content: code }],
        stdin: formattedInput 
    };

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (result.run && result.run.output) {
            document.getElementById("outputConsole").textContent = result.run.output;
        } else {
            document.getElementById("outputConsole").textContent = "Error: No output received.";
        }
    } catch (error) {
        console.error("Error executing code:", error);
        document.getElementById("outputConsole").textContent = "Execution failed.";
    }
}


document.getElementById("runCode").addEventListener("click", runCode);

document.addEventListener("keydown", (e) => {
    if (e.key === "F9") {
        document.getElementById("runCode").click();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    console.log("⏳ Waiting for Google Generative AI SDK to load...");

    async function waitForSDK() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (window.GoogleGenerativeAI) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 500);
        });
    }

    await waitForSDK();
    console.log("✅ Google Generative AI SDK loaded!");

    const genAI = new window.GoogleGenerativeAI("AIzaSyCtgb97jwTV7cnQa7VTRygzpA0JdiRtyuo");

    async function generateResponse(prompt) {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const selectedLanguage = document.getElementById("languageSelect").value;
        const userCode = editor.getValue();
        const output = document.getElementById("outputConsole").textContent;
        
        const formattedPrompt = `You are an expert programmer. Follow these rules:
        - give a short and simple explation if necessary.
        - Provide code in ${selectedLanguage}.
        - Do not include comments.
        - keep code as simpel as possible.
        - Ensure proper formatting without unnecessary newlines.
        - If relevant, consider this user code:\n${userCode}\n
        - ${output}\n is the output of the code.
        - User prompt: ${prompt}
        `;

        try {
            const result = await model.generateContent(formattedPrompt);
            const aiOutput = await result.response.text();
            
            console.log("Raw AI Output:", aiOutput);

            const formattedOutput = `<pre><code>${aiOutput}</code></pre>`;

            
            document.getElementById("chat-output").innerHTML = formattedOutput;

        } catch (error) {
            console.error("Error generating response:", error);
            document.getElementById("chat-output").textContent = "Error: Could not generate a response.";
        }
    }
    
    

    const chatOutput = document.getElementById("chat-output");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    function appendMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    sendBtn.addEventListener("click", async () => {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        appendMessage(userMessage, "user");
        userInput.value = "";

        try {
            const aiResponse = await generateResponse(userMessage);
            appendMessage(aiResponse, "ai");
        } catch (error) {
            console.error("❌ Error fetching AI response:", error);
            appendMessage("Error: Could not get a response from AI.", "ai");
        }
    });

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });
});


editor.on("mousedown", function(cm, event) {
    if ((event.ctrlKey || event.metaKey) && event.button === 0) {
        let cursor = cm.coordsChar({ left: event.clientX, top: event.clientY });
        cm.addSelection(cursor);
        event.preventDefault();
    }
});


editor.setOption("extraKeys", {
    "Ctrl-S": () => alert("Save functionality not implemented!"),
    "F9": runCode,
    "Ctrl-L": () => editor.setValue(""),
    "Ctrl-/": cm => cm.toggleComment(),
    "Ctrl-D": cm => {
        let doc = cm.getDoc();
        let cursor = doc.getCursor();
        let line = doc.getLine(cursor.line);
        doc.replaceRange(line + "\n", { line: cursor.line, ch: 0 });
    },
    "Ctrl-Shift-K": cm => {
        let doc = cm.getDoc();
        let cursor = doc.getCursor();
        doc.replaceRange("", { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
    },
    "Ctrl-Z": cm => cm.undo(),
    "Ctrl-Shift-Z": cm => cm.redo(),
    "Ctrl-Y": cm => cm.redo(),
    "Ctrl-X": cm => cm.execCommand("cut"),
    "Ctrl-C": cm => cm.execCommand("copy"),
    "Ctrl-V": cm => cm.execCommand("paste"),
    "Ctrl-A": cm => cm.execCommand("selectAll"),
    "Ctrl-Shift-V": () => alert("Clipboard history not available in browser."),
    "Ctrl-F": cm => cm.execCommand("find"),
    "Ctrl-H": cm => cm.execCommand("replace"),
    "Ctrl-]": cm => cm.execCommand("indentMore"),
    "Ctrl-[": cm => cm.execCommand("indentLess"),
    "Alt-Up": cm => {
        let doc = cm.getDoc();
        let cursor = doc.getCursor();
        if (cursor.line > 0) {
            let line = doc.getLine(cursor.line);
            let prevLine = doc.getLine(cursor.line - 1);
            doc.replaceRange(prevLine, { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
            doc.replaceRange(line, { line: cursor.line - 1, ch: 0 }, { line: cursor.line, ch: 0 });
            doc.setCursor({ line: cursor.line - 1, ch: cursor.ch });
        }
    },
    "Alt-Down": cm => {
        let doc = cm.getDoc();
        let cursor = doc.getCursor();
        if (cursor.line < doc.lineCount() - 1) {
            let line = doc.getLine(cursor.line);
            let nextLine = doc.getLine(cursor.line + 1);
            doc.replaceRange(nextLine, { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
            doc.replaceRange(line, { line: cursor.line + 1, ch: 0 }, { line: cursor.line + 2, ch: 0 });
            doc.setCursor({ line: cursor.line + 1, ch: cursor.ch });
        }
    },
    "Shift-Alt-Up": cm => {
        let doc = cm.getDoc();
        let cursor = doc.getCursor();
        let line = doc.getLine(cursor.line);
        doc.replaceRange(line + "\n", { line: cursor.line, ch: 0 });
    },
    "Shift-Alt-Down": cm => {
        let doc = cm.getDoc();
        let cursor = doc.getCursor();
        let line = doc.getLine(cursor.line);
        doc.replaceRange("\n" + line, { line: cursor.line + 1, ch: 0 });
    },
    "Ctrl-Shift-L": cm => cm.execCommand("selectAllMatches"),
    "Ctrl-P": () => alert("Quick Open not implemented!"),
    "Ctrl-Shift-O": () => alert("Go to Symbol not implemented!"),
});

editor.setOption("extraKeys", {
    "Ctrl-V": (cm) => {
        if (editor.hasFocus()) {
            navigator.clipboard.readText().then((text) => {
                cm.replaceSelection(text);
            });
        }
    }
});

document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "v") {
        if (editor.hasFocus()) {
            event.preventDefault();
            editor.focus(); 
        }
    }
});



function openShortcutModal() {
    document.getElementById("shortcutModal").classList.remove("hidden");
}
function closeShortcutModal() {
    document.getElementById("shortcutModal").classList.add("hidden");
}




// addons


editor.addOverlay({
    token: function(stream) {
        if (stream.match(/yourWord/)) return "matching-word";
        stream.next();
    }
});

