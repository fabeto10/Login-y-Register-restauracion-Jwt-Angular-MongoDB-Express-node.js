/**
 * Sigma.js Settings
 * =================================
 *
 * The list of settings and some handy functions.
 * @module
 */
import { Attributes } from "graphology-types";
import drawLabel from "./rendering/canvas/label";
import drawHover from "./rendering/canvas/hover";
import drawEdgeLabel from "./rendering/canvas/edge-label";
import { EdgeDisplayData, NodeDisplayData } from "./types";
import { EdgeProgramConstructor } from "./rendering/webgl/programs/common/edge";
import { NodeProgramConstructor } from "./rendering/webgl/programs/common/node";
export declare function validateSettings(settings: Settings): void;
/**
 * Sigma.js settings
 * =================================
 */
export interface Settings {
    hideEdgesOnMove: boolean;
    hideLabelsOnMove: boolean;
    renderLabels: boolean;
    renderEdgeLabels: boolean;
    enableEdgeClickEvents: boolean;
    enableEdgeWheelEvents: boolean;
    enableEdgeHoverEvents: boolean | "debounce";
    defaultNodeColor: string;
    defaultNodeType: string;
    defaultEdgeColor: string;
    defaultEdgeType: string;
    labelFont: string;
    labelSize: number;
    labelWeight: string;
    labelColor: {
        attribute: string;
        color?: string;
    } | {
        color: string;
        attribute?: undefined;
    };
    edgeLabelFont: string;
    edgeLabelSize: number;
    edgeLabelWeight: string;
    edgeLabelColor: {
        attribute: string;
        color?: string;
    } | {
        color: string;
        attribute?: undefined;
    };
    stagePadding: number;
    labelDensity: number;
    labelGridCellSize: number;
    labelRenderedSizeThreshold: number;
    nodeReducer: null | ((node: string, data: Attributes) => Partial<NodeDisplayData>);
    edgeReducer: null | ((edge: string, data: Attributes) => Partial<EdgeDisplayData>);
    zIndex: boolean;
    minCameraRatio: null | number;
    maxCameraRatio: null | number;
    labelRenderer: typeof drawLabel;
    hoverRenderer: typeof drawHover;
    edgeLabelRenderer: typeof drawEdgeLabel;
    allowInvalidContainer: boolean;
    nodeProgramClasses: {
        [key: string]: NodeProgramConstructor;
    };
    edgeProgramClasses: {
        [key: string]: EdgeProgramConstructor;
    };
}
export declare const DEFAULT_SETTINGS: Settings;
