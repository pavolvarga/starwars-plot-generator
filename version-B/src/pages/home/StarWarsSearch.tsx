import React, {ReactElement, SyntheticEvent, Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {Col, FormGroup, Label, Input} from "reactstrap";

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

export type Suggestion = {
    name: string,
    type: string
}
function getSuggestionValue(suggestion: Suggestion): string {
    return suggestion.name;
}

function renderSuggestion(suggestion: Suggestion): ReactElement {
    return (
        <span>{suggestion.name}</span>
    );
}

type OnChangePayload = {
    newValue: string
    type: string
}
type InputPropsType = {
    placeholder: string
    value: string,
    onChange: (e: SyntheticEvent, p: OnChangePayload) => void

};
function renderInputComponent(inputProps: InputPropsType, id: string, name: string, disabled: boolean, valid: boolean | undefined): (ip: InputPropsType) => ReactElement {
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
    suggestions: Suggestion[],
    selectedFromData: boolean
};
export type StarWarsSearchProps = {
    id: string,
    name: string,
    label: string,
    placeholder: string,
    data: Suggestion[],
    setFn: (suggestion: Suggestion | undefined) => void,
    visible: boolean
};
type SuggestionFetchRequest = {
    value: string,
    reason: string
};
export class StarWarsSearch extends Component<StarWarsSearchProps, StarWarsSearchState> {
    private data: Suggestion[];
    private setFn: (suggestion: Suggestion | undefined) => void;

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

    onChange(event: SyntheticEvent, {newValue}: OnChangePayload): void {
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

    onSuggestionsFetchRequested(fetchReq: SuggestionFetchRequest): void {
        this.setState({
            suggestions: this.getSuggestions(fetchReq)
        });
    }

    onSuggestionsClearRequested(): void {
        this.setState({
            suggestions: []
        });
    }

    getSuggestions({value}: SuggestionFetchRequest): Suggestion[] {
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
