import React, { FC } from "react";
import { connect } from "react-redux";

import { Container, Form } from "reactstrap";
import {getOptionalResourceNames, RESOURCES} from "../../common/common";
import { StarWarsSearch, StarWarsSearchProps } from "./StarWarsSearch";
import { InputFormState, ResourceKey, Suggestion } from "../../common/types";
import {OptionalInputs} from "./OptionalInputs";

type InputFormProps = {
    mandatoryDataLoaded: boolean,
    persons: Suggestion[],
    planets: Suggestion[]
}

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

const InputForm: FC<InputFormProps> = (props: InputFormProps) => {

    const { mandatoryDataLoaded, persons, planets } = props;

    if (!mandatoryDataLoaded) {
        return null;
    }

    const personSearchInputProps = createSearchInputProps('person', true, persons, RESOURCES.person.label);
    const planetSearchInputProps = createSearchInputProps('planet', true, planets, RESOURCES.planet.label);

    return (
        <div>
            <Container>
                <Form>
                    <StarWarsSearch {...personSearchInputProps} />
                    <StarWarsSearch {...planetSearchInputProps} />
                    <OptionalInputs resourceNames={getOptionalResourceNames() }/>
                </Form>
            </Container>
        </div>
    )
};

function mapStateToProps(state: InputFormState) {
    const personsLoaded = !state.person.loadingInProgress && !state.person.loadFailed;
    const planetsLoaded = !state.planet.loadingInProgress && !state.planet.loadFailed;
    return {
        mandatoryDataLoaded: personsLoaded && planetsLoaded,
        persons: state.person.data,
        planets: state.planet.data
    };
}

const ConnectedInputForm = connect(mapStateToProps)(InputForm);
export { ConnectedInputForm as InputForm };
