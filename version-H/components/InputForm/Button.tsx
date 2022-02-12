import React, { FC } from "react";

type ButtonProps = {
  name: string;
  onClick: () => void;
};
export const Button: FC<ButtonProps> = props => {
  const { name, onClick } = props;
  return (
    <button
      className="text-white bg-blue-500 text-xl mx-4 p-3 rounded-md"
      type="button"
      onClick={onClick}
    >
      {name}
    </button>
  );
};
