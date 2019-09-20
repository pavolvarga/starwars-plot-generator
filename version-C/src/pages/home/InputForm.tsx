import React, { FC, useContext } from 'react';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";

export const InputForm: FC<any> = (props: any) => {

    const
        context = useContext(AppContext),
        {isLoadedMandatoryData} = (context as AppState);

    if (isLoadedMandatoryData()) {
        return (<span>loaded</span>);
    }

    return null;
};