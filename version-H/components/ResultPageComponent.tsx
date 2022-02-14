import React, {FC} from 'react';
import { Layout } from '@/components/Layout';
import classNames from 'classnames';
import DOMPurify from 'isomorphic-dompurify';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppState} from '../context/appContext';
import {generatePlot} from '@/common/plotGenerator';

const ResultPageComponent: FC = () => {
  const router = useRouter();
  const appStateDispatch = useAppDispatch();
  const appState = useAppState();

  const names = Object.values(appState).map(v => v?.name);
  const resources = Object.values(appState).map(v => v?.url);
  const {title, description} = generatePlot(...(names as [string, string, string?, string?, string?]));
  const markup = {__html: DOMPurify.sanitize(description)};

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center my-8">
        <h1 className="text-center text-4xl">Star Wars Plot Generator</h1>
      </div>
      <div className="flex flex-col items-center justify-center my-6">
        <h1 className="text-center text-3xl">{title}</h1>
      </div>
      <div className="flex flex-col items-center justify-center my-4">
        <p className="text-center text-xl bg-black text-yellow-200">
          <span dangerouslySetInnerHTML={markup}/>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center my-4">
        <h1 className="text-center text-3xl my-2">Resources</h1>
        <ul className="my-2">
          {resources.map((url) => (
            <li className="my-1"><a className="text-blue-600" href={url}>{url}</a></li>)
          )}
        </ul>
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          className={classNames("text-white text-xl mx-4 p-3 rounded-md", 'bg-blue-500')}
          type="button"
          onClick={() => {
            router.push('/').then(() => {
              appStateDispatch({ type: 'RESET_APP_STATE', payload: undefined });
            });
          }}
        >
          {'Generate New Plot'}
        </button>
      </div>
    </Layout>
  )
}

export default ResultPageComponent
