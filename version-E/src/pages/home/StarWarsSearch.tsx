import React, { ReactElement, FC, useState } from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import { connect } from 'react-redux';

import { ResourceKey, Suggestion } from '../../common/types';
import { setSelected } from "../../actions/actions";

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

    // for what ever reason the class name is not passed down, therefore styles representing form-control-lg
    // are passed directly
    const style = {
        'height': "calc(1.5em + 1rem + 2px)",
        'padding': ".5rem 1rem",
        'font-size': "1.25rem",
        'line-height': "1.5",
        'border-radius': ".3rem"
    };
    return (inputProps: any) => {
        return (
            <input
                style={style}
                {...inputProps}
                id={id}
                name={name}
                disabled={disabled}
                // valid={valid} todo: fix
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

const StarWarsSearch: FC<StarWarsSearchProps & {setSelected: any}> = (props: StarWarsSearchProps & {setSelected: any}) => {

    const { setSelected, resourceName, id, name, label, placeholder, visible, data } = props;

    const
        [value, setValue] = useState(''),
        [suggestions, setSuggestions] = useState<Suggestion[]>([]),
        [selectedFromData, setSelectedFromData] = useState(false);

    if (!visible) {
        return null;
    }

    function onChange(event: React.FormEvent<any>, {newValue}: ChangeEvent): void {
        setValue(newValue);

        const foundIdx = data.findIndex(el => el.name === newValue);
        if (foundIdx !== -1) {
            setSelectedFromData(true);
            setSelected(resourceName, data[foundIdx]);
        } else {
            setSelectedFromData(false);
            setSelected(resourceName, undefined);
        }
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
        valid = selectedFromData ? true : undefined,
        htmlFor = `input-${label.toLowerCase()}`;

    return (
        <div className="form-group">
            <label htmlFor={htmlFor} className="col-form-label-lg">{label}</label>
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
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSelected: (resourceName: string, suggestion: Suggestion) => dispatch(setSelected(resourceName, suggestion))
    };
}

const StarWarsSearchConnected = connect(null, mapDispatchToProps)(StarWarsSearch);
export { StarWarsSearchConnected as StarWarsSearch };
