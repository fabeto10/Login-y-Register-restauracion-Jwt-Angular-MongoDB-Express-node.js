"use strict";
/**
 * Sigma.js Settings
 * =================================
 *
 * The list of settings and some handy functions.
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SETTINGS = exports.validateSettings = void 0;
var label_1 = __importDefault(require("./rendering/canvas/label"));
var hover_1 = __importDefault(require("./rendering/canvas/hover"));
var edge_label_1 = __importDefault(require("./rendering/canvas/edge-label"));
var node_fast_1 = __importDefault(require("./rendering/webgl/programs/node.fast"));
var edge_1 = __importDefault(require("./rendering/webgl/programs/edge"));
var edge_arrow_1 = __importDefault(require("./rendering/webgl/programs/edge.arrow"));
function validateSettings(settings) {
    if (typeof settings.labelDensity !== "number" || settings.labelDensity < 0) {
        throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
    }
    var minCameraRatio = settings.minCameraRatio, maxCameraRatio = settings.maxCameraRatio;
    if (typeof minCameraRatio === "number" && typeof maxCameraRatio === "number" && maxCameraRatio < minCameraRatio) {
        throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
    }
}
exports.validateSettings = validateSettings;
exports.DEFAULT_SETTINGS = {
    // Performance
    hideEdgesOnMove: false,
    hideLabelsOnMove: false,
    renderLabels: true,
    renderEdgeLabels: false,
    enableEdgeClickEvents: false,
    enableEdgeWheelEvents: false,
    enableEdgeHoverEvents: false,
    // Component rendering
    defaultNodeColor: "#999",
    defaultNodeType: "circle",
    defaultEdgeColor: "#ccc",
    defaultEdgeType: "line",
    labelFont: "Arial",
    labelSize: 14,
    labelWeight: "normal",
    labelColor: { color: "#000" },
    edgeLabelFont: "Arial",
    edgeLabelSize: 14,
    edgeLabelWeight: "normal",
    edgeLabelColor: { attribute: "color" },
    stagePadding: 30,
    // Labels
    labelDensity: 1,
    labelGridCellSize: 100,
    labelRenderedSizeThreshold: 6,
    // Reducers
    nodeReducer: null,
    edgeReducer: null,
    // Features
    zIndex: false,
    minCameraRatio: null,
    maxCameraRatio: null,
    // Renderers
    labelRenderer: label_1.default,
    hoverRenderer: hover_1.default,
    edgeLabelRenderer: edge_label_1.default,
    // Lifecycle
    allowInvalidContainer: false,
    // Program classes
    nodeProgramClasses: {
        circle: node_fast_1.default,
    },
    edgeProgramClasses: {
        arrow: edge_arrow_1.default,
        line: edge_1.default,
    },
};
