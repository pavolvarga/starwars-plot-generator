import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarWarsForm } from './pages/HomePage';
import { StarWarsPlot } from './pages/ResultPage';

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
