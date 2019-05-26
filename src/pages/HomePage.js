import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, FormGroup, Label, Input, Form, Button, Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class InputForm extends Component {

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
                                <Input id="input-person" name="input-person" placeholder="Please enter a character" size="lg"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup size="lg" row>
                                <Label for="input-planet" size="lg">Character</Label>
                                <Input id="input-planet" name="input-planet" placeholder="Please enter a planet" size="lg"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <Button color="primary" size="lg" onClick={e => this.props.history.push('/plot')}>Generate Plot</Button>
                            </div>
                        </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}

const StarWarsForm = withRouter(InputForm);

export { StarWarsForm };
