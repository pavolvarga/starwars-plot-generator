import React, { FC, useContext } from 'react';
import { Spinner } from 'reactstrap';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";

export const Loader: FC = () => {

    const
        context = useContext(AppContext),
        {isLoadedMandatoryData} = (context as AppState);

    if (!isLoadedMandatoryData()) {
        return (
            <div className="text-center">
                <h3>Please wait while star wars data is being loaded</h3>
                <Spinner style={{ width: '5rem', height: '5rem' }} />{' '}
            </div>
        );
    }

    return null;
};