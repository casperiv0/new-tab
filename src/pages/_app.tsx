import { AppProps } from "next/app";
import "styles/global.scss";
import "styles/app.scss";
import "styles/form.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
