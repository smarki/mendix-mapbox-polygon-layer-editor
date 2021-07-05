import mapboxgl, { LngLatLike } from "mapbox-gl";
import React, { createElement, useEffect, useRef } from "react";

export interface MapRendererProps {
    center?: LngLatLike;
}

export const MapRenderer = React.forwardRef(
    ({ center }: MapRendererProps, forwardRef: (ref: mapboxgl.Map | undefined) => void) => {
        const mapContainer = useRef<HTMLDivElement>(null);
        const map = useRef<mapboxgl.Map>();

        useEffect(() => {
            if (map.current) {
                return;
            }

            map.current = new mapboxgl.Map({
                container: mapContainer.current as HTMLDivElement,
                style: "mapbox://styles/mapbox/streets-v11",
                center: center
            });
            forwardRef(map.current);
        }, [mapContainer.current]);

        return (
            <div>
                <div ref={mapContainer} className="mapbox-container" />
            </div>
        );
    }
);
