import * as React from "react";

export const Search = () => {
  const [search, setSearch] = React.useState("");
  const [focused, setFocused] = React.useState(true);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  const handler = React.useCallback(
    (event: KeyboardEvent) => {
      if (focused) return;
      ref.current?.focus();

      setSearch((p) => p + event.key);
    },
    [focused],
  );

  React.useEffect(() => {
    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [handler]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    window.location.href = `https://duckduckgo.com?q=${encodeURIComponent(search)}`;
  }

  return (
    <form onSubmit={onSubmit} className="searchContainer">
      <input
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder="Search via DuckDuckGo"
        className="searchInput"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </form>
  );
};
