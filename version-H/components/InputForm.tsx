import React, { FC } from "react";
import {StarWarsSearch} from '@/components/StarWarsSearch';
import {Button} from '@/components/Button';

export const InputForm: FC = () => {
  return (
    <div className="w-full">
      <StarWarsSearch />
      <StarWarsSearch />
      <StarWarsSearch />
      <StarWarsSearch />
      <StarWarsSearch />
      <div className="flex justify-between my-4">
        <Button />
        <Button />
        <Button />
      </div>
      <div className="flex justify-center">
        <Button />
      </div>
    </div>
  );
};
