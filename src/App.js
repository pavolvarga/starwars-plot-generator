import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { InputForm } from './pages/HomePage';
import { Plot } from './pages/ResultPage';
import { loadStarWarsData } from './common/util';
import { RESOURCE_PEOPLE, RESOURCE_PLANETS } from './common/const';

const StarWarsForm = withRouter(InputForm);
const StarWarsPlot = withRouter(Plot);

function Header() {
    return (
        <div className="text-center">
            <h1>Star Wars Plot Generator</h1>
        </div>
    );
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                people: [],
                planets: []
            }
        };
        this.setPeople = this.setPeople.bind(this);
        this.setPlanets = this.setPlanets.bind(this);
        this.loadedInitialData = this.loadedInitialData.bind(this);
    }

    setPeople(people) {
        this.setState((state) => ({
            data: {...state.data, people}
        }));
    }

    setPlanets(planets) {
        this.setState((state) => ({
            data: {...state.data, planets}
        }));
    }

    componentDidMount() {
        const reject = (err) => console.error(err);

        loadStarWarsData(RESOURCE_PEOPLE, this.setPeople, reject);
        loadStarWarsData(RESOURCE_PLANETS, this.setPlanets, reject);
    }

    loadedInitialData() {
        return this.state.data.people.length > 0 && this.state.data.planets.length > 0;
    }

    render() {
        if (!this.loadedInitialData()) {
            return (
                <div>
                    <Header/>
                    <div className="text-center">
                        <h3>Please wait while star wars data are being loaded</h3>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Header/>
                <Router>
                    <Route exact path="/" component={StarWarsForm}/>
                    <Route path="/plot" component={StarWarsPlot}/>
                </Router>
            </div>

        );
    }
}

export default App;
