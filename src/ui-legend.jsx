import Legend from "@arcgis/core/widgets/Legend";
import { useEffect, useRef } from "react";

function createLegend(view, container) {
  const legend = new Legend({
    view,
    container,
    style: "card"
  });
  return legend;
}

export function MapLegend({ view }) {
  const legendRef = useRef(null);

  useEffect(() => {
    if (!view && !legendRef.current) {
      return;
    }
    createLegend(view, legendRef.current);
    console.log("legend created");
  }, [view, legendRef]);

  return <div ref={legendRef}></div>;
}
