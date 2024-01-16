import { vocabularyAddup } from "./addup";

test("add up", () => {
  expect(
    vocabularyAddup(
      [
        { passed: 25, used: 40 },
        { passed: 3, used: 30 },
        { passed: 7, used: 20 },
        { passed: 0, used: 10 },
        { passed: 0, used: 0 },
      ],
      [5000, 5000, 5000, 5000, 5000]
    )
  ).toEqual(6000);
});
