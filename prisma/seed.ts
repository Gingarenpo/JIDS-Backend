const { execSync } = require("child_process");

// Pythonファイルを実行させv0→v1Migrate
// 注意：これローカル専用

const stdout = execSync("ignore/.venv/bin/python ignore/migration_0to1.py", );
console.log("Execute Python...");
console.log(stdout.toString());