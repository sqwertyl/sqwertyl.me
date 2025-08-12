import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches,r=document.documentElement;r.classList.toggle('dark',p);r.style.colorScheme=p?'dark':'light';}catch(e){}}();`
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
