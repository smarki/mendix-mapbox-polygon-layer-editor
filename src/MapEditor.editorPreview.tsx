import { Component, ReactNode, createElement } from "react";
import { MapEditorPreviewProps } from "../typings/MapEditorProps";

declare function require(name: string): string;

export class preview extends Component<MapEditorPreviewProps> {
    render(): ReactNode {
        return <img src="./preview.png" width="400" height="400" />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/MapEditor.css");
}
