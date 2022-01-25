import { useBoolean } from 'usehooks-ts';

const useSwitch = (count: number): Array<[boolean, () => void]> => {
  const useBooleans = Array.from({ length: count }, () => {
    const { value, setFalse, toggle } = useBoolean(false);

    return { value, setFalse, toggle };
  });

  const newSetters = useBooleans.map((swither, i, currentArr) => {
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

  return Array.from({ length: count }, (v, k) => [useBooleans[k].value, newSetters[k]]);
};

export default useSwitch;
