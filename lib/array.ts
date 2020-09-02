export const mapP = (
  array: any[],
  f: (a: any, index: number) => Promise<any>
) => {
  return Promise.all(array.map(f));
};

export const forEachP = async (
  array: any[],
  f: (a: any, index: number) => Promise<any>
) => {
  await mapP(array, f);
};

export const someP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const res: boolean[] = await mapP(array, f);
  return res.some((x: boolean) => x);
};  

export const everyP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const res: boolean[] = await mapP(array, f);
  return res.every((x: boolean) => x);
};

export const filterP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const res: boolean[] = await mapP(array, f);
  return array.filter((_value: any, index: number) => res[index]);
};

export const indexOfP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  let index = 0;
  for (const element of array) {
    if ((await f(element, index)) === true) {
      return index;
    }
    index++;
  }
  return -1;
}

export const findP = async (
  array: any[],
  f: (a: any, index: number) => Promise<boolean>
) => {
  const index = await indexOfP(array, f);
  return index > -1 ? array[index] : null;
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
  initialValue: any
) => {
    array = array.concat(); // shallow copy of array
    return reduceP(array.reverse(), f, initialValue);
};
