import React, { FC } from "react";
import {Layout} from '@/components/Layout';
import {InputForm} from '@/components/InputForm';

type HomePageComponentProps = {
  resources: any;
};
export const HomePageComponent: FC<HomePageComponentProps> = ({ resources }) => {
  console.log('fe', resources);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl my-8">Star Wars Plot Generator</h1>
        <InputForm />
      </div>
    </Layout>
  )
}
