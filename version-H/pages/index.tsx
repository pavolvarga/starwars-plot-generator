import type { NextPage } from 'next'
import { Layout } from '@/components/Layout';
import {InputForm} from '@/components/InputForm';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl my-8">Star Wars Plot Generator</h1>
        <InputForm />
      </div>
    </Layout>
  )
}

export default HomePage
