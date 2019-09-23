import React, { FC, useContext, useEffect, Fragment } from 'react';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";
import { InputForm } from "./InputForm";
import { Loader } from './Loader';
import { RouteComponentProps } from "react-router";

const HomePage: FC<RouteComponentProps> = () => {

    const
        context = useContext(AppContext),
        {loadMandatoryResourceData} = (context as AppState);

    //load mandatory resources at component did mount time
    useEffect(() => {
        loadMandatoryResourceData();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Loader />
            <InputForm />
        </Fragment>
    );
};

export { HomePage };