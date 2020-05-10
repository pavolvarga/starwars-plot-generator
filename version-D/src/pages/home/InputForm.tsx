import React, { FC } from "react";
import { connect } from "react-redux";
import { Container, Form } from "reactstrap";
import { RouteComponentProps } from "react-router";

import { getMandatoryResourceNames, getOptionalResourceNames, getResourceNames, RESOURCES } from "../../common/common";
import { StarWarsSearch, StarWarsSearchProps } from "./StarWarsSearch";
import { InputFormState, ResourceKey, SelectedSuggestions, Suggestion } from "../../common/types";
import { OptionalInputs } from "./OptionalInputs";
import { LoadFailedAlerts } from "./LoadFailedAlerts";
import { GenerateBnt } from "./GenerateBnt";

function upperCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function createSearchInputProps(name: ResourceKey, visible: boolean, data: Suggestion[], label?: string): StarWarsSearchProps {

    const
        normalizedLabel = label ? label : name,
        upperCasedLabel = upperCase(normalizedLabel);

    return {
        resourceName: name,
        id: `input-${name}`,
        name: `input-${name}`,
        label: upperCasedLabel,
        placeholder: `Please enter a ${normalizedLabel}`,
        visible,
        data
    };
}

type InputFormProps = {
    mandatoryDataLoaded: boolean,
    resources: any,
    selectedSuggestions: SelectedSuggestions
}
const InputForm: FC<InputFormProps & RouteComponentProps> = (props: InputFormProps & RouteComponentProps) => {

    const { mandatoryDataLoaded, resources, selectedSuggestions } = props;

    if (!mandatoryDataLoaded) {
        return null;
    }

    function generatePlot() {
        props.history.push({
            pathname: '/plot',
            state: selectedSuggestions
        });
    }

    const searchInputProps = getResourceNames().map((name) => {
        return createSearchInputProps(name, resources[name].visible, resources[name].data, RESOURCES[name].label);
    })

    return (
        <div>
            <Container>
                <Form>
                    {
                        searchInputProps.map((p, idx) => <StarWarsSearch key={idx} {...p} />)
                    }
                    <OptionalInputs resourceNames={getOptionalResourceNames() }/>
                    <LoadFailedAlerts />
                    <GenerateBnt generatePlot={generatePlot} />
                </Form>
            </Container>
        </div>
    )
};

function mapStateToProps(state: InputFormState) {
    const mandatoryDataLoaded = getMandatoryResourceNames().reduce((acc, name) => {
        return acc && !state[name].loadingInProgress && !state[name].loadFailed;
    }, true);
    const resources = getResourceNames().reduce((acc: any, name: ResourceKey) => {
        acc[name] = {
            data: state[name].data,
            visible: state[name].visible
        }
        return acc;
    }, {});
    const selectedSuggestions: SelectedSuggestions = {};
    Object.keys(state).forEach(key  => {
        selectedSuggestions[key] = state[key as ResourceKey].selected;
    });
    return {
        mandatoryDataLoaded,
        resources,
        selectedSuggestions
    };
}

const ConnectedInputForm = connect(mapStateToProps)(InputForm);
export { ConnectedInputForm as InputForm };
