import { Feature, Geometry, Position } from "geojson";
import { useEffect } from "react";
import { MapComponentProps } from "../MapEditor";
import { MapEditorComponentProps } from "../MapEditorComponentProps";
import { ObjectItem } from "mendix";

interface Props extends MapComponentProps, PolygonLayerProps {}

interface PolygonLayerProps {
    data: any[];
    getValue: (item: any) => Polygon | undefined;
}

const polygonSourceName = "mendixLayerSource";
const polygonLayerId = "mendixPolygonLayer";

export const PolygonLayer = ({ map, data, getValue }: Props) => {
    useEffect(() => {
        if (!data.length) {
            return;
        }

        map?.addSource(polygonSourceName, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: data.map(d => mapDataToFeatures(d, getValue)).filter(i => i !== undefined) as Feature<
                    Geometry,
                    {}
                >[]
            }
        });
        map?.addLayer({
            id: polygonLayerId,
            type: "fill",
            source: polygonSourceName,
            paint: {
                "fill-color": "#888888",
                "fill-opacity": 0.4
            },
            filter: ["==", "$type", "Polygon"]
        });
        return () => {
            map?.removeLayer(polygonLayerId);
            map?.removeSource(polygonSourceName);
        };
    }, [map, data, getValue]);
    return null;
};

function mapDataToFeatures(data: any, getValue: (item: any) => Polygon | undefined): Feature<Geometry, {}> | undefined {
    const polygon = getValue(data);
    if (!polygon) {
        return;
    }

    return {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [polygon.coordinates]
        },
        properties: {}
    };
}

export function getProps<T extends MapEditorComponentProps>(value: T): PolygonLayerProps {
    return {
        data: value.polygonsSource.items ?? [],
        getValue: (v: ObjectItem) => {
            const coordinates = stringArrayToCoordinates(value.coordinates.get(v).value!.split(","));
            return coordinates ? { coordinates } : undefined;
        }
    };
}

function stringArrayToCoordinates(values: string[]): Position[] | undefined {
    console.log("stringArrayToCoordinates");
    console.log(values);
    if (values.length % 2 !== 0) {
        console.log(values.length % 2);
        return;
    }

    const coordinates: Position[] = [];
    for (let i = 2; i <= values.length; i += 2) {
        console.log(i);
        coordinates.push([Number(values[i - 2]), Number(values[i - 1])] as Position);
    }

    console.log(coordinates);
    return coordinates;
}

interface Polygon {
    coordinates: Position[];
}
