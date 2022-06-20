import { FC, ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type PortalArea = 'content'

interface Props {
  area: PortalArea;
  children: ReactNode;
}

const Portal: FC<Props> = ({ area, children }) => {
  const ref = useRef<HTMLElement>();
  useEffect(() => {
    ref.current = document.getElementById(area);
  }, [area]);
  if (!ref.current) {
    return null;
  }
  return ReactDOM.createPortal(children, ref.current);
}

export default Portal;
