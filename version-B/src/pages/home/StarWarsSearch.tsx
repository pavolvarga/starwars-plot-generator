import React, { ReactElement, SyntheticEvent, Component } from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import { Col, FormGroup, Label, Input } from "reactstrap";

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

    constructor(props: StarWarsSearchProps) {
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

    onChange(event: React.FormEvent<any>, {newValue}: ChangeEvent): void {
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

        const autosuggestInputProps: AutosuggestProps = {
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
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={autosuggestInputProps}
                        theme={createTheme(this.data.length)}
                        renderInputComponent={renderInputComponent(id, name, disabled, valid)}
                    />
                </FormGroup>
            </Col>
        );
    }
}
