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
        const {id, name, label, placeholder, data, setFn} = this.props;
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

class InputForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
           selected: {
               person: undefined,
               planet: undefined
           }
        };

        this.setPerson = this.setPerson.bind(this);
        this.setPlanet = this.setPlanet.bind(this);
        this.handleOnGenerateBntClick = this.handleOnGenerateBntClick.bind(this);
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

    isGenerateBntDisabled() {
        return !(!!this.state.selected.person && !!this.state.selected.planet);
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

    render() {

        const {people, planets} = this.props.customProps;
        const personProps = {
            id: "input-person",
            name: "input-person",
            label: "Character",
            placeholder: "Please enter a character",
            data: people,
            setFn: this.setPerson
        };
        const planetProps = {
            id: "input-planet",
            name: "input-planet",
            label: "Planet",
            placeholder: "Please enter a planet",
            data: planets,
            setFn: this.setPlanet
        };

        return (
            <div>
                <Container>
                    <Form>
                        <StarWarsInput {...personProps} />
                        <StarWarsInput {...planetProps} />
                        <Col>
                            <div className="text-center">
                                <Button
                                    color="primary"
                                    size="lg"
                                    onClick={e => this.handleOnGenerateBntClick()}
                                    disabled={this.isGenerateBntDisabled()}>
                                    Generate Plot
                                </Button>
                            </div>
                        </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}

export { InputForm };
