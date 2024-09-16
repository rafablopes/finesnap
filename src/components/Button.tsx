// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  text: string;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, secondary }) => {
  return (
    <button className={secondary ? 'btn-secondary' : 'btn-primary'}>
      {text}
    </button>
  );
};

export default Button;
