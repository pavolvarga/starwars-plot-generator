import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Form, Container } from 'reactstrap';
import { loadStarWarsData } from './../../common/util';
import { StarWarsInput } from "./StarWarsInput";
import { GenerateBnt } from "./GenerateBnt";
import { OptionalInputs } from "./OptionalInputs";
import { OPTIONAL_RESOURCES, FAILED_LOAD_COOL_DOWN } from './../../common/const';
import { LoadFailedAlerts } from './LoadFailedAlerts';

const OPTIONAL_RESOURCES_SINGULAR = OPTIONAL_RESOURCES.map(r => r.singular);

function getPluralName(singularName) {
    return OPTIONAL_RESOURCES.filter(r => r.singular === singularName)[0].plural;
}

class InputForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            person: {visible: true, selected: undefined, data: props.customProps.people, loadingInProgress: false, loadFailed: false},
            planet: {visible: true, selected: undefined, data: props.customProps.planets, loadingInProgress: false, loadFailed: false},
            starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
            vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
            species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
        };

        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.isGenerateBntDisabled = this.isGenerateBntDisabled.bind(this);
        this.generatePlot = this.generatePlot.bind(this);
        this.loadResourceData = this.loadResourceData.bind(this);
    }

    isGenerateBntDisabled() {
        return !(!!this.state.person.selected && !!this.state.planet.selected);
    }

    generatePlot() {
        const state = {};
        Object.keys(this.state).forEach(key => {
            state[key] = {visible: this.state[key].visible, selected: this.state[key].selected};
        });
        this.props.history.push({
            pathname: '/plot',
            state
        });
    }

    setSelectedValue(name, value) {
        const
            resource = this.state[name],
            updated = Object.assign(resource, {selected: value}),
            obj = {};

        obj[name] = updated;
        this.setState(state => Object.assign(state, obj));
    }

    loadResourceData(name) {
        const
            resourcePlural = getPluralName(name),
            resolve = (function storeOptionalResourceData(value) {

                const
                    resource = this.state[name],
                    obj = {},
                    updated = Object.assign(resource, {loadingInProgress: false, data: value});

                obj[name] = updated;
                this.setState(state => Object.assign(state, obj));

            }).bind(this),
            reject = (function updateLoadFailed (err) {
                const
                    resource = this.state[name],
                    obj = {},
                    updated = Object.assign(resource, {loadFailed: true, loadingInProgress: false});

                obj[name] = updated;
                this.setState(state => Object.assign(state, obj));

                //clear alert after specified time, and allow user to try it again
                setTimeout(function clearLoadFailed() {
                    const cleared = Object.assign(resource, {visible: false, loadFailed: false});
                    obj[name] = cleared;
                    this.setState(state => Object.assign(state, obj));
                }.bind(this), FAILED_LOAD_COOL_DOWN * 1000);

            }).bind(this);

        loadStarWarsData(resourcePlural, resolve, reject);
    }

    toggleVisibility(name) {

        const
            resource = this.state[name],
            obj = {};

        let updated = Object.assign(resource, {visible: !resource.visible});

        //load data for the input in other function, after the input became visible
        //if it wasn't already loaded
        if(!this.state[name].loadingInProgress && this.state[name].data.length === 0) {
            updated = Object.assign(updated, {loadingInProgress: true});
            setTimeout(() => this.loadResourceData(name), 1);
        }

        obj[name] = updated;
        this.setState(state => Object.assign(state, obj));
    }

    render() {

        const personProps = {
            id: "input-person",
            name: "input-person",
            label: "Character",
            placeholder: "Please enter a character",
            data: this.state.person.data,
            setFn: (function setPerson(value) {
                this.setSelectedValue('person', value);
            }).bind(this),
            visible: this.state.person.visible
        };
        const planetProps = {
            id: "input-planet",
            name: "input-planet",
            label: "Planet",
            placeholder: "Please enter a planet",
            data: this.state.planet.data,
            setFn: (function setPlanet(value) {
                this.setSelectedValue('planet', value);
            }).bind(this),
            visible: this.state.planet.visible
        };
        const starshipProps = {
            id: "input-starship",
            name: "input-starship",
            label: "Starship",
            placeholder: "Please enter a starship",
            data: this.state.starship.data,
            setFn: (function setStarship(value) {
                this.setSelectedValue('starship', value);
            }).bind(this),
            visible: this.state.starship.visible
        };
        const vehicleProps = {
            id: "input-vehicle",
            name: "input-vehicle",
            label: "Vehicle",
            placeholder: "Please enter a vehicle",
            data: this.state.vehicle.data,
            setFn: (function setVehicle(value) {
                this.setSelectedValue('vehicle', value);
            }).bind(this),
            visible: this.state.vehicle.visible
        };
        const speciesProps = {
            id: "input-species",
            name: "input-species",
            label: "Species",
            placeholder: "Please enter a species",
            data: this.state.species.data,
            setFn: (function setSpecies(value) {
                this.setSelectedValue('species', value);
            }).bind(this),
            visible: this.state.species.visible
        };

        const generateBntProps = {
            isGenerateBntDisabled: this.isGenerateBntDisabled,
            generatePlot: this.generatePlot
        };

        const optionalInputsProps = {
            toggleVisibilityFn: this.toggleVisibility,
            //an array with boolean values representing weather an input for an optional resource is visible or not
            visibles: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].visible),
            //an array with boolean values representing weather the load button is disabled
            disabled: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].loadFailed)
        };

        const alertsProps = {
            visibles: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].loadFailed)
        };

        return (
            <div>
                <Container>
                    <Form>
                        <StarWarsInput {...personProps} />
                        <StarWarsInput {...planetProps} />
                        <StarWarsInput {...starshipProps} />
                        <StarWarsInput {...vehicleProps} />
                        <StarWarsInput {...speciesProps} />
                        <OptionalInputs {...optionalInputsProps} />
                        <LoadFailedAlerts {...alertsProps} />
                        <GenerateBnt {...generateBntProps} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export { InputForm };
