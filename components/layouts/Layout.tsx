import Head from "next/head"
import { FC, PropsWithChildren, ReactNode } from "react"
import { Navbar } from "../ui"
import { useRouter } from 'next/router';

interface Props{
    children: ReactNode,
    title?: string, 
    
}

const origin = (typeof window == 'undefined') ? '' : window.location.origin;
export const Layout:FC<Props>= ({children,title}) => {

  return (
    <>
    <Head>
        <title>{title || 'Pokemon'}</title>
        <meta name="autho" content="Santiago Touzet"/>
        <meta name="description" content={`Información sobre el pokemon ${title}`}/>
        <meta name="keywords" content={`${title},pokemon,pokedex`}/>
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
    </Head>

    {/* Navbar */}
    <Navbar/>


    <main style={{
      padding: '0px 20px',
    }}>
        {children}
    </main>
    </>
  )
}
