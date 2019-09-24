import * as React from 'react';
import { Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { FC, MouseEvent } from "react";
import { Col, Form, FormGroup, Button, Container } from 'reactstrap';
import dompurify from 'dompurify';

import { generatePlot } from "./plotGenerator";

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

const Plot: FC<RouteComponentProps> = (props: RouteComponentProps) => {

    function generateNewPlot() {
        props.history.push('/');
    }

    //user has directly entered /plot in address bar - redirect him / her back to home page
    if (!props.history.location.state) {
        return <Redirect to={{pathname: '/'}} />
    }

    const
        inputs = props.history.location.state,
        data = Object.values(inputs).map((r: any) => r), //todo: get rid off any
        names = data.map(x => x ? x.name : undefined),
        resources = data.map(x => x ? x.url : undefined).filter(x => x);

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

export { Description, Title, ResourceLink, Resources, Plot };
