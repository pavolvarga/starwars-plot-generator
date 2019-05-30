import React, { Component } from 'react';
import { Col, Form, Button, Container } from 'reactstrap';
import FormGroup from "reactstrap/es/FormGroup";
import { generatePlot } from "./PlogGenerator";

class GenerateNewPlotBnt extends Component {

    render() {

        const {generateNewPlot} = this.props;

        return (
            <Col>
                <div className="text-center result-space">
                    <Button color="primary" size="lg" onClick={e => generateNewPlot()}>Generate New Plot</Button>
                </div>
            </Col>
        );
    }
}

const Description = (props) => {
    return (
        <Col>
            <div className="text-center result-space">
                <h4>{props.description}</h4>
            </div>
        </Col>
    );
};

const Title = (props) => {
    return (
        <Col>
            <div className="text-center result-space">
                <h2>{props.title}</h2>
            </div>
        </Col>
    );
};

class Plot extends Component {

    constructor(props) {
        super(props);
        this.generateNewPlot = this.generateNewPlot.bind(this);
    }

    generateNewPlot() {
        this.props.history.push('/');
    }

    render() {

        const {title, description} = generatePlot({...this.props.history.location.state});

        return (
            <div>
                <Container>
                    <Form>
                        <FormGroup>
                            <Title title={title} />
                            <Description description={description}/>
                            <GenerateNewPlotBnt generateNewPlot={this.generateNewPlot} />
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}

//TODO: list used resources

export { Plot };
