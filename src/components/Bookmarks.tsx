import * as React from "react";
import { useSettings } from "context/SettingsContext";
import { Bookmark } from "types/Settings";

const API_URL = "https://favicon-grabber.caspertheghost.me";

function findLargestIcon(data: { sizes: string; purpose?: string }[]): any {
  let temp = 0;
  let largest = {};

  data.forEach((v) => {
    const size = parseInt(v.sizes);
    if (temp < size && v.purpose !== "monochrome") {
      largest = v;
      temp = size;
    }
  });

  return largest;
}

export const Bookmarks = () => {
  const { settings } = useSettings();

  return (
    <div className="bookmarksContainer">
      {settings.bookmark.bookmarks.map((item, idx) => (
        <BookmarkItem key={idx} item={item} />
      ))}
    </div>
  );
};

const BookmarkItem = ({ item }: { item: Bookmark }) => {
  const { settings, setSettings } = useSettings();
  const [faviconUrl, setFaviconUrl] = React.useState(item.faviconUrl);

  const linkProps = settings.bookmark.newTab
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  const fetchFavicon = React.useCallback(async () => {
    if (!faviconUrl) {
      const { protocol, host } = new URL(item.url);
      const itemUrl = `${protocol}//${host}`;

      const res = await fetch(`${API_URL}?url=${itemUrl}`);
      const data = await res.json();

      const icon = findLargestIcon(data);

      if (data) {
        let url = icon?.src ?? "ERR_NO_PREVIEW";
        if (!url.startsWith("http")) {
          url = `${itemUrl}${url}`;
        }

        const arr = [...settings.bookmark.bookmarks];
        const idx = arr.indexOf(item);
        const previewUrl = `https://preview.caspertheghost.me?url=${url}`;

        arr[idx] = { ...item, faviconUrl: previewUrl };
        setFaviconUrl(previewUrl);

        setSettings({ ...settings, bookmarks: arr });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faviconUrl, item, settings, setSettings]);

  React.useEffect(() => {
    fetchFavicon();
  }, [fetchFavicon]);

  React.useEffect(() => {
    setFaviconUrl(item.faviconUrl);
  }, [item]);

  return (
    <a title={item.url} className="bookmarkItem" href={item.url} {...linkProps}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {faviconUrl ? <img src={faviconUrl!} /> : <>ERR_NO_PREVIEW</>}
    </a>
  );
};
