import {FC, ReactNode, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;
}

const Portal: FC<Props> = ({ children }) => {
  const ref = useRef<HTMLElement>();
  useEffect(() => {
    ref.current = document.getElementById('content');
  }, []);
  if (!ref.current) {
    return null;
  }
  return ReactDOM.createPortal(children, ref.current);
}

export default Portal;
