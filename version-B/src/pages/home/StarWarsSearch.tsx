import React from 'react';
import Autosuggest from 'react-autosuggest';
import {Col, FormGroup, Label, Input} from "reactstrap";

//todo: what type does a jsx element have ?
//todo: what type is a suggestion ?

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

function getSuggestionValue(suggestion: any): string {
    return suggestion.name;
}

function renderSuggestion(suggestion: any): any {
    return (
        <span>{suggestion.name}</span>
    );
}

type InputPropsType = {
    placeholder: string
    value: any,
    onChange: any

};
function renderInputComponent(inputProps: InputPropsType, id: string, name: string, disabled: boolean, valid: boolean | undefined): any {
    return (inputProps: InputPropsType) => (
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

type StarWarsSearchState = {
    value: string,
    suggestions: any[],
    selectedFromData: boolean
};
type StarWarsSearchProps = {
    id: string,
    name: string,
    label: string,
    placeholder: string,
    data: any,
    setFn: any,
    visible: boolean
};
class StarWarsSearch extends React.Component<StarWarsSearchProps, StarWarsSearchState> {
    private data: any[];
    private setFn: (data: any | undefined) => void;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            selectedFromData: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.data = [];
        this.setFn = () => {};
    }

    onChange(event, {newValue}) {
        this.setState({
            value: newValue
        });

        const foundIdx = this.data.findIndex(el => el.name === newValue);
        if (foundIdx !== -1) {
            this.setState(() => {
                return {selectedFromData: true}
            });
            this.setFn(this.data[foundIdx]);
        } else {
            this.setState(() => {
                return {selectedFromData: false}
            });
            this.setFn(undefined);
        }
    }

    onSuggestionsFetchRequested(value) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    getSuggestions({value}) {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.data.filter(x => regex.test(x.name));
    }

    render() {

        const {id, name, label, placeholder, data, setFn, visible} = this.props;

        this.data = data;
        this.setFn = setFn;

        if (!visible) {
            return null;
        }

        const inputProps: InputPropsType = {
            placeholder,
            value: this.state.value,
            onChange: this.onChange
        };

        const
            disabled = this.data.length === 0,
            valid = this.state.selectedFromData ? true : undefined;

        return (
            <Col>
                <FormGroup>
                    <Label for="input-person" size="lg">{label}</Label>
                    <Autosuggest
                        id={id}
                        name={name}
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        theme={createTheme(this.data.length)}
                        renderInputComponent={renderInputComponent(inputProps, id, name, disabled, valid)}
                    />
                </FormGroup>
            </Col>
        );
    }
}

export { StarWarsSearch };
