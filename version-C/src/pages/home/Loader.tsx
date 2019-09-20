import React, {FC, useContext} from 'react';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";

export const Loader: FC<any> = (props: any) => {

    const
        context = useContext(AppContext),
        {isLoadedMandatoryData} = (context as AppState);

    if (!isLoadedMandatoryData()) {
        return (<span>loading</span>);
    }

    return null;
};