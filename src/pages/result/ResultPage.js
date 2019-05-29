import React, { Component } from 'react';
import { Col, Form, Button, Container } from 'reactstrap';

class GenerateNewPlotBnt extends Component {

    render() {

        const {generateNewPlot} = this.props;

        return (
            <Col>
                <div className="text-center">
                    <Button color="primary" size="lg" onClick={e => generateNewPlot()}>Generate New Plot</Button>
                </div>
            </Col>
        );
    }
}

class Summary extends Component {

    render() {
        return (
            <Col>
                <div className="text-center">
                    <h2>Summary</h2>
                </div>
            </Col>
        );
    }
}

class Header extends Component {
    render() {
        const {person, planet, starship, vehicle, species} = this.props;
        return (
            <Col>
                <div className="text-center">
                    <h2>Header</h2>
                    <h4>{`${person.selected} and ${planet.selected} and ${starship.selected} and ${vehicle.selected} and ${species.selected}`}</h4>
                </div>
            </Col>
        );
    }
}

class Plot extends Component {

    constructor(props) {
        super(props);
        this.generateNewPlot = this.generateNewPlot.bind(this);
    }

    generateNewPlot() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Container>
                    <Form>
                        <Header {...this.props.history.location.state} />
                        <Summary />
                        <GenerateNewPlotBnt generateNewPlot={this.generateNewPlot} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export { Plot };
