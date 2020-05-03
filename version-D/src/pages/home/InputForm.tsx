import React, { FC } from "react";

type InputFormProps = {
    mandatoryDataLoaded: boolean
}

export const InputForm: FC<InputFormProps> = ({mandatoryDataLoaded}: InputFormProps) => {
    if (mandatoryDataLoaded) {
        return <h1>Version D</h1>;
    }
    return null;
};