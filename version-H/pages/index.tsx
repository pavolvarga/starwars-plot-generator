import type { NextPage } from 'next'
import { Layout } from '@/components/Layout';
import {InputForm} from '@/components/InputForm';
import {loadStarWarsData} from '@/common/load-data';
import {Resources} from '@/common/types';

const HomePage: NextPage = ({ resources }) => {
  console.log('fe', resources);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl my-8">Star Wars Plot Generator</h1>
        <InputForm />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {

  const resources: Resources = {
    person:   { plural: 'people',    singular: 'person',   mandatory: true,  label: 'character', suggestions: null, },
    planet:   { plural: 'planets',   singular: 'planet',   mandatory: true,  label: null, suggestions: null  },
    starship: { plural: 'starships', singular: 'starship', mandatory: false, label: null, suggestions: null  },
    vehicle:  { plural: 'vehicles',  singular: 'vehicle',  mandatory: false, label: null, suggestions: null  },
    species:  { plural: 'species',   singular: 'species',  mandatory: false, label: null, suggestions: null  }
  };

  const data = await Promise.all(
    Object.values(resources).map(r => r.plural).map(loadStarWarsData)
  );

  Object.values(resources).forEach((r, i) => {
    r.suggestions = data[i];
  })

  return {
    props: {
      resources,
    },
  };
}

export default HomePage
