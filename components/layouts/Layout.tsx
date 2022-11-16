import Head from "next/head"
import { FC, PropsWithChildren, ReactNode } from "react"
import { Navbar } from "../ui"

interface Props{
    children: ReactNode,
    title?: string, 
    
}


export const Layout:FC<Props>= ({children,title}) => {
  return (
    <>
    <Head>
        <title>{title || 'Pokemon'}</title>
        <meta name="autho" content="Santiago Touzet"/>
        <meta name="description" content={`Información sobre el pokemon ${title}`}/>
        <meta name="keywords" content={`${title},pokemon,pokedex`}/>
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
