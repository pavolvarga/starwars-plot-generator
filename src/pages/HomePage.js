import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, FormGroup, Label, Input, Form, Button, Container } from 'reactstrap';
import { OPTIONAL_RESOURCES } from './../common/const';
import { loadStarWarsData } from './../common/util';

const OPTIONAL_RESOURCES_SINGULAR = OPTIONAL_RESOURCES.map(r => r.singular);

function getPluralName(singularName) {
    return OPTIONAL_RESOURCES.filter(r => r.singular === singularName)[0].plural;
}

class StarWarsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFromData: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value, data, setFn) {

        //ignore empty or too short text
        if (!value || value.length < 3) {
            this.setState(() => {
                return {selectedFromData: false}
            });
            setFn(undefined);
            return;
        }

        if (data.find(x => x === value)) {
            this.setState(() => {
                return {selectedFromData: true}
            });
            setFn(value);
        }
        else {
            this.setState(() => {
                return {selectedFromData: false}
            });
            setFn(undefined);
        }
    }

    render() {
        const {id, name, label, placeholder, data, setFn, visible} = this.props;

        if (!visible) {
            return null;
        }

        return (
            <Col>
                <FormGroup size="lg" row>
                    <Label for="input-person" size="lg">{label}</Label>
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        bsSize="lg"
                        valid={this.state.selectedFromData ? true : undefined}
                        onChange={e => this.handleOnChange(e.target.value, data, setFn)}
                        disabled={data.length === 0} />
                </FormGroup>
            </Col>
        );
    }
}

class GenerateBnt extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {isGenerateBntDisabled, handleOnGenerateBntClick} = this.props;

        return (
            <Col>
                <div className="text-center">
                    <Button
                        color="primary"
                        size="lg"
                        onClick={e => handleOnGenerateBntClick()}
                        disabled={isGenerateBntDisabled()}>
                        Generate Plot
                    </Button>
                </div>
            </Col>
        );
    }
}

class OptionalInputs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {visibles, toggleVisibilityFn} = this.props;
        return (
            <Col>
                <div className="row add-space button-row-space">
                    { OPTIONAL_RESOURCES_SINGULAR.map(
                        (resource, idx) => <OptionalInputBnt
                            name={resource}
                            toggleVisibilityFn={toggleVisibilityFn}
                            visible={visibles[idx]}
                        />
                    )}
                </div>
            </Col>
        )
    }
}

class OptionalInputBnt extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const
            {name, toggleVisibilityFn, visible} = this.props,
            text = visible ? `Remove ${name}` : `Add ${name}`;
        return (
            <div className="col-sm-4">
                <Button
                    color="secondary"
                    size="lg"
                    onClick={e => toggleVisibilityFn(name)}
                >
                    {text}
                </Button>
            </div>
        );
    }
}

class InputForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            person: {visible: true, selected: undefined, data: props.customProps.people, loadingInProgress: false},
            planet: {visible: true, selected: undefined, data: props.customProps.planets, loadingInProgress: false},
            starship: {visible: false, selected: undefined, data: [], loadingInProgress: false},
            vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false},
            species: {visible: false, selected: undefined, data: [], loadingInProgress: false}
        };

        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.isGenerateBntDisabled = this.isGenerateBntDisabled.bind(this);
        this.handleOnGenerateBntClick = this.handleOnGenerateBntClick.bind(this);
        this.loadResourceData = this.loadResourceData.bind(this);
    }

    isGenerateBntDisabled() {
        return !(!!this.state.person.selected && !!this.state.planet.selected);
    }

    handleOnGenerateBntClick() {
        const state = {
            person: this.state.selected.person,
            planet: this.state.selected.planet
        };
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
            resolveFn = (function storeOptionalResourceData(value) {

                const
                    resource = this.state[name],
                    obj = {},
                    updated = Object.assign(resource, {loadingInProgress: false, data: value});

                obj[name] = updated;
                this.setState(state => Object.assign(state, obj));

            }).bind(this),
            rejectFn = (err) => console.log(err);

        //TODO: improve redability of .bind(this) methods
        //TODO: in case of an error show some info also to user

        loadStarWarsData(resourcePlural, resolveFn, rejectFn);
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
            handleOnGenerateBntClick: this.handleOnGenerateBntClick
        };

        const optionalInputsProps = {
            toggleVisibilityFn: this.toggleVisibility,
            //an array with boolean values representing weather an input for an optional resource is visible or not
            visibles: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].visible)
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
                        <GenerateBnt {...generateBntProps} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export { InputForm };
