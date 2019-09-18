import React, { FC, useContext } from 'react';

import { AppStateProvider, AppContext } from './AppContext';
import {AppState} from "./common/types";

const Test: any = (props: any) => {
    const
        context = useContext(AppContext),
        {state, setSelectedSuggestion} = (context as AppState);

    console.log('test', context);

    return <span>version-C</span>;
};

export const App: FC<any> = (props: any) => {

    return (
        <AppStateProvider>
            <Test/>
        </AppStateProvider>
    );
};