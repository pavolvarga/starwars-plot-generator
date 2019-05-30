import React, { Component } from 'react';
import { Col, Form, FormGroup, Button, Container } from 'reactstrap';
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

const ResourceLink = (props) => {
    return (
        <li key={props}>
            <a href={props.url}>{props.url}</a>
        </li>
    );
};

const Resources = (props) => {
    return (
        <Col>
            <div className="text-center result-space">
                <h3>Used resources</h3>
                <ul className="used-resources">
                    {props.resources.map((url, idx) => <ResourceLink key={idx} url={url}/>)}
                </ul>
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

        const
            inputs = this.props.history.location.state,
            data = Object
                .values(inputs)
                .map(r => r.selected)
                .filter(x => x),
            names = data.map(x => x.name),
            resources = data.map(x => x.url);

        const {title, description} = generatePlot({...names});

        return (
            <div>
                <Container>
                    <Form>
                        <FormGroup>
                            <Title title={title} />
                            <Description description={description}/>
                            <Resources resources={resources} />
                            <GenerateNewPlotBnt generateNewPlot={this.generateNewPlot} />
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}

export { Description, Title, ResourceLink, Resources, Plot };
