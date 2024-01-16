import { Progress } from "./type";

// 计算最终的词汇量
export function vocabularyAddup(progress: Progress[], levelSizes: number[]) {
  console.groupCollapsed("vocabularyAddup");
  let sum = 0;
  const totalUsed = progress.reduce((prev, curr) => prev + curr.used, 0);
  console.log("totalUsed", totalUsed);
  progress.forEach(({ passed, used }, index) => {
    const level = index + 1;
    console.log("level", level);
    const levelTotal = levelSizes[index]!;
    console.log("levelTotal", levelTotal);
    let score = 0;
    const accuracy = passed / used || 0;
    console.log("accuracy", accuracy);
    score = Math.round(accuracy * levelTotal);

    console.log("score", score);
    sum += score;
  });
  console.groupEnd();
  return sum;
}
