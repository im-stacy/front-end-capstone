import React from 'react';

interface ButtonProps {
  handleClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Post
    </button>
  );
};

export default Button;

