import {NextPage} from 'next';
import {loadStarWarsData} from '@/common/load-data';
import {HomePageComponent} from '@/components/HomePageComponent';

// @ts-ignore
const HomePage: NextPage = ({ resources }) => {
  return <HomePageComponent resources={resources} />;
}

export async function getStaticProps() {
  const resources = await loadStarWarsData();
  return {
    props: {
      resources: resources,
    },
  };
}

export default HomePage;
