const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

let dp = Array(k + 1).fill(0);

dp[0] = 1;

for (let i = 0; i < n; i++) {
  for (let j = coins[i]; j <= k; j++) {
    dp[j] += dp[j - coins[i]];
  }
}

console.log(dp[k]);
