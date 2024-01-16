import { Progress } from "./type";

export function assignCandidate(progress: Progress[]) {
  const assignment = [40, 30, 20, 10, 0];

  if (progress[0]!.used === 0) {
    return assignment;
  }
  const defaultAssignment = [...assignment];
  [1, 2, 3, 4, 5].forEach((level, index) => {
    console.group("assignCandidateL: level ", level);
    const levelProgress = progress[index];
    // 补足前面等级减少的
    const compensation =
      defaultAssignment.slice(0, index).reduce((prev, curr) => prev + curr, 0) -
      assignment.slice(0, index).reduce((prev, curr) => prev + curr, 0);
    console.log("compensation", compensation);

    let levelAssignment = defaultAssignment[index];
    console.log("used", levelProgress.used);

    const accuracy = levelProgress.passed / levelProgress.used || 0;
    console.log("accuracy", accuracy);

    // 超过阈值且正确率大于60%时 可以减少该等级出题量
    if (levelProgress.used >= assignment[index] && accuracy >= 0.6) {
      levelAssignment = (1 - accuracy) * defaultAssignment[index];
    } else {
      levelAssignment += compensation;
    }
    console.log("levelAssignment, ", levelAssignment);
    // 单一等级不能大于60%
    assignment[index] = Math.floor(levelAssignment > 60 ? 60 : levelAssignment);
    console.log("assigment, ", assignment[index]);
    console.groupEnd();
  });

  const sum = assignment.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  if (sum < 100) {
    assignment[assignment.length - 1] = 100 - sum;
  }
  console.log("xxx", assignment);

  return assignment;
}
