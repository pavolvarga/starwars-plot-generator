import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { Spinner, Alert } from 'reactstrap';
import { InputForm } from './pages/home/HomePage';
import { Plot } from './pages/result/ResultPage';
import { loadStarWarsData } from './common/util';
import { RESOURCES } from './common/const';

const StarWarsForm = withRouter(InputForm);
const StarWarsPlot = withRouter(Plot);

function Header() {
    return (
        <div className="text-center">
            <h1>Star Wars Plot Generator</h1>
        </div>
    );
}

function Loader() {
    return (
        <div className="text-center">
            <h3>Please wait while star wars data is being loaded</h3>
            <Spinner style={{ width: '5rem', height: '5rem' }} />{' '}
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
            },
            peopleLoadEndedInError: false,
            planetsLoadEndedInError: false
        };
        this.setPeople = this.setPeople.bind(this);
        this.setPlanets = this.setPlanets.bind(this);
        this.isLoadedInitialData = this.isLoadedInitialData.bind(this);
        this.handlePeopleLoadError = this.handlePeopleLoadError.bind(this);
        this.handlePlanetsLoadError = this.handlePlanetsLoadError.bind(this);
    }

    setPeople(people) {
        this.setState((state) => ({
            ...state,
            data: {...state.data, people}
        }));
    }

    setPlanets(planets) {
        this.setState((state) => ({
            ...state,
            data: {...state.data, planets}
        }));
    }

    handlePeopleLoadError(err) {
        console.log('Initial loading of people has failed', err);
        this.setState((state) => ({
            ...state,
            peopleLoadEndedInError: true
        }));
    }

    handlePlanetsLoadError(err) {
        console.log('Initial loading of planets has failed', err);
        this.setState((state) => ({
            ...state,
            planetsLoadEndedInError: true
        }));
    }

    componentDidMount() {
        loadStarWarsData(RESOURCES.PEOPLE.plural, this.setPeople, this.handlePeopleLoadError);
        loadStarWarsData(RESOURCES.PLANETS.plural, this.setPlanets, this.handlePlanetsLoadError);
    }

    isLoadedInitialData() {
        return this.state.data.people.length > 0 && this.state.data.planets.length > 0;
    }

    render() {
        if (!this.state.peopleLoadEndedInError && !this.state.planetsLoadEndedInError && !this.isLoadedInitialData()) {
            return (
                <div>
                    <Header/>
                    <Loader/>
                </div>
            );
        }
        else if (this.state.peopleLoadEndedInError || this.state.planetsLoadEndedInError) {
            return (
                <div>
                    <Header/>
                    <div className="text-center">
                        <Alert color="danger">
                            Loading of initial data failed, please try again later.
                        </Alert>
                    </div>
                </div>
            );
        }
        else {
            const customProps = {...this.state.data};
            return (
                <div>
                    <Header/>
                    <Router>
                        <Route exact path="/" render={(props) => <StarWarsForm {...props} customProps={customProps}/>} />
                        <Route path="/plot" component={StarWarsPlot}/>
                    </Router>
                </div>

            );
        }
    }
}

export default App;
