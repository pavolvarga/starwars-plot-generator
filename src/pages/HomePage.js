import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, FormGroup, Label, Input, Form, Button, Container } from 'reactstrap';

class StarWarsInput extends Component {

    render() {
        const {id, name, label, placeholder} = this.props;
        return (
            <Col>
                <FormGroup size="lg" row>
                    <Label for="input-person" size="lg">{label}</Label>
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        bsSize="lg"
                        onChange={e => this.handleOnPersonInputChange(e.target.value)} />
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

        this.handleOnPersonInputChange = this.handleOnPersonInputChange.bind(this);
        this.handleOnPlanetInputChange = this.handleOnPlanetInputChange.bind(this);
        this.handleOnGenerateBntClick = this.handleOnGenerateBntClick.bind(this);
    }

    handleOnPersonInputChange(person) {
        this.setState((state) => ({
            selected: {...state.selected, person}
        }));
    }

    handleOnPlanetInputChange(planet) {
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

        const personProps = {
            id: "input-person",
            name: "input-person",
            label: "Character",
            placeholder: "Please enter a character"
        };
        const planetProps = {
            id: "input-planet",
            name: "input-planet",
            label: "Planet",
            placeholder: "Please enter a planet"
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
