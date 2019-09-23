import React, { FC } from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { AppStateProvider } from './AppContext';
import { HomePage } from "./pages/home/HomePage";

const Header: FC = () => {
    return (
        <div className="text-center">
            <h1>Star Wars Plot Generator</h1>
        </div>
    );
};

const StarWarsHomePage = withRouter(HomePage);

export const App: FC = () => {

    return (
        <AppStateProvider>
            <>
                <Header/>
                <Router>
                    <Route exact path="/" render={(props) => <StarWarsHomePage {...props}/>} />
                </Router>
            </>
        </AppStateProvider>
    );
};