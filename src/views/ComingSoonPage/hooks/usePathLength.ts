import {useEffect, useRef, useState} from "react";

const usePathLength = () => {
  const ref = useRef<SVGPathElement>();
  const [length, setLength] = useState(0);
  useEffect(() => {
    const total = ref.current.getTotalLength();
    setLength(total);
  }, []);
  return { ref, length };
};

export default usePathLength;
