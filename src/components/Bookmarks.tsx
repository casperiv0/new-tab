import * as React from "react";
import { useSettings } from "context/SettingsContext";
import { Bookmark } from "types/Settings";

const API_URL = "https://favicon-grabber.caspertheghost.me";

export const Bookmarks = () => {
  const { settings } = useSettings();

  return (
    <div className="bookmarksContainer">
      {settings.bookmarks.map((item, idx) => (
        <BookmarkItem key={idx} item={item} />
      ))}
    </div>
  );
};

const BookmarkItem = ({ item }: { item: Bookmark }) => {
  const { settings, setSettings } = useSettings();
  const [faviconUrl, setFaviconUrl] = React.useState(item.faviconUrl);

  const fetchFavicon = React.useCallback(async () => {
    if (!faviconUrl) {
      const { protocol, host } = new URL(item.url);
      const itemUrl = `${protocol}//${host}`;

      const res = await fetch(`${API_URL}?url=${itemUrl}`);
      const data = await res.json();

      if (data) {
        let url = data[5].src;
        if (!url.startsWith("http")) {
          url = `${itemUrl}${url}`;
          console.log(url);
        }
        setFaviconUrl(url);

        const arr = [...settings.bookmarks];
        const idx = arr.indexOf(item);

        arr[idx] = { ...item, faviconUrl: url };

        setSettings({ ...settings, bookmarks: arr });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faviconUrl, item, settings]);

  React.useEffect(() => {
    fetchFavicon();
  }, [fetchFavicon]);

  return (
    <a
      title={item.url}
      className="bookmarkItem"
      target="_blank"
      rel="noopener noreferrer"
      href={item.url}
    >
      {faviconUrl ? <img src={faviconUrl!} /> : <>test</>}
    </a>
  );
};
