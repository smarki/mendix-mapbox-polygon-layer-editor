import "../ui/mapbox-gl-draw.css";
import { MultiPoint } from "geojson";
import MapboxDraw, { DrawCreateEvent, DrawDeleteEvent, DrawUpdateEvent } from "@mapbox/mapbox-gl-draw";
import { useCallback, useEffect, useMemo } from "react";
import { MapComponentProps } from "../MapEditor";
import { ActionValue, EditableValue } from "mendix";

interface Props extends MapDrawControProps, MapComponentProps {}

interface MapDrawControProps {
    currentPolygon?: EditableValue<string>;
    onPolygonCreatedAction?: ActionValue;
}

export const MapDrawControl = ({ map, currentPolygon, onPolygonCreatedAction }: Props) => {
    const draw = useMemo(
        () =>
            new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: false
                },
                defaultMode: "draw_polygon"
            }),
        [map]
    );

    const onMapDrawAction = useCallback(
        (e: DrawCreateEvent | DrawDeleteEvent | DrawUpdateEvent) => {
            const coordinates = (e.features[0].geometry as MultiPoint).coordinates.join();
            currentPolygon?.setValue(coordinates);
            onPolygonCreatedAction?.execute();
        },
        [onPolygonCreatedAction, currentPolygon]
    );

    useEffect(() => {
        if (!map?.hasControl(draw)) {
            map?.addControl(draw);
        }
        map?.on("draw.create", onMapDrawAction);
        map?.on("draw.delete", onMapDrawAction);
        map?.on("draw.update", onMapDrawAction);
        return () => {
            map?.removeControl(draw);
            map?.off("draw.create", onMapDrawAction);
            map?.off("draw.delete", onMapDrawAction);
            map?.off("draw.update", onMapDrawAction);
        };
    }, [map, onPolygonCreatedAction, currentPolygon]);

    return null;
};

export const getProps = <T extends MapDrawControProps>(props: T): MapDrawControProps => {
    return {
        currentPolygon: props.currentPolygon,
        onPolygonCreatedAction: props.onPolygonCreatedAction
    };
};
