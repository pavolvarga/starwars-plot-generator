import React, { FC } from "react";
import {StarWarsSearch} from '@/components/StarWarsSearch';
import {Button} from '@/components/Button';
import {Resources} from '@/common/types';

type InputFormProps = {
  resources: Resources;
};

export const InputForm: FC<InputFormProps> = ({ resources }) => {
  const mandatory = Object.values(resources).filter(r => r.mandatory);
  const optional = Object.values(resources).filter(r => !r.mandatory);
  return (
    <div className="w-full">
      {mandatory.map(r => <StarWarsSearch key={`field-${r.singular}`} label={r.label ? r.label : r.singular} />)}
      <div className="flex justify-between my-4">
        {optional.map(r => <Button key={`button-${r.singular}`} name={`Add ${r.singular}`} /> )}
      </div>
      <div className="flex justify-center">
        <Button name={'Generate Plot'} />
      </div>
    </div>
  );
};
