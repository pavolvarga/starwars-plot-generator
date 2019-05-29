import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, FormGroup, Label, Input, Form, Button, Container } from 'reactstrap';

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

        this.setPerson = this.setPerson.bind(this);
        this.setPlanet = this.setPlanet.bind(this);
        this.setStarship = this.setStarship.bind(this);
        this.setVehicle = this.setVehicle.bind(this);
        this.setSpecies = this.setSpecies.bind(this);
        this.isGenerateBntDisabled = this.isGenerateBntDisabled.bind(this);
        this.handleOnGenerateBntClick = this.handleOnGenerateBntClick.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    setPerson(person) {
        this.setState((state) => ({
            selected: {...state.selected, person}
        }));
    }

    setPlanet(planet) {
        this.setState((state) => ({
            selected: {...state.selected, planet}
        }));
    }

    setStarship(starship) {
        this.setState((state) => ({
            selected: {...state.selected, starship}
        }));
    }

    setVehicle(vehicle) {
        this.setState((state) => ({
            selected: {...state.selected, vehicle}
        }));
    }

    setSpecies(species) {
        this.setState((state) => ({
            selected: {...state.selected, species}
        }));
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
            setFn: this.setPerson,
            visible: this.state.person.visible
        };
        const planetProps = {
            id: "input-planet",
            name: "input-planet",
            label: "Planet",
            placeholder: "Please enter a planet",
            data: planets,
            setFn: this.setPlanet,
            visible: this.state.planet.visible
        };
        const starshipProps = {
            id: "input-starship",
            name: "input-starship",
            label: "Starship",
            placeholder: "Please enter a starship",
            data: [],
            setFn: this.setStarship,
            visible: this.state.starship.visible
        };
        const vehicleProps = {
            id: "input-vehicle",
            name: "input-vehicle",
            label: "Vehicle",
            placeholder: "Please enter a vehicle",
            data: [],
            setFn: this.setVehicle,
            visible: this.state.vehicle.visible
        };
        const speciesProps = {
            id: "input-species",
            name: "input-species",
            label: "Species",
            placeholder: "Please enter a species",
            data: [],
            setFn: this.setSpecies,
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
                        <Col>
                            <div className="row add-space button-row-space">
                                <div className="col-sm-4">
                                    <Button
                                        color="secondary"
                                        size="lg"
                                        onClick={e => this.toggleVisibility('starship')}
                                    >
                                        Add Starship
                                    </Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button
                                        color="secondary"
                                        size="lg"
                                        onClick={e => this.toggleVisibility('vehicle')}
                                    >
                                        Add Vehicle
                                    </Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button
                                        color="secondary"
                                        size="lg"
                                        onClick={e => this.toggleVisibility('species')}
                                    >
                                        Add Species
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <GenerateBnt {...generateBntProps} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export { InputForm };
