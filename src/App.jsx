import React, { useRef, useEffect, useState } from "react";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

import "./App.css";
import { createBookmarks } from "./ui-bookmarks";
import { MapLegend } from "./ui-legend";

function App() {
  const mapDiv = useRef(null);
  const [localView, setLocalView] = useState();

  useEffect(() => {
    if (mapDiv.current && !localView) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c"
        }
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap
      });

      createBookmarks(view).then((bookmarks) => {
        const bkExpand = new Expand({
          view,
          content: bookmarks,
          expanded: true
        });

        // Add the widget to the top-right corner of the view
        view.ui.add(bkExpand, "top-right");

        // bonus - how many bookmarks in the webmap?
        webmap.when(() => {
          if (webmap.bookmarks && webmap.bookmarks.length) {
            console.log("Bookmarks: ", webmap.bookmarks.length);
          } else {
            console.log("No bookmarks in this webmap.");
          }
        });

        setLocalView(view);
      });
    }
  }, [localView, mapDiv]);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
      <MapLegend view={localView} />
    </>
  );
}

export default App;
