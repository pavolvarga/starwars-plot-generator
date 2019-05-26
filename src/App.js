import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { InputForm } from './pages/HomePage';
import { Plot } from './pages/ResultPage';
import { loadStarWarsData } from './common/util';
import { RESOURCE_PEOPLE, RESOURCE_PLANETS } from './common/const';

const StarWarsForm = withRouter(InputForm);
const StarWarsPlot = withRouter(Plot);

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const resolve = (value) => console.log(value);
        const reject = (err) => console.error(err);

        loadStarWarsData(RESOURCE_PEOPLE, resolve, reject);
        loadStarWarsData(RESOURCE_PLANETS, resolve, reject);
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={StarWarsForm}/>
                <Route path="/plot" component={StarWarsPlot}/>
            </Router>
        );
    }
}

export default App;
