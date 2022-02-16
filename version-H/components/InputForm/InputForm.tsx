import React, {FC, useReducer} from 'react';
import { useRouter } from 'next/router'
import classNames from 'classnames';
import {Button} from '@/components/InputForm/Button';
import {AppState, ResourceKey, Resources, Suggestion} from '@/common/types';
import {createInitState, reducer} from '@/components/InputForm/state';
import {StarWarsSearch} from '@/components/InputForm/StarWarsSearch';
import {useAppDispatch} from '../../context/appContext';

type InputFormProps = {
  resources: Resources;
};
export const InputForm: FC<InputFormProps> = ({ resources }) => {
  const [state, dispatch] = useReducer(reducer, createInitState(resources));
  const router = useRouter();
  const appStateDispatch = useAppDispatch();
  const mandatory = Object.entries(resources).filter(([k, v]) => v.mandatory).map(([k]) => k);
  const optional = Object.entries(resources).filter(([k, v]) => !v.mandatory).map(([k]) => k);
  const disabled = mandatory.map(m => state[m as unknown as ResourceKey].selected !== undefined).filter(v => v).length !== mandatory.length;
  const appState = Object.entries(state).reduce((obj, [key, state]) => {
    if (state.selected !== undefined) {
      // @ts-ignore
      obj[key] = state.selected;
    }
    return obj;
  }, {}) as AppState;
  return (
    <div className="w-full">
      {Object.entries(state).map(([k, state]) => (
        <StarWarsSearch
          key={`field-${state.label}`}
          id={`id-${k}`}
          name={k}
          setSelectedSuggestion={(name: string, value: Suggestion | undefined) => {
            dispatch({type: 'SET_SELECTED_VALUE_ACTION', payload: { name, value }});
          }}
          {...state}
        />
      ))}
      <div className="flex justify-between my-4">
        {optional
          // @ts-ignore
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
          onClick={() => {
            appStateDispatch({ type: 'SET_APP_STATE', payload: appState });
            router.push('/result');
          }}
        >
          {'Generate Plot'}
        </button>
      </div>
    </div>
  );
};
