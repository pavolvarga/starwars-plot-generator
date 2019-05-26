import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { InputForm } from './pages/HomePage';
import { Plot } from './pages/ResultPage';

const StarWarsForm = withRouter(InputForm);
const StarWarsPlot = withRouter(Plot);

class App extends Component {

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
