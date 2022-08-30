"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../utils");
var node_image_vert_glsl_1 = __importDefault(require("../shaders/node.image.vert.glsl.js"));
var node_image_frag_glsl_1 = __importDefault(require("../shaders/node.image.frag.glsl.js"));
var node_1 = require("./common/node");
var POINTS = 1, ATTRIBUTES = 8, MAX_TEXTURE_SIZE = 100;
// This class only exists for the return typing of `getNodeImageProgram`:
var AbstractNodeImageProgram = /** @class */ (function (_super) {
    __extends(AbstractNodeImageProgram, _super);
    /* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
    function AbstractNodeImageProgram(gl, renderer) {
        return _super.call(this, gl, node_image_vert_glsl_1.default, node_image_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
    }
    AbstractNodeImageProgram.prototype.bind = function () { };
    AbstractNodeImageProgram.prototype.process = function (data, hidden, offset) { };
    AbstractNodeImageProgram.prototype.render = function (params) { };
    AbstractNodeImageProgram.prototype.rebindTexture = function () { };
    return AbstractNodeImageProgram;
}(node_1.AbstractNodeProgram));
/**
 * To share the texture between the program instances of the graph and the
 * hovered nodes (to prevent some flickering, mostly), this program must be
 * "built" for each sigma instance:
 */
function getNodeImageProgram() {
    /**
     * These attributes are shared between all instances of this exact class,
     * returned by this call to getNodeProgramImage:
     */
    var rebindTextureFns = [];
    var images = {};
    var textureImage;
    var hasReceivedImages = false;
    var pendingImagesFrameID = undefined;
    /**
     * Helper to load an image:
     */
    function loadImage(imageSource) {
        if (images[imageSource])
            return;
        var image = new Image();
        image.addEventListener("load", function () {
            images[imageSource] = {
                status: "pending",
                image: image,
            };
            if (typeof pendingImagesFrameID !== "number") {
                pendingImagesFrameID = requestAnimationFrame(function () { return finalizePendingImages(); });
            }
        });
        image.addEventListener("error", function () {
            images[imageSource] = { status: "error" };
        });
        images[imageSource] = { status: "loading" };
        // Load image:
        image.setAttribute("crossOrigin", "");
        image.src = imageSource;
    }
    /**
     * Helper that takes all pending images and adds them into the texture:
     */
    function finalizePendingImages() {
        pendingImagesFrameID = undefined;
        var pendingImages = [];
        // List all pending images:
        for (var id in images) {
            var state = images[id];
            if (state.status === "pending") {
                pendingImages.push({
                    id: id,
                    image: state.image,
                    size: Math.min(state.image.width, state.image.height) || 1,
                });
            }
        }
        // Add images to texture:
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = pendingImages.reduce(function (iter, _a) {
            var size = _a.size;
            return iter + size;
        }, hasReceivedImages ? textureImage.width : 0);
        canvas.height = Math.max.apply(Math, __spreadArray([hasReceivedImages ? textureImage.height : 0], __read(pendingImages.map(function (_a) {
            var size = _a.size;
            return size;
        })), false));
        var xOffset = 0;
        if (hasReceivedImages) {
            ctx.putImageData(textureImage, 0, 0);
            xOffset = textureImage.width;
        }
        pendingImages.forEach(function (_a) {
            var id = _a.id, image = _a.image, size = _a.size;
            var imageSizeInTexture = Math.min(MAX_TEXTURE_SIZE, size);
            // Crop image, to only keep the biggest square, centered:
            var dx = 0, dy = 0;
            if ((image.width || 0) > (image.height || 0)) {
                dx = (image.width - image.height) / 2;
            }
            else {
                dy = (image.height - image.width) / 2;
            }
            ctx.drawImage(image, dx, dy, size, size, xOffset, 0, imageSizeInTexture, imageSizeInTexture);
            // Update image state:
            images[id] = {
                status: "ready",
                x: xOffset,
                y: 0,
                width: imageSizeInTexture,
                height: imageSizeInTexture,
            };
            xOffset += imageSizeInTexture;
        });
        textureImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        hasReceivedImages = true;
        rebindTextureFns.forEach(function (fn) { return fn(); });
    }
    return /** @class */ (function (_super) {
        __extends(NodeImageProgram, _super);
        function NodeImageProgram(gl, renderer) {
            var _this = _super.call(this, gl, node_image_vert_glsl_1.default, node_image_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
            rebindTextureFns.push(function () {
                if (_this && _this.rebindTexture)
                    _this.rebindTexture();
                if (renderer && renderer.refresh)
                    renderer.refresh();
            });
            textureImage = new ImageData(1, 1);
            // Attribute Location
            _this.textureLocation = gl.getAttribLocation(_this.program, "a_texture");
            // Uniform Location
            var atlasLocation = gl.getUniformLocation(_this.program, "u_atlas");
            if (atlasLocation === null)
                throw new Error("NodeProgramImage: error while getting atlasLocation");
            _this.atlasLocation = atlasLocation;
            // Initialize WebGL texture:
            _this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, _this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
            _this.bind();
            return _this;
        }
        NodeImageProgram.prototype.bind = function () {
            _super.prototype.bind.call(this);
            var gl = this.gl;
            gl.enableVertexAttribArray(this.textureLocation);
            gl.vertexAttribPointer(this.textureLocation, 4, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 16);
        };
        NodeImageProgram.prototype.process = function (data, hidden, offset) {
            var array = this.array;
            var i = offset * POINTS * ATTRIBUTES;
            var imageSource = data.image;
            var imageState = imageSource && images[imageSource];
            if (typeof imageSource === "string" && !imageState)
                loadImage(imageSource);
            if (hidden) {
                array[i++] = 0;
                array[i++] = 0;
                array[i++] = 0;
                array[i++] = 0;
                // Texture:
                array[i++] = 0;
                array[i++] = 0;
                array[i++] = 0;
                array[i++] = 0;
                return;
            }
            array[i++] = data.x;
            array[i++] = data.y;
            array[i++] = data.size;
            array[i++] = (0, utils_1.floatColor)(data.color);
            // Reference texture:
            if (imageState && imageState.status === "ready") {
                var width = textureImage.width, height = textureImage.height;
                array[i++] = imageState.x / width;
                array[i++] = imageState.y / height;
                array[i++] = imageState.width / width;
                array[i++] = imageState.height / height;
            }
            else {
                array[i++] = 0;
                array[i++] = 0;
                array[i++] = 0;
                array[i++] = 0;
            }
        };
        NodeImageProgram.prototype.render = function (params) {
            if (this.hasNothingToRender())
                return;
            this.latestRenderParams = params;
            var gl = this.gl;
            var program = this.program;
            gl.useProgram(program);
            gl.uniform1f(this.ratioLocation, 1 / Math.sqrt(params.ratio));
            gl.uniform1f(this.scaleLocation, params.scalingRatio);
            gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
            gl.uniform1i(this.atlasLocation, 0);
            gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
        };
        NodeImageProgram.prototype.rebindTexture = function () {
            var gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
            gl.generateMipmap(gl.TEXTURE_2D);
            if (this.latestRenderParams) {
                this.bind();
                this.bufferData();
                this.render(this.latestRenderParams);
            }
        };
        return NodeImageProgram;
    }(node_1.AbstractNodeProgram));
}
exports.default = getNodeImageProgram;
