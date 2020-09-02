import {
  mapP,
  forEachP,
  someP,
  everyP,
  filterP,
  findP,
  reduceP,
  reduceRightP,
} from "../lib/array";

describe("Promise Helper Array Functions", () => {
  describe("mapP", () => {
    it("case 1", async () => {
      const res = await mapP([1, 2, 3, 4, 5], async (a) => a * 2);
      expect(res).toEqual([2, 4, 6, 8, 10]);
    });
  });

  describe("forEachP", () => {
    it("case 1", async () => {
      const array = [{ n: 1 }, { n: 2 }, { n: 3 }];
      await forEachP(array, async (a) => (a.n = a.n + 1));
      expect(array).toEqual([{ n: 2 }, { n: 3 }, { n: 4 }]);
    });

    it("case 2", async () => {
      const array = [{ n: 1 }, { n: 2 }, { n: 3 }];
      await forEachP(array, async (a) => (a.m = a.n ** 2));
      expect(array).toEqual([
        { n: 1, m: 1 },
        { n: 2, m: 4 },
        { n: 3, m: 9 },
      ]);
    });
  });

  describe("someP", () => {
    it("case 1", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15, 12];
      expect(await someP(array, async (a) => a % 2 === 0)).toBe(true);
    });

    it("case 2", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15];
      expect(await someP(array, async (a) => a % 2 === 0)).toBe(false);
    });
  });

  describe("everyP", () => {
    it("case 1", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15, 12];
      expect(await everyP(array, async (a) => a % 2 === 1)).toBe(false);
    });

    it("case 2", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15];
      expect(await everyP(array, async (a) => a % 2 === 1)).toBe(true);
    });
  });

  describe("filterP", () => {
    it("case 1", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await filterP(array, async (a) => a % 2 === 0)).toEqual([
        2,
        4,
        6,
        8,
        10,
        12,
        14,
      ]);
    });
  });

  describe("findP", () => {
    it("case 1", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await findP(array, async (a) => a % 13 === 0)).toBe(13);
    });

    it("case 2", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await findP(array, async (a) => a % 17 === 0)).toBeNull();
    });
  });

  describe("reduceP", () => {
    it("case 1", async () => {
      const array = [8, 4, 2];
      expect(await reduceP(array, async (a, b) => a / b, 32)).toBe(0.5);
    });
  });

  describe("reduceRightP", () => {
    it("case 1", async () => {
      const array = [2, 4, 8];
      expect(await reduceRightP(array, async (a, b) => a / b, 32)).toBe(0.5);
    });
  });
});
