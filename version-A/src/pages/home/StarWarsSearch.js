import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {Col, FormGroup, Label, Input} from "reactstrap";

function createTheme(count) {
    return {
        container: 'autosuggest',
        input: 'form-control',
        suggestionsContainer: 'dropdown',
        suggestionsList: `dropdown-menu ${count ? 'show' : ''}`,
        suggestionHighlighted: 'starwars-search__suggestion-highlighted'
    };
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

function renderInputComponent(inputProps, id, name, disabled, valid) {
    return (inputProps) => (
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

class StarWarsSearch extends Component {

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

        const inputProps = {
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
