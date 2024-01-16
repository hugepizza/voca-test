import * as lo from "lodash";
// 根据分配比例选择单词
export function pickCandidate(
  assignment: number[],
  vocaList: string[][],
  total: number
) {
  // 根据比例分配 向下取整 第3位补齐
  const ratedAssignment = assignment.map((a) => Math.floor((total * a) / 100));
  const accumulation = ratedAssignment.reduce((prev, curr) => prev + curr);
  ratedAssignment[3] += total - accumulation;

  // 修正
  const revisedAssignment = revise(ratedAssignment, vocaList);
  const canditate = revisedAssignment
    .map((levelAssignmentCount, index) => {
      const levelVoca = vocaList[index];
      const shuffled = lo.shuffle(levelVoca);
      const target = shuffled.slice(0, levelAssignmentCount);
      return target.map((voca) => ({
        level: index + 1,
        content: voca,
        // content: voca + " " + (index + 1),
        marked: false,
      }));
    })
    .flat();

  return lo.shuffle(canditate);
}

// 根据实际词表数量 修正分配量
// 某等级词数不足 下一等级补足
export function revise(assignment: number[], vocaList: string[][]) {
  const levelTotal = vocaList.map((list) => list.length);
  console.log("levelTotal", levelTotal);
  console.log("assignment", assignment);

  const revisedAssigment = [...assignment];
  assignment.forEach((_, index) => {
    console.groupCollapsed(`revise: index ${index}`);
    let compensation = 0;
    const shouldAccumulation = assignment
      .slice(0, index)
      .reduce((prev, curr) => prev + curr, 0);
    console.log("shouldAccumulation, ", shouldAccumulation);
    const accumulation = revisedAssigment
      .slice(0, index)
      .reduce((prev, curr) => prev + curr, 0);
    console.log("accumulation, ", accumulation);

    if (accumulation < shouldAccumulation) {
      compensation = shouldAccumulation - accumulation;
    }

    const shouldBe = revisedAssigment[index] + compensation;
    console.log("shouldBe, ", shouldBe);
    const max = levelTotal[index];
    console.log("max, ", max);
    if (shouldBe > max) {
      compensation += max - shouldBe;
    }
    console.log("compensation, ", compensation);
    revisedAssigment[index] += compensation;
    console.log("result, ", revisedAssigment[index]);
    console.groupEnd();
  });
  console.log(revisedAssigment);

  return revisedAssigment;
}
