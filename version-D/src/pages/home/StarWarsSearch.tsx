import React, {ReactElement, FC, useContext, useState} from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import { Col, FormGroup, Label, Input } from 'reactstrap';

import { AppState, ResourceKey, Suggestion } from '../../common/types';

type Theme = {
    container: string,
    input: string,
    suggestionsContainer: string,
    suggestionsList: string,
    suggestionHighlighted: string
};
function createTheme(count: number): Theme {
    return {
        container: 'autosuggest',
        input: 'form-control',
        suggestionsContainer: 'dropdown',
        suggestionsList: `dropdown-menu ${count ? 'show' : ''}`,
        suggestionHighlighted: 'starwars-search__suggestion-highlighted'
    };
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Character
function escapeRegexCharacters(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion: Suggestion): string {
    return suggestion.name;
}

function renderSuggestion(suggestion: Suggestion): ReactElement {
    return (
        <span>{suggestion.name}</span>
    );
}

type AutosuggestProps = {
    placeholder: string
    value: string,
    onChange: (e: React.FormEvent<any>, p: ChangeEvent) => void
};
function renderInputComponent(id: string, name: string, disabled: boolean, valid: boolean | undefined): (ip: any) => ReactElement {
    //inputProps is provided by the Autosuggest component
    //see: https://github.com/moroshko/react-autosuggest#render-input-component-prop
    return (inputProps: any) => {
        return (
            <Input
                {...inputProps}
                id={id}
                name={name}
                disabled={disabled}
                valid={valid}
                bsSize="lg"
            />
        );
    }
}

export type StarWarsSearchProps = {
    resourceName: ResourceKey,
    id: string,
    name: string,
    label: string,
    placeholder: string,
    visible: boolean,
    data: Suggestion[],
};
type SuggestionFetchRequest = {
    value: string,
    reason: string
};

export const StarWarsSearch: FC<StarWarsSearchProps> = (props: StarWarsSearchProps) => {

    const { resourceName, id, name, label, placeholder, visible, data } = props;

    const
        [value, setValue] = useState(''),
        [suggestions, setSuggestions] = useState<Suggestion[]>([]),
        [selectedFromData, setSelectedFromData] = useState(false);

    if (!visible) {
        return null;
    }

    // function onChange(event: React.FormEvent<any>, {newValue}: ChangeEvent): void {
    //     setValue(newValue);
    //
    //     const foundIdx = resourceData.findIndex(el => el.name === newValue);
    //     if (foundIdx !== -1) {
    //         setSelectedFromData(true);
    //         const {name, url} = resourceData[foundIdx];
    //         setSelectedSuggestion(resourceName,{name, url});
    //     } else {
    //         setSelectedFromData(false);
    //         setSelectedSuggestion(resourceName, undefined);
    //     }
    // }

    function onChange(event: React.FormEvent<any>, { newValue }: ChangeEvent): void {
        return;
    }

    function onSuggestionsFetchRequested(fetchRequest: SuggestionFetchRequest): void {
        setSuggestions(getSuggestions(fetchRequest));
    }

    function onSuggestionsClearRequested(): void {
        setSuggestions([]);
    }

    function getSuggestions({value, reason}: SuggestionFetchRequest): Suggestion[] {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return data
            .filter(x => regex.test(x.name))
            .map(({name, url}) => ({name, url}));
    }

    const autosuggestInputProps: AutosuggestProps = {placeholder, value, onChange};

    const
        disabled = data.length === 0,
        valid = selectedFromData ? true : undefined;

    return (
        <Col>
            <FormGroup>
                <Label for="input-person" size="lg">{label}</Label>
                <Autosuggest
                    id={id}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={autosuggestInputProps}
                    theme={createTheme(data.length)}
                    renderInputComponent={renderInputComponent(id, name, disabled, valid)}
                />
            </FormGroup>
        </Col>
    );
};
