import { useBoolean } from 'usehooks-ts';

const useSwitch = (count: number) => {
  const arr = Array.from({ length: count }, () => {
    const { value, setFalse, toggle } = useBoolean(false);

    return { value, setFalse, toggle };
  });

  const newSetters = arr.map((swither, i, currentArr) => {
    const current = i;
    return () => {
      swither.toggle();
      currentArr.forEach((s, j) => {
        if (current !== j) {
          s.setFalse();
        }
      });
    };
  });

  return Array.from({ length: count }, (v, k) => [arr[k].value, newSetters[k]]);
};

export default useSwitch;
