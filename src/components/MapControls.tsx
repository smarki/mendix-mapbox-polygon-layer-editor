import { FullscreenControl, GeolocateControl } from "mapbox-gl";
import { useEffect } from "react";
import { MapComponentProps } from "../MapEditor";

interface MapControlsProps extends MapComponentProps, ControlProps {}

export interface ControlProps {
    fullScreenControlEnabled: boolean;
    geolocationControlEnabled: boolean;
}

export const MapControls = ({
    map,
    fullScreenControlEnabled = false,
    geolocationControlEnabled = false
}: MapControlsProps) => {
    useEffect(() => {
        if (fullScreenControlEnabled) {
            map?.addControl(new FullscreenControl({ container: map.getContainer() }));
        }
        if (geolocationControlEnabled) {
            map?.addControl(new GeolocateControl({ showUserLocation: true }));
        }
    }, [map]);
    return null;
};

export const getProps = <T extends MapControlsProps>(props: T): ControlProps => {
    return {
        fullScreenControlEnabled: props.fullScreenControlEnabled,
        geolocationControlEnabled: props.geolocationControlEnabled
    };
};
