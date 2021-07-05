import { createElement, FunctionComponent, useState } from "react";
// import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";
import { MapEditorContainerProps } from "../typings/MapEditorProps";
import "./ui/MapEditor.css";
import "./ui/mapbox-gl.css";
import { MapRenderer } from "./components/MapRenderer";
import { getProps as getExtraMapControlProps, MapControls } from "./components/MapControls";
import { MapDrawControl, getProps as getMapDrawControlProps } from "./components/MapDrawControl";
import { getProps as getPolygonLayerProps, PolygonLayer } from "./components/PolygonLayer";

const MapEditor: FunctionComponent<MapEditorContainerProps> = ({ mapboxToken, drawControlsEnabled, ...props }) => {
    mapboxgl.accessToken = mapboxToken;
    const [map, setMap] = useState<mapboxgl.Map | undefined | null>(null);

    return (
        <div>
            <MapControls map={map} {...getExtraMapControlProps(props)} />
            {drawControlsEnabled && <MapDrawControl map={map} {...getMapDrawControlProps(props)} />}
            <PolygonLayer map={map} {...getPolygonLayerProps(props)} />
            <MapRenderer ref={ref => setMap(ref)} />
        </div>
    );
};

export interface MapComponentProps {
    map?: mapboxgl.Map | null;
}

export default MapEditor;
