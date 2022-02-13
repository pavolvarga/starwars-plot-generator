import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import {AppProvider} from '../context/appContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />;
    </AppProvider>
  );
}

export default MyApp;
