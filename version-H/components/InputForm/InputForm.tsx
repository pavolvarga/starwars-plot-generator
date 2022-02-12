import React, {FC, useReducer} from 'react';
import classNames from 'classnames';
import {Button} from '@/components/InputForm/Button';
import {ResourceKey, Resources} from '@/common/types';
import {createInitState, reducer} from '@/components/InputForm/state';
import {StarWarsSearch} from '@/components/InputForm/StarWarsSearch';

type InputFormProps = {
  resources: Resources;
};

export const InputForm: FC<InputFormProps> = ({ resources }) => {
  const [state, dispatch] = useReducer(reducer, createInitState(resources));
  const disabled = true;
  return (
    <div className="w-full">
      {Object.entries(state).map(([k, state]) => (
        <StarWarsSearch
          key={`field-${state.label}`}
          data={state.data}
          id={`id-${k}`}
          name={k}
          {...state}
        />
      ))}
      <div className="flex justify-between my-4">
        {Object
          .values(resources)
          .filter(r => !r.mandatory)
          .map(r => [r.singular, state[r.singular as unknown as ResourceKey]])
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
          disabled={true}
        >
          {'Generate Plot'}
        </button>
      </div>
    </div>
  );
};
