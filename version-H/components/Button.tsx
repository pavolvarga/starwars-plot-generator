import React, { FC } from "react";

type ButtonProps = {
  name: string;
};
export const Button: FC<ButtonProps> = ({ name }) => {
  return (
    <button className="text-white bg-blue-500 text-xl mx-4 p-3 rounded-md" type="button">{name}</button>
  );
};
