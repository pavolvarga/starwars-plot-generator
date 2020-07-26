import React, {FC, useEffect} from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { HomePage } from "./pages/home/HomePage";
import { Plot } from "./pages/result/ResultPage";
import { getMandatoryResourceNames } from "./common/common";
import { load } from "./actions/actions";

const Header: FC = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <h1>Star Wars Plot Generator</h1>
            </div>
        </div>
    );
};

const StarWarsHomePage = withRouter(HomePage);
const StarWarsPlot = withRouter(Plot);

const App: FC = ({load}: any) => {

    useEffect(() => {
       getMandatoryResourceNames()
           .forEach(name => load(name, false))
    });

    return (
        <div className="container-lg text-center">
            <Header/>
            <Router>
                <Route exact path="/" render={(props) => <StarWarsHomePage {...props}/>} />
                <Route path="/plot" component={StarWarsPlot}/>
            </Router>

        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        load: (name: string, clearAfterFailure: boolean) => dispatch(load(name, clearAfterFailure))
    };
}

const ConnectedApp = connect(null, mapDispatchToProps)(App);
export { ConnectedApp as App };