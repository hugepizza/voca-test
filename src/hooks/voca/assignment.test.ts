import { assignCandidate } from "./assignment";

test("5,5", () => {
  expect(
    assignCandidate([
      { passed: 30, used: 40 },
      { passed: 5, used: 30 },
      { passed: 1, used: 20 },
      { passed: 0, used: 0 },
      { passed: 0, used: 0 },
    ])
  ).toEqual([0, 0, 80, 20, 0]);
});

// test("5,5", () => {
//   expect(
//     assignCandidate([
//       { passed: 5, used: 5 },
//       { passed: 3, used: 5 },
//       { passed: 0, used: 0 },
//       { passed: 0, used: 0 },
//       { passed: 0, used: 0 },
//     ])
//   ).toEqual([0, 10, 70, 20, 0]);
// });
