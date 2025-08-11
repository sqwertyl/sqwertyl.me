import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

// Prevent Font Awesome from adding its CSS automatically
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
