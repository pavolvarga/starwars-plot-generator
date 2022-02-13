import React, { createContext, useContext, FC, useReducer } from 'react';
import {AppState} from '@/common/types';

const INIT_APP_STATE: AppState = {
  person: undefined,
  planet: undefined,
  species: undefined,
  vehicle: undefined,
  starship: undefined,
};

type SetAppStateAction = {
  type: 'SET_APP_STATE',
  payload: AppState,
}
type ResetAppStateAction = {
  type: 'RESET_APP_STATE',
  payload: undefined,
}

type AppContextAction = SetAppStateAction | ResetAppStateAction;

function appStateReducer(state: AppState, action: AppContextAction): AppState {
  const { type, payload } = action;
  switch (type) {
    case 'SET_APP_STATE':
      return payload as AppState;
    case 'RESET_APP_STATE':
      return { ...INIT_APP_STATE };
    default:
      throw new Error(`Unknown ${type}`);
  }
}

export type AppDispatch = (action: AppContextAction) => void;

/**
 * The "state" part of context.
 */
const AppStateContext = createContext<AppState | undefined>(
  undefined
);

/**
 * The "dispatch" (action) part of context.
 */
// prettier-ignore
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

export function useAppState(): AppState {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }
  return context;
}

export function useAppDispatch(): AppDispatch {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useAppDispatch must be used within a AppDispatchProvider'
    );
  }
  return context;
}

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: FC<AppProviderProps> = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(appStateReducer, INIT_APP_STATE);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
