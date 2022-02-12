import {capitalize} from "lodash";
import React, {ReactElement, FC, useState} from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import {InputState, Suggestion} from '@/common/types';

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
    input: 'border w-full h-8',
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

function renderInputComponent(id: string, name: string, disabled: boolean, valid: boolean | undefined, label: string): (ip: any) => ReactElement {
    //inputProps is provided by the Autosuggest component
    //see: https://github.com/moroshko/react-autosuggest#render-input-component-prop
    return (inputProps: any) => {
        return (
          <div className="w-full my-4 text-xl">
            <label className="w-full block mb-2">{capitalize(label)}</label>
            <input
              type="text"
              id={id}
              name={name}
              disabled={disabled}
              {...inputProps}
              className="border w-full h-10"
            />
          </div>
        );
    }
}

type SuggestionFetchRequest = {
  value: string,
  reason: string
};

export type StarWarsSearchProps = InputState & {
  data: Suggestion[];
  name: string;
};
export const StarWarsSearch: FC<StarWarsSearchProps> = props => {
  const { data, visible, name, label } = props;
  const
      [value, setValue] = useState(''),
      [suggestions, setSuggestions] = useState<Suggestion[]>(data),
      [selectedFromData, setSelectedFromData] = useState(false);

  if (!visible) {
      return null;
  }

  function onChange(event: React.FormEvent<any>, {newValue}: ChangeEvent): void {
      setValue(newValue);

      console.log('!! onChange');

      const foundIdx = data.findIndex(el => el.name === newValue);
      if (foundIdx !== -1) {
          setSelectedFromData(true);
          const {name, url} = data[foundIdx];
      } else {
          setSelectedFromData(false);
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

  const placeholder = `Please enter ${label}`
  const disabled = data.length === 0;
  const valid = selectedFromData ? true : undefined;

  return (
      <Autosuggest
          id={`id-${name}`}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{placeholder, value, onChange}}
          theme={createTheme(data.length)}
          renderInputComponent={renderInputComponent(
            `id-${name}`,
            name,
            disabled,
            valid,
            label
          )}
      />
  );
};
