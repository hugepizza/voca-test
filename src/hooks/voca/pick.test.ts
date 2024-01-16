import { revise } from "./pick";
import "jest";

test("", () => {
  expect(
    revise(
      [0, 0, 5, 5, 0],
      [
        Array.from({ length: 200 }, (_, index) => `lv.1_${index}`),
        Array.from({ length: 200 }, (_, index) => `lv.2_${index}`),
        Array.from({ length: 5 }, (_, index) => `lv.3_${index}`),
        Array.from({ length: 5 }, (_, index) => `lv.4_${index}`),
        Array.from({ length: 20 }, (_, index) => `lv.5_${index}`),
      ]
    )
  ).toEqual([0, 0, 5, 5, 0]);

  expect(
    revise(
      [0, 15, 50, 25, 10],
      [
        Array.from({ length: 200 }, (_, index) => `lv.1_${index}`),
        Array.from({ length: 200 }, (_, index) => `lv.2_${index}`),
        Array.from({ length: 5 }, (_, index) => `lv.3_${index}`),
        Array.from({ length: 5 }, (_, index) => `lv.4_${index}`),
        Array.from({ length: 20 }, (_, index) => `lv.5_${index}`),
      ]
    )
  ).toEqual([0, 15, 5, 5, 20]);

  expect(
    revise(
      [15, 50, 25, 0, 10],
      [
        Array.from({ length: 200 }, (_, index) => `lv.1_${index}`),
        Array.from({ length: 35 }, (_, index) => `lv.2_${index}`),
        Array.from({ length: 25 }, (_, index) => `lv.3_${index}`),
        Array.from({ length: 25 }, (_, index) => `lv.4_${index}`),
        Array.from({ length: 5 }, (_, index) => `lv.5_${index}`),
      ]
    )
  ).toEqual([15, 35, 25, 15, 5]);
});
