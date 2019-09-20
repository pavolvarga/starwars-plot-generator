import React, { FC } from 'react';

import { AppStateProvider } from './AppContext';
import { HomePage } from "./pages/home/HomePage";

export const App: FC<any> = (props: any) => {

    return (
        <AppStateProvider>
            <HomePage />
        </AppStateProvider>
    );
};