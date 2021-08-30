import { AppProps } from "next/app";
import Script from "next/script";
import "styles/global.scss";
import "styles/app.scss";
import "styles/form.scss";
import "styles/search.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script strategy="lazyOnload">
        {`
      try {
        let local = localStorage.getItem("NEW_TAB_SETTINGS");
        if (local) {
          let parsed = JSON.parse(local);

          if (parsed.theme && ["dark", "light"].includes(parsed.theme)) {
            document.body.classList.add(parsed.theme);
          }
        }
      } catch {}
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
