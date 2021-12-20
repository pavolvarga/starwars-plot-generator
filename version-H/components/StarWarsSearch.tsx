import React, { FC } from "react";

export const StarWarsSearch: FC = () => {
  return (
    <div className="w-full my-4">
      <label className="w-full block mb-2 text-xl">Label</label>
      <input type="text" className="border w-full h-8" />
    </div>
  );
};
