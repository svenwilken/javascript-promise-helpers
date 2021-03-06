import {
  mapP,
  forEachPP,
  forEachPS,
  somePP,
  somePS,
  everyPP,
  everyPS,
  filterP,
  findPP,
  findPS,
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

  describe("forEachPP", () => {
    it("case 1", async () => {
      const array = [{ n: 1 }, { n: 2 }, { n: 3 }];
      await forEachPP(array, async (a) => (a.n = a.n + 1));
      expect(array).toEqual([{ n: 2 }, { n: 3 }, { n: 4 }]);
    });

    it("case 2", async () => {
      const array = [{ n: 1 }, { n: 2 }, { n: 3 }];
      await forEachPP(array, async (a) => (a.m = a.n ** 2));
      expect(array).toEqual([
        { n: 1, m: 1 },
        { n: 2, m: 4 },
        { n: 3, m: 9 },
      ]);
    });
  });


  describe("forEachPS", () => {
    it("case 1", async () => {
      const array = [{ n: 1 }, { n: 2 }, { n: 3 }];
      await forEachPS(array, async (a) => (a.n = a.n + 1));
      expect(array).toEqual([{ n: 2 }, { n: 3 }, { n: 4 }]);
    });

    it("case 2", async () => {
      const array = [{ n: 1 }, { n: 2 }, { n: 3 }];
      await forEachPS(array, async (a) => (a.m = a.n ** 2));
      expect(array).toEqual([
        { n: 1, m: 1 },
        { n: 2, m: 4 },
        { n: 3, m: 9 },
      ]);
    });
  });

  describe("somePP", () => {
    it("case 1", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15, 12];
      expect(await somePP(array, async (a) => a % 2 === 0)).toBe(true);
    });

    it("case 2", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15];
      expect(await somePP(array, async (a) => a % 2 === 0)).toBe(false);
    });
  });

  describe("somePS", () => {
    it("case 1", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15, 12];
      expect(await somePS(array, async (a) => a % 2 === 0)).toBe(true);
    });

    it("case 2", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15];
      expect(await somePS(array, async (a) => a % 2 === 0)).toBe(false);
    });
  });

  describe("everyPP", () => {
    it("case 1", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15, 12];
      expect(await everyPP(array, async (a) => a % 2 === 1)).toBe(false);
    });

    it("case 2", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15];
      expect(await everyPP(array, async (a) => a % 2 === 1)).toBe(true);
    });
  });

  describe("everyPS", () => {
    it("case 1", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15, 12];
      expect(await everyPS(array, async (a) => a % 2 === 1)).toBe(false);
    });

    it("case 2", async () => {
      const array = [1, 3, 5, 7, 9, 11, 13, 15];
      expect(await everyPS(array, async (a) => a % 2 === 1)).toBe(true);
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

  describe("findPP", () => {
    it("case 1", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await findPP(array, async (a) => a % 13 === 0)).toBe(13);
    });

    it("case 2", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await findPP(array, async (a) => a % 17 === 0)).toBeNull();
    });
  });

  describe("findPS", () => {
    it("case 1", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await findPS(array, async (a) => a % 13 === 0)).toBe(13);
    });

    it("case 2", async () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(await findPS(array, async (a) => a % 17 === 0)).toBeNull();
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
