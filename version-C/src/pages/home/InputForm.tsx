import React, { FC, useContext } from 'react';
import { Container, Form } from "reactstrap";

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";
import { StarWarsSearch, StarWarsSearchProps } from "./StarWarsSearch";

function upperCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function createSearchInputProps(name: string, visible: boolean, label?: string): StarWarsSearchProps {

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

export const InputForm: FC = () => {

    const
        context = useContext(AppContext),
        {isLoadedMandatoryData, isVisible} = (context as AppState);

    if (!isLoadedMandatoryData()) {
        return null;
    }

    //todo: make this dynamic - iterate over mandatory and then over optional resources

    const
        personProps = createSearchInputProps('person', isVisible('person'), 'character'),
        planetProps = createSearchInputProps('planet', isVisible('planet')),
        starshipProps = createSearchInputProps('starship', isVisible('starship')),
        vehicleProps = createSearchInputProps('vehicle', isVisible('vehicle')),
        speciesProps = createSearchInputProps('species', isVisible('species'));

    return (
        <div>
            <Container>
                <Form>
                    <StarWarsSearch {...personProps} />
                    <StarWarsSearch {...planetProps} />
                    <StarWarsSearch {...starshipProps} />
                    <StarWarsSearch {...vehicleProps} />
                    <StarWarsSearch {...speciesProps} />
                </Form>
            </Container>
        </div>
    )
};