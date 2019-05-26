import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, FormGroup, Label, Input, Form, Button, Container } from 'reactstrap';

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
        return (
            <div>
                <div className="text-center">
                    <h1>Star Wars Plot Generator</h1>
                </div>
                <Container>
                    <Form>
                        <Col>
                            <FormGroup size="lg" row>
                                <Label for="input-person" size="lg">Character</Label>
                                <Input
                                    id="input-person"
                                    name="input-person"
                                    placeholder="Please enter a character"
                                    bsSize="lg"
                                    onChange={e => this.handleOnPersonInputChange(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup size="lg" row>
                                <Label for="input-planet" size="lg">Planet</Label>
                                <Input
                                    id="input-planet"
                                    name="input-planet"
                                    placeholder="Please enter a planet"
                                    bsSize="lg"
                                    onChange={e => this.handleOnPlanetInputChange(e.target.value)} />
                            </FormGroup>
                        </Col>
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
