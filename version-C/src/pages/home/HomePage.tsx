import React, { FC, useContext, useEffect, Fragment } from 'react';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";
import { InputForm } from "./InputForm";
import { Loader } from './Loader';
import { RouteComponentProps } from "react-router";

const HomePage: FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const
        context = useContext(AppContext),
        {isLoadedMandatoryData, loadMandatoryResourceData} = (context as AppState);

    //load mandatory resources at component did mount time
    useEffect(() => {
        if (!isLoadedMandatoryData()) {
            loadMandatoryResourceData();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Loader />
            <InputForm {...props} />
        </Fragment>
    );
};

export { HomePage };