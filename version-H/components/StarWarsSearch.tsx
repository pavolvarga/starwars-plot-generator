import {capitalize} from "lodash";
import React, { FC } from "react";

type StarWarsSearchProps = {
  label: string;
};
export const StarWarsSearch: FC<StarWarsSearchProps> = ({ label }) => {
  return (
    <div className="w-full my-4">
      <label className="w-full block mb-2 text-xl">{capitalize(label)}</label>
      <input type="text" className="border w-full h-8" />
    </div>
  );
};
