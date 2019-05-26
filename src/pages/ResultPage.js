import React, { Component } from 'react';
import { Col, Form, Button, Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Plot extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Form>
                        <Col>
                            <div className="text-center">
                                <h2>Header</h2>
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

const StarWarsPlot = withRouter(Plot);

export { StarWarsPlot };
