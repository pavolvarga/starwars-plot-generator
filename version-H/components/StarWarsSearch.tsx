import {capitalize} from "lodash";
import React, { FC } from "react";
import {InputState} from '@/common/types';

export const StarWarsSearch: FC<InputState> = props => {
  const { label, visible } = props;
  return (
    <div className="w-full my-4" hidden={!visible}>
      <label className="w-full block mb-2 text-xl">{capitalize(label)}</label>
      <input type="text" className="border w-full h-8" />
    </div>
  );
};
