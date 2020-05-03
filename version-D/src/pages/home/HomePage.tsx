import React, { FC, Fragment } from 'react';
import { RouteComponentProps } from "react-router";

import { Loader } from './Loader';
import { InputForm } from "./InputForm";

type HomePageProps = RouteComponentProps;

export const HomePage: FC<HomePageProps> = () => {

    return (
        <Fragment>
            <Loader />
            <InputForm />
        </Fragment>
    );
};
