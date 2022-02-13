import React, {FC} from 'react';
import { Layout } from '@/components/Layout';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppState} from '../context/appContext';

const ResultPageComponent: FC = () => {
  const router = useRouter();
  const appStateDispatch = useAppDispatch();
  const appState = useAppState();
  console.log('!!', appState);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl my-8">Star Wars Plot Generator</h1>
      </div>
      <div className="flex justify-center">
        <button
          className={classNames("text-white text-xl mx-4 p-3 rounded-md", 'bg-blue-500')}
          type="button"
          onClick={() => {
            appStateDispatch({ type: 'RESET_APP_STATE', payload: undefined });
            router.push('/');
          }}
        >
          {'Generate New Plot'}
        </button>
      </div>
    </Layout>
  )
}

export default ResultPageComponent
