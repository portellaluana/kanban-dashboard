import './input.css'

import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export function Input({...props }: InputProps) {
  return (
    <input {...props}/>
  );
}

export default Input;
