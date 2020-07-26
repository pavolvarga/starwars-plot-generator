import React, { FC } from 'react';
import { RouteComponentProps } from "react-router";

import { Loader } from './Loader';
import { InputForm } from "./InputForm";
import { InitialLoadFailedAlert } from "./InitialLoadFailedAlert";

export const HomePage: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    return (
        <div className="container">
            <InitialLoadFailedAlert />
            <Loader />
            <InputForm {...props} />
        </div>
    );
};
