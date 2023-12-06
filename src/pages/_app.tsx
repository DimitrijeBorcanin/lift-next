import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LIFT</title>
        <meta name="description" content="Oficijalni sajt pop rok benda LIFT" />
        <meta name="keywords" content="LIFT,bend,band,rock,pop" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
      </Head>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </>
  )
}
