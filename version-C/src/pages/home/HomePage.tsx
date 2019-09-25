import React, { FC, useContext, useEffect, Fragment } from 'react';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";
import { InputForm } from "./InputForm";
import { Loader } from './Loader';
import { RouteComponentProps } from "react-router";
import  {Alert } from "reactstrap";

const InitialLoadFailedAlert: FC = () => {
    return (
        <div className="text-center">
            <Alert color="danger">
                Loading of initial data failed, please try again later.
            </Alert>
        </div>
    );
};

const HomePage: FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const
        context = useContext(AppContext),
        {loadMandatoryResourceData, hasLoadingOfMandatoryDataFailed} = (context as AppState);

    //load mandatory resources at component did mount time
    useEffect(() => {
        loadMandatoryResourceData();
        // eslint-disable-next-line
    }, []);

    if (hasLoadingOfMandatoryDataFailed()) {
        return <InitialLoadFailedAlert/>
    }

    return (
        <Fragment>
            <Loader />
            <InputForm {...props} />
        </Fragment>
    );
};

export { HomePage };