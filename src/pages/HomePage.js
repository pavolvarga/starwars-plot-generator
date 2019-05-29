import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, FormGroup, Label, Input, Form, Button, Container } from 'reactstrap';

const OPTIONAL_RESOURCES = ['starship', 'vehicle', 'species'];

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
                        onChange={e => this.handleOnChange(e.target.value, data, setFn)} />
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
        const {toggleVisibilityFn} = this.props;
        return (
            <Col>
                <div className="row add-space button-row-space">
                    { OPTIONAL_RESOURCES.map(
                        name => <OptionalInputBnt name={name} toggleVisibilityFn={toggleVisibilityFn}/>
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
        const {name, toggleVisibilityFn} = this.props;
        return (
            <div className="col-sm-4">
                <Button
                    color="secondary"
                    size="lg"
                    onClick={e => toggleVisibilityFn(name)}
                >
                    Add Starship
                </Button>
            </div>
        );
    }
}

class InputForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            person: {visible: true, selected: undefined},
            planet: {visible: true, selected: undefined},
            starship: {visible: false, selected: undefined},
            vehicle: {visible: false, selected: undefined},
            species: {visible: false, selected: undefined}
        };

        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.isGenerateBntDisabled = this.isGenerateBntDisabled.bind(this);
        this.handleOnGenerateBntClick = this.handleOnGenerateBntClick.bind(this);
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
            updated = Object.assign(resource, {selected: value});
        this.setState(state => Object.assign(state, updated));
    }

    toggleVisibility(name) {
        const
            resource = this.state[name],
            toggled = Object.assign(resource, {visible: !resource.visible});
        this.setState(state => Object.assign(state, toggled));
    }

    render() {

        const {people, planets} = this.props.customProps;
        const personProps = {
            id: "input-person",
            name: "input-person",
            label: "Character",
            placeholder: "Please enter a character",
            data: people,
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
            data: planets,
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
            data: [],
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
            data: [],
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
            data: [],
            setFn: (function setSpecies(value) {
                this.setSelectedValue('species', value);
            }).bind(this),
            visible: this.state.species.visible
        };

        const generateBntProps = {
            isGenerateBntDisabled: this.isGenerateBntDisabled,
            handleOnGenerateBntClick: this.handleOnGenerateBntClick
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
                        <OptionalInputs toggleVisibilityFn={this.toggleVisibility} />
                        <GenerateBnt {...generateBntProps} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export { InputForm };
