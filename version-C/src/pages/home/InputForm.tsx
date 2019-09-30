import React, { FC, useContext } from 'react';
import { Container, Form } from "reactstrap";
import { RouteComponentProps } from "react-router";

import { AppContext } from "../../AppContext";
import { AppState, ResourceKey } from "../../common/types";
import { StarWarsSearch, StarWarsSearchProps } from "./StarWarsSearch";
import { OptionalInputs } from "./OptionalInputs";
import { GenerateBnt } from "./GenerateBnt";
import { LoadFailedAlerts } from "./LoadFailedAlerts";
import { getResourceNames, RESOURCES } from "../../common/const";

function upperCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function createSearchInputProps(name: ResourceKey, visible: boolean, label?: string): StarWarsSearchProps {

    const
        normalizedLabel = label ? label : name,
        upperCasedLabel = upperCase(normalizedLabel);

    return {
        resourceName: name,
        id: `input-${name}`,
        name: `input-${name}`,
        label: upperCasedLabel,
        placeholder: `Please enter a ${normalizedLabel}`,
        visible
    };
}

export const InputForm: FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const
        context = useContext(AppContext),
        {isLoadedMandatoryData, isVisible, getSelectedSuggestions} = (context as AppState);

    function generatePlot() {
        const selectedSuggestions = getSelectedSuggestions();
        props.history.push({
            pathname: '/plot',
            state: selectedSuggestions
        });
    }

    if (!isLoadedMandatoryData()) {
        return null;
    }

    const
        resourceNames = getResourceNames(),
        searchInputProps = resourceNames.map(n => createSearchInputProps(n, isVisible(n), RESOURCES[n].label));

    return (
        <div>
            <Container>
                <Form>
                    {
                        searchInputProps.map((p, idx) => <StarWarsSearch key={idx} {...p} />)
                    }
                    <OptionalInputs />
                    <LoadFailedAlerts />
                    <GenerateBnt generatePlot={generatePlot} />
                </Form>
            </Container>
        </div>
    )
};