import type { NextComponentType } from 'next'
import Head from 'next/head'

export const Layout: NextComponentType = ({ children }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>SW Gen Version H</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto w-6/12">
        {children}
      </div>
    </div>
  )
}
