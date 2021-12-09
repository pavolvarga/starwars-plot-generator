import type { NextPage } from 'next'
import { Layout } from '@/components/Layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <h1>SW Gen Version H / HomePage</h1>
      </div>
    </Layout>
  )
}

export default HomePage
