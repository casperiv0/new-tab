import * as React from "react";
import { X } from "react-bootstrap-icons";
import { useSettings } from "context/SettingsContext";
import { Bookmark } from "types/Settings";
import { FormField } from "components/FormField";
import { classes } from "lib/classes";

export const BookmarksTab = () => {
  const [url, setUrl] = React.useState("");
  const { settings, setSettings } = useSettings();

  const inNewTab = settings.bookmark.newTab;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (!url) return;
    const existing = settings.bookmark.bookmarks.some(
      (v) => v.url.toLowerCase() === url.toLowerCase(),
    );
    if (existing) return;

    setSettings({
      ...settings,
      bookmark: {
        ...settings.bookmark,
        bookmarks: [
          ...settings.bookmark.bookmarks,
          {
            url,
            faviconUrl: null,
          },
        ],
      },
    });

    setUrl("");
  }

  function handleUpdate(old: Bookmark, newItem: Bookmark) {
    const arr = [...settings.bookmark.bookmarks];
    const idx = arr.indexOf(old);

    arr[idx] = newItem;

    setSettings({
      ...settings,
      bookmark: {
        ...settings.bookmark,
        bookmarks: arr,
      },
    });
  }

  function handleDelete(item: Bookmark) {
    const arr = [...settings.bookmark.bookmarks];
    const idx = arr.indexOf(item);

    arr.splice(idx, 1);

    setSettings({
      ...settings,
      bookmark: {
        ...settings.bookmark,
        bookmarks: arr,
      },
    });
  }

  function setNewTab(v: boolean) {
    setSettings({
      ...settings,
      bookmark: {
        ...settings.bookmark,
        newTab: v,
      },
    });
  }

  return (
    <div className="tab">
      <h1 className="tabTitle">Bookmarks</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <FormField fieldId="new-tab-results" label="Open bookmarks in new tab">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => setNewTab(true)}
              className={classes("positionBtn", "toggle", inNewTab === true && "selected")}
            >
              On
            </button>
            <button
              onClick={() => setNewTab(false)}
              className={classes("positionBtn", "toggle", inNewTab === false && "selected")}
            >
              Off
            </button>
          </div>
        </FormField>

        <div className="settingsBookmarkItem">
          <input
            autoFocus
            type="url"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com"
            value={url}
          />
          <button type="submit">Add</button>
        </div>
      </form>

      <div className="settingsBookmarkItems">
        {settings.bookmark.bookmarks.map((item, idx) => (
          <BookmarkItem
            key={idx}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

interface BookmarkItemProps {
  item: Bookmark;
  handleDelete: (item: Bookmark) => void;
  handleUpdate: (old: Bookmark, newItem: Bookmark) => void;
}

const BookmarkItem = ({ item, handleDelete, handleUpdate }: BookmarkItemProps) => {
  const [url, setUrl] = React.useState(item?.url ?? "");

  React.useEffect(() => {
    setUrl(item.url);
  }, [item]);

  return (
    <div className="settingsBookmarkItem">
      <input
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com"
        value={url}
        onBlur={() => item.url !== url && handleUpdate(item, { ...item, url })}
      />
      <button onClick={() => handleDelete(item)} aria-label="Delete bookmark">
        <X width="20px" height="20px" />
      </button>
    </div>
  );
};
