import React, {FC, useReducer} from 'react';
import classNames from 'classnames';
import {Button} from '@/components/InputForm/Button';
import {ResourceKey, Resources, Suggestion} from '@/common/types';
import {createInitState, reducer} from '@/components/InputForm/state';
import {StarWarsSearch} from '@/components/InputForm/StarWarsSearch';

type InputFormProps = {
  resources: Resources;
};
export const InputForm: FC<InputFormProps> = ({ resources }) => {
  const [state, dispatch] = useReducer(reducer, createInitState(resources));
  const mandatory = Object.entries(resources).filter(([k, v]) => v.mandatory).map(([k]) => k);
  const optional = Object.entries(resources).filter(([k, v]) => !v.mandatory).map(([k]) => k);
  const disabled = mandatory.map(m => state[m as unknown as ResourceKey].selected !== undefined).filter(v => v).length !== mandatory.length;
  return (
    <div className="w-full">
      {Object.entries(state).map(([k, state]) => (
        <StarWarsSearch
          key={`field-${state.label}`}
          data={state.data}
          id={`id-${k}`}
          name={k}
          {...state}
          setSelectedSuggestion={(name: string, value: Suggestion | undefined) => {
            dispatch({type: 'SET_SELECTED_VALUE_ACTION', payload: { name, value }});
          }}
        />
      ))}
      <div className="flex justify-between my-4">
        {optional
          .map(r => [r, state[r]])
          .map(([name, { visible }]) => (
            <Button
              key={`button-${name}`}
              name={`${visible ? 'Remove' : 'Add'} ${name}`}
              onClick={() => {
                dispatch({type: 'TOGGLE_VISIBILITY_ACTION', payload: { name }});
              }}
            />
          ))
        }
      </div>
      <div className="flex justify-center">
        <button
          className={classNames("text-white text-xl mx-4 p-3 rounded-md", { 'bg-blue-500': !disabled, 'bg-gray-500': disabled })}
          type="button"
          disabled={disabled}
        >
          {'Generate Plot'}
        </button>
      </div>
    </div>
  );
};
