import * as React from "react";
import isUrl from "is-url";
import prependHttp from "prepend-http";
import { useSettings } from "context/SettingsContext";

interface Props {
  focusable: boolean;
}

// fallback function
function getURL(url: string) {
  try {
    return new URL(url || "https://duckduckgo.com");
  } catch {
    return new URL("https://duckduckgo.com");
  }
}

export const Search = ({ focusable }: Props) => {
  const { settings } = useSettings();

  const [search, setSearch] = React.useState("");
  const [focused, setFocused] = React.useState(true);
  const ref = React.useRef<HTMLInputElement>(null);

  const engineUrl = getURL(settings.search.engine);

  React.useEffect(() => {
    focusable && ref.current?.focus();
  }, [focusable]);

  const handler = React.useCallback(
    (event: KeyboardEvent) => {
      if (focused || !focusable) return;
      ref.current?.focus();

      setSearch((p) => p + event.key);
    },
    [focused, focusable],
  );

  React.useEffect(() => {
    window.addEventListener("keypress", handler);

    return () => {
      window.removeEventListener("keypress", handler);
    };
  }, [handler]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!search) return;

    const url = prependHttp(search, { https: !search.startsWith("localhost") });
    if (isUrl(url)) {
      return (window.location.href = url);
    }

    const fullURL = `${engineUrl}${encodeURIComponent(search)}`;

    if (settings.search.newTab === true) {
      return window.open(fullURL, "_blank");
    }

    return window.open(fullURL, "_self");
  }

  return (
    <form onSubmit={onSubmit} className="searchContainer">
      <input
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder={`Search via ${engineUrl.host}`}
        className="searchInput"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </form>
  );
};
