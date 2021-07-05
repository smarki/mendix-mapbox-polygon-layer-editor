import { MapEditorContainerProps } from "../typings/MapEditorProps";


export type MapEditorComponentProps = Omit<MapEditorContainerProps, "mapboxToken" | "drawControlsEnabled">;
