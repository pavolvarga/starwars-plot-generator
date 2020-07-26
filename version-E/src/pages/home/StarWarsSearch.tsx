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

/**
 * Using bootstraps class names is not working when passing down to the input used by the autosuggest component.
 * Therefore pass down inline styles
 */
function createInputBootstrapStyle(valid: boolean | undefined): Object {
    const style = {
        'height': "calc(1.5em + 1rem + 2px)",
        'padding': ".5rem 1rem",
        'font-size': "1.25rem",
        'line-height': "1.5",
        'border-radius': ".3rem"
    };
    const isValid = {
        'border-color': "#28a745",
        'padding-right': "calc(1.5em + .75rem)",
        'background-image': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\")",
        'background-repeat': "no-repeat",
        'background-position': "right calc(.375em + .1875rem) center",
        'background-size': "calc(.75em + .375rem) calc(.75em + .375rem)",
    };
    return valid ? Object.assign(style, isValid) : style;
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
            <input
                style={createInputBootstrapStyle(valid)}
                {...inputProps}
                id={id}
                name={name}
                disabled={disabled}
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
