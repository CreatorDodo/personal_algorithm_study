const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString();

const N = Number(input);

const dp = Array.from({ length: N + 1 }, () => 0);

dp[1] = 0;
dp[2] = dp[1] + 1;
dp[3] = Math.min(dp[2] + 1, dp[1] + 1);

for (let i = 4; i <= N; i++) {
  if (i % 2 === 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1);
  }
  if (i % 3 === 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 3] + 1);
  }
  if (i % 2 === 0 && i % 3 === 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1, dp[i / 3] + 1);
  }
  if (i % 2 !== 0 && i % 3 !== 0) {
    dp[i] = dp[i - 1] + 1;
  }
}

console.log(dp[N]);

// 출처 : https://s0ojin.tistory.com/3
