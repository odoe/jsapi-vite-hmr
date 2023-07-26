import Bookmarks from "@arcgis/core/widgets/Bookmarks";

export async function createBookmarks(view) {
  const bookmarks = new Bookmarks({
    view,
    // allows bookmarks to be added, edited, or deleted
    editingEnabled: true
  });
  return bookmarks;
}
