import React from 'react';
import { Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { FC, MouseEvent } from "react";
import { Col, Form, FormGroup, Button, Container } from 'reactstrap';
import dompurify from 'dompurify';
import { connect } from "react-redux";

import { generatePlot } from "./plotGenerator";
import { Suggestion } from "../../common/types";
import { resetSelected } from "../../actions/actions";

type GenerateNewPlotBntProps = {
    generateNewPlot: () => void
};
const GenerateNewPlotBnt: FC<GenerateNewPlotBntProps> = (props: GenerateNewPlotBntProps) => {
    const {generateNewPlot} = props;
    return (
        <Col>
            <div className="text-center result-space">
                <Button color="primary" size="lg" onClick={(e: MouseEvent) => generateNewPlot()}>Generate New Plot</Button>
            </div>
        </Col>
    );
};

type DescriptionProps = {
   description: string
};
const Description: FC<DescriptionProps> = (props: DescriptionProps) => {
    const
        sanitizer = dompurify.sanitize,
        sanitizedMarkup = sanitizer(props.description),
        markup = {__html: sanitizedMarkup};
    return (
        <Col>
            <div className="text-center result-space">
                <p className="plot-text">
                    <span dangerouslySetInnerHTML={markup}/>
                </p>
            </div>
        </Col>
    );
};

type TitleProps = {
    title: string
};
const Title: FC<TitleProps> = (props: TitleProps) => {
    return (
        <Col>
            <div className="text-center result-space">
                <h2>{props.title}</h2>
            </div>
        </Col>
    );
};

type ResourceLinkProps = {
    url: string
};
const ResourceLink: FC<ResourceLinkProps> = (props: ResourceLinkProps) => {
    return (
        <li>
            <a href={props.url}>{props.url}</a>
        </li>
    );
};

type ResourcesProps = {
   resources: string[]
};
const Resources: FC<ResourcesProps> = (props: ResourcesProps) => {
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

type PlotProps = {
    resetSelected: any
}
const Plot: FC<RouteComponentProps & PlotProps> = (props: RouteComponentProps & PlotProps) => {

    const { resetSelected } = props;

    //user has directly entered /plot in address bar - redirect him / her back to home page
    if (!props.history.location.state) {
        return <Redirect to={{pathname: '/'}} />
    }

    function generateNewPlot() {
        resetSelected();
        props.history.push('/');
    }

    const
        inputs = props.history.location.state,
        data = (Object.values(inputs).filter(x => x) as Suggestion[]),
        names = data.map(x => x.name),
        resources = data.map(x => x.url);

    const {title, description} = generatePlot(...(names as [string, string, string?, string?, string?]));

    return (
        <div>
            <Container>
                <Form>
                    <FormGroup>
                        <Title title={title} />
                        <Description description={description}/>
                        <Resources resources={resources} />
                        <GenerateNewPlotBnt generateNewPlot={generateNewPlot} />
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetSelected: () => dispatch(resetSelected())
    };
}

const ConnectedPlot = connect(null, mapDispatchToProps)(Plot);
export { ConnectedPlot as Plot };
