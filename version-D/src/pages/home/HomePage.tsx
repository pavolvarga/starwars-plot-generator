import React, { FC, useContext, useEffect, Fragment } from 'react';

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

    return (
        <Fragment>
            <h1>Version D</h1>
        </Fragment>
    );
};

export { HomePage };