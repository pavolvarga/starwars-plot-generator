import React, { FC, useContext, useEffect, Fragment } from 'react';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";
import { InputForm } from "./InputForm";
import { Loader } from './Loader';

const HomePage: FC<any> = (props: any) => {

    const
        context = useContext(AppContext),
        {loadMandatoryResourceData} = (context as AppState);

    useEffect(() => {
        loadMandatoryResourceData();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Loader/>
            <InputForm/>
        </Fragment>
    );
};

export { HomePage };