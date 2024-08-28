const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const N = +input[0];
  const data = input[1].split(" ").map(Number);
  const max = +input[2];
  const prefixSum = [0];
  // memo 2차원 배열 생성
  // N + 1 만큼 0으로 채운 배열이 4개 있는 배열
  const memo = Array.from({ length: 4 }, (_) =>
    Array.from({ length: N + 1 }, (_) => 0)
  );
  // prefix sum[누적합] 생성
  for (let i = 1; i <= N; i++) {
    prefixSum[i] = prefixSum[i - 1] + data[i - 1];
  }
  // 점화식 생성
  for (let i = 1; i <= 3; i++) {
    // i = 소형 기관차 번호
    for (let j = i * max; j <= N; j++) {
      // j = 소형 기관차가 운송을 시작할 수 있는 객차 번호
      memo[i][j] = Math.max(
        // 이전 값과 비교 -> 최댓값 가져가기 위해
        memo[i][j - 1],
        // memo[i - 1][j - max]
        // 현재 소형차 번호가 끌 수 있는 객차 수를 확보하기 위해
        // 이전 소형차 번호는 max 만큼 이전 것을 사용
        // 우측은 구간합
        memo[i - 1][j - max] + (prefixSum[j] - prefixSum[j - max])
      );
    }
  }
  console.log(memo[3][N]);
});

// 출처 : https://ggarden.tistory.com/entry/%EB%B0%B1%EC%A4%80-2616-%EC%86%8C%ED%98%95-%EA%B8%B0%EA%B4%80%EC%B0%A8-JavaScript
