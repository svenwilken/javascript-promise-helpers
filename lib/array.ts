export const mapP = (
  array: any[],
  f: (a: any, index: number) => Promise<any>
) => {
  return Promise.all(array.map(f));
};

export const forEachPP = async (
  array: any[],
  f: (a: any, index: number) => Promise<any>
) => {
  await mapP(array, f);
};

export const forEachPS = async (
  array: any[],
  f: (a: any, index: number) => Promise<any>
) => {
  let index = 0;
  for (const element of array) {
    await f(element, index++);
  }
};

export const somePP = async (
  // Paralell execution
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const res: boolean[] = await mapP(array, f);
  return res.some((x: boolean) => x);
};

export const somePS = async (
  // Sequential execution
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  let index = 0;
  for (const element of array) {
    if (await f(element, index)) {
      return true;
    }
  }
  return false;
};

export const everyPP = async (
  // Paralell execution
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const res: boolean[] = await mapP(array, f);
  return res.every((x: boolean) => x);
};

export const everyPS = async (
  // Sequential execution
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  let index = 0;
  for (const element of array) {
    if (!(await f(element, index))) {
      return false;
    }
  }
  return true;
};

export const filterP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const res: boolean[] = await mapP(array, f);
  return array.filter((_value: any, index: number) => res[index]);
};

export const findPP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const result: boolean[] = await mapP(array, f);
  const index = result.indexOf(true);
  return index >= 0 ? array[index] : null;
};

export const findPS = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  let index = 0;
  for (const element of array) {
    if (await f(element, index)) {
      return element;
    }
  }
  return null;
};

export const reduceP = async (
  array: any[],
  f: (prev: any, current: any, index: number) => Promise<any>,
  initialValue?: any
) => {
  let val = initialValue;
  let index = 0;
  for (const element of array) {
    val = await f(val, element, index++);
  }
  return val;
};

export const reduceRightP = async (
  array: any[],
  f: (prev: any, current: any, index: number) => Promise<any>,
  initialValue?: any
) => {
  array = array.concat(); // shallow copy of array
  return reduceP(array.reverse(), f, initialValue);
};
