import React, { Component } from 'react';
import { Col, Form, Button, Container } from 'reactstrap';

class Plot extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {person, planet} = this.props.history.location.state;

        return (
            <div>
                <Container>
                    <Form>
                        <Col>
                            <div className="text-center">
                                <h2>Header</h2>
                                <h4>{`${person} and ${planet}`}</h4>
                            </div>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <h2>Summary</h2>
                            </div>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <Button color="primary" size="lg" onClick={e => this.props.history.push('/')}>Generate New Plot</Button>
                            </div>
                        </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}

export { Plot };
