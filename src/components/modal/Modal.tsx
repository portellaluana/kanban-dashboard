import { ReactNode } from "react";
import "./modal.css";

interface ModalProps {
  children?: ReactNode;
}

export function Modal({children, ...props}: ModalProps) {

  return (
<div {...props}> {children}</div>
  );
}