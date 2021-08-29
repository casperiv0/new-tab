import * as React from "react";
import isUrl from "is-url";
import prependHttp from "prepend-http";
import { Settings } from "lib/constants";

interface Props {
  focusable: boolean;
  settings: Settings;
}

export const Search = ({ focusable, settings }: Props) => {
  const [search, setSearch] = React.useState("");
  const [focused, setFocused] = React.useState(true);
  const ref = React.useRef<HTMLInputElement>(null);

  const placeholder = new URL(settings.searchEngine || "https://duckduckgo.com").host;

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

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

    return (window.location.href = `${settings.searchEngine}?q=${encodeURIComponent(search)}`);
  }

  return (
    <form onSubmit={onSubmit} className="searchContainer">
      <input
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder={`Search via ${placeholder}`}
        className="searchInput"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </form>
  );
};
