/**
 * This file was generated from MapEditor.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface MapEditorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    mapboxToken: string;
    fullScreenControlEnabled: boolean;
    geolocationControlEnabled: boolean;
    drawControlsEnabled: boolean;
    currentPolygon?: EditableValue<string>;
    onPolygonCreatedAction?: ActionValue;
    polygonsSource: ListValue;
    coordinates: ListAttributeValue<string>;
}

export interface MapEditorPreviewProps {
    class: string;
    style: string;
    mapboxToken: string;
    fullScreenControlEnabled: boolean;
    geolocationControlEnabled: boolean;
    drawControlsEnabled: boolean;
    currentPolygon: string;
    onPolygonCreatedAction: {} | null;
    polygonsSource: {} | null;
    coordinates: string;
}
