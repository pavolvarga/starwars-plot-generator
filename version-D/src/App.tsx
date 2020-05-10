import React, {FC, useEffect} from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { HomePage } from "./pages/home/HomePage";
import { Plot } from "./pages/result/ResultPage";
import { getMandatoryResourceNames } from "./common/common";
import { load } from "./actions/actions";

const Header: FC = () => {
    return (
        <div className="text-center">
            <h1>Star Wars Plot Generator</h1>
        </div>
    );
};

const StarWarsHomePage = withRouter(HomePage);
const StarWarsPlot = withRouter(Plot);

const App: FC = ({dispatch}: any) => {

    useEffect(() => {
       getMandatoryResourceNames()
           .forEach(name => dispatch(load(name, false)))
    });

    return (
        <>
            <Header/>
            <Router>
                <Route exact path="/" render={(props) => <StarWarsHomePage {...props}/>} />
                <Route path="/plot" component={StarWarsPlot}/>
            </Router>
        </>
    );
};

const ConnectedApp = connect()(App);
export { ConnectedApp as App };