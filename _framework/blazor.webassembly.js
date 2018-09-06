/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Boot.WebAssembly.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../modules/jsinterop/src/Microsoft.JSInterop.JS/src/Microsoft.JSInterop.ts":
/*!*********************************************************************************************************************!*\
  !*** C:/Users/stevesa/Documents/Git/Blazor/modules/jsinterop/src/Microsoft.JSInterop.JS/src/Microsoft.JSInterop.ts ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This is a single-file self-contained module to avoid the need for a Webpack build
var DotNet;
(function (DotNet) {
    window.DotNet = DotNet; // Ensure reachable from anywhere
    var jsonRevivers = [];
    var pendingAsyncCalls = {};
    var cachedJSFunctions = {};
    var nextAsyncCallId = 1; // Start at 1 because zero signals "no response needed"
    var dotNetDispatcher = null;
    /**
     * Sets the specified .NET call dispatcher as the current instance so that it will be used
     * for future invocations.
     *
     * @param dispatcher An object that can dispatch calls from JavaScript to a .NET runtime.
     */
    function attachDispatcher(dispatcher) {
        dotNetDispatcher = dispatcher;
    }
    DotNet.attachDispatcher = attachDispatcher;
    /**
     * Adds a JSON reviver callback that will be used when parsing arguments received from .NET.
     * @param reviver The reviver to add.
     */
    function attachReviver(reviver) {
        jsonRevivers.push(reviver);
    }
    DotNet.attachReviver = attachReviver;
    /**
     * Invokes the specified .NET public method synchronously. Not all hosting scenarios support
     * synchronous invocation, so if possible use invokeMethodAsync instead.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns The result of the operation.
     */
    function invokeMethod(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethod(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethod = invokeMethod;
    /**
     * Invokes the specified .NET public method asynchronously.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns A promise representing the result of the operation.
     */
    function invokeMethodAsync(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethodAsync = invokeMethodAsync;
    function invokePossibleInstanceMethod(assemblyName, methodIdentifier, dotNetObjectId, args) {
        var dispatcher = getRequiredDispatcher();
        if (dispatcher.invokeDotNetFromJS) {
            var argsJson = JSON.stringify(args, argReplacer);
            var resultJson = dispatcher.invokeDotNetFromJS(assemblyName, methodIdentifier, dotNetObjectId, argsJson);
            return resultJson ? parseJsonWithRevivers(resultJson) : null;
        }
        else {
            throw new Error('The current dispatcher does not support synchronous calls from JS to .NET. Use invokeMethodAsync instead.');
        }
    }
    function invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, dotNetObjectId, args) {
        var asyncCallId = nextAsyncCallId++;
        var resultPromise = new Promise(function (resolve, reject) {
            pendingAsyncCalls[asyncCallId] = { resolve: resolve, reject: reject };
        });
        try {
            var argsJson = JSON.stringify(args, argReplacer);
            getRequiredDispatcher().beginInvokeDotNetFromJS(asyncCallId, assemblyName, methodIdentifier, dotNetObjectId, argsJson);
        }
        catch (ex) {
            // Synchronous failure
            completePendingCall(asyncCallId, false, ex);
        }
        return resultPromise;
    }
    function getRequiredDispatcher() {
        if (dotNetDispatcher !== null) {
            return dotNetDispatcher;
        }
        throw new Error('No .NET call dispatcher has been set.');
    }
    function completePendingCall(asyncCallId, success, resultOrError) {
        if (!pendingAsyncCalls.hasOwnProperty(asyncCallId)) {
            throw new Error("There is no pending async call with ID " + asyncCallId + ".");
        }
        var asyncCall = pendingAsyncCalls[asyncCallId];
        delete pendingAsyncCalls[asyncCallId];
        if (success) {
            asyncCall.resolve(resultOrError);
        }
        else {
            asyncCall.reject(resultOrError);
        }
    }
    /**
     * Receives incoming calls from .NET and dispatches them to JavaScript.
     */
    DotNet.jsCallDispatcher = {
        /**
         * Finds the JavaScript function matching the specified identifier.
         *
         * @param identifier Identifies the globally-reachable function to be returned.
         * @returns A Function instance.
         */
        findJSFunction: findJSFunction,
        /**
         * Invokes the specified synchronous JavaScript function.
         *
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         * @returns JSON representation of the invocation result.
         */
        invokeJSFromDotNet: function (identifier, argsJson) {
            var result = findJSFunction(identifier).apply(null, parseJsonWithRevivers(argsJson));
            return result === null || result === undefined
                ? null
                : JSON.stringify(result, argReplacer);
        },
        /**
         * Invokes the specified synchronous or asynchronous JavaScript function.
         *
         * @param asyncHandle A value identifying the asynchronous operation. This value will be passed back in a later call to endInvokeJSFromDotNet.
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         */
        beginInvokeJSFromDotNet: function (asyncHandle, identifier, argsJson) {
            // Coerce synchronous functions into async ones, plus treat
            // synchronous exceptions the same as async ones
            var promise = new Promise(function (resolve) {
                var synchronousResultOrPromise = findJSFunction(identifier).apply(null, parseJsonWithRevivers(argsJson));
                resolve(synchronousResultOrPromise);
            });
            // We only listen for a result if the caller wants to be notified about it
            if (asyncHandle) {
                // On completion, dispatch result back to .NET
                // Not using "await" because it codegens a lot of boilerplate
                promise.then(function (result) { return getRequiredDispatcher().beginInvokeDotNetFromJS(0, 'Microsoft.JSInterop', 'DotNetDispatcher.EndInvoke', null, JSON.stringify([asyncHandle, true, result], argReplacer)); }, function (error) { return getRequiredDispatcher().beginInvokeDotNetFromJS(0, 'Microsoft.JSInterop', 'DotNetDispatcher.EndInvoke', null, JSON.stringify([asyncHandle, false, formatError(error)])); });
            }
        },
        /**
         * Receives notification that an async call from JS to .NET has completed.
         * @param asyncCallId The identifier supplied in an earlier call to beginInvokeDotNetFromJS.
         * @param success A flag to indicate whether the operation completed successfully.
         * @param resultOrExceptionMessage Either the operation result or an error message.
         */
        endInvokeDotNetFromJS: function (asyncCallId, success, resultOrExceptionMessage) {
            var resultOrError = success ? resultOrExceptionMessage : new Error(resultOrExceptionMessage);
            completePendingCall(parseInt(asyncCallId), success, resultOrError);
        }
    };
    function parseJsonWithRevivers(json) {
        return json ? JSON.parse(json, function (key, initialValue) {
            // Invoke each reviver in order, passing the output from the previous reviver,
            // so that each one gets a chance to transform the value
            return jsonRevivers.reduce(function (latestValue, reviver) { return reviver(key, latestValue); }, initialValue);
        }) : null;
    }
    function formatError(error) {
        if (error instanceof Error) {
            return error.message + "\n" + error.stack;
        }
        else {
            return error ? error.toString() : 'null';
        }
    }
    function findJSFunction(identifier) {
        if (cachedJSFunctions.hasOwnProperty(identifier)) {
            return cachedJSFunctions[identifier];
        }
        var result = window;
        var resultIdentifier = 'window';
        identifier.split('.').forEach(function (segment) {
            if (segment in result) {
                result = result[segment];
                resultIdentifier += '.' + segment;
            }
            else {
                throw new Error("Could not find '" + segment + "' in '" + resultIdentifier + "'.");
            }
        });
        if (result instanceof Function) {
            return result;
        }
        else {
            throw new Error("The value '" + resultIdentifier + "' is not a function.");
        }
    }
    var DotNetObject = /** @class */ (function () {
        function DotNetObject(_id) {
            this._id = _id;
        }
        DotNetObject.prototype.invokeMethod = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethod(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.invokeMethodAsync = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethodAsync(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.dispose = function () {
            var promise = invokeMethodAsync('Microsoft.JSInterop', 'DotNetDispatcher.ReleaseDotNetObject', this._id);
            promise.catch(function (error) { return console.error(error); });
        };
        DotNetObject.prototype.serializeAsArg = function () {
            return "__dotNetObject:" + this._id;
        };
        return DotNetObject;
    }());
    var dotNetObjectValueFormat = /^__dotNetObject\:(\d+)$/;
    attachReviver(function reviveDotNetObject(key, value) {
        if (typeof value === 'string') {
            var match = value.match(dotNetObjectValueFormat);
            if (match) {
                return new DotNetObject(parseInt(match[1]));
            }
        }
        // Unrecognized - let another reviver handle it
        return value;
    });
    function argReplacer(key, value) {
        return value instanceof DotNetObject ? value.serializeAsArg() : value;
    }
})(DotNet || (DotNet = {}));


/***/ }),

/***/ "./src/Boot.WebAssembly.ts":
/*!*********************************!*\
  !*** ./src/Boot.WebAssembly.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../../modules/jsinterop/src/Microsoft.JSInterop.JS/src/Microsoft.JSInterop */ "../../modules/jsinterop/src/Microsoft.JSInterop.JS/src/Microsoft.JSInterop.ts");
__webpack_require__(/*! ./GlobalExports */ "./src/GlobalExports.ts");
var Environment = __webpack_require__(/*! ./Environment */ "./src/Environment.ts");
var MonoPlatform_1 = __webpack_require__(/*! ./Platform/Mono/MonoPlatform */ "./src/Platform/Mono/MonoPlatform.ts");
var Url_1 = __webpack_require__(/*! ./Platform/Url */ "./src/Platform/Url.ts");
var Renderer_1 = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
var SharedMemoryRenderBatch_1 = __webpack_require__(/*! ./Rendering/RenderBatch/SharedMemoryRenderBatch */ "./src/Rendering/RenderBatch/SharedMemoryRenderBatch.ts");
var BootCommon_1 = __webpack_require__(/*! ./BootCommon */ "./src/BootCommon.ts");
function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var platform, bootConfig, embeddedResourcesPromise, loadAssemblyUrls, ex_1, mainAssemblyName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    platform = Environment.setPlatform(MonoPlatform_1.monoPlatform);
                    window['Blazor'].platform = platform;
                    window['Blazor']._internal.renderBatch = function (browserRendererId, batchAddress) {
                        Renderer_1.renderBatch(browserRendererId, new SharedMemoryRenderBatch_1.SharedMemoryRenderBatch(batchAddress));
                    };
                    return [4 /*yield*/, BootCommon_1.fetchBootConfigAsync()];
                case 1:
                    bootConfig = _a.sent();
                    embeddedResourcesPromise = BootCommon_1.loadEmbeddedResourcesAsync(bootConfig);
                    if (!bootConfig.linkerEnabled) {
                        console.info('Blazor is running in dev mode without IL stripping. To make the bundle size significantly smaller, publish the application or see https://go.microsoft.com/fwlink/?linkid=870414');
                    }
                    loadAssemblyUrls = [bootConfig.main]
                        .concat(bootConfig.assemblyReferences)
                        .map(function (filename) { return "_framework/_bin/" + filename; });
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, platform.start(loadAssemblyUrls)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    throw new Error("Failed to start platform. Reason: " + ex_1);
                case 5: 
                // Before we start running .NET code, be sure embedded content resources are all loaded
                return [4 /*yield*/, embeddedResourcesPromise];
                case 6:
                    // Before we start running .NET code, be sure embedded content resources are all loaded
                    _a.sent();
                    mainAssemblyName = Url_1.getAssemblyNameFromUrl(bootConfig.main);
                    platform.callEntryPoint(mainAssemblyName, bootConfig.entryPoint, []);
                    return [2 /*return*/];
            }
        });
    });
}
boot();


/***/ }),

/***/ "./src/BootCommon.ts":
/*!***************************!*\
  !*** ./src/BootCommon.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchBootConfigAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var bootConfigResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('_framework/blazor.boot.json', { method: 'Get', credentials: 'include' })];
                case 1:
                    bootConfigResponse = _a.sent();
                    return [2 /*return*/, bootConfigResponse.json()];
            }
        });
    });
}
exports.fetchBootConfigAsync = fetchBootConfigAsync;
function loadEmbeddedResourcesAsync(bootConfig) {
    var cssLoadingPromises = bootConfig.cssReferences.map(function (cssReference) {
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = cssReference;
        return loadResourceFromElement(linkElement);
    });
    var jsLoadingPromises = bootConfig.jsReferences.map(function (jsReference) {
        var scriptElement = document.createElement('script');
        scriptElement.src = jsReference;
        return loadResourceFromElement(scriptElement);
    });
    return Promise.all(cssLoadingPromises.concat(jsLoadingPromises));
}
exports.loadEmbeddedResourcesAsync = loadEmbeddedResourcesAsync;
function loadResourceFromElement(element) {
    return new Promise(function (resolve, reject) {
        element.onload = resolve;
        element.onerror = reject;
        document.head.appendChild(element);
    });
}


/***/ }),

/***/ "./src/Environment.ts":
/*!****************************!*\
  !*** ./src/Environment.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setPlatform(platformInstance) {
    exports.platform = platformInstance;
    return exports.platform;
}
exports.setPlatform = setPlatform;


/***/ }),

/***/ "./src/GlobalExports.ts":
/*!******************************!*\
  !*** ./src/GlobalExports.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UriHelper_1 = __webpack_require__(/*! ./Services/UriHelper */ "./src/Services/UriHelper.ts");
var Http_1 = __webpack_require__(/*! ./Services/Http */ "./src/Services/Http.ts");
var Renderer_1 = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
// Make the following APIs available in global scope for invocation from JS
window['Blazor'] = {
    navigateTo: UriHelper_1.navigateTo,
    _internal: {
        attachRootComponentToElement: Renderer_1.attachRootComponentToElement,
        http: Http_1.internalFunctions,
        uriHelper: UriHelper_1.internalFunctions
    }
};


/***/ }),

/***/ "./src/Platform/Mono/MonoDebugger.ts":
/*!*******************************************!*\
  !*** ./src/Platform/Mono/MonoDebugger.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Url_1 = __webpack_require__(/*! ../Url */ "./src/Platform/Url.ts");
var currentBrowserIsChrome = window.chrome
    && navigator.userAgent.indexOf('Edge') < 0; // Edge pretends to be Chrome
var hasReferencedPdbs = false;
function hasDebuggingEnabled() {
    return hasReferencedPdbs && currentBrowserIsChrome;
}
exports.hasDebuggingEnabled = hasDebuggingEnabled;
function attachDebuggerHotkey(loadAssemblyUrls) {
    hasReferencedPdbs = loadAssemblyUrls
        .some(function (url) { return /\.pdb$/.test(Url_1.getFileNameFromUrl(url)); });
    // Use the combination shift+alt+D because it isn't used by the major browsers
    // for anything else by default
    var altKeyName = navigator.platform.match(/^Mac/i) ? 'Cmd' : 'Alt';
    if (hasDebuggingEnabled()) {
        console.info("Debugging hotkey: Shift+" + altKeyName + "+D (when application has focus)");
    }
    // Even if debugging isn't enabled, we register the hotkey so we can report why it's not enabled
    document.addEventListener('keydown', function (evt) {
        if (evt.shiftKey && (evt.metaKey || evt.altKey) && evt.code === 'KeyD') {
            if (!hasReferencedPdbs) {
                console.error('Cannot start debugging, because the application was not compiled with debugging enabled.');
            }
            else if (!currentBrowserIsChrome) {
                console.error('Currently, only Chrome is supported for debugging.');
            }
            else {
                launchDebugger();
            }
        }
    });
}
exports.attachDebuggerHotkey = attachDebuggerHotkey;
function launchDebugger() {
    // The noopener flag is essential, because otherwise Chrome tracks the association with the
    // parent tab, and then when the parent tab pauses in the debugger, the child tab does so
    // too (even if it's since navigated to a different page). This means that the debugger
    // itself freezes, and not just the page being debugged.
    //
    // We have to construct a link element and simulate a click on it, because the more obvious
    // window.open(..., 'noopener') always opens a new window instead of a new tab.
    var link = document.createElement('a');
    link.href = "_framework/debug?url=" + encodeURIComponent(location.href);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
}


/***/ }),

/***/ "./src/Platform/Mono/MonoPlatform.ts":
/*!*******************************************!*\
  !*** ./src/Platform/Mono/MonoPlatform.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Url_1 = __webpack_require__(/*! ../Url */ "./src/Platform/Url.ts");
var MonoDebugger_1 = __webpack_require__(/*! ./MonoDebugger */ "./src/Platform/Mono/MonoDebugger.ts");
var assemblyHandleCache = {};
var typeHandleCache = {};
var methodHandleCache = {};
var assembly_load;
var find_class;
var find_method;
var invoke_method;
var mono_string_get_utf8;
var mono_string;
var appBinDirName = 'appBinDir';
exports.monoPlatform = {
    start: function start(loadAssemblyUrls) {
        return new Promise(function (resolve, reject) {
            MonoDebugger_1.attachDebuggerHotkey(loadAssemblyUrls);
            // mono.js assumes the existence of this
            window['Browser'] = {
                init: function () { }
            };
            // Emscripten works by expecting the module config to be a global
            window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);
            addScriptTagsToDocument();
        });
    },
    findMethod: findMethod,
    callEntryPoint: function callEntryPoint(assemblyName, entrypointMethod, args) {
        // Parse the entrypointMethod, which is of the form MyApp.MyNamespace.MyTypeName::MyMethodName
        // Note that we don't support specifying a method overload, so it has to be unique
        var entrypointSegments = entrypointMethod.split('::');
        if (entrypointSegments.length != 2) {
            throw new Error('Malformed entry point method name; could not resolve class name and method name.');
        }
        var typeFullName = entrypointSegments[0];
        var methodName = entrypointSegments[1];
        var lastDot = typeFullName.lastIndexOf('.');
        var namespace = lastDot > -1 ? typeFullName.substring(0, lastDot) : '';
        var typeShortName = lastDot > -1 ? typeFullName.substring(lastDot + 1) : typeFullName;
        var entryPointMethodHandle = exports.monoPlatform.findMethod(assemblyName, namespace, typeShortName, methodName);
        exports.monoPlatform.callMethod(entryPointMethodHandle, null, args);
    },
    callMethod: function callMethod(method, target, args) {
        if (args.length > 4) {
            // Hopefully this restriction can be eased soon, but for now make it clear what's going on
            throw new Error("Currently, MonoPlatform supports passing a maximum of 4 arguments from JS to .NET. You tried to pass " + args.length + ".");
        }
        var stack = Module.stackSave();
        try {
            var argsBuffer = Module.stackAlloc(args.length);
            var exceptionFlagManagedInt = Module.stackAlloc(4);
            for (var i = 0; i < args.length; ++i) {
                Module.setValue(argsBuffer + i * 4, args[i], 'i32');
            }
            Module.setValue(exceptionFlagManagedInt, 0, 'i32');
            var res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);
            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
                // If the exception flag is set, the returned value is exception.ToString()
                throw new Error(exports.monoPlatform.toJavaScriptString(res));
            }
            return res;
        }
        finally {
            Module.stackRestore(stack);
        }
    },
    toJavaScriptString: function toJavaScriptString(managedString) {
        // Comments from original Mono sample:
        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.
        var utf8 = mono_string_get_utf8(managedString);
        var res = Module.UTF8ToString(utf8);
        Module._free(utf8);
        return res;
    },
    toDotNetString: function toDotNetString(jsString) {
        return mono_string(jsString);
    },
    toUint8Array: function toUint8Array(array) {
        var dataPtr = getArrayDataPointer(array);
        var length = Module.getValue(dataPtr, 'i32');
        return new Uint8Array(Module.HEAPU8.buffer, dataPtr + 4, length);
    },
    getArrayLength: function getArrayLength(array) {
        return Module.getValue(getArrayDataPointer(array), 'i32');
    },
    getArrayEntryPtr: function getArrayEntryPtr(array, index, itemSize) {
        // First byte is array length, followed by entries
        var address = getArrayDataPointer(array) + 4 + index * itemSize;
        return address;
    },
    getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject) {
        // The first two int32 values are internal Mono data
        return (referenceTypedObject + 8);
    },
    readInt32Field: function readHeapInt32(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readFloatField: function readHeapFloat(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'float');
    },
    readObjectField: function readHeapObject(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readStringField: function readHeapObject(baseAddress, fieldOffset) {
        var fieldValue = Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
        return fieldValue === 0 ? null : exports.monoPlatform.toJavaScriptString(fieldValue);
    },
    readStructField: function readStructField(baseAddress, fieldOffset) {
        return (baseAddress + (fieldOffset || 0));
    },
};
function findAssembly(assemblyName) {
    var assemblyHandle = assemblyHandleCache[assemblyName];
    if (!assemblyHandle) {
        assemblyHandle = assembly_load(assemblyName);
        if (!assemblyHandle) {
            throw new Error("Could not find assembly \"" + assemblyName + "\"");
        }
        assemblyHandleCache[assemblyName] = assemblyHandle;
    }
    return assemblyHandle;
}
function findType(assemblyName, namespace, className) {
    var fullyQualifiedTypeName = "[" + assemblyName + "]" + namespace + "." + className;
    var typeHandle = typeHandleCache[fullyQualifiedTypeName];
    if (!typeHandle) {
        typeHandle = find_class(findAssembly(assemblyName), namespace, className);
        if (!typeHandle) {
            throw new Error("Could not find type \"" + className + "\" in namespace \"" + namespace + "\" in assembly \"" + assemblyName + "\"");
        }
        typeHandleCache[fullyQualifiedTypeName] = typeHandle;
    }
    return typeHandle;
}
function findMethod(assemblyName, namespace, className, methodName) {
    var fullyQualifiedMethodName = "[" + assemblyName + "]" + namespace + "." + className + "::" + methodName;
    var methodHandle = methodHandleCache[fullyQualifiedMethodName];
    if (!methodHandle) {
        methodHandle = find_method(findType(assemblyName, namespace, className), methodName, -1);
        if (!methodHandle) {
            throw new Error("Could not find method \"" + methodName + "\" on type \"" + namespace + "." + className + "\"");
        }
        methodHandleCache[fullyQualifiedMethodName] = methodHandle;
    }
    return methodHandle;
}
function addScriptTagsToDocument() {
    // Load either the wasm or asm.js version of the Mono runtime
    var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    var monoRuntimeUrlBase = '_framework/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
    var monoRuntimeScriptUrl = monoRuntimeUrlBase + "/mono.js";
    if (!browserSupportsNativeWebAssembly) {
        // In the asmjs case, the initial memory structure is in a separate file we need to download
        var meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
        meminitXHR.open('GET', monoRuntimeUrlBase + "/mono.js.mem");
        meminitXHR.responseType = 'arraybuffer';
        meminitXHR.send(undefined);
    }
    var scriptElem = document.createElement('script');
    scriptElem.src = monoRuntimeScriptUrl;
    scriptElem.defer = true;
    document.body.appendChild(scriptElem);
}
function createEmscriptenModuleInstance(loadAssemblyUrls, onReady, onError) {
    var module = {};
    var wasmBinaryFile = '_framework/wasm/mono.wasm';
    var asmjsCodeFile = '_framework/asmjs/mono.asm.js';
    var suppressMessages = ['DEBUGGING ENABLED'];
    module.print = function (line) { return (suppressMessages.indexOf(line) < 0 && console.log("WASM: " + line)); };
    module.printErr = function (line) { return console.error("WASM: " + line); };
    module.preRun = [];
    module.postRun = [];
    module.preloadPlugins = [];
    module.locateFile = function (fileName) {
        switch (fileName) {
            case 'mono.wasm': return wasmBinaryFile;
            case 'mono.asm.js': return asmjsCodeFile;
            default: return fileName;
        }
    };
    module.preRun.push(function () {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
        find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
        find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
        invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
        mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
        mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);
        Module.FS_createPath('/', appBinDirName, true, true);
        MONO.loaded_files = [];
        loadAssemblyUrls.forEach(function (url) {
            var filename = Url_1.getFileNameFromUrl(url);
            var runDependencyId = "blazor:" + filename;
            addRunDependency(runDependencyId);
            asyncLoad(url).then(function (data) {
                Module.FS_createDataFile(appBinDirName, filename, data, true, false, false);
                MONO.loaded_files.push(toAbsoluteUrl(url));
                removeRunDependency(runDependencyId);
            }, function (errorInfo) {
                // If it's a 404 on a .pdb, we don't want to block the app from starting up.
                // We'll just skip that file and continue (though the 404 is logged in the console).
                // This happens if you build a Debug build but then run in Production environment.
                var isPdb404 = errorInfo instanceof XMLHttpRequest
                    && errorInfo.status === 404
                    && filename.match(/\.pdb$/);
                if (!isPdb404) {
                    onError(errorInfo);
                }
                removeRunDependency(runDependencyId);
            });
        });
    });
    module.postRun.push(function () {
        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string', 'number']);
        load_runtime(appBinDirName, MonoDebugger_1.hasDebuggingEnabled() ? 1 : 0);
        MONO.mono_wasm_runtime_is_ready = true;
        attachInteropInvoker();
        onReady();
    });
    return module;
}
var anchorTagForAbsoluteUrlConversions = document.createElement('a');
function toAbsoluteUrl(possiblyRelativeUrl) {
    anchorTagForAbsoluteUrlConversions.href = possiblyRelativeUrl;
    return anchorTagForAbsoluteUrlConversions.href;
}
function asyncLoad(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', url, /* async: */ true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                var asm = new Uint8Array(xhr.response);
                resolve(asm);
            }
            else {
                reject(xhr);
            }
        };
        xhr.onerror = reject;
        xhr.send(undefined);
    });
}
function getArrayDataPointer(array) {
    return array + 12; // First byte from here is length, then following bytes are entries
}
function attachInteropInvoker() {
    var dotNetDispatcherInvokeMethodHandle = findMethod('Mono.WebAssembly.Interop', 'Mono.WebAssembly.Interop', 'MonoWebAssemblyJSRuntime', 'InvokeDotNet');
    var dotNetDispatcherBeginInvokeMethodHandle = findMethod('Mono.WebAssembly.Interop', 'Mono.WebAssembly.Interop', 'MonoWebAssemblyJSRuntime', 'BeginInvokeDotNet');
    DotNet.attachDispatcher({
        beginInvokeDotNetFromJS: function (callId, assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            // As a current limitation, we can only pass 4 args. Fortunately we only need one of
            // 'assemblyName' or 'dotNetObjectId', so overload them in a single slot
            var assemblyNameOrDotNetObjectId = dotNetObjectId
                ? dotNetObjectId.toString()
                : assemblyName;
            exports.monoPlatform.callMethod(dotNetDispatcherBeginInvokeMethodHandle, null, [
                callId ? exports.monoPlatform.toDotNetString(callId.toString()) : null,
                exports.monoPlatform.toDotNetString(assemblyNameOrDotNetObjectId),
                exports.monoPlatform.toDotNetString(methodIdentifier),
                exports.monoPlatform.toDotNetString(argsJson)
            ]);
        },
        invokeDotNetFromJS: function (assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            var resultJsonStringPtr = exports.monoPlatform.callMethod(dotNetDispatcherInvokeMethodHandle, null, [
                assemblyName ? exports.monoPlatform.toDotNetString(assemblyName) : null,
                exports.monoPlatform.toDotNetString(methodIdentifier),
                dotNetObjectId ? exports.monoPlatform.toDotNetString(dotNetObjectId.toString()) : null,
                exports.monoPlatform.toDotNetString(argsJson)
            ]);
            return resultJsonStringPtr
                ? exports.monoPlatform.toJavaScriptString(resultJsonStringPtr)
                : null;
        },
    });
}


/***/ }),

/***/ "./src/Platform/Url.ts":
/*!*****************************!*\
  !*** ./src/Platform/Url.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getFileNameFromUrl(url) {
    // This could also be called "get last path segment from URL", but the primary
    // use case is to extract things that look like filenames
    var lastSegment = url.substring(url.lastIndexOf('/') + 1);
    var queryStringStartPos = lastSegment.indexOf('?');
    return queryStringStartPos < 0 ? lastSegment : lastSegment.substring(0, queryStringStartPos);
}
exports.getFileNameFromUrl = getFileNameFromUrl;
function getAssemblyNameFromUrl(url) {
    return getFileNameFromUrl(url).replace(/\.dll$/, '');
}
exports.getAssemblyNameFromUrl = getAssemblyNameFromUrl;


/***/ }),

/***/ "./src/Rendering/BrowserRenderer.ts":
/*!******************************************!*\
  !*** ./src/Rendering/BrowserRenderer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderBatch_1 = __webpack_require__(/*! ./RenderBatch/RenderBatch */ "./src/Rendering/RenderBatch/RenderBatch.ts");
var EventDelegator_1 = __webpack_require__(/*! ./EventDelegator */ "./src/Rendering/EventDelegator.ts");
var LogicalElements_1 = __webpack_require__(/*! ./LogicalElements */ "./src/Rendering/LogicalElements.ts");
var ElementReferenceCapture_1 = __webpack_require__(/*! ./ElementReferenceCapture */ "./src/Rendering/ElementReferenceCapture.ts");
var selectValuePropname = '_blazorSelectValue';
var sharedTemplateElemForParsing = document.createElement('template');
var sharedSvgElemForParsing = document.createElementNS('http://www.w3.org/2000/svg', 'g');
var preventDefaultEvents = { submit: true };
var raiseEventMethod;
var renderComponentMethod;
var BrowserRenderer = /** @class */ (function () {
    function BrowserRenderer(browserRendererId) {
        var _this = this;
        this.browserRendererId = browserRendererId;
        this.childComponentLocations = {};
        this.eventDelegator = new EventDelegator_1.EventDelegator(function (event, componentId, eventHandlerId, eventArgs) {
            raiseEvent(event, _this.browserRendererId, componentId, eventHandlerId, eventArgs);
        });
    }
    BrowserRenderer.prototype.attachRootComponentToElement = function (componentId, element) {
        this.attachComponentToElement(componentId, LogicalElements_1.toLogicalElement(element));
    };
    BrowserRenderer.prototype.updateComponent = function (batch, componentId, edits, referenceFrames) {
        var element = this.childComponentLocations[componentId];
        if (!element) {
            throw new Error("No element is currently associated with component " + componentId);
        }
        this.applyEdits(batch, componentId, element, 0, edits, referenceFrames);
    };
    BrowserRenderer.prototype.disposeComponent = function (componentId) {
        delete this.childComponentLocations[componentId];
    };
    BrowserRenderer.prototype.disposeEventHandler = function (eventHandlerId) {
        this.eventDelegator.removeListener(eventHandlerId);
    };
    BrowserRenderer.prototype.attachComponentToElement = function (componentId, element) {
        this.childComponentLocations[componentId] = element;
    };
    BrowserRenderer.prototype.applyEdits = function (batch, componentId, parent, childIndex, edits, referenceFrames) {
        var currentDepth = 0;
        var childIndexAtCurrentDepth = childIndex;
        var arraySegmentReader = batch.arraySegmentReader;
        var editReader = batch.editReader;
        var frameReader = batch.frameReader;
        var editsValues = arraySegmentReader.values(edits);
        var editsOffset = arraySegmentReader.offset(edits);
        var editsLength = arraySegmentReader.count(edits);
        var maxEditIndexExcl = editsOffset + editsLength;
        for (var editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
            var edit = batch.diffReader.editsEntry(editsValues, editIndex);
            var editType = editReader.editType(edit);
            switch (editType) {
                case RenderBatch_1.EditType.prependFrame: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    this.insertFrame(batch, componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
                    break;
                }
                case RenderBatch_1.EditType.removeFrame: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    break;
                }
                case RenderBatch_1.EditType.setAttribute: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof Element) {
                        this.applyAttribute(batch, componentId, element, frame);
                    }
                    else {
                        throw new Error("Cannot set attribute on non-element child");
                    }
                    break;
                }
                case RenderBatch_1.EditType.removeAttribute: {
                    // Note that we don't have to dispose the info we track about event handlers here, because the
                    // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        var attributeName = editReader.removedAttributeName(edit);
                        // First try to remove any special property we use for this attribute
                        if (!this.tryApplySpecialProperty(batch, element, attributeName, null)) {
                            // If that's not applicable, it's a regular DOM attribute so remove that
                            element.removeAttribute(attributeName);
                        }
                    }
                    else {
                        throw new Error("Cannot remove attribute from non-element child");
                    }
                    break;
                }
                case RenderBatch_1.EditType.updateText: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var textNode = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (textNode instanceof Text) {
                        textNode.textContent = frameReader.textContent(frame);
                    }
                    else {
                        throw new Error("Cannot set text content on non-text child");
                    }
                    break;
                }
                case RenderBatch_1.EditType.updateMarkup: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    this.insertMarkup(batch, parent, childIndexAtCurrentDepth + siblingIndex, frame);
                    break;
                }
                case RenderBatch_1.EditType.stepIn: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    parent = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    currentDepth++;
                    childIndexAtCurrentDepth = 0;
                    break;
                }
                case RenderBatch_1.EditType.stepOut: {
                    parent = LogicalElements_1.getLogicalParent(parent);
                    currentDepth--;
                    childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
                    break;
                }
                default: {
                    var unknownType = editType; // Compile-time verification that the switch was exhaustive
                    throw new Error("Unknown edit type: " + unknownType);
                }
            }
        }
    };
    BrowserRenderer.prototype.insertFrame = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var frameType = frameReader.frameType(frame);
        switch (frameType) {
            case RenderBatch_1.FrameType.element:
                this.insertElement(batch, componentId, parent, childIndex, frames, frame, frameIndex);
                return 1;
            case RenderBatch_1.FrameType.text:
                this.insertText(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.attribute:
                throw new Error('Attribute frames should only be present as leading children of element frames.');
            case RenderBatch_1.FrameType.component:
                this.insertComponent(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.region:
                return this.insertFrameRange(batch, componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + frameReader.subtreeLength(frame));
            case RenderBatch_1.FrameType.elementReferenceCapture:
                if (parent instanceof Element) {
                    ElementReferenceCapture_1.applyCaptureIdToElement(parent, frameReader.elementReferenceCaptureId(frame));
                    return 0; // A "capture" is a child in the diff, but has no node in the DOM
                }
                else {
                    throw new Error('Reference capture frames can only be children of element frames.');
                }
            case RenderBatch_1.FrameType.markup:
                this.insertMarkup(batch, parent, childIndex, frame);
                return 1;
            default:
                var unknownType = frameType; // Compile-time verification that the switch was exhaustive
                throw new Error("Unknown frame type: " + unknownType);
        }
    };
    BrowserRenderer.prototype.insertElement = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var tagName = frameReader.elementName(frame);
        var newDomElementRaw = tagName === 'svg' || LogicalElements_1.isSvgElement(parent) ?
            document.createElementNS('http://www.w3.org/2000/svg', tagName) :
            document.createElement(tagName);
        var newElement = LogicalElements_1.toLogicalElement(newDomElementRaw);
        LogicalElements_1.insertLogicalChild(newDomElementRaw, parent, childIndex);
        // Apply attributes
        var descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
        for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
            var descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);
            if (frameReader.frameType(descendantFrame) === RenderBatch_1.FrameType.attribute) {
                this.applyAttribute(batch, componentId, newDomElementRaw, descendantFrame);
            }
            else {
                // As soon as we see a non-attribute child, all the subsequent child frames are
                // not attributes, so bail out and insert the remnants recursively
                this.insertFrameRange(batch, componentId, newElement, 0, frames, descendantIndex, descendantsEndIndexExcl);
                break;
            }
        }
    };
    BrowserRenderer.prototype.insertComponent = function (batch, parent, childIndex, frame) {
        var containerElement = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        // All we have to do is associate the child component ID with its location. We don't actually
        // do any rendering here, because the diff for the child will appear later in the render batch.
        var childComponentId = batch.frameReader.componentId(frame);
        this.attachComponentToElement(childComponentId, containerElement);
    };
    BrowserRenderer.prototype.insertText = function (batch, parent, childIndex, textFrame) {
        var textContent = batch.frameReader.textContent(textFrame);
        var newTextNode = document.createTextNode(textContent);
        LogicalElements_1.insertLogicalChild(newTextNode, parent, childIndex);
    };
    BrowserRenderer.prototype.insertMarkup = function (batch, parent, childIndex, markupFrame) {
        var markupContainer = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        var markupContent = batch.frameReader.markupContent(markupFrame);
        var parsedMarkup = parseMarkup(markupContent, LogicalElements_1.isSvgElement(parent));
        var logicalSiblingIndex = 0;
        while (parsedMarkup.firstChild) {
            LogicalElements_1.insertLogicalChild(parsedMarkup.firstChild, markupContainer, logicalSiblingIndex++);
        }
    };
    BrowserRenderer.prototype.applyAttribute = function (batch, componentId, toDomElement, attributeFrame) {
        var frameReader = batch.frameReader;
        var attributeName = frameReader.attributeName(attributeFrame);
        var browserRendererId = this.browserRendererId;
        var eventHandlerId = frameReader.attributeEventHandlerId(attributeFrame);
        if (eventHandlerId) {
            var firstTwoChars = attributeName.substring(0, 2);
            var eventName = attributeName.substring(2);
            if (firstTwoChars !== 'on' || !eventName) {
                throw new Error("Attribute has nonzero event handler ID, but attribute name '" + attributeName + "' does not start with 'on'.");
            }
            this.eventDelegator.setListener(toDomElement, eventName, componentId, eventHandlerId);
            return;
        }
        // First see if we have special handling for this attribute
        if (!this.tryApplySpecialProperty(batch, toDomElement, attributeName, attributeFrame)) {
            // If not, treat it as a regular string-valued attribute
            toDomElement.setAttribute(attributeName, frameReader.attributeValue(attributeFrame));
        }
    };
    BrowserRenderer.prototype.tryApplySpecialProperty = function (batch, element, attributeName, attributeFrame) {
        switch (attributeName) {
            case 'value':
                return this.tryApplyValueProperty(batch, element, attributeFrame);
            case 'checked':
                return this.tryApplyCheckedProperty(batch, element, attributeFrame);
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyValueProperty = function (batch, element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'value' property
        var frameReader = batch.frameReader;
        switch (element.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA': {
                var value = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
                element.value = value;
                if (element.tagName === 'SELECT') {
                    // <select> is special, in that anything we write to .value will be lost if there
                    // isn't yet a matching <option>. To maintain the expected behavior no matter the
                    // element insertion/update order, preserve the desired value separately so
                    // we can recover it when inserting any matching <option>.
                    element[selectValuePropname] = value;
                }
                return true;
            }
            case 'OPTION': {
                var value = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
                if (value) {
                    element.setAttribute('value', value);
                }
                else {
                    element.removeAttribute('value');
                }
                // See above for why we have this special handling for <select>/<option>
                var parentElement = element.parentElement;
                if (parentElement && (selectValuePropname in parentElement) && parentElement[selectValuePropname] === value) {
                    this.tryApplyValueProperty(batch, parentElement, attributeFrame);
                    delete parentElement[selectValuePropname];
                }
                return true;
            }
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyCheckedProperty = function (batch, element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'checked' property
        if (element.tagName === 'INPUT') {
            var value = attributeFrame ? batch.frameReader.attributeValue(attributeFrame) : null;
            element.checked = value !== null;
            return true;
        }
        else {
            return false;
        }
    };
    BrowserRenderer.prototype.insertFrameRange = function (batch, componentId, parent, childIndex, frames, startIndex, endIndexExcl) {
        var origChildIndex = childIndex;
        for (var index = startIndex; index < endIndexExcl; index++) {
            var frame = batch.referenceFramesEntry(frames, index);
            var numChildrenInserted = this.insertFrame(batch, componentId, parent, childIndex, frames, frame, index);
            childIndex += numChildrenInserted;
            // Skip over any descendants, since they are already dealt with recursively
            index += countDescendantFrames(batch, frame);
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function parseMarkup(markup, isSvg) {
    if (isSvg) {
        sharedSvgElemForParsing.innerHTML = markup || ' ';
        return sharedSvgElemForParsing;
    }
    else {
        sharedTemplateElemForParsing.innerHTML = markup || ' ';
        return sharedTemplateElemForParsing.content;
    }
}
function countDescendantFrames(batch, frame) {
    var frameReader = batch.frameReader;
    switch (frameReader.frameType(frame)) {
        // The following frame types have a subtree length. Other frames may use that memory slot
        // to mean something else, so we must not read it. We should consider having nominal subtypes
        // of RenderTreeFramePointer that prevent access to non-applicable fields.
        case RenderBatch_1.FrameType.component:
        case RenderBatch_1.FrameType.element:
        case RenderBatch_1.FrameType.region:
            return frameReader.subtreeLength(frame) - 1;
        default:
            return 0;
    }
}
function raiseEvent(event, browserRendererId, componentId, eventHandlerId, eventArgs) {
    if (preventDefaultEvents[event.type]) {
        event.preventDefault();
    }
    var eventDescriptor = {
        browserRendererId: browserRendererId,
        componentId: componentId,
        eventHandlerId: eventHandlerId,
        eventArgsType: eventArgs.type
    };
    return DotNet.invokeMethodAsync('Microsoft.AspNetCore.Blazor.Browser', 'DispatchEvent', eventDescriptor, JSON.stringify(eventArgs.data));
}


/***/ }),

/***/ "./src/Rendering/ElementReferenceCapture.ts":
/*!**************************************************!*\
  !*** ./src/Rendering/ElementReferenceCapture.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function applyCaptureIdToElement(element, referenceCaptureId) {
    element.setAttribute(getCaptureIdAttributeName(referenceCaptureId), '');
}
exports.applyCaptureIdToElement = applyCaptureIdToElement;
function getElementByCaptureId(referenceCaptureId) {
    var selector = "[" + getCaptureIdAttributeName(referenceCaptureId) + "]";
    return document.querySelector(selector);
}
function getCaptureIdAttributeName(referenceCaptureId) {
    return "_bl_" + referenceCaptureId;
}
// Support receiving ElementRef instances as args in interop calls
var elementRefKey = '_blazorElementRef'; // Keep in sync with ElementRef.cs
DotNet.attachReviver(function (key, value) {
    if (value && typeof value === 'object' && value.hasOwnProperty(elementRefKey) && typeof value[elementRefKey] === 'string') {
        return getElementByCaptureId(value[elementRefKey]);
    }
    else {
        return value;
    }
});


/***/ }),

/***/ "./src/Rendering/EventDelegator.ts":
/*!*****************************************!*\
  !*** ./src/Rendering/EventDelegator.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(/*! ./EventForDotNet */ "./src/Rendering/EventForDotNet.ts");
var nonBubblingEvents = toLookup([
    'abort', 'blur', 'change', 'error', 'focus', 'load', 'loadend', 'loadstart', 'mouseenter', 'mouseleave',
    'progress', 'reset', 'scroll', 'submit', 'unload', 'DOMNodeInsertedIntoDocument', 'DOMNodeRemovedFromDocument'
]);
// Responsible for adding/removing the eventInfo on an expando property on DOM elements, and
// calling an EventInfoStore that deals with registering/unregistering the underlying delegated
// event listeners as required (and also maps actual events back to the given callback).
var EventDelegator = /** @class */ (function () {
    function EventDelegator(onEvent) {
        this.onEvent = onEvent;
        var eventDelegatorId = ++EventDelegator.nextEventDelegatorId;
        this.eventsCollectionKey = "_blazorEvents_" + eventDelegatorId;
        this.eventInfoStore = new EventInfoStore(this.onGlobalEvent.bind(this));
    }
    EventDelegator.prototype.setListener = function (element, eventName, componentId, eventHandlerId) {
        // Ensure we have a place to store event info for this element
        var infoForElement = element[this.eventsCollectionKey];
        if (!infoForElement) {
            infoForElement = element[this.eventsCollectionKey] = {};
        }
        if (infoForElement.hasOwnProperty(eventName)) {
            // We can cheaply update the info on the existing object and don't need any other housekeeping
            var oldInfo = infoForElement[eventName];
            this.eventInfoStore.update(oldInfo.eventHandlerId, eventHandlerId);
        }
        else {
            // Go through the whole flow which might involve registering a new global handler
            var newInfo = { element: element, eventName: eventName, componentId: componentId, eventHandlerId: eventHandlerId };
            this.eventInfoStore.add(newInfo);
            infoForElement[eventName] = newInfo;
        }
    };
    EventDelegator.prototype.removeListener = function (eventHandlerId) {
        // This method gets called whenever the .NET-side code reports that a certain event handler
        // has been disposed. However we will already have disposed the info about that handler if
        // the eventHandlerId for the (element,eventName) pair was replaced during diff application.
        var info = this.eventInfoStore.remove(eventHandlerId);
        if (info) {
            // Looks like this event handler wasn't already disposed
            // Remove the associated data from the DOM element
            var element = info.element;
            if (element.hasOwnProperty(this.eventsCollectionKey)) {
                var elementEventInfos = element[this.eventsCollectionKey];
                delete elementEventInfos[info.eventName];
                if (Object.getOwnPropertyNames(elementEventInfos).length === 0) {
                    delete element[this.eventsCollectionKey];
                }
            }
        }
    };
    EventDelegator.prototype.onGlobalEvent = function (evt) {
        if (!(evt.target instanceof Element)) {
            return;
        }
        // Scan up the element hierarchy, looking for any matching registered event handlers
        var candidateElement = evt.target;
        var eventArgs = null; // Populate lazily
        var eventIsNonBubbling = nonBubblingEvents.hasOwnProperty(evt.type);
        while (candidateElement) {
            if (candidateElement.hasOwnProperty(this.eventsCollectionKey)) {
                var handlerInfos = candidateElement[this.eventsCollectionKey];
                if (handlerInfos.hasOwnProperty(evt.type)) {
                    // We are going to raise an event for this element, so prepare info needed by the .NET code
                    if (!eventArgs) {
                        eventArgs = EventForDotNet_1.EventForDotNet.fromDOMEvent(evt);
                    }
                    var handlerInfo = handlerInfos[evt.type];
                    this.onEvent(evt, handlerInfo.componentId, handlerInfo.eventHandlerId, eventArgs);
                }
            }
            candidateElement = eventIsNonBubbling ? null : candidateElement.parentElement;
        }
    };
    EventDelegator.nextEventDelegatorId = 0;
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
// Responsible for adding and removing the global listener when the number of listeners
// for a given event name changes between zero and nonzero
var EventInfoStore = /** @class */ (function () {
    function EventInfoStore(globalListener) {
        this.globalListener = globalListener;
        this.infosByEventHandlerId = {};
        this.countByEventName = {};
    }
    EventInfoStore.prototype.add = function (info) {
        if (this.infosByEventHandlerId[info.eventHandlerId]) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + info.eventHandlerId + " is already tracked");
        }
        this.infosByEventHandlerId[info.eventHandlerId] = info;
        var eventName = info.eventName;
        if (this.countByEventName.hasOwnProperty(eventName)) {
            this.countByEventName[eventName]++;
        }
        else {
            this.countByEventName[eventName] = 1;
            // To make delegation work with non-bubbling events, register a 'capture' listener.
            // We preserve the non-bubbling behavior by only dispatching such events to the targeted element.
            var useCapture = nonBubblingEvents.hasOwnProperty(eventName);
            document.addEventListener(eventName, this.globalListener, useCapture);
        }
    };
    EventInfoStore.prototype.update = function (oldEventHandlerId, newEventHandlerId) {
        if (this.infosByEventHandlerId.hasOwnProperty(newEventHandlerId)) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + newEventHandlerId + " is already tracked");
        }
        // Since we're just updating the event handler ID, there's no need to update the global counts
        var info = this.infosByEventHandlerId[oldEventHandlerId];
        delete this.infosByEventHandlerId[oldEventHandlerId];
        info.eventHandlerId = newEventHandlerId;
        this.infosByEventHandlerId[newEventHandlerId] = info;
    };
    EventInfoStore.prototype.remove = function (eventHandlerId) {
        var info = this.infosByEventHandlerId[eventHandlerId];
        if (info) {
            delete this.infosByEventHandlerId[eventHandlerId];
            var eventName = info.eventName;
            if (--this.countByEventName[eventName] === 0) {
                delete this.countByEventName[eventName];
                document.removeEventListener(eventName, this.globalListener);
            }
        }
        return info;
    };
    return EventInfoStore;
}());
function toLookup(items) {
    var result = {};
    items.forEach(function (value) { result[value] = true; });
    return result;
}


/***/ }),

/***/ "./src/Rendering/EventForDotNet.ts":
/*!*****************************************!*\
  !*** ./src/Rendering/EventForDotNet.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet = /** @class */ (function () {
    function EventForDotNet(type, data) {
        this.type = type;
        this.data = data;
    }
    EventForDotNet.fromDOMEvent = function (event) {
        var element = event.target;
        switch (event.type) {
            case 'change': {
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { type: event.type, value: newValue });
            }
            case 'copy':
            case 'cut':
            case 'paste':
                return new EventForDotNet('clipboard', { type: event.type });
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
                return new EventForDotNet('drag', parseDragEvent(event));
            case 'focus':
            case 'blur':
            case 'focusin':
            case 'focusout':
                return new EventForDotNet('focus', { type: event.type });
            case 'keydown':
            case 'keyup':
            case 'keypress':
                return new EventForDotNet('keyboard', parseKeyboardEvent(event));
            case 'contextmenu':
            case 'click':
            case 'mouseover':
            case 'mouseout':
            case 'mousemove':
            case 'mousedown':
            case 'mouseup':
            case 'dblclick':
                return new EventForDotNet('mouse', parseMouseEvent(event));
            case 'error':
                return new EventForDotNet('error', parseErrorEvent(event));
            case 'loadstart':
            case 'timeout':
            case 'abort':
            case 'load':
            case 'loadend':
            case 'progress':
                return new EventForDotNet('progress', parseProgressEvent(event));
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchenter':
            case 'touchleave':
            case 'touchstart':
                return new EventForDotNet('touch', parseTouchEvent(event));
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerenter':
            case 'pointerleave':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
                return new EventForDotNet('pointer', parsePointerEvent(event));
            case 'wheel':
            case 'mousewheel':
                return new EventForDotNet('wheel', parseWheelEvent(event));
            default:
                return new EventForDotNet('unknown', { type: event.type });
        }
    };
    return EventForDotNet;
}());
exports.EventForDotNet = EventForDotNet;
function parseDragEvent(event) {
    return {
        type: event.type,
        detail: event.detail,
        dataTransfer: event.dataTransfer,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        buttons: event.buttons,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function parseWheelEvent(event) {
    return __assign({}, parseMouseEvent(event), { deltaX: event.deltaX, deltaY: event.deltaY, deltaZ: event.deltaZ, deltaMode: event.deltaMode });
}
function parseErrorEvent(event) {
    return {
        type: event.type,
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    };
}
function parseProgressEvent(event) {
    return {
        type: event.type,
        lengthComputable: event.lengthComputable,
        loaded: event.loaded,
        total: event.total
    };
}
function parseTouchEvent(event) {
    function parseTouch(touchList) {
        var touches = [];
        for (var i = 0; i < touchList.length; i++) {
            var touch = touchList[i];
            touches.push({
                identifier: touch.identifier,
                clientX: touch.clientX,
                clientY: touch.clientY,
                screenX: touch.screenX,
                screenY: touch.screenY,
                pageX: touch.pageX,
                pageY: touch.pageY
            });
        }
        return touches;
    }
    return {
        type: event.type,
        detail: event.detail,
        touches: parseTouch(event.touches),
        targetTouches: parseTouch(event.targetTouches),
        changedTouches: parseTouch(event.changedTouches),
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function parseKeyboardEvent(event) {
    return {
        type: event.type,
        key: event.key,
        code: event.code,
        location: event.location,
        repeat: event.repeat,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function parsePointerEvent(event) {
    return __assign({}, parseMouseEvent(event), { pointerId: event.pointerId, width: event.width, height: event.height, pressure: event.pressure, tiltX: event.tiltX, tiltY: event.tiltY, pointerType: event.pointerType, isPrimary: event.isPrimary });
}
function parseMouseEvent(event) {
    return {
        type: event.type,
        detail: event.detail,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        buttons: event.buttons,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function isCheckbox(element) {
    return element && element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}


/***/ }),

/***/ "./src/Rendering/LogicalElements.ts":
/*!******************************************!*\
  !*** ./src/Rendering/LogicalElements.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  A LogicalElement plays the same role as an Element instance from the point of view of the
  API consumer. Inserting and removing logical elements updates the browser DOM just the same.

  The difference is that, unlike regular DOM mutation APIs, the LogicalElement APIs don't use
  the underlying DOM structure as the data storage for the element hierarchy. Instead, the
  LogicalElement APIs take care of tracking hierarchical relationships separately. The point
  of this is to permit a logical tree structure in which parent/child relationships don't
  have to be materialized in terms of DOM element parent/child relationships. And the reason
  why we want that is so that hierarchies of Blazor components can be tracked even when those
  components' render output need not be a single literal DOM element.

  Consumers of the API don't need to know about the implementation, but how it's done is:
  - Each LogicalElement is materialized in the DOM as either:
    - A Node instance, for actual Node instances inserted using 'insertLogicalChild' or
      for Element instances promoted to LogicalElement via 'toLogicalElement'
    - A Comment instance, for 'logical container' instances inserted using 'createAndInsertLogicalContainer'
  - Then, on that instance (i.e., the Node or Comment), we store an array of 'logical children'
    instances, e.g.,
      [firstChild, secondChild, thirdChild, ...]
    ... plus we store a reference to the 'logical parent' (if any)
  - The 'logical children' array means we can look up in O(1):
    - The number of logical children (not currently implemented because not required, but trivial)
    - The logical child at any given index
  - Whenever a logical child is added or removed, we update the parent's array of logical children
*/
Object.defineProperty(exports, "__esModule", { value: true });
var logicalChildrenPropname = createSymbolOrFallback('_blazorLogicalChildren');
var logicalParentPropname = createSymbolOrFallback('_blazorLogicalParent');
function toLogicalElement(element) {
    if (element.childNodes.length > 0) {
        throw new Error('New logical elements must start empty');
    }
    element[logicalChildrenPropname] = [];
    return element;
}
exports.toLogicalElement = toLogicalElement;
function createAndInsertLogicalContainer(parent, childIndex) {
    var containerElement = document.createComment('!');
    insertLogicalChild(containerElement, parent, childIndex);
    return containerElement;
}
exports.createAndInsertLogicalContainer = createAndInsertLogicalContainer;
function insertLogicalChild(child, parent, childIndex) {
    var childAsLogicalElement = child;
    if (child instanceof Comment) {
        var existingGrandchildren = getLogicalChildrenArray(childAsLogicalElement);
        if (existingGrandchildren && getLogicalChildrenArray(childAsLogicalElement).length > 0) {
            // There's nothing to stop us implementing support for this scenario, and it's not difficult
            // (after inserting 'child' itself, also iterate through its logical children and physically
            // put them as following-siblings in the DOM). However there's no scenario that requires it
            // presently, so if we did implement it there'd be no good way to have tests for it.
            throw new Error('Not implemented: inserting non-empty logical container');
        }
    }
    if (getLogicalParent(childAsLogicalElement)) {
        // Likewise, we could easily support this scenario too (in this 'if' block, just splice
        // out 'child' from the logical children array of its previous logical parent by using
        // Array.prototype.indexOf to determine its previous sibling index).
        // But again, since there's not currently any scenario that would use it, we would not
        // have any test coverage for such an implementation.
        throw new Error('Not implemented: moving existing logical children');
    }
    var newSiblings = getLogicalChildrenArray(parent);
    if (childIndex < newSiblings.length) {
        // Insert
        var nextSibling = newSiblings[childIndex];
        nextSibling.parentNode.insertBefore(child, nextSibling);
        newSiblings.splice(childIndex, 0, childAsLogicalElement);
    }
    else {
        // Append
        appendDomNode(child, parent);
        newSiblings.push(childAsLogicalElement);
    }
    childAsLogicalElement[logicalParentPropname] = parent;
    if (!(logicalChildrenPropname in childAsLogicalElement)) {
        childAsLogicalElement[logicalChildrenPropname] = [];
    }
}
exports.insertLogicalChild = insertLogicalChild;
function removeLogicalChild(parent, childIndex) {
    var childrenArray = getLogicalChildrenArray(parent);
    var childToRemove = childrenArray.splice(childIndex, 1)[0];
    // If it's a logical container, also remove its descendants
    if (childToRemove instanceof Comment) {
        var grandchildrenArray = getLogicalChildrenArray(childToRemove);
        while (grandchildrenArray.length > 0) {
            removeLogicalChild(childToRemove, 0);
        }
    }
    // Finally, remove the node itself
    var domNodeToRemove = childToRemove;
    domNodeToRemove.parentNode.removeChild(domNodeToRemove);
}
exports.removeLogicalChild = removeLogicalChild;
function getLogicalParent(element) {
    return element[logicalParentPropname] || null;
}
exports.getLogicalParent = getLogicalParent;
function getLogicalChild(parent, childIndex) {
    return getLogicalChildrenArray(parent)[childIndex];
}
exports.getLogicalChild = getLogicalChild;
function isSvgElement(element) {
    return getClosestDomElement(element).namespaceURI === 'http://www.w3.org/2000/svg';
}
exports.isSvgElement = isSvgElement;
function getLogicalChildrenArray(element) {
    return element[logicalChildrenPropname];
}
function getLogicalNextSibling(element) {
    var siblings = getLogicalChildrenArray(getLogicalParent(element));
    var siblingIndex = Array.prototype.indexOf.call(siblings, element);
    return siblings[siblingIndex + 1] || null;
}
function getClosestDomElement(logicalElement) {
    if (logicalElement instanceof Element) {
        return logicalElement;
    }
    else if (logicalElement instanceof Comment) {
        return logicalElement.parentNode;
    }
    else {
        throw new Error('Not a valid logical element');
    }
}
function appendDomNode(child, parent) {
    // This function only puts 'child' into the DOM in the right place relative to 'parent'
    // It does not update the logical children array of anything
    if (parent instanceof Element) {
        parent.appendChild(child);
    }
    else if (parent instanceof Comment) {
        var parentLogicalNextSibling = getLogicalNextSibling(parent);
        if (parentLogicalNextSibling) {
            // Since the parent has a logical next-sibling, its appended child goes right before that
            parentLogicalNextSibling.parentNode.insertBefore(child, parentLogicalNextSibling);
        }
        else {
            // Since the parent has no logical next-sibling, keep recursing upwards until we find
            // a logical ancestor that does have a next-sibling or is a physical element.
            appendDomNode(child, getLogicalParent(parent));
        }
    }
    else {
        // Should never happen
        throw new Error("Cannot append node because the parent is not a valid logical element. Parent: " + parent);
    }
}
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}
;


/***/ }),

/***/ "./src/Rendering/RenderBatch/RenderBatch.ts":
/*!**************************************************!*\
  !*** ./src/Rendering/RenderBatch/RenderBatch.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EditType;
(function (EditType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeEditType.cs
    EditType[EditType["prependFrame"] = 1] = "prependFrame";
    EditType[EditType["removeFrame"] = 2] = "removeFrame";
    EditType[EditType["setAttribute"] = 3] = "setAttribute";
    EditType[EditType["removeAttribute"] = 4] = "removeAttribute";
    EditType[EditType["updateText"] = 5] = "updateText";
    EditType[EditType["stepIn"] = 6] = "stepIn";
    EditType[EditType["stepOut"] = 7] = "stepOut";
    EditType[EditType["updateMarkup"] = 8] = "updateMarkup";
})(EditType = exports.EditType || (exports.EditType = {}));
var FrameType;
(function (FrameType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeFrameType.cs
    FrameType[FrameType["element"] = 1] = "element";
    FrameType[FrameType["text"] = 2] = "text";
    FrameType[FrameType["attribute"] = 3] = "attribute";
    FrameType[FrameType["component"] = 4] = "component";
    FrameType[FrameType["region"] = 5] = "region";
    FrameType[FrameType["elementReferenceCapture"] = 6] = "elementReferenceCapture";
    FrameType[FrameType["markup"] = 8] = "markup";
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),

/***/ "./src/Rendering/RenderBatch/SharedMemoryRenderBatch.ts":
/*!**************************************************************!*\
  !*** ./src/Rendering/RenderBatch/SharedMemoryRenderBatch.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(/*! ../../Environment */ "./src/Environment.ts");
// Used when running on Mono WebAssembly for shared-memory interop. The code here encapsulates
// our knowledge of the memory layout of RenderBatch and all referenced types.
//
// In this implementation, all the DTO types are really heap pointers at runtime, hence all
// the casts to 'any' whenever we pass them to platform.read.
var SharedMemoryRenderBatch = /** @class */ (function () {
    function SharedMemoryRenderBatch(batchAddress) {
        this.batchAddress = batchAddress;
        this.arrayRangeReader = arrayRangeReader;
        this.arraySegmentReader = arraySegmentReader;
        this.diffReader = diffReader;
        this.editReader = editReader;
        this.frameReader = frameReader;
    }
    // Keep in sync with memory layout in RenderBatch.cs
    SharedMemoryRenderBatch.prototype.updatedComponents = function () { return Environment_1.platform.readStructField(this.batchAddress, 0); };
    SharedMemoryRenderBatch.prototype.referenceFrames = function () { return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength); };
    SharedMemoryRenderBatch.prototype.disposedComponentIds = function () { return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength * 2); };
    SharedMemoryRenderBatch.prototype.disposedEventHandlerIds = function () { return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength * 3); };
    SharedMemoryRenderBatch.prototype.updatedComponentsEntry = function (values, index) {
        return arrayValuesEntry(values, index, diffReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.referenceFramesEntry = function (values, index) {
        return arrayValuesEntry(values, index, frameReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.disposedComponentIdsEntry = function (values, index) {
        var pointer = arrayValuesEntry(values, index, /* int length */ 4);
        return Environment_1.platform.readInt32Field(pointer);
    };
    SharedMemoryRenderBatch.prototype.disposedEventHandlerIdsEntry = function (values, index) {
        var pointer = arrayValuesEntry(values, index, /* int length */ 4);
        return Environment_1.platform.readInt32Field(pointer);
    };
    return SharedMemoryRenderBatch;
}());
exports.SharedMemoryRenderBatch = SharedMemoryRenderBatch;
// Keep in sync with memory layout in ArrayRange.cs
var arrayRangeReader = {
    structLength: 8,
    values: function (arrayRange) { return Environment_1.platform.readObjectField(arrayRange, 0); },
    count: function (arrayRange) { return Environment_1.platform.readInt32Field(arrayRange, 4); },
};
// Keep in sync with memory layout in ArraySegment
var arraySegmentReader = {
    structLength: 12,
    values: function (arraySegment) { return Environment_1.platform.readObjectField(arraySegment, 0); },
    offset: function (arraySegment) { return Environment_1.platform.readInt32Field(arraySegment, 4); },
    count: function (arraySegment) { return Environment_1.platform.readInt32Field(arraySegment, 8); },
};
// Keep in sync with memory layout in RenderTreeDiff.cs
var diffReader = {
    structLength: 4 + arraySegmentReader.structLength,
    componentId: function (diff) { return Environment_1.platform.readInt32Field(diff, 0); },
    edits: function (diff) { return Environment_1.platform.readStructField(diff, 4); },
    editsEntry: function (values, index) { return arrayValuesEntry(values, index, editReader.structLength); },
};
// Keep in sync with memory layout in RenderTreeEdit.cs
var editReader = {
    structLength: 16,
    editType: function (edit) { return Environment_1.platform.readInt32Field(edit, 0); },
    siblingIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 4); },
    newTreeIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 8); },
    removedAttributeName: function (edit) { return Environment_1.platform.readStringField(edit, 12); },
};
// Keep in sync with memory layout in RenderTreeFrame.cs
var frameReader = {
    structLength: 28,
    frameType: function (frame) { return Environment_1.platform.readInt32Field(frame, 4); },
    subtreeLength: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    elementReferenceCaptureId: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    componentId: function (frame) { return Environment_1.platform.readInt32Field(frame, 12); },
    elementName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    textContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    markupContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeValue: function (frame) { return Environment_1.platform.readStringField(frame, 24); },
    attributeEventHandlerId: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
};
function arrayValuesEntry(arrayValues, index, itemSize) {
    return Environment_1.platform.getArrayEntryPtr(arrayValues, index, itemSize);
}


/***/ }),

/***/ "./src/Rendering/Renderer.ts":
/*!***********************************!*\
  !*** ./src/Rendering/Renderer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserRenderer_1 = __webpack_require__(/*! ./BrowserRenderer */ "./src/Rendering/BrowserRenderer.ts");
var browserRenderers = {};
function attachRootComponentToElement(browserRendererId, elementSelector, componentId) {
    var element = document.querySelector(elementSelector);
    if (!element) {
        throw new Error("Could not find any element matching selector '" + elementSelector + "'.");
    }
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        browserRenderer = browserRenderers[browserRendererId] = new BrowserRenderer_1.BrowserRenderer(browserRendererId);
    }
    clearElement(element);
    browserRenderer.attachRootComponentToElement(componentId, element);
}
exports.attachRootComponentToElement = attachRootComponentToElement;
function renderBatch(browserRendererId, batch) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        throw new Error("There is no browser renderer with ID " + browserRendererId + ".");
    }
    var arrayRangeReader = batch.arrayRangeReader;
    var updatedComponentsRange = batch.updatedComponents();
    var updatedComponentsValues = arrayRangeReader.values(updatedComponentsRange);
    var updatedComponentsLength = arrayRangeReader.count(updatedComponentsRange);
    var referenceFrames = batch.referenceFrames();
    var referenceFramesValues = arrayRangeReader.values(referenceFrames);
    var diffReader = batch.diffReader;
    for (var i = 0; i < updatedComponentsLength; i++) {
        var diff = batch.updatedComponentsEntry(updatedComponentsValues, i);
        var componentId = diffReader.componentId(diff);
        var edits = diffReader.edits(diff);
        browserRenderer.updateComponent(batch, componentId, edits, referenceFramesValues);
    }
    var disposedComponentIdsRange = batch.disposedComponentIds();
    var disposedComponentIdsValues = arrayRangeReader.values(disposedComponentIdsRange);
    var disposedComponentIdsLength = arrayRangeReader.count(disposedComponentIdsRange);
    for (var i = 0; i < disposedComponentIdsLength; i++) {
        var componentId = batch.disposedComponentIdsEntry(disposedComponentIdsValues, i);
        browserRenderer.disposeComponent(componentId);
    }
    var disposedEventHandlerIdsRange = batch.disposedEventHandlerIds();
    var disposedEventHandlerIdsValues = arrayRangeReader.values(disposedEventHandlerIdsRange);
    var disposedEventHandlerIdsLength = arrayRangeReader.count(disposedEventHandlerIdsRange);
    for (var i = 0; i < disposedEventHandlerIdsLength; i++) {
        var eventHandlerId = batch.disposedEventHandlerIdsEntry(disposedEventHandlerIdsValues, i);
        browserRenderer.disposeEventHandler(eventHandlerId);
    }
}
exports.renderBatch = renderBatch;
function clearElement(element) {
    var childNode;
    while (childNode = element.firstChild) {
        element.removeChild(childNode);
    }
}


/***/ }),

/***/ "./src/Services/Http.ts":
/*!******************************!*\
  !*** ./src/Services/Http.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(/*! ../Environment */ "./src/Environment.ts");
var httpClientAssembly = 'Microsoft.AspNetCore.Blazor.Browser';
var httpClientNamespace = httpClientAssembly + ".Http";
var httpClientTypeName = 'BrowserHttpMessageHandler';
var httpClientFullTypeName = httpClientNamespace + "." + httpClientTypeName;
var receiveResponseMethod;
var allocateArrayMethod;
// These are the functions we're making available for invocation from .NET
exports.internalFunctions = {
    sendAsync: sendAsync
};
function sendAsync(id, body, jsonFetchArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseData, fetchOptions, requestInit, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchOptions = JSON.parse(Environment_1.platform.toJavaScriptString(jsonFetchArgs));
                    requestInit = Object.assign(fetchOptions.requestInit, fetchOptions.requestInitOverrides);
                    if (body) {
                        requestInit.body = Environment_1.platform.toUint8Array(body);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(fetchOptions.requestUri, requestInit)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 3:
                    responseData = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    dispatchErrorResponse(id, ex_1.toString());
                    return [2 /*return*/];
                case 5:
                    dispatchSuccessResponse(id, response, responseData);
                    return [2 /*return*/];
            }
        });
    });
}
function dispatchSuccessResponse(id, response, responseData) {
    var responseDescriptor = {
        statusCode: response.status,
        statusText: response.statusText,
        headers: []
    };
    response.headers.forEach(function (value, name) {
        responseDescriptor.headers.push([name, value]);
    });
    if (!allocateArrayMethod) {
        allocateArrayMethod = Environment_1.platform.findMethod(httpClientAssembly, httpClientNamespace, httpClientTypeName, 'AllocateArray');
    }
    // allocate a managed byte[] of the right size
    var dotNetArray = Environment_1.platform.callMethod(allocateArrayMethod, null, [Environment_1.platform.toDotNetString(responseData.byteLength.toString())]);
    // get an Uint8Array view of it
    var array = Environment_1.platform.toUint8Array(dotNetArray);
    // copy the responseData to our managed byte[]
    array.set(new Uint8Array(responseData));
    dispatchResponse(id, Environment_1.platform.toDotNetString(JSON.stringify(responseDescriptor)), dotNetArray, 
    /* errorMessage */ null);
}
function dispatchErrorResponse(id, errorMessage) {
    dispatchResponse(id, 
    /* responseDescriptor */ null, 
    /* responseText */ null, Environment_1.platform.toDotNetString(errorMessage));
}
function dispatchResponse(id, responseDescriptor, responseData, errorMessage) {
    if (!receiveResponseMethod) {
        receiveResponseMethod = Environment_1.platform.findMethod(httpClientAssembly, httpClientNamespace, httpClientTypeName, 'ReceiveResponse');
    }
    Environment_1.platform.callMethod(receiveResponseMethod, null, [
        Environment_1.platform.toDotNetString(id.toString()),
        responseDescriptor,
        responseData,
        errorMessage,
    ]);
}


/***/ }),

/***/ "./src/Services/UriHelper.ts":
/*!***********************************!*\
  !*** ./src/Services/UriHelper.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hasRegisteredEventListeners = false;
// Will be initialized once someone registers
var notifyLocationChangedCallback = null;
// These are the functions we're making available for invocation from .NET
exports.internalFunctions = {
    enableNavigationInterception: enableNavigationInterception,
    navigateTo: navigateTo,
    getBaseURI: function () { return document.baseURI; },
    getLocationHref: function () { return location.href; },
};
function enableNavigationInterception(assemblyName, functionName) {
    if (hasRegisteredEventListeners || assemblyName === undefined || functionName === undefined) {
        return;
    }
    notifyLocationChangedCallback = { assemblyName: assemblyName, functionName: functionName };
    hasRegisteredEventListeners = true;
    document.addEventListener('click', function (event) {
        // Intercept clicks on all <a> elements where the href is within the <base href> URI space
        // We must explicitly check if it has an 'href' attribute, because if it doesn't, the result might be null or an empty string depending on the browser
        var anchorTarget = findClosestAncestor(event.target, 'A');
        var hrefAttributeName = 'href';
        if (anchorTarget && anchorTarget.hasAttribute(hrefAttributeName) && event.button === 0) {
            var href = anchorTarget.getAttribute(hrefAttributeName);
            var absoluteHref = toAbsoluteUri(href);
            var targetAttributeValue = anchorTarget.getAttribute('target');
            var opensInSameFrame = !targetAttributeValue || targetAttributeValue === '_self';
            // Don't stop ctrl/meta-click (etc) from opening links in new tabs/windows
            if (isWithinBaseUriSpace(absoluteHref) && !eventHasSpecialKey(event) && opensInSameFrame) {
                event.preventDefault();
                performInternalNavigation(absoluteHref);
            }
        }
    });
    window.addEventListener('popstate', handleInternalNavigation);
}
function navigateTo(uri) {
    var absoluteUri = toAbsoluteUri(uri);
    if (isWithinBaseUriSpace(absoluteUri)) {
        performInternalNavigation(absoluteUri);
    }
    else {
        location.href = uri;
    }
}
exports.navigateTo = navigateTo;
function performInternalNavigation(absoluteInternalHref) {
    history.pushState(null, /* ignored title */ '', absoluteInternalHref);
    handleInternalNavigation();
}
function handleInternalNavigation() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!notifyLocationChangedCallback) return [3 /*break*/, 2];
                    return [4 /*yield*/, DotNet.invokeMethodAsync(notifyLocationChangedCallback.assemblyName, notifyLocationChangedCallback.functionName, location.href)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
var testAnchor;
function toAbsoluteUri(relativeUri) {
    testAnchor = testAnchor || document.createElement('a');
    testAnchor.href = relativeUri;
    return testAnchor.href;
}
function findClosestAncestor(element, tagName) {
    return !element
        ? null
        : element.tagName === tagName
            ? element
            : findClosestAncestor(element.parentElement, tagName);
}
function isWithinBaseUriSpace(href) {
    var baseUriWithTrailingSlash = toBaseUriWithTrailingSlash(document.baseURI); // TODO: Might baseURI really be null?
    return href.startsWith(baseUriWithTrailingSlash);
}
function toBaseUriWithTrailingSlash(baseUri) {
    return baseUri.substr(0, baseUri.lastIndexOf('/') + 1);
}
function eventHasSpecialKey(event) {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL3N0ZXZlc2EvRG9jdW1lbnRzL0dpdC9CbGF6b3IvbW9kdWxlcy9qc2ludGVyb3Avc3JjL01pY3Jvc29mdC5KU0ludGVyb3AuSlMvc3JjL01pY3Jvc29mdC5KU0ludGVyb3AudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3QuV2ViQXNzZW1ibHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3RDb21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Vudmlyb25tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9HbG9iYWxFeHBvcnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF0Zm9ybS9Nb25vL01vbm9EZWJ1Z2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxhdGZvcm0vTW9uby9Nb25vUGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXRmb3JtL1VybC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL0Jyb3dzZXJSZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL0VsZW1lbnRSZWZlcmVuY2VDYXB0dXJlLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvRXZlbnREZWxlZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9FdmVudEZvckRvdE5ldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL0xvZ2ljYWxFbGVtZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gvU2hhcmVkTWVtb3J5UmVuZGVyQmF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VydmljZXMvSHR0cC50cyIs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ZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0Jvb3QuV2ViQXNzZW1ibHkudHNcIik7XG4iLCIvLyBUaGlzIGlzIGEgc2luZ2xlLWZpbGUgc2VsZi1jb250YWluZWQgbW9kdWxlIHRvIGF2b2lkIHRoZSBuZWVkIGZvciBhIFdlYnBhY2sgYnVpbGRcclxuXHJcbm1vZHVsZSBEb3ROZXQge1xyXG4gICh3aW5kb3cgYXMgYW55KS5Eb3ROZXQgPSBEb3ROZXQ7IC8vIEVuc3VyZSByZWFjaGFibGUgZnJvbSBhbnl3aGVyZVxyXG5cclxuICBleHBvcnQgdHlwZSBKc29uUmV2aXZlciA9ICgoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IGFueSk7XHJcbiAgY29uc3QganNvblJldml2ZXJzOiBKc29uUmV2aXZlcltdID0gW107XHJcblxyXG4gIGNvbnN0IHBlbmRpbmdBc3luY0NhbGxzOiB7IFtpZDogbnVtYmVyXTogUGVuZGluZ0FzeW5jQ2FsbDxhbnk+IH0gPSB7fTtcclxuICBjb25zdCBjYWNoZWRKU0Z1bmN0aW9uczogeyBbaWRlbnRpZmllcjogc3RyaW5nXTogRnVuY3Rpb24gfSA9IHt9O1xyXG4gIGxldCBuZXh0QXN5bmNDYWxsSWQgPSAxOyAvLyBTdGFydCBhdCAxIGJlY2F1c2UgemVybyBzaWduYWxzIFwibm8gcmVzcG9uc2UgbmVlZGVkXCJcclxuXHJcbiAgbGV0IGRvdE5ldERpc3BhdGNoZXI6IERvdE5ldENhbGxEaXNwYXRjaGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHNwZWNpZmllZCAuTkVUIGNhbGwgZGlzcGF0Y2hlciBhcyB0aGUgY3VycmVudCBpbnN0YW5jZSBzbyB0aGF0IGl0IHdpbGwgYmUgdXNlZFxyXG4gICAqIGZvciBmdXR1cmUgaW52b2NhdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGlzcGF0Y2hlciBBbiBvYmplY3QgdGhhdCBjYW4gZGlzcGF0Y2ggY2FsbHMgZnJvbSBKYXZhU2NyaXB0IHRvIGEgLk5FVCBydW50aW1lLlxyXG4gICAqL1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBhdHRhY2hEaXNwYXRjaGVyKGRpc3BhdGNoZXI6IERvdE5ldENhbGxEaXNwYXRjaGVyKSB7XHJcbiAgICBkb3ROZXREaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBKU09OIHJldml2ZXIgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiBwYXJzaW5nIGFyZ3VtZW50cyByZWNlaXZlZCBmcm9tIC5ORVQuXHJcbiAgICogQHBhcmFtIHJldml2ZXIgVGhlIHJldml2ZXIgdG8gYWRkLlxyXG4gICAqL1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBhdHRhY2hSZXZpdmVyKHJldml2ZXI6IEpzb25SZXZpdmVyKSB7XHJcbiAgICBqc29uUmV2aXZlcnMucHVzaChyZXZpdmVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCAuTkVUIHB1YmxpYyBtZXRob2Qgc3luY2hyb25vdXNseS4gTm90IGFsbCBob3N0aW5nIHNjZW5hcmlvcyBzdXBwb3J0XHJcbiAgICogc3luY2hyb25vdXMgaW52b2NhdGlvbiwgc28gaWYgcG9zc2libGUgdXNlIGludm9rZU1ldGhvZEFzeW5jIGluc3RlYWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYXNzZW1ibHlOYW1lIFRoZSBzaG9ydCBuYW1lICh3aXRob3V0IGtleS92ZXJzaW9uIG9yIC5kbGwgZXh0ZW5zaW9uKSBvZiB0aGUgLk5FVCBhc3NlbWJseSBjb250YWluaW5nIHRoZSBtZXRob2QuXHJcbiAgICogQHBhcmFtIG1ldGhvZElkZW50aWZpZXIgVGhlIGlkZW50aWZpZXIgb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuIFRoZSBtZXRob2QgbXVzdCBoYXZlIGEgW0pTSW52b2thYmxlXSBhdHRyaWJ1dGUgc3BlY2lmeWluZyB0aGlzIGlkZW50aWZpZXIuXHJcbiAgICogQHBhcmFtIGFyZ3MgQXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIG1ldGhvZCwgZWFjaCBvZiB3aGljaCBtdXN0IGJlIEpTT04tc2VyaWFsaXphYmxlLlxyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi5cclxuICAgKi9cclxuICBleHBvcnQgZnVuY3Rpb24gaW52b2tlTWV0aG9kPFQ+KGFzc2VtYmx5TmFtZTogc3RyaW5nLCBtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogVCB7XHJcbiAgICByZXR1cm4gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZDxUPihhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIG51bGwsIGFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW52b2tlcyB0aGUgc3BlY2lmaWVkIC5ORVQgcHVibGljIG1ldGhvZCBhc3luY2hyb25vdXNseS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhc3NlbWJseU5hbWUgVGhlIHNob3J0IG5hbWUgKHdpdGhvdXQga2V5L3ZlcnNpb24gb3IgLmRsbCBleHRlbnNpb24pIG9mIHRoZSAuTkVUIGFzc2VtYmx5IGNvbnRhaW5pbmcgdGhlIG1ldGhvZC5cclxuICAgKiBAcGFyYW0gbWV0aG9kSWRlbnRpZmllciBUaGUgaWRlbnRpZmllciBvZiB0aGUgbWV0aG9kIHRvIGludm9rZS4gVGhlIG1ldGhvZCBtdXN0IGhhdmUgYSBbSlNJbnZva2FibGVdIGF0dHJpYnV0ZSBzcGVjaWZ5aW5nIHRoaXMgaWRlbnRpZmllci5cclxuICAgKiBAcGFyYW0gYXJncyBBcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbWV0aG9kLCBlYWNoIG9mIHdoaWNoIG11c3QgYmUgSlNPTi1zZXJpYWxpemFibGUuXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHJlcHJlc2VudGluZyB0aGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb24uXHJcbiAgICovXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGludm9rZU1ldGhvZEFzeW5jPFQ+KGFzc2VtYmx5TmFtZTogc3RyaW5nLCBtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxUPiB7XHJcbiAgICByZXR1cm4gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgbnVsbCwgYXJncyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kPFQ+KGFzc2VtYmx5TmFtZTogc3RyaW5nIHwgbnVsbCwgbWV0aG9kSWRlbnRpZmllcjogc3RyaW5nLCBkb3ROZXRPYmplY3RJZDogbnVtYmVyIHwgbnVsbCwgYXJnczogYW55W10pOiBUIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKTtcclxuICAgIGlmIChkaXNwYXRjaGVyLmludm9rZURvdE5ldEZyb21KUykge1xyXG4gICAgICBjb25zdCBhcmdzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGFyZ3MsIGFyZ1JlcGxhY2VyKTtcclxuICAgICAgY29uc3QgcmVzdWx0SnNvbiA9IGRpc3BhdGNoZXIuaW52b2tlRG90TmV0RnJvbUpTKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgZG90TmV0T2JqZWN0SWQsIGFyZ3NKc29uKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdEpzb24gPyBwYXJzZUpzb25XaXRoUmV2aXZlcnMocmVzdWx0SnNvbikgOiBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCBkaXNwYXRjaGVyIGRvZXMgbm90IHN1cHBvcnQgc3luY2hyb25vdXMgY2FsbHMgZnJvbSBKUyB0byAuTkVULiBVc2UgaW52b2tlTWV0aG9kQXN5bmMgaW5zdGVhZC4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2RBc3luYzxUPihhc3NlbWJseU5hbWU6IHN0cmluZyB8IG51bGwsIG1ldGhvZElkZW50aWZpZXI6IHN0cmluZywgZG90TmV0T2JqZWN0SWQ6IG51bWJlciB8IG51bGwsIGFyZ3M6IGFueVtdKTogUHJvbWlzZTxUPiB7XHJcbiAgICBjb25zdCBhc3luY0NhbGxJZCA9IG5leHRBc3luY0NhbGxJZCsrO1xyXG4gICAgY29uc3QgcmVzdWx0UHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcGVuZGluZ0FzeW5jQ2FsbHNbYXN5bmNDYWxsSWRdID0geyByZXNvbHZlLCByZWplY3QgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGFyZ3NKc29uID0gSlNPTi5zdHJpbmdpZnkoYXJncywgYXJnUmVwbGFjZXIpO1xyXG4gICAgICBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKS5iZWdpbkludm9rZURvdE5ldEZyb21KUyhhc3luY0NhbGxJZCwgYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCwgYXJnc0pzb24pO1xyXG4gICAgfSBjYXRjaChleCkge1xyXG4gICAgICAvLyBTeW5jaHJvbm91cyBmYWlsdXJlXHJcbiAgICAgIGNvbXBsZXRlUGVuZGluZ0NhbGwoYXN5bmNDYWxsSWQsIGZhbHNlLCBleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFByb21pc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKTogRG90TmV0Q2FsbERpc3BhdGNoZXIge1xyXG4gICAgaWYgKGRvdE5ldERpc3BhdGNoZXIgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGRvdE5ldERpc3BhdGNoZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyAuTkVUIGNhbGwgZGlzcGF0Y2hlciBoYXMgYmVlbiBzZXQuJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjb21wbGV0ZVBlbmRpbmdDYWxsKGFzeW5jQ2FsbElkOiBudW1iZXIsIHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3VsdE9yRXJyb3I6IGFueSkge1xyXG4gICAgaWYgKCFwZW5kaW5nQXN5bmNDYWxscy5oYXNPd25Qcm9wZXJ0eShhc3luY0NhbGxJZCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBwZW5kaW5nIGFzeW5jIGNhbGwgd2l0aCBJRCAke2FzeW5jQ2FsbElkfS5gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhc3luY0NhbGwgPSBwZW5kaW5nQXN5bmNDYWxsc1thc3luY0NhbGxJZF07XHJcbiAgICBkZWxldGUgcGVuZGluZ0FzeW5jQ2FsbHNbYXN5bmNDYWxsSWRdO1xyXG4gICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgYXN5bmNDYWxsLnJlc29sdmUocmVzdWx0T3JFcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhc3luY0NhbGwucmVqZWN0KHJlc3VsdE9yRXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW50ZXJmYWNlIFBlbmRpbmdBc3luY0NhbGw8VD4ge1xyXG4gICAgcmVzb2x2ZTogKHZhbHVlPzogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkO1xyXG4gICAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyB0aGUgYWJpbGl0eSB0byBkaXNwYXRjaCBjYWxscyBmcm9tIEphdmFTY3JpcHQgdG8gYSAuTkVUIHJ1bnRpbWUuXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBEb3ROZXRDYWxsRGlzcGF0Y2hlciB7XHJcbiAgICAvKipcclxuICAgICAqIE9wdGlvbmFsLiBJZiBpbXBsZW1lbnRlZCwgaW52b2tlZCBieSB0aGUgcnVudGltZSB0byBwZXJmb3JtIGEgc3luY2hyb25vdXMgY2FsbCB0byBhIC5ORVQgbWV0aG9kLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gYXNzZW1ibHlOYW1lIFRoZSBzaG9ydCBuYW1lICh3aXRob3V0IGtleS92ZXJzaW9uIG9yIC5kbGwgZXh0ZW5zaW9uKSBvZiB0aGUgLk5FVCBhc3NlbWJseSBob2xkaW5nIHRoZSBtZXRob2QgdG8gaW52b2tlLiBUaGUgdmFsdWUgbWF5IGJlIG51bGwgd2hlbiBpbnZva2luZyBpbnN0YW5jZSBtZXRob2RzLlxyXG4gICAgICogQHBhcmFtIG1ldGhvZElkZW50aWZpZXIgVGhlIGlkZW50aWZpZXIgb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuIFRoZSBtZXRob2QgbXVzdCBoYXZlIGEgW0pTSW52b2thYmxlXSBhdHRyaWJ1dGUgc3BlY2lmeWluZyB0aGlzIGlkZW50aWZpZXIuXHJcbiAgICAgKiBAcGFyYW0gZG90TmV0T2JqZWN0SWQgSWYgZ2l2ZW4sIHRoZSBjYWxsIHdpbGwgYmUgdG8gYW4gaW5zdGFuY2UgbWV0aG9kIG9uIHRoZSBzcGVjaWZpZWQgRG90TmV0T2JqZWN0LiBQYXNzIG51bGwgb3IgdW5kZWZpbmVkIHRvIGNhbGwgc3RhdGljIG1ldGhvZHMuXHJcbiAgICAgKiBAcGFyYW0gYXJnc0pzb24gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxyXG4gICAgICogQHJldHVybnMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgcmVzdWx0IG9mIHRoZSBpbnZvY2F0aW9uLlxyXG4gICAgICovXHJcbiAgICBpbnZva2VEb3ROZXRGcm9tSlM/KGFzc2VtYmx5TmFtZTogc3RyaW5nIHwgbnVsbCwgbWV0aG9kSWRlbnRpZmllcjogc3RyaW5nLCBkb3ROZXRPYmplY3RJZDogbnVtYmVyIHwgbnVsbCwgYXJnc0pzb246IHN0cmluZyk6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VkIGJ5IHRoZSBydW50aW1lIHRvIGJlZ2luIGFuIGFzeW5jaHJvbm91cyBjYWxsIHRvIGEgLk5FVCBtZXRob2QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNhbGxJZCBBIHZhbHVlIGlkZW50aWZ5aW5nIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGlzIHZhbHVlIHNob3VsZCBiZSBwYXNzZWQgYmFjayBpbiBhIGxhdGVyIGNhbGwgZnJvbSAuTkVUIHRvIEpTLlxyXG4gICAgICogQHBhcmFtIGFzc2VtYmx5TmFtZSBUaGUgc2hvcnQgbmFtZSAod2l0aG91dCBrZXkvdmVyc2lvbiBvciAuZGxsIGV4dGVuc2lvbikgb2YgdGhlIC5ORVQgYXNzZW1ibHkgaG9sZGluZyB0aGUgbWV0aG9kIHRvIGludm9rZS4gVGhlIHZhbHVlIG1heSBiZSBudWxsIHdoZW4gaW52b2tpbmcgaW5zdGFuY2UgbWV0aG9kcy5cclxuICAgICAqIEBwYXJhbSBtZXRob2RJZGVudGlmaWVyIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBtZXRob2QgdG8gaW52b2tlLiBUaGUgbWV0aG9kIG11c3QgaGF2ZSBhIFtKU0ludm9rYWJsZV0gYXR0cmlidXRlIHNwZWNpZnlpbmcgdGhpcyBpZGVudGlmaWVyLlxyXG4gICAgICogQHBhcmFtIGRvdE5ldE9iamVjdElkIElmIGdpdmVuLCB0aGUgY2FsbCB3aWxsIGJlIHRvIGFuIGluc3RhbmNlIG1ldGhvZCBvbiB0aGUgc3BlY2lmaWVkIERvdE5ldE9iamVjdC4gUGFzcyBudWxsIHRvIGNhbGwgc3RhdGljIG1ldGhvZHMuXHJcbiAgICAgKiBAcGFyYW0gYXJnc0pzb24gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBiZWdpbkludm9rZURvdE5ldEZyb21KUyhjYWxsSWQ6IG51bWJlciwgYXNzZW1ibHlOYW1lOiBzdHJpbmcgfCBudWxsLCBtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIGRvdE5ldE9iamVjdElkOiBudW1iZXIgfCBudWxsLCBhcmdzSnNvbjogc3RyaW5nKTogdm9pZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2VpdmVzIGluY29taW5nIGNhbGxzIGZyb20gLk5FVCBhbmQgZGlzcGF0Y2hlcyB0aGVtIHRvIEphdmFTY3JpcHQuXHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IGpzQ2FsbERpc3BhdGNoZXIgPSB7XHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBKYXZhU2NyaXB0IGZ1bmN0aW9uIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgaWRlbnRpZmllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaWRlbnRpZmllciBJZGVudGlmaWVzIHRoZSBnbG9iYWxseS1yZWFjaGFibGUgZnVuY3Rpb24gdG8gYmUgcmV0dXJuZWQuXHJcbiAgICAgKiBAcmV0dXJucyBBIEZ1bmN0aW9uIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBmaW5kSlNGdW5jdGlvbixcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCBzeW5jaHJvbm91cyBKYXZhU2NyaXB0IGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpZGVudGlmaWVyIElkZW50aWZpZXMgdGhlIGdsb2JhbGx5LXJlYWNoYWJsZSBmdW5jdGlvbiB0byBpbnZva2UuXHJcbiAgICAgKiBAcGFyYW0gYXJnc0pzb24gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cclxuICAgICAqIEByZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGludm9jYXRpb24gcmVzdWx0LlxyXG4gICAgICovXHJcbiAgICBpbnZva2VKU0Zyb21Eb3ROZXQ6IChpZGVudGlmaWVyOiBzdHJpbmcsIGFyZ3NKc29uOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZEpTRnVuY3Rpb24oaWRlbnRpZmllcikuYXBwbHkobnVsbCwgcGFyc2VKc29uV2l0aFJldml2ZXJzKGFyZ3NKc29uKSk7XHJcbiAgICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWRcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgYXJnUmVwbGFjZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCBzeW5jaHJvbm91cyBvciBhc3luY2hyb25vdXMgSmF2YVNjcmlwdCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYXN5bmNIYW5kbGUgQSB2YWx1ZSBpZGVudGlmeWluZyB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhpcyB2YWx1ZSB3aWxsIGJlIHBhc3NlZCBiYWNrIGluIGEgbGF0ZXIgY2FsbCB0byBlbmRJbnZva2VKU0Zyb21Eb3ROZXQuXHJcbiAgICAgKiBAcGFyYW0gaWRlbnRpZmllciBJZGVudGlmaWVzIHRoZSBnbG9iYWxseS1yZWFjaGFibGUgZnVuY3Rpb24gdG8gaW52b2tlLlxyXG4gICAgICogQHBhcmFtIGFyZ3NKc29uIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGJlZ2luSW52b2tlSlNGcm9tRG90TmV0OiAoYXN5bmNIYW5kbGU6IG51bWJlciwgaWRlbnRpZmllcjogc3RyaW5nLCBhcmdzSnNvbjogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIENvZXJjZSBzeW5jaHJvbm91cyBmdW5jdGlvbnMgaW50byBhc3luYyBvbmVzLCBwbHVzIHRyZWF0XHJcbiAgICAgIC8vIHN5bmNocm9ub3VzIGV4Y2VwdGlvbnMgdGhlIHNhbWUgYXMgYXN5bmMgb25lc1xyXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8YW55PihyZXNvbHZlID0+IHtcclxuICAgICAgICBjb25zdCBzeW5jaHJvbm91c1Jlc3VsdE9yUHJvbWlzZSA9IGZpbmRKU0Z1bmN0aW9uKGlkZW50aWZpZXIpLmFwcGx5KG51bGwsIHBhcnNlSnNvbldpdGhSZXZpdmVycyhhcmdzSnNvbikpO1xyXG4gICAgICAgIHJlc29sdmUoc3luY2hyb25vdXNSZXN1bHRPclByb21pc2UpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFdlIG9ubHkgbGlzdGVuIGZvciBhIHJlc3VsdCBpZiB0aGUgY2FsbGVyIHdhbnRzIHRvIGJlIG5vdGlmaWVkIGFib3V0IGl0XHJcbiAgICAgIGlmIChhc3luY0hhbmRsZSkge1xyXG4gICAgICAgIC8vIE9uIGNvbXBsZXRpb24sIGRpc3BhdGNoIHJlc3VsdCBiYWNrIHRvIC5ORVRcclxuICAgICAgICAvLyBOb3QgdXNpbmcgXCJhd2FpdFwiIGJlY2F1c2UgaXQgY29kZWdlbnMgYSBsb3Qgb2YgYm9pbGVycGxhdGVcclxuICAgICAgICBwcm9taXNlLnRoZW4oXHJcbiAgICAgICAgICByZXN1bHQgPT4gZ2V0UmVxdWlyZWREaXNwYXRjaGVyKCkuYmVnaW5JbnZva2VEb3ROZXRGcm9tSlMoMCwgJ01pY3Jvc29mdC5KU0ludGVyb3AnLCAnRG90TmV0RGlzcGF0Y2hlci5FbmRJbnZva2UnLCBudWxsLCBKU09OLnN0cmluZ2lmeShbYXN5bmNIYW5kbGUsIHRydWUsIHJlc3VsdF0sIGFyZ1JlcGxhY2VyKSksXHJcbiAgICAgICAgICBlcnJvciA9PiBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKS5iZWdpbkludm9rZURvdE5ldEZyb21KUygwLCAnTWljcm9zb2Z0LkpTSW50ZXJvcCcsICdEb3ROZXREaXNwYXRjaGVyLkVuZEludm9rZScsIG51bGwsIEpTT04uc3RyaW5naWZ5KFthc3luY0hhbmRsZSwgZmFsc2UsIGZvcm1hdEVycm9yKGVycm9yKV0pKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBub3RpZmljYXRpb24gdGhhdCBhbiBhc3luYyBjYWxsIGZyb20gSlMgdG8gLk5FVCBoYXMgY29tcGxldGVkLlxyXG4gICAgICogQHBhcmFtIGFzeW5jQ2FsbElkIFRoZSBpZGVudGlmaWVyIHN1cHBsaWVkIGluIGFuIGVhcmxpZXIgY2FsbCB0byBiZWdpbkludm9rZURvdE5ldEZyb21KUy5cclxuICAgICAqIEBwYXJhbSBzdWNjZXNzIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBvcGVyYXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAqIEBwYXJhbSByZXN1bHRPckV4Y2VwdGlvbk1lc3NhZ2UgRWl0aGVyIHRoZSBvcGVyYXRpb24gcmVzdWx0IG9yIGFuIGVycm9yIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIGVuZEludm9rZURvdE5ldEZyb21KUzogKGFzeW5jQ2FsbElkOiBzdHJpbmcsIHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3VsdE9yRXhjZXB0aW9uTWVzc2FnZTogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdE9yRXJyb3IgPSBzdWNjZXNzID8gcmVzdWx0T3JFeGNlcHRpb25NZXNzYWdlIDogbmV3IEVycm9yKHJlc3VsdE9yRXhjZXB0aW9uTWVzc2FnZSk7XHJcbiAgICAgIGNvbXBsZXRlUGVuZGluZ0NhbGwocGFyc2VJbnQoYXN5bmNDYWxsSWQpLCBzdWNjZXNzLCByZXN1bHRPckVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhcnNlSnNvbldpdGhSZXZpdmVycyhqc29uOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIGpzb24gPyBKU09OLnBhcnNlKGpzb24sIChrZXksIGluaXRpYWxWYWx1ZSkgPT4ge1xyXG4gICAgICAvLyBJbnZva2UgZWFjaCByZXZpdmVyIGluIG9yZGVyLCBwYXNzaW5nIHRoZSBvdXRwdXQgZnJvbSB0aGUgcHJldmlvdXMgcmV2aXZlcixcclxuICAgICAgLy8gc28gdGhhdCBlYWNoIG9uZSBnZXRzIGEgY2hhbmNlIHRvIHRyYW5zZm9ybSB0aGUgdmFsdWVcclxuICAgICAgcmV0dXJuIGpzb25SZXZpdmVycy5yZWR1Y2UoXHJcbiAgICAgICAgKGxhdGVzdFZhbHVlLCByZXZpdmVyKSA9PiByZXZpdmVyKGtleSwgbGF0ZXN0VmFsdWUpLFxyXG4gICAgICAgIGluaXRpYWxWYWx1ZVxyXG4gICAgICApO1xyXG4gICAgfSkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyb3I6IGFueSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICByZXR1cm4gYCR7ZXJyb3IubWVzc2FnZX1cXG4ke2Vycm9yLnN0YWNrfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZXJyb3IgPyBlcnJvci50b1N0cmluZygpIDogJ251bGwnO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyOiBzdHJpbmcpOiBGdW5jdGlvbiB7XHJcbiAgICBpZiAoY2FjaGVkSlNGdW5jdGlvbnMuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikpIHtcclxuICAgICAgcmV0dXJuIGNhY2hlZEpTRnVuY3Rpb25zW2lkZW50aWZpZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQ6IGFueSA9IHdpbmRvdztcclxuICAgIGxldCByZXN1bHRJZGVudGlmaWVyID0gJ3dpbmRvdyc7XHJcbiAgICBpZGVudGlmaWVyLnNwbGl0KCcuJykuZm9yRWFjaChzZWdtZW50ID0+IHtcclxuICAgICAgaWYgKHNlZ21lbnQgaW4gcmVzdWx0KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0W3NlZ21lbnRdO1xyXG4gICAgICAgIHJlc3VsdElkZW50aWZpZXIgKz0gJy4nICsgc2VnbWVudDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICcke3NlZ21lbnR9JyBpbiAnJHtyZXN1bHRJZGVudGlmaWVyfScuYCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgdmFsdWUgJyR7cmVzdWx0SWRlbnRpZmllcn0nIGlzIG5vdCBhIGZ1bmN0aW9uLmApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xhc3MgRG90TmV0T2JqZWN0IHsgICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pZDogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludm9rZU1ldGhvZDxUPihtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogVCB7XHJcbiAgICAgIHJldHVybiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kPFQ+KG51bGwsIG1ldGhvZElkZW50aWZpZXIsIHRoaXMuX2lkLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW52b2tlTWV0aG9kQXN5bmM8VD4obWV0aG9kSWRlbnRpZmllcjogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD4ge1xyXG4gICAgICByZXR1cm4gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jPFQ+KG51bGwsIG1ldGhvZElkZW50aWZpZXIsIHRoaXMuX2lkLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgY29uc3QgcHJvbWlzZSA9IGludm9rZU1ldGhvZEFzeW5jPGFueT4oXHJcbiAgICAgICAgJ01pY3Jvc29mdC5KU0ludGVyb3AnLFxyXG4gICAgICAgICdEb3ROZXREaXNwYXRjaGVyLlJlbGVhc2VEb3ROZXRPYmplY3QnLFxyXG4gICAgICAgIHRoaXMuX2lkKTtcclxuICAgICAgcHJvbWlzZS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGl6ZUFzQXJnKCkge1xyXG4gICAgICByZXR1cm4gYF9fZG90TmV0T2JqZWN0OiR7dGhpcy5faWR9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGRvdE5ldE9iamVjdFZhbHVlRm9ybWF0ID0gL15fX2RvdE5ldE9iamVjdFxcOihcXGQrKSQvO1xyXG4gIGF0dGFjaFJldml2ZXIoZnVuY3Rpb24gcmV2aXZlRG90TmV0T2JqZWN0KGtleTogYW55LCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCBtYXRjaCA9IHZhbHVlLm1hdGNoKGRvdE5ldE9iamVjdFZhbHVlRm9ybWF0KTtcclxuICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEb3ROZXRPYmplY3QocGFyc2VJbnQobWF0Y2hbMV0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVucmVjb2duaXplZCAtIGxldCBhbm90aGVyIHJldml2ZXIgaGFuZGxlIGl0XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGFyZ1JlcGxhY2VyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEb3ROZXRPYmplY3QgPyB2YWx1ZS5zZXJpYWxpemVBc0FyZygpIDogdmFsdWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAnLi4vLi4vLi4vbW9kdWxlcy9qc2ludGVyb3Avc3JjL01pY3Jvc29mdC5KU0ludGVyb3AuSlMvc3JjL01pY3Jvc29mdC5KU0ludGVyb3AnO1xyXG5pbXBvcnQgJy4vR2xvYmFsRXhwb3J0cyc7XHJcbmltcG9ydCAqIGFzIEVudmlyb25tZW50IGZyb20gJy4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBtb25vUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtL01vbm8vTW9ub1BsYXRmb3JtJztcclxuaW1wb3J0IHsgZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCB9IGZyb20gJy4vUGxhdGZvcm0vVXJsJztcclxuaW1wb3J0IHsgcmVuZGVyQmF0Y2ggfSBmcm9tICcuL1JlbmRlcmluZy9SZW5kZXJlcic7XHJcbmltcG9ydCB7IFJlbmRlckJhdGNoIH0gZnJvbSAnLi9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gvUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBTaGFyZWRNZW1vcnlSZW5kZXJCYXRjaCB9IGZyb20gJy4vUmVuZGVyaW5nL1JlbmRlckJhdGNoL1NoYXJlZE1lbW9yeVJlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgUG9pbnRlciB9IGZyb20gJy4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBmZXRjaEJvb3RDb25maWdBc3luYywgbG9hZEVtYmVkZGVkUmVzb3VyY2VzQXN5bmMgfSBmcm9tICcuL0Jvb3RDb21tb24nO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gYm9vdCgpIHtcclxuICAvLyBDb25maWd1cmUgZW52aXJvbm1lbnQgZm9yIGV4ZWN1dGlvbiB1bmRlciBNb25vIFdlYkFzc2VtYmx5IHdpdGggc2hhcmVkLW1lbW9yeSByZW5kZXJpbmdcclxuICBjb25zdCBwbGF0Zm9ybSA9IEVudmlyb25tZW50LnNldFBsYXRmb3JtKG1vbm9QbGF0Zm9ybSk7XHJcbiAgd2luZG93WydCbGF6b3InXS5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xyXG4gIHdpbmRvd1snQmxhem9yJ10uX2ludGVybmFsLnJlbmRlckJhdGNoID0gKGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGJhdGNoQWRkcmVzczogUG9pbnRlcikgPT4ge1xyXG4gICAgcmVuZGVyQmF0Y2goYnJvd3NlclJlbmRlcmVySWQsIG5ldyBTaGFyZWRNZW1vcnlSZW5kZXJCYXRjaChiYXRjaEFkZHJlc3MpKTtcclxuICB9O1xyXG5cclxuICAvLyBGZXRjaCB0aGUgYm9vdCBKU09OIGZpbGVcclxuICBjb25zdCBib290Q29uZmlnID0gYXdhaXQgZmV0Y2hCb290Q29uZmlnQXN5bmMoKTtcclxuICBjb25zdCBlbWJlZGRlZFJlc291cmNlc1Byb21pc2UgPSBsb2FkRW1iZWRkZWRSZXNvdXJjZXNBc3luYyhib290Q29uZmlnKTtcclxuXHJcbiAgaWYgKCFib290Q29uZmlnLmxpbmtlckVuYWJsZWQpIHtcclxuICAgIGNvbnNvbGUuaW5mbygnQmxhem9yIGlzIHJ1bm5pbmcgaW4gZGV2IG1vZGUgd2l0aG91dCBJTCBzdHJpcHBpbmcuIFRvIG1ha2UgdGhlIGJ1bmRsZSBzaXplIHNpZ25pZmljYW50bHkgc21hbGxlciwgcHVibGlzaCB0aGUgYXBwbGljYXRpb24gb3Igc2VlIGh0dHBzOi8vZ28ubWljcm9zb2Z0LmNvbS9md2xpbmsvP2xpbmtpZD04NzA0MTQnKTtcclxuICB9XHJcblxyXG4gIC8vIERldGVybWluZSB0aGUgVVJMcyBvZiB0aGUgYXNzZW1ibGllcyB3ZSB3YW50IHRvIGxvYWQsIHRoZW4gYmVnaW4gZmV0Y2hpbmcgdGhlbSBhbGxcclxuICBjb25zdCBsb2FkQXNzZW1ibHlVcmxzID0gW2Jvb3RDb25maWcubWFpbl1cclxuICAgIC5jb25jYXQoYm9vdENvbmZpZy5hc3NlbWJseVJlZmVyZW5jZXMpXHJcbiAgICAubWFwKGZpbGVuYW1lID0+IGBfZnJhbWV3b3JrL19iaW4vJHtmaWxlbmFtZX1gKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHBsYXRmb3JtLnN0YXJ0KGxvYWRBc3NlbWJseVVybHMpO1xyXG4gIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzdGFydCBwbGF0Zm9ybS4gUmVhc29uOiAke2V4fWApO1xyXG4gIH1cclxuXHJcbiAgLy8gQmVmb3JlIHdlIHN0YXJ0IHJ1bm5pbmcgLk5FVCBjb2RlLCBiZSBzdXJlIGVtYmVkZGVkIGNvbnRlbnQgcmVzb3VyY2VzIGFyZSBhbGwgbG9hZGVkXHJcbiAgYXdhaXQgZW1iZWRkZWRSZXNvdXJjZXNQcm9taXNlO1xyXG5cclxuICAvLyBTdGFydCB1cCB0aGUgYXBwbGljYXRpb25cclxuICBjb25zdCBtYWluQXNzZW1ibHlOYW1lID0gZ2V0QXNzZW1ibHlOYW1lRnJvbVVybChib290Q29uZmlnLm1haW4pO1xyXG4gIHBsYXRmb3JtLmNhbGxFbnRyeVBvaW50KG1haW5Bc3NlbWJseU5hbWUsIGJvb3RDb25maWcuZW50cnlQb2ludCwgW10pO1xyXG59XHJcblxyXG5ib290KCk7XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJvb3RDb25maWdBc3luYygpIHtcclxuICAvLyBMYXRlciB3ZSBtaWdodCBtYWtlIHRoZSBsb2NhdGlvbiBvZiB0aGlzIGNvbmZpZ3VyYWJsZSAoZS5nLiwgYXMgYW4gYXR0cmlidXRlIG9uIHRoZSA8c2NyaXB0PlxyXG4gIC8vIGVsZW1lbnQgdGhhdCdzIGltcG9ydGluZyB0aGlzIGZpbGUpLCBidXQgY3VycmVudGx5IHRoZXJlIGlzbid0IGEgdXNlIGNhc2UgZm9yIHRoYXQuXHJcbiAgY29uc3QgYm9vdENvbmZpZ1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ19mcmFtZXdvcmsvYmxhem9yLmJvb3QuanNvbicsIHsgbWV0aG9kOiAnR2V0JywgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyB9KTtcclxuICByZXR1cm4gYm9vdENvbmZpZ1Jlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPEJvb3RKc29uRGF0YT47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1iZWRkZWRSZXNvdXJjZXNBc3luYyhib290Q29uZmlnOiBCb290SnNvbkRhdGEpOiBQcm9taXNlPGFueT4ge1xyXG4gIGNvbnN0IGNzc0xvYWRpbmdQcm9taXNlcyA9IGJvb3RDb25maWcuY3NzUmVmZXJlbmNlcy5tYXAoY3NzUmVmZXJlbmNlID0+IHtcclxuICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgbGlua0VsZW1lbnQucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IGNzc1JlZmVyZW5jZTtcclxuICAgIHJldHVybiBsb2FkUmVzb3VyY2VGcm9tRWxlbWVudChsaW5rRWxlbWVudCk7XHJcbiAgfSk7XHJcbiAgY29uc3QganNMb2FkaW5nUHJvbWlzZXMgPSBib290Q29uZmlnLmpzUmVmZXJlbmNlcy5tYXAoanNSZWZlcmVuY2UgPT4ge1xyXG4gICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBqc1JlZmVyZW5jZTtcclxuICAgIHJldHVybiBsb2FkUmVzb3VyY2VGcm9tRWxlbWVudChzY3JpcHRFbGVtZW50KTtcclxuICB9KTtcclxuICByZXR1cm4gUHJvbWlzZS5hbGwoY3NzTG9hZGluZ1Byb21pc2VzLmNvbmNhdChqc0xvYWRpbmdQcm9taXNlcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUmVzb3VyY2VGcm9tRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBlbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICBlbGVtZW50Lm9uZXJyb3IgPSByZWplY3Q7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBLZWVwIGluIHN5bmMgd2l0aCBCb290SnNvbkRhdGEgaW4gTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJ1aWxkXHJcbmludGVyZmFjZSBCb290SnNvbkRhdGEge1xyXG4gIG1haW46IHN0cmluZztcclxuICBlbnRyeVBvaW50OiBzdHJpbmc7XHJcbiAgYXNzZW1ibHlSZWZlcmVuY2VzOiBzdHJpbmdbXTtcclxuICBjc3NSZWZlcmVuY2VzOiBzdHJpbmdbXTtcclxuICBqc1JlZmVyZW5jZXM6IHN0cmluZ1tdO1xyXG4gIGxpbmtlckVuYWJsZWQ6IGJvb2xlYW47XHJcbn1cclxuIiwiLy8gRXhwb3NlIGFuIGV4cG9ydCBjYWxsZWQgJ3BsYXRmb3JtJyBvZiB0aGUgaW50ZXJmYWNlIHR5cGUgJ1BsYXRmb3JtJyxcclxuLy8gc28gdGhhdCBjb25zdW1lcnMgY2FuIGJlIGFnbm9zdGljIGFib3V0IHdoaWNoIGltcGxlbWVudGF0aW9uIHRoZXkgdXNlLlxyXG4vLyBCYXNpYyBhbHRlcm5hdGl2ZSB0byBoYXZpbmcgYW4gYWN0dWFsIERJIGNvbnRhaW5lci5cclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuXHJcbmV4cG9ydCBsZXQgcGxhdGZvcm06IFBsYXRmb3JtO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXRmb3JtKHBsYXRmb3JtSW5zdGFuY2U6IFBsYXRmb3JtKSB7XHJcbiAgcGxhdGZvcm0gPSBwbGF0Zm9ybUluc3RhbmNlO1xyXG4gIHJldHVybiBwbGF0Zm9ybTtcclxufVxyXG4iLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvLCBpbnRlcm5hbEZ1bmN0aW9ucyBhcyB1cmlIZWxwZXJJbnRlcm5hbEZ1bmN0aW9ucyB9IGZyb20gJy4vU2VydmljZXMvVXJpSGVscGVyJztcclxuaW1wb3J0IHsgaW50ZXJuYWxGdW5jdGlvbnMgYXMgaHR0cEludGVybmFsRnVuY3Rpb25zIH0gZnJvbSAnLi9TZXJ2aWNlcy9IdHRwJztcclxuaW1wb3J0IHsgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCB9IGZyb20gJy4vUmVuZGVyaW5nL1JlbmRlcmVyJztcclxuaW1wb3J0IHsgUG9pbnRlciB9IGZyb20gJy4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5cclxuLy8gTWFrZSB0aGUgZm9sbG93aW5nIEFQSXMgYXZhaWxhYmxlIGluIGdsb2JhbCBzY29wZSBmb3IgaW52b2NhdGlvbiBmcm9tIEpTXHJcbndpbmRvd1snQmxhem9yJ10gPSB7XHJcbiAgbmF2aWdhdGVUbyxcclxuXHJcbiAgX2ludGVybmFsOiB7XHJcbiAgICBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50LFxyXG4gICAgaHR0cDogaHR0cEludGVybmFsRnVuY3Rpb25zLFxyXG4gICAgdXJpSGVscGVyOiB1cmlIZWxwZXJJbnRlcm5hbEZ1bmN0aW9uc1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0IHsgZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCwgZ2V0RmlsZU5hbWVGcm9tVXJsIH0gZnJvbSAnLi4vVXJsJztcclxuXHJcbmNvbnN0IGN1cnJlbnRCcm93c2VySXNDaHJvbWUgPSAod2luZG93IGFzIGFueSkuY2hyb21lXHJcbiAgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPCAwOyAvLyBFZGdlIHByZXRlbmRzIHRvIGJlIENocm9tZVxyXG5cclxubGV0IGhhc1JlZmVyZW5jZWRQZGJzID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzRGVidWdnaW5nRW5hYmxlZCgpIHtcclxuICByZXR1cm4gaGFzUmVmZXJlbmNlZFBkYnMgJiYgY3VycmVudEJyb3dzZXJJc0Nocm9tZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaERlYnVnZ2VySG90a2V5KGxvYWRBc3NlbWJseVVybHM6IHN0cmluZ1tdKSB7XHJcbiAgaGFzUmVmZXJlbmNlZFBkYnMgPSBsb2FkQXNzZW1ibHlVcmxzXHJcbiAgICAuc29tZSh1cmwgPT4gL1xcLnBkYiQvLnRlc3QoZ2V0RmlsZU5hbWVGcm9tVXJsKHVybCkpKTtcclxuXHJcbiAgLy8gVXNlIHRoZSBjb21iaW5hdGlvbiBzaGlmdCthbHQrRCBiZWNhdXNlIGl0IGlzbid0IHVzZWQgYnkgdGhlIG1ham9yIGJyb3dzZXJzXHJcbiAgLy8gZm9yIGFueXRoaW5nIGVsc2UgYnkgZGVmYXVsdFxyXG4gIGNvbnN0IGFsdEtleU5hbWUgPSBuYXZpZ2F0b3IucGxhdGZvcm0ubWF0Y2goL15NYWMvaSkgPyAnQ21kJyA6ICdBbHQnO1xyXG4gIGlmIChoYXNEZWJ1Z2dpbmdFbmFibGVkKCkpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhgRGVidWdnaW5nIGhvdGtleTogU2hpZnQrJHthbHRLZXlOYW1lfStEICh3aGVuIGFwcGxpY2F0aW9uIGhhcyBmb2N1cylgKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW4gaWYgZGVidWdnaW5nIGlzbid0IGVuYWJsZWQsIHdlIHJlZ2lzdGVyIHRoZSBob3RrZXkgc28gd2UgY2FuIHJlcG9ydCB3aHkgaXQncyBub3QgZW5hYmxlZFxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldnQgPT4ge1xyXG4gICAgaWYgKGV2dC5zaGlmdEtleSAmJiAoZXZ0Lm1ldGFLZXkgfHwgZXZ0LmFsdEtleSkgJiYgZXZ0LmNvZGUgPT09ICdLZXlEJykge1xyXG4gICAgICBpZiAoIWhhc1JlZmVyZW5jZWRQZGJzKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IHN0YXJ0IGRlYnVnZ2luZywgYmVjYXVzZSB0aGUgYXBwbGljYXRpb24gd2FzIG5vdCBjb21waWxlZCB3aXRoIGRlYnVnZ2luZyBlbmFibGVkLicpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFjdXJyZW50QnJvd3NlcklzQ2hyb21lKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQ3VycmVudGx5LCBvbmx5IENocm9tZSBpcyBzdXBwb3J0ZWQgZm9yIGRlYnVnZ2luZy4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsYXVuY2hEZWJ1Z2dlcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxhdW5jaERlYnVnZ2VyKCkge1xyXG4gIC8vIFRoZSBub29wZW5lciBmbGFnIGlzIGVzc2VudGlhbCwgYmVjYXVzZSBvdGhlcndpc2UgQ2hyb21lIHRyYWNrcyB0aGUgYXNzb2NpYXRpb24gd2l0aCB0aGVcclxuICAvLyBwYXJlbnQgdGFiLCBhbmQgdGhlbiB3aGVuIHRoZSBwYXJlbnQgdGFiIHBhdXNlcyBpbiB0aGUgZGVidWdnZXIsIHRoZSBjaGlsZCB0YWIgZG9lcyBzb1xyXG4gIC8vIHRvbyAoZXZlbiBpZiBpdCdzIHNpbmNlIG5hdmlnYXRlZCB0byBhIGRpZmZlcmVudCBwYWdlKS4gVGhpcyBtZWFucyB0aGF0IHRoZSBkZWJ1Z2dlclxyXG4gIC8vIGl0c2VsZiBmcmVlemVzLCBhbmQgbm90IGp1c3QgdGhlIHBhZ2UgYmVpbmcgZGVidWdnZWQuXHJcbiAgLy9cclxuICAvLyBXZSBoYXZlIHRvIGNvbnN0cnVjdCBhIGxpbmsgZWxlbWVudCBhbmQgc2ltdWxhdGUgYSBjbGljayBvbiBpdCwgYmVjYXVzZSB0aGUgbW9yZSBvYnZpb3VzXHJcbiAgLy8gd2luZG93Lm9wZW4oLi4uLCAnbm9vcGVuZXInKSBhbHdheXMgb3BlbnMgYSBuZXcgd2luZG93IGluc3RlYWQgb2YgYSBuZXcgdGFiLlxyXG4gIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgbGluay5ocmVmID0gYF9mcmFtZXdvcmsvZGVidWc/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmhyZWYpfWA7XHJcbiAgbGluay50YXJnZXQgPSAnX2JsYW5rJztcclxuICBsaW5rLnJlbCA9ICdub29wZW5lciBub3JlZmVycmVyJztcclxuICBsaW5rLmNsaWNrKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgTWV0aG9kSGFuZGxlLCBTeXN0ZW1fT2JqZWN0LCBTeXN0ZW1fU3RyaW5nLCBTeXN0ZW1fQXJyYXksIFBvaW50ZXIsIFBsYXRmb3JtIH0gZnJvbSAnLi4vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBnZXRBc3NlbWJseU5hbWVGcm9tVXJsLCBnZXRGaWxlTmFtZUZyb21VcmwgfSBmcm9tICcuLi9VcmwnO1xyXG5pbXBvcnQgeyBhdHRhY2hEZWJ1Z2dlckhvdGtleSwgaGFzRGVidWdnaW5nRW5hYmxlZCB9IGZyb20gJy4vTW9ub0RlYnVnZ2VyJztcclxuXHJcbmNvbnN0IGFzc2VtYmx5SGFuZGxlQ2FjaGU6IHsgW2Fzc2VtYmx5TmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuY29uc3QgdHlwZUhhbmRsZUNhY2hlOiB7IFtmdWxseVF1YWxpZmllZFR5cGVOYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5jb25zdCBtZXRob2RIYW5kbGVDYWNoZTogeyBbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lOiBzdHJpbmddOiBNZXRob2RIYW5kbGUgfSA9IHt9O1xyXG5cclxubGV0IGFzc2VtYmx5X2xvYWQ6IChhc3NlbWJseU5hbWU6IHN0cmluZykgPT4gbnVtYmVyO1xyXG5sZXQgZmluZF9jbGFzczogKGFzc2VtYmx5SGFuZGxlOiBudW1iZXIsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZykgPT4gbnVtYmVyO1xyXG5sZXQgZmluZF9tZXRob2Q6ICh0eXBlSGFuZGxlOiBudW1iZXIsIG1ldGhvZE5hbWU6IHN0cmluZywgdW5rbm93bkFyZzogbnVtYmVyKSA9PiBNZXRob2RIYW5kbGU7XHJcbmxldCBpbnZva2VfbWV0aG9kOiAobWV0aG9kOiBNZXRob2RIYW5kbGUsIHRhcmdldDogU3lzdGVtX09iamVjdCwgYXJnc0FycmF5UHRyOiBudW1iZXIsIGV4Y2VwdGlvbkZsYWdJbnRQdHI6IG51bWJlcikgPT4gU3lzdGVtX09iamVjdDtcclxubGV0IG1vbm9fc3RyaW5nX2dldF91dGY4OiAobWFuYWdlZFN0cmluZzogU3lzdGVtX1N0cmluZykgPT4gTW9uby5VdGY4UHRyO1xyXG5sZXQgbW9ub19zdHJpbmc6IChqc1N0cmluZzogc3RyaW5nKSA9PiBTeXN0ZW1fU3RyaW5nO1xyXG5jb25zdCBhcHBCaW5EaXJOYW1lID0gJ2FwcEJpbkRpcic7XHJcblxyXG5leHBvcnQgY29uc3QgbW9ub1BsYXRmb3JtOiBQbGF0Zm9ybSA9IHtcclxuICBzdGFydDogZnVuY3Rpb24gc3RhcnQobG9hZEFzc2VtYmx5VXJsczogc3RyaW5nW10pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF0dGFjaERlYnVnZ2VySG90a2V5KGxvYWRBc3NlbWJseVVybHMpO1xyXG5cclxuICAgICAgLy8gbW9uby5qcyBhc3N1bWVzIHRoZSBleGlzdGVuY2Ugb2YgdGhpc1xyXG4gICAgICB3aW5kb3dbJ0Jyb3dzZXInXSA9IHtcclxuICAgICAgICBpbml0OiAoKSA9PiB7IH1cclxuICAgICAgfTtcclxuICAgICAgLy8gRW1zY3JpcHRlbiB3b3JrcyBieSBleHBlY3RpbmcgdGhlIG1vZHVsZSBjb25maWcgdG8gYmUgYSBnbG9iYWxcclxuICAgICAgd2luZG93WydNb2R1bGUnXSA9IGNyZWF0ZUVtc2NyaXB0ZW5Nb2R1bGVJbnN0YW5jZShsb2FkQXNzZW1ibHlVcmxzLCByZXNvbHZlLCByZWplY3QpO1xyXG5cclxuICAgICAgYWRkU2NyaXB0VGFnc1RvRG9jdW1lbnQoKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGZpbmRNZXRob2Q6IGZpbmRNZXRob2QsXHJcblxyXG4gIGNhbGxFbnRyeVBvaW50OiBmdW5jdGlvbiBjYWxsRW50cnlQb2ludChhc3NlbWJseU5hbWU6IHN0cmluZywgZW50cnlwb2ludE1ldGhvZDogc3RyaW5nLCBhcmdzOiBTeXN0ZW1fT2JqZWN0W10pOiB2b2lkIHtcclxuICAgIC8vIFBhcnNlIHRoZSBlbnRyeXBvaW50TWV0aG9kLCB3aGljaCBpcyBvZiB0aGUgZm9ybSBNeUFwcC5NeU5hbWVzcGFjZS5NeVR5cGVOYW1lOjpNeU1ldGhvZE5hbWVcclxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBzdXBwb3J0IHNwZWNpZnlpbmcgYSBtZXRob2Qgb3ZlcmxvYWQsIHNvIGl0IGhhcyB0byBiZSB1bmlxdWVcclxuICAgIGNvbnN0IGVudHJ5cG9pbnRTZWdtZW50cyA9IGVudHJ5cG9pbnRNZXRob2Quc3BsaXQoJzo6Jyk7XHJcbiAgICBpZiAoZW50cnlwb2ludFNlZ21lbnRzLmxlbmd0aCAhPSAyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIGVudHJ5IHBvaW50IG1ldGhvZCBuYW1lOyBjb3VsZCBub3QgcmVzb2x2ZSBjbGFzcyBuYW1lIGFuZCBtZXRob2QgbmFtZS4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHR5cGVGdWxsTmFtZSA9IGVudHJ5cG9pbnRTZWdtZW50c1swXTtcclxuICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBlbnRyeXBvaW50U2VnbWVudHNbMV07XHJcbiAgICBjb25zdCBsYXN0RG90ID0gdHlwZUZ1bGxOYW1lLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICBjb25zdCBuYW1lc3BhY2UgPSBsYXN0RG90ID4gLTEgPyB0eXBlRnVsbE5hbWUuc3Vic3RyaW5nKDAsIGxhc3REb3QpIDogJyc7XHJcbiAgICBjb25zdCB0eXBlU2hvcnROYW1lID0gbGFzdERvdCA+IC0xID8gdHlwZUZ1bGxOYW1lLnN1YnN0cmluZyhsYXN0RG90ICsgMSkgOiB0eXBlRnVsbE5hbWU7XHJcblxyXG4gICAgY29uc3QgZW50cnlQb2ludE1ldGhvZEhhbmRsZSA9IG1vbm9QbGF0Zm9ybS5maW5kTWV0aG9kKGFzc2VtYmx5TmFtZSwgbmFtZXNwYWNlLCB0eXBlU2hvcnROYW1lLCBtZXRob2ROYW1lKTtcclxuICAgIG1vbm9QbGF0Zm9ybS5jYWxsTWV0aG9kKGVudHJ5UG9pbnRNZXRob2RIYW5kbGUsIG51bGwsIGFyZ3MpO1xyXG4gIH0sXHJcblxyXG4gIGNhbGxNZXRob2Q6IGZ1bmN0aW9uIGNhbGxNZXRob2QobWV0aG9kOiBNZXRob2RIYW5kbGUsIHRhcmdldDogU3lzdGVtX09iamVjdCwgYXJnczogU3lzdGVtX09iamVjdFtdKTogU3lzdGVtX09iamVjdCB7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPiA0KSB7XHJcbiAgICAgIC8vIEhvcGVmdWxseSB0aGlzIHJlc3RyaWN0aW9uIGNhbiBiZSBlYXNlZCBzb29uLCBidXQgZm9yIG5vdyBtYWtlIGl0IGNsZWFyIHdoYXQncyBnb2luZyBvblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEN1cnJlbnRseSwgTW9ub1BsYXRmb3JtIHN1cHBvcnRzIHBhc3NpbmcgYSBtYXhpbXVtIG9mIDQgYXJndW1lbnRzIGZyb20gSlMgdG8gLk5FVC4gWW91IHRyaWVkIHRvIHBhc3MgJHthcmdzLmxlbmd0aH0uYCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhY2sgPSBNb2R1bGUuc3RhY2tTYXZlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYXJnc0J1ZmZlciA9IE1vZHVsZS5zdGFja0FsbG9jKGFyZ3MubGVuZ3RoKTtcclxuICAgICAgY29uc3QgZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQgPSBNb2R1bGUuc3RhY2tBbGxvYyg0KTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgTW9kdWxlLnNldFZhbHVlKGFyZ3NCdWZmZXIgKyBpICogNCwgYXJnc1tpXSwgJ2kzMicpO1xyXG4gICAgICB9XHJcbiAgICAgIE1vZHVsZS5zZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgMCwgJ2kzMicpO1xyXG5cclxuICAgICAgY29uc3QgcmVzID0gaW52b2tlX21ldGhvZChtZXRob2QsIHRhcmdldCwgYXJnc0J1ZmZlciwgZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQpO1xyXG5cclxuICAgICAgaWYgKE1vZHVsZS5nZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgJ2kzMicpICE9PSAwKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGV4Y2VwdGlvbiBmbGFnIGlzIHNldCwgdGhlIHJldHVybmVkIHZhbHVlIGlzIGV4Y2VwdGlvbi5Ub1N0cmluZygpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1vbm9QbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoPFN5c3RlbV9TdHJpbmc+cmVzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBNb2R1bGUuc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB0b0phdmFTY3JpcHRTdHJpbmc6IGZ1bmN0aW9uIHRvSmF2YVNjcmlwdFN0cmluZyhtYW5hZ2VkU3RyaW5nOiBTeXN0ZW1fU3RyaW5nKSB7XHJcbiAgICAvLyBDb21tZW50cyBmcm9tIG9yaWdpbmFsIE1vbm8gc2FtcGxlOlxyXG4gICAgLy9GSVhNRSB0aGlzIGlzIHdhc3RlZnVsbCwgd2UgY291bGQgcmVtb3ZlIHRoZSB0ZW1wIG1hbGxvYyBieSBnb2luZyB0aGUgVVRGMTYgcm91dGVcclxuICAgIC8vRklYTUUgdGhpcyBpcyB1bnNhZmUsIGN1eiByYXcgb2JqZWN0cyBjb3VsZCBiZSBHQydkLlxyXG5cclxuICAgIGNvbnN0IHV0ZjggPSBtb25vX3N0cmluZ19nZXRfdXRmOChtYW5hZ2VkU3RyaW5nKTtcclxuICAgIGNvbnN0IHJlcyA9IE1vZHVsZS5VVEY4VG9TdHJpbmcodXRmOCk7XHJcbiAgICBNb2R1bGUuX2ZyZWUodXRmOCBhcyBhbnkpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9LFxyXG5cclxuICB0b0RvdE5ldFN0cmluZzogZnVuY3Rpb24gdG9Eb3ROZXRTdHJpbmcoanNTdHJpbmc6IHN0cmluZyk6IFN5c3RlbV9TdHJpbmcge1xyXG4gICAgcmV0dXJuIG1vbm9fc3RyaW5nKGpzU3RyaW5nKTtcclxuICB9LFxyXG5cclxuICB0b1VpbnQ4QXJyYXk6IGZ1bmN0aW9uIHRvVWludDhBcnJheShhcnJheTogU3lzdGVtX0FycmF5PGFueT4pOiBVaW50OEFycmF5IHtcclxuICAgIGNvbnN0IGRhdGFQdHIgPSBnZXRBcnJheURhdGFQb2ludGVyKGFycmF5KTtcclxuICAgIGNvbnN0IGxlbmd0aCA9IE1vZHVsZS5nZXRWYWx1ZShkYXRhUHRyLCAnaTMyJyk7XHJcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoTW9kdWxlLkhFQVBVOC5idWZmZXIsIGRhdGFQdHIgKyA0LCBsZW5ndGgpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFycmF5TGVuZ3RoOiBmdW5jdGlvbiBnZXRBcnJheUxlbmd0aChhcnJheTogU3lzdGVtX0FycmF5PGFueT4pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1vZHVsZS5nZXRWYWx1ZShnZXRBcnJheURhdGFQb2ludGVyKGFycmF5KSwgJ2kzMicpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFycmF5RW50cnlQdHI6IGZ1bmN0aW9uIGdldEFycmF5RW50cnlQdHI8VFB0ciBleHRlbmRzIFBvaW50ZXI+KGFycmF5OiBTeXN0ZW1fQXJyYXk8VFB0cj4sIGluZGV4OiBudW1iZXIsIGl0ZW1TaXplOiBudW1iZXIpOiBUUHRyIHtcclxuICAgIC8vIEZpcnN0IGJ5dGUgaXMgYXJyYXkgbGVuZ3RoLCBmb2xsb3dlZCBieSBlbnRyaWVzXHJcbiAgICBjb25zdCBhZGRyZXNzID0gZ2V0QXJyYXlEYXRhUG9pbnRlcihhcnJheSkgKyA0ICsgaW5kZXggKiBpdGVtU2l6ZTtcclxuICAgIHJldHVybiBhZGRyZXNzIGFzIGFueSBhcyBUUHRyO1xyXG4gIH0sXHJcblxyXG4gIGdldE9iamVjdEZpZWxkc0Jhc2VBZGRyZXNzOiBmdW5jdGlvbiBnZXRPYmplY3RGaWVsZHNCYXNlQWRkcmVzcyhyZWZlcmVuY2VUeXBlZE9iamVjdDogU3lzdGVtX09iamVjdCk6IFBvaW50ZXIge1xyXG4gICAgLy8gVGhlIGZpcnN0IHR3byBpbnQzMiB2YWx1ZXMgYXJlIGludGVybmFsIE1vbm8gZGF0YVxyXG4gICAgcmV0dXJuIChyZWZlcmVuY2VUeXBlZE9iamVjdCBhcyBhbnkgYXMgbnVtYmVyICsgOCkgYXMgYW55IGFzIFBvaW50ZXI7XHJcbiAgfSxcclxuXHJcbiAgcmVhZEludDMyRmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwSW50MzIoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJyk7XHJcbiAgfSxcclxuXHJcbiAgcmVhZEZsb2F0RmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwRmxvYXQoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnZmxvYXQnKTtcclxuICB9LFxyXG5cclxuICByZWFkT2JqZWN0RmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwT2JqZWN0PFQgZXh0ZW5kcyBTeXN0ZW1fT2JqZWN0PihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJykgYXMgYW55IGFzIFQ7XHJcbiAgfSxcclxuXHJcbiAgcmVhZFN0cmluZ0ZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcE9iamVjdChiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJyk7XHJcbiAgICByZXR1cm4gZmllbGRWYWx1ZSA9PT0gMCA/IG51bGwgOiBtb25vUGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKGZpZWxkVmFsdWUgYXMgYW55IGFzIFN5c3RlbV9TdHJpbmcpO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRTdHJ1Y3RGaWVsZDogZnVuY3Rpb24gcmVhZFN0cnVjdEZpZWxkPFQgZXh0ZW5kcyBQb2ludGVyPihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiAoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApKSBhcyBhbnkgYXMgVDtcclxuICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gZmluZEFzc2VtYmx5KGFzc2VtYmx5TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICBsZXQgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseUhhbmRsZUNhY2hlW2Fzc2VtYmx5TmFtZV07XHJcbiAgaWYgKCFhc3NlbWJseUhhbmRsZSkge1xyXG4gICAgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseV9sb2FkKGFzc2VtYmx5TmFtZSk7XHJcbiAgICBpZiAoIWFzc2VtYmx5SGFuZGxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYXNzZW1ibHkgXCIke2Fzc2VtYmx5TmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgYXNzZW1ibHlIYW5kbGVDYWNoZVthc3NlbWJseU5hbWVdID0gYXNzZW1ibHlIYW5kbGU7XHJcbiAgfVxyXG4gIHJldHVybiBhc3NlbWJseUhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFR5cGUoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgY29uc3QgZnVsbHlRdWFsaWZpZWRUeXBlTmFtZSA9IGBbJHthc3NlbWJseU5hbWV9XSR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1gO1xyXG4gIGxldCB0eXBlSGFuZGxlID0gdHlwZUhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkVHlwZU5hbWVdO1xyXG4gIGlmICghdHlwZUhhbmRsZSkge1xyXG4gICAgdHlwZUhhbmRsZSA9IGZpbmRfY2xhc3MoZmluZEFzc2VtYmx5KGFzc2VtYmx5TmFtZSksIG5hbWVzcGFjZSwgY2xhc3NOYW1lKTtcclxuICAgIGlmICghdHlwZUhhbmRsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHR5cGUgXCIke2NsYXNzTmFtZX1cIiBpbiBuYW1lc3BhY2UgXCIke25hbWVzcGFjZX1cIiBpbiBhc3NlbWJseSBcIiR7YXNzZW1ibHlOYW1lfVwiYCk7XHJcbiAgICB9XHJcbiAgICB0eXBlSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRUeXBlTmFtZV0gPSB0eXBlSGFuZGxlO1xyXG4gIH1cclxuICByZXR1cm4gdHlwZUhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZE1ldGhvZChhc3NlbWJseU5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcpOiBNZXRob2RIYW5kbGUge1xyXG4gIGNvbnN0IGZ1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZSA9IGBbJHthc3NlbWJseU5hbWV9XSR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX06OiR7bWV0aG9kTmFtZX1gO1xyXG4gIGxldCBtZXRob2RIYW5kbGUgPSBtZXRob2RIYW5kbGVDYWNoZVtmdWxseVF1YWxpZmllZE1ldGhvZE5hbWVdO1xyXG4gIGlmICghbWV0aG9kSGFuZGxlKSB7XHJcbiAgICBtZXRob2RIYW5kbGUgPSBmaW5kX21ldGhvZChmaW5kVHlwZShhc3NlbWJseU5hbWUsIG5hbWVzcGFjZSwgY2xhc3NOYW1lKSwgbWV0aG9kTmFtZSwgLTEpO1xyXG4gICAgaWYgKCFtZXRob2RIYW5kbGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBtZXRob2QgXCIke21ldGhvZE5hbWV9XCIgb24gdHlwZSBcIiR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgbWV0aG9kSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lXSA9IG1ldGhvZEhhbmRsZTtcclxuICB9XHJcbiAgcmV0dXJuIG1ldGhvZEhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU2NyaXB0VGFnc1RvRG9jdW1lbnQoKSB7XHJcbiAgLy8gTG9hZCBlaXRoZXIgdGhlIHdhc20gb3IgYXNtLmpzIHZlcnNpb24gb2YgdGhlIE1vbm8gcnVudGltZVxyXG4gIGNvbnN0IGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID0gdHlwZW9mIFdlYkFzc2VtYmx5ICE9PSAndW5kZWZpbmVkJyAmJiBXZWJBc3NlbWJseS52YWxpZGF0ZTtcclxuICBjb25zdCBtb25vUnVudGltZVVybEJhc2UgPSAnX2ZyYW1ld29yay8nICsgKGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID8gJ3dhc20nIDogJ2FzbWpzJyk7XHJcbiAgY29uc3QgbW9ub1J1bnRpbWVTY3JpcHRVcmwgPSBgJHttb25vUnVudGltZVVybEJhc2V9L21vbm8uanNgO1xyXG5cclxuICBpZiAoIWJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5KSB7XHJcbiAgICAvLyBJbiB0aGUgYXNtanMgY2FzZSwgdGhlIGluaXRpYWwgbWVtb3J5IHN0cnVjdHVyZSBpcyBpbiBhIHNlcGFyYXRlIGZpbGUgd2UgbmVlZCB0byBkb3dubG9hZFxyXG4gICAgY29uc3QgbWVtaW5pdFhIUiA9IE1vZHVsZVsnbWVtb3J5SW5pdGlhbGl6ZXJSZXF1ZXN0J10gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIG1lbWluaXRYSFIub3BlbignR0VUJywgYCR7bW9ub1J1bnRpbWVVcmxCYXNlfS9tb25vLmpzLm1lbWApO1xyXG4gICAgbWVtaW5pdFhIUi5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgbWVtaW5pdFhIUi5zZW5kKHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzY3JpcHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgc2NyaXB0RWxlbS5zcmMgPSBtb25vUnVudGltZVNjcmlwdFVybDtcclxuICBzY3JpcHRFbGVtLmRlZmVyID0gdHJ1ZTtcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbXNjcmlwdGVuTW9kdWxlSW5zdGFuY2UobG9hZEFzc2VtYmx5VXJsczogc3RyaW5nW10sIG9uUmVhZHk6ICgpID0+IHZvaWQsIG9uRXJyb3I6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpIHtcclxuICBjb25zdCBtb2R1bGUgPSB7fSBhcyB0eXBlb2YgTW9kdWxlO1xyXG4gIGNvbnN0IHdhc21CaW5hcnlGaWxlID0gJ19mcmFtZXdvcmsvd2FzbS9tb25vLndhc20nO1xyXG4gIGNvbnN0IGFzbWpzQ29kZUZpbGUgPSAnX2ZyYW1ld29yay9hc21qcy9tb25vLmFzbS5qcyc7XHJcbiAgY29uc3Qgc3VwcHJlc3NNZXNzYWdlcyA9IFsnREVCVUdHSU5HIEVOQUJMRUQnXTtcclxuXHJcbiAgbW9kdWxlLnByaW50ID0gbGluZSA9PiAoc3VwcHJlc3NNZXNzYWdlcy5pbmRleE9mKGxpbmUpIDwgMCAmJiBjb25zb2xlLmxvZyhgV0FTTTogJHtsaW5lfWApKTtcclxuICBtb2R1bGUucHJpbnRFcnIgPSBsaW5lID0+IGNvbnNvbGUuZXJyb3IoYFdBU006ICR7bGluZX1gKTtcclxuICBtb2R1bGUucHJlUnVuID0gW107XHJcbiAgbW9kdWxlLnBvc3RSdW4gPSBbXTtcclxuICBtb2R1bGUucHJlbG9hZFBsdWdpbnMgPSBbXTtcclxuXHJcbiAgbW9kdWxlLmxvY2F0ZUZpbGUgPSBmaWxlTmFtZSA9PiB7XHJcbiAgICBzd2l0Y2ggKGZpbGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ21vbm8ud2FzbSc6IHJldHVybiB3YXNtQmluYXJ5RmlsZTtcclxuICAgICAgY2FzZSAnbW9uby5hc20uanMnOiByZXR1cm4gYXNtanNDb2RlRmlsZTtcclxuICAgICAgZGVmYXVsdDogcmV0dXJuIGZpbGVOYW1lO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG1vZHVsZS5wcmVSdW4ucHVzaCgoKSA9PiB7XHJcbiAgICAvLyBCeSBub3csIGVtc2NyaXB0ZW4gc2hvdWxkIGJlIGluaXRpYWxpc2VkIGVub3VnaCB0aGF0IHdlIGNhbiBjYXB0dXJlIHRoZXNlIG1ldGhvZHMgZm9yIGxhdGVyIHVzZVxyXG4gICAgYXNzZW1ibHlfbG9hZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2xvYWQnLCAnbnVtYmVyJywgWydzdHJpbmcnXSk7XHJcbiAgICBmaW5kX2NsYXNzID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fYXNzZW1ibHlfZmluZF9jbGFzcycsICdudW1iZXInLCBbJ251bWJlcicsICdzdHJpbmcnLCAnc3RyaW5nJ10pO1xyXG4gICAgZmluZF9tZXRob2QgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9hc3NlbWJseV9maW5kX21ldGhvZCcsICdudW1iZXInLCBbJ251bWJlcicsICdzdHJpbmcnLCAnbnVtYmVyJ10pO1xyXG4gICAgaW52b2tlX21ldGhvZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2ludm9rZV9tZXRob2QnLCAnbnVtYmVyJywgWydudW1iZXInLCAnbnVtYmVyJywgJ251bWJlciddKTtcclxuICAgIG1vbm9fc3RyaW5nX2dldF91dGY4ID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fc3RyaW5nX2dldF91dGY4JywgJ251bWJlcicsIFsnbnVtYmVyJ10pO1xyXG4gICAgbW9ub19zdHJpbmcgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9zdHJpbmdfZnJvbV9qcycsICdudW1iZXInLCBbJ3N0cmluZyddKTtcclxuXHJcbiAgICBNb2R1bGUuRlNfY3JlYXRlUGF0aCgnLycsIGFwcEJpbkRpck5hbWUsIHRydWUsIHRydWUpO1xyXG4gICAgTU9OTy5sb2FkZWRfZmlsZXMgPSBbXTtcclxuXHJcbiAgICBsb2FkQXNzZW1ibHlVcmxzLmZvckVhY2godXJsID0+IHtcclxuICAgICAgY29uc3QgZmlsZW5hbWUgPSBnZXRGaWxlTmFtZUZyb21VcmwodXJsKTtcclxuICAgICAgY29uc3QgcnVuRGVwZW5kZW5jeUlkID0gYGJsYXpvcjoke2ZpbGVuYW1lfWA7XHJcbiAgICAgIGFkZFJ1bkRlcGVuZGVuY3kocnVuRGVwZW5kZW5jeUlkKTtcclxuICAgICAgYXN5bmNMb2FkKHVybCkudGhlbihcclxuICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgIE1vZHVsZS5GU19jcmVhdGVEYXRhRmlsZShhcHBCaW5EaXJOYW1lLCBmaWxlbmFtZSwgZGF0YSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgIE1PTk8ubG9hZGVkX2ZpbGVzLnB1c2godG9BYnNvbHV0ZVVybCh1cmwpKTtcclxuICAgICAgICAgIHJlbW92ZVJ1bkRlcGVuZGVuY3kocnVuRGVwZW5kZW5jeUlkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9ySW5mbyA9PiB7XHJcbiAgICAgICAgICAvLyBJZiBpdCdzIGEgNDA0IG9uIGEgLnBkYiwgd2UgZG9uJ3Qgd2FudCB0byBibG9jayB0aGUgYXBwIGZyb20gc3RhcnRpbmcgdXAuXHJcbiAgICAgICAgICAvLyBXZSdsbCBqdXN0IHNraXAgdGhhdCBmaWxlIGFuZCBjb250aW51ZSAodGhvdWdoIHRoZSA0MDQgaXMgbG9nZ2VkIGluIHRoZSBjb25zb2xlKS5cclxuICAgICAgICAgIC8vIFRoaXMgaGFwcGVucyBpZiB5b3UgYnVpbGQgYSBEZWJ1ZyBidWlsZCBidXQgdGhlbiBydW4gaW4gUHJvZHVjdGlvbiBlbnZpcm9ubWVudC5cclxuICAgICAgICAgIGNvbnN0IGlzUGRiNDA0ID0gZXJyb3JJbmZvIGluc3RhbmNlb2YgWE1MSHR0cFJlcXVlc3RcclxuICAgICAgICAgICAgJiYgZXJyb3JJbmZvLnN0YXR1cyA9PT0gNDA0XHJcbiAgICAgICAgICAgICYmIGZpbGVuYW1lLm1hdGNoKC9cXC5wZGIkLyk7XHJcbiAgICAgICAgICBpZiAoIWlzUGRiNDA0KSB7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyb3JJbmZvKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlbW92ZVJ1bkRlcGVuZGVuY3kocnVuRGVwZW5kZW5jeUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgbW9kdWxlLnBvc3RSdW4ucHVzaCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkX3J1bnRpbWUgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9sb2FkX3J1bnRpbWUnLCBudWxsLCBbJ3N0cmluZycsICdudW1iZXInXSk7XHJcbiAgICBsb2FkX3J1bnRpbWUoYXBwQmluRGlyTmFtZSwgaGFzRGVidWdnaW5nRW5hYmxlZCgpID8gMSA6IDApO1xyXG4gICAgTU9OTy5tb25vX3dhc21fcnVudGltZV9pc19yZWFkeSA9IHRydWU7XHJcbiAgICBhdHRhY2hJbnRlcm9wSW52b2tlcigpO1xyXG4gICAgb25SZWFkeSgpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbW9kdWxlO1xyXG59XHJcblxyXG5jb25zdCBhbmNob3JUYWdGb3JBYnNvbHV0ZVVybENvbnZlcnNpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5mdW5jdGlvbiB0b0Fic29sdXRlVXJsKHBvc3NpYmx5UmVsYXRpdmVVcmw6IHN0cmluZykge1xyXG4gIGFuY2hvclRhZ0ZvckFic29sdXRlVXJsQ29udmVyc2lvbnMuaHJlZiA9IHBvc3NpYmx5UmVsYXRpdmVVcmw7XHJcbiAgcmV0dXJuIGFuY2hvclRhZ0ZvckFic29sdXRlVXJsQ29udmVyc2lvbnMuaHJlZjtcclxufVxyXG5cclxuZnVuY3Rpb24gYXN5bmNMb2FkKHVybCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0O1xyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgLyogYXN5bmM6ICovIHRydWUpO1xyXG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24geGhyX29ubG9hZCgpIHtcclxuICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwIHx8IHhoci5zdGF0dXMgPT0gMCAmJiB4aHIucmVzcG9uc2UpIHtcclxuICAgICAgICB2YXIgYXNtID0gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICByZXNvbHZlKGFzbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KHhocik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIub25lcnJvciA9IHJlamVjdDtcclxuICAgIHhoci5zZW5kKHVuZGVmaW5lZCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFycmF5RGF0YVBvaW50ZXI8VD4oYXJyYXk6IFN5c3RlbV9BcnJheTxUPik6IG51bWJlciB7XHJcbiAgcmV0dXJuIDxudW1iZXI+PGFueT5hcnJheSArIDEyOyAvLyBGaXJzdCBieXRlIGZyb20gaGVyZSBpcyBsZW5ndGgsIHRoZW4gZm9sbG93aW5nIGJ5dGVzIGFyZSBlbnRyaWVzXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dGFjaEludGVyb3BJbnZva2VyKCkge1xyXG4gIGNvbnN0IGRvdE5ldERpc3BhdGNoZXJJbnZva2VNZXRob2RIYW5kbGUgPSBmaW5kTWV0aG9kKCdNb25vLldlYkFzc2VtYmx5LkludGVyb3AnLCAnTW9uby5XZWJBc3NlbWJseS5JbnRlcm9wJywgJ01vbm9XZWJBc3NlbWJseUpTUnVudGltZScsICdJbnZva2VEb3ROZXQnKTtcclxuICBjb25zdCBkb3ROZXREaXNwYXRjaGVyQmVnaW5JbnZva2VNZXRob2RIYW5kbGUgPSBmaW5kTWV0aG9kKCdNb25vLldlYkFzc2VtYmx5LkludGVyb3AnLCAnTW9uby5XZWJBc3NlbWJseS5JbnRlcm9wJywgJ01vbm9XZWJBc3NlbWJseUpTUnVudGltZScsICdCZWdpbkludm9rZURvdE5ldCcpO1xyXG5cclxuICBEb3ROZXQuYXR0YWNoRGlzcGF0Y2hlcih7XHJcbiAgICBiZWdpbkludm9rZURvdE5ldEZyb21KUzogKGNhbGxJZCwgYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCwgYXJnc0pzb24pID0+IHtcclxuICAgICAgLy8gQXMgYSBjdXJyZW50IGxpbWl0YXRpb24sIHdlIGNhbiBvbmx5IHBhc3MgNCBhcmdzLiBGb3J0dW5hdGVseSB3ZSBvbmx5IG5lZWQgb25lIG9mXHJcbiAgICAgIC8vICdhc3NlbWJseU5hbWUnIG9yICdkb3ROZXRPYmplY3RJZCcsIHNvIG92ZXJsb2FkIHRoZW0gaW4gYSBzaW5nbGUgc2xvdFxyXG4gICAgICBjb25zdCBhc3NlbWJseU5hbWVPckRvdE5ldE9iamVjdElkID0gZG90TmV0T2JqZWN0SWRcclxuICAgICAgICA/IGRvdE5ldE9iamVjdElkLnRvU3RyaW5nKClcclxuICAgICAgICA6IGFzc2VtYmx5TmFtZTtcclxuICAgICAgXHJcbiAgICAgIG1vbm9QbGF0Zm9ybS5jYWxsTWV0aG9kKGRvdE5ldERpc3BhdGNoZXJCZWdpbkludm9rZU1ldGhvZEhhbmRsZSwgbnVsbCwgW1xyXG4gICAgICAgIGNhbGxJZCA/IG1vbm9QbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhjYWxsSWQudG9TdHJpbmcoKSkgOiBudWxsLFxyXG4gICAgICAgIG1vbm9QbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhhc3NlbWJseU5hbWVPckRvdE5ldE9iamVjdElkISksXHJcbiAgICAgICAgbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKG1ldGhvZElkZW50aWZpZXIpLFxyXG4gICAgICAgIG1vbm9QbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhhcmdzSnNvbilcclxuICAgICAgXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGludm9rZURvdE5ldEZyb21KUzogKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgZG90TmV0T2JqZWN0SWQsIGFyZ3NKc29uKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdEpzb25TdHJpbmdQdHIgPSBtb25vUGxhdGZvcm0uY2FsbE1ldGhvZChkb3ROZXREaXNwYXRjaGVySW52b2tlTWV0aG9kSGFuZGxlLCBudWxsLCBbXHJcbiAgICAgICAgYXNzZW1ibHlOYW1lID8gbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGFzc2VtYmx5TmFtZSkgOiBudWxsLFxyXG4gICAgICAgIG1vbm9QbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhtZXRob2RJZGVudGlmaWVyKSxcclxuICAgICAgICBkb3ROZXRPYmplY3RJZCA/IG1vbm9QbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhkb3ROZXRPYmplY3RJZC50b1N0cmluZygpKSA6IG51bGwsXHJcbiAgICAgICAgbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGFyZ3NKc29uKVxyXG4gICAgICBdKSBhcyBTeXN0ZW1fU3RyaW5nO1xyXG4gICAgICByZXR1cm4gcmVzdWx0SnNvblN0cmluZ1B0clxyXG4gICAgICAgID8gbW9ub1BsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhyZXN1bHRKc29uU3RyaW5nUHRyKVxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVOYW1lRnJvbVVybCh1cmw6IHN0cmluZykge1xyXG4gIC8vIFRoaXMgY291bGQgYWxzbyBiZSBjYWxsZWQgXCJnZXQgbGFzdCBwYXRoIHNlZ21lbnQgZnJvbSBVUkxcIiwgYnV0IHRoZSBwcmltYXJ5XHJcbiAgLy8gdXNlIGNhc2UgaXMgdG8gZXh0cmFjdCB0aGluZ3MgdGhhdCBsb29rIGxpa2UgZmlsZW5hbWVzXHJcbiAgY29uc3QgbGFzdFNlZ21lbnQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbiAgY29uc3QgcXVlcnlTdHJpbmdTdGFydFBvcyA9IGxhc3RTZWdtZW50LmluZGV4T2YoJz8nKTtcclxuICByZXR1cm4gcXVlcnlTdHJpbmdTdGFydFBvcyA8IDAgPyBsYXN0U2VnbWVudCA6IGxhc3RTZWdtZW50LnN1YnN0cmluZygwLCBxdWVyeVN0cmluZ1N0YXJ0UG9zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFzc2VtYmx5TmFtZUZyb21VcmwodXJsOiBzdHJpbmcpIHtcclxuICByZXR1cm4gZ2V0RmlsZU5hbWVGcm9tVXJsKHVybCkucmVwbGFjZSgvXFwuZGxsJC8sICcnKTtcclxufVxyXG4iLCJpbXBvcnQgeyBTeXN0ZW1fQXJyYXksIE1ldGhvZEhhbmRsZSB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgUmVuZGVyQmF0Y2gsIEFycmF5U2VnbWVudCwgQXJyYXlSYW5nZSwgUmVuZGVyVHJlZUVkaXQsIFJlbmRlclRyZWVGcmFtZSwgRWRpdFR5cGUsIEZyYW1lVHlwZSwgQXJyYXlWYWx1ZXMgfSBmcm9tICcuL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IEV2ZW50RGVsZWdhdG9yIH0gZnJvbSAnLi9FdmVudERlbGVnYXRvcic7XHJcbmltcG9ydCB7IEV2ZW50Rm9yRG90TmV0LCBVSUV2ZW50QXJncyB9IGZyb20gJy4vRXZlbnRGb3JEb3ROZXQnO1xyXG5pbXBvcnQgeyBMb2dpY2FsRWxlbWVudCwgdG9Mb2dpY2FsRWxlbWVudCwgaW5zZXJ0TG9naWNhbENoaWxkLCByZW1vdmVMb2dpY2FsQ2hpbGQsIGdldExvZ2ljYWxQYXJlbnQsIGdldExvZ2ljYWxDaGlsZCwgY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lciwgaXNTdmdFbGVtZW50IH0gZnJvbSAnLi9Mb2dpY2FsRWxlbWVudHMnO1xyXG5pbXBvcnQgeyBhcHBseUNhcHR1cmVJZFRvRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudFJlZmVyZW5jZUNhcHR1cmUnO1xyXG5jb25zdCBzZWxlY3RWYWx1ZVByb3BuYW1lID0gJ19ibGF6b3JTZWxlY3RWYWx1ZSc7XHJcbmNvbnN0IHNoYXJlZFRlbXBsYXRlRWxlbUZvclBhcnNpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG5jb25zdCBzaGFyZWRTdmdFbGVtRm9yUGFyc2luZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpO1xyXG5jb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50czogeyBbZXZlbnRUeXBlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7IHN1Ym1pdDogdHJ1ZSB9O1xyXG5sZXQgcmFpc2VFdmVudE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5sZXQgcmVuZGVyQ29tcG9uZW50TWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclJlbmRlcmVyIHtcclxuICBwcml2YXRlIGV2ZW50RGVsZWdhdG9yOiBFdmVudERlbGVnYXRvcjtcclxuICBwcml2YXRlIGNoaWxkQ29tcG9uZW50TG9jYXRpb25zOiB7IFtjb21wb25lbnRJZDogbnVtYmVyXTogTG9naWNhbEVsZW1lbnQgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZXZlbnREZWxlZ2F0b3IgPSBuZXcgRXZlbnREZWxlZ2F0b3IoKGV2ZW50LCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQsIGV2ZW50QXJncykgPT4ge1xyXG4gICAgICByYWlzZUV2ZW50KGV2ZW50LCB0aGlzLmJyb3dzZXJSZW5kZXJlcklkLCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQsIGV2ZW50QXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkLCB0b0xvZ2ljYWxFbGVtZW50KGVsZW1lbnQpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVDb21wb25lbnQoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBlZGl0czogQXJyYXlTZWdtZW50PFJlbmRlclRyZWVFZGl0PiwgcmVmZXJlbmNlRnJhbWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF07XHJcbiAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBlbGVtZW50IGlzIGN1cnJlbnRseSBhc3NvY2lhdGVkIHdpdGggY29tcG9uZW50ICR7Y29tcG9uZW50SWR9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBseUVkaXRzKGJhdGNoLCBjb21wb25lbnRJZCwgZWxlbWVudCwgMCwgZWRpdHMsIHJlZmVyZW5jZUZyYW1lcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUNvbXBvbmVudChjb21wb25lbnRJZDogbnVtYmVyKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUV2ZW50SGFuZGxlcihldmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnJlbW92ZUxpc3RlbmVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXSA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5RWRpdHMoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGVkaXRzOiBBcnJheVNlZ21lbnQ8UmVuZGVyVHJlZUVkaXQ+LCByZWZlcmVuY2VGcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4pIHtcclxuICAgIGxldCBjdXJyZW50RGVwdGggPSAwO1xyXG4gICAgbGV0IGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IGNoaWxkSW5kZXg7XHJcblxyXG4gICAgY29uc3QgYXJyYXlTZWdtZW50UmVhZGVyID0gYmF0Y2guYXJyYXlTZWdtZW50UmVhZGVyO1xyXG4gICAgY29uc3QgZWRpdFJlYWRlciA9IGJhdGNoLmVkaXRSZWFkZXI7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgZWRpdHNWYWx1ZXMgPSBhcnJheVNlZ21lbnRSZWFkZXIudmFsdWVzKGVkaXRzKTtcclxuICAgIGNvbnN0IGVkaXRzT2Zmc2V0ID0gYXJyYXlTZWdtZW50UmVhZGVyLm9mZnNldChlZGl0cyk7XHJcbiAgICBjb25zdCBlZGl0c0xlbmd0aCA9IGFycmF5U2VnbWVudFJlYWRlci5jb3VudChlZGl0cyk7XHJcbiAgICBjb25zdCBtYXhFZGl0SW5kZXhFeGNsID0gZWRpdHNPZmZzZXQgKyBlZGl0c0xlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBlZGl0SW5kZXggPSBlZGl0c09mZnNldDsgZWRpdEluZGV4IDwgbWF4RWRpdEluZGV4RXhjbDsgZWRpdEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWRpdCA9IGJhdGNoLmRpZmZSZWFkZXIuZWRpdHNFbnRyeShlZGl0c1ZhbHVlcywgZWRpdEluZGV4KTtcclxuICAgICAgY29uc3QgZWRpdFR5cGUgPSBlZGl0UmVhZGVyLmVkaXRUeXBlKGVkaXQpO1xyXG4gICAgICBzd2l0Y2ggKGVkaXRUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5wcmVwZW5kRnJhbWU6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgdGhpcy5pbnNlcnRGcmFtZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4LCByZWZlcmVuY2VGcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnJlbW92ZUZyYW1lOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHJlbW92ZUxvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zZXRBdHRyaWJ1dGU6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseUF0dHJpYnV0ZShiYXRjaCwgY29tcG9uZW50SWQsIGVsZW1lbnQsIGZyYW1lKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHNldCBhdHRyaWJ1dGUgb24gbm9uLWVsZW1lbnQgY2hpbGRgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnJlbW92ZUF0dHJpYnV0ZToge1xyXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGhhdmUgdG8gZGlzcG9zZSB0aGUgaW5mbyB3ZSB0cmFjayBhYm91dCBldmVudCBoYW5kbGVycyBoZXJlLCBiZWNhdXNlIHRoZVxyXG4gICAgICAgICAgLy8gZGlzcG9zZWQgZXZlbnQgaGFuZGxlciBJRHMgYXJlIGRlbGl2ZXJlZCBzZXBhcmF0ZWx5IChpbiB0aGUgJ2Rpc3Bvc2VkRXZlbnRIYW5kbGVySWRzJyBhcnJheSlcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBlZGl0UmVhZGVyLnJlbW92ZWRBdHRyaWJ1dGVOYW1lKGVkaXQpITtcclxuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IHRvIHJlbW92ZSBhbnkgc3BlY2lhbCBwcm9wZXJ0eSB3ZSB1c2UgZm9yIHRoaXMgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIGlmICghdGhpcy50cnlBcHBseVNwZWNpYWxQcm9wZXJ0eShiYXRjaCwgZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgbnVsbCkpIHtcclxuICAgICAgICAgICAgICAvLyBJZiB0aGF0J3Mgbm90IGFwcGxpY2FibGUsIGl0J3MgYSByZWd1bGFyIERPTSBhdHRyaWJ1dGUgc28gcmVtb3ZlIHRoYXRcclxuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIG5vbi1lbGVtZW50IGNoaWxkYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS51cGRhdGVUZXh0OiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gZWRpdFJlYWRlci5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmICh0ZXh0Tm9kZSBpbnN0YW5jZW9mIFRleHQpIHtcclxuICAgICAgICAgICAgdGV4dE5vZGUudGV4dENvbnRlbnQgPSBmcmFtZVJlYWRlci50ZXh0Q29udGVudChmcmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzZXQgdGV4dCBjb250ZW50IG9uIG5vbi10ZXh0IGNoaWxkYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS51cGRhdGVNYXJrdXA6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgcmVtb3ZlTG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIHRoaXMuaW5zZXJ0TWFya3VwKGJhdGNoLCBwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCwgZnJhbWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcEluOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHBhcmVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBjdXJyZW50RGVwdGgrKztcclxuICAgICAgICAgIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zdGVwT3V0OiB7XHJcbiAgICAgICAgICBwYXJlbnQgPSBnZXRMb2dpY2FsUGFyZW50KHBhcmVudCkhO1xyXG4gICAgICAgICAgY3VycmVudERlcHRoLS07XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSBjdXJyZW50RGVwdGggPT09IDAgPyBjaGlsZEluZGV4IDogMDsgLy8gVGhlIGNoaWxkSW5kZXggaXMgb25seSBldmVyIG5vbnplcm8gYXQgemVybyBkZXB0aFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgIGNvbnN0IHVua25vd25UeXBlOiBuZXZlciA9IGVkaXRUeXBlOyAvLyBDb21waWxlLXRpbWUgdmVyaWZpY2F0aW9uIHRoYXQgdGhlIHN3aXRjaCB3YXMgZXhoYXVzdGl2ZVxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGVkaXQgdHlwZTogJHt1bmtub3duVHlwZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RnJhbWUoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSwgZnJhbWVJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGZyYW1lUmVhZGVyID0gYmF0Y2guZnJhbWVSZWFkZXI7XHJcbiAgICBjb25zdCBmcmFtZVR5cGUgPSBmcmFtZVJlYWRlci5mcmFtZVR5cGUoZnJhbWUpO1xyXG4gICAgc3dpdGNoIChmcmFtZVR5cGUpIHtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudDpcclxuICAgICAgICB0aGlzLmluc2VydEVsZW1lbnQoYmF0Y2gsIGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS50ZXh0OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0VGV4dChiYXRjaCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmF0dHJpYnV0ZTpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSBmcmFtZXMgc2hvdWxkIG9ubHkgYmUgcHJlc2VudCBhcyBsZWFkaW5nIGNoaWxkcmVuIG9mIGVsZW1lbnQgZnJhbWVzLicpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5jb21wb25lbnQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRDb21wb25lbnQoYmF0Y2gsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWUpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5yZWdpb246XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0RnJhbWVSYW5nZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZUluZGV4ICsgMSwgZnJhbWVJbmRleCArIGZyYW1lUmVhZGVyLnN1YnRyZWVMZW5ndGgoZnJhbWUpKTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmU6XHJcbiAgICAgICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgIGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50KHBhcmVudCwgZnJhbWVSZWFkZXIuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmVJZChmcmFtZSkhKTtcclxuICAgICAgICAgIHJldHVybiAwOyAvLyBBIFwiY2FwdHVyZVwiIGlzIGEgY2hpbGQgaW4gdGhlIGRpZmYsIGJ1dCBoYXMgbm8gbm9kZSBpbiB0aGUgRE9NXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVmZXJlbmNlIGNhcHR1cmUgZnJhbWVzIGNhbiBvbmx5IGJlIGNoaWxkcmVuIG9mIGVsZW1lbnQgZnJhbWVzLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgY2FzZSBGcmFtZVR5cGUubWFya3VwOlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0TWFya3VwKGJhdGNoLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lKTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zdCB1bmtub3duVHlwZTogbmV2ZXIgPSBmcmFtZVR5cGU7IC8vIENvbXBpbGUtdGltZSB2ZXJpZmljYXRpb24gdGhhdCB0aGUgc3dpdGNoIHdhcyBleGhhdXN0aXZlXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZyYW1lIHR5cGU6ICR7dW5rbm93blR5cGV9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEVsZW1lbnQoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSwgZnJhbWVJbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgdGFnTmFtZSA9IGZyYW1lUmVhZGVyLmVsZW1lbnROYW1lKGZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdEb21FbGVtZW50UmF3ID0gdGFnTmFtZSA9PT0gJ3N2ZycgfHwgaXNTdmdFbGVtZW50KHBhcmVudCkgP1xyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGFnTmFtZSkgOlxyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgY29uc3QgbmV3RWxlbWVudCA9IHRvTG9naWNhbEVsZW1lbnQobmV3RG9tRWxlbWVudFJhdyk7XHJcbiAgICBpbnNlcnRMb2dpY2FsQ2hpbGQobmV3RG9tRWxlbWVudFJhdywgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAvLyBBcHBseSBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbCA9IGZyYW1lSW5kZXggKyBmcmFtZVJlYWRlci5zdWJ0cmVlTGVuZ3RoKGZyYW1lKTtcclxuICAgIGZvciAobGV0IGRlc2NlbmRhbnRJbmRleCA9IGZyYW1lSW5kZXggKyAxOyBkZXNjZW5kYW50SW5kZXggPCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbDsgZGVzY2VuZGFudEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZGVzY2VuZGFudEZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkoZnJhbWVzLCBkZXNjZW5kYW50SW5kZXgpO1xyXG4gICAgICBpZiAoZnJhbWVSZWFkZXIuZnJhbWVUeXBlKGRlc2NlbmRhbnRGcmFtZSkgPT09IEZyYW1lVHlwZS5hdHRyaWJ1dGUpIHtcclxuICAgICAgICB0aGlzLmFwcGx5QXR0cmlidXRlKGJhdGNoLCBjb21wb25lbnRJZCwgbmV3RG9tRWxlbWVudFJhdywgZGVzY2VuZGFudEZyYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBcyBzb29uIGFzIHdlIHNlZSBhIG5vbi1hdHRyaWJ1dGUgY2hpbGQsIGFsbCB0aGUgc3Vic2VxdWVudCBjaGlsZCBmcmFtZXMgYXJlXHJcbiAgICAgICAgLy8gbm90IGF0dHJpYnV0ZXMsIHNvIGJhaWwgb3V0IGFuZCBpbnNlcnQgdGhlIHJlbW5hbnRzIHJlY3Vyc2l2ZWx5XHJcbiAgICAgICAgdGhpcy5pbnNlcnRGcmFtZVJhbmdlKGJhdGNoLCBjb21wb25lbnRJZCwgbmV3RWxlbWVudCwgMCwgZnJhbWVzLCBkZXNjZW5kYW50SW5kZXgsIGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRDb21wb25lbnQoYmF0Y2g6IFJlbmRlckJhdGNoLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyKHBhcmVudCwgY2hpbGRJbmRleCk7XHJcblxyXG4gICAgLy8gQWxsIHdlIGhhdmUgdG8gZG8gaXMgYXNzb2NpYXRlIHRoZSBjaGlsZCBjb21wb25lbnQgSUQgd2l0aCBpdHMgbG9jYXRpb24uIFdlIGRvbid0IGFjdHVhbGx5XHJcbiAgICAvLyBkbyBhbnkgcmVuZGVyaW5nIGhlcmUsIGJlY2F1c2UgdGhlIGRpZmYgZm9yIHRoZSBjaGlsZCB3aWxsIGFwcGVhciBsYXRlciBpbiB0aGUgcmVuZGVyIGJhdGNoLlxyXG4gICAgY29uc3QgY2hpbGRDb21wb25lbnRJZCA9IGJhdGNoLmZyYW1lUmVhZGVyLmNvbXBvbmVudElkKGZyYW1lKTtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNoaWxkQ29tcG9uZW50SWQsIGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRUZXh0KGJhdGNoOiBSZW5kZXJCYXRjaCwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCB0ZXh0RnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSBiYXRjaC5mcmFtZVJlYWRlci50ZXh0Q29udGVudCh0ZXh0RnJhbWUpITtcclxuICAgIGNvbnN0IG5ld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dENvbnRlbnQpO1xyXG4gICAgaW5zZXJ0TG9naWNhbENoaWxkKG5ld1RleHROb2RlLCBwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRNYXJrdXAoYmF0Y2g6IFJlbmRlckJhdGNoLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIG1hcmt1cEZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IG1hcmt1cENvbnRhaW5lciA9IGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICBjb25zdCBtYXJrdXBDb250ZW50ID0gYmF0Y2guZnJhbWVSZWFkZXIubWFya3VwQ29udGVudChtYXJrdXBGcmFtZSk7XHJcbiAgICBjb25zdCBwYXJzZWRNYXJrdXAgPSBwYXJzZU1hcmt1cChtYXJrdXBDb250ZW50LCBpc1N2Z0VsZW1lbnQocGFyZW50KSk7XHJcbiAgICBsZXQgbG9naWNhbFNpYmxpbmdJbmRleCA9IDA7XHJcbiAgICB3aGlsZSAocGFyc2VkTWFya3VwLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgaW5zZXJ0TG9naWNhbENoaWxkKHBhcnNlZE1hcmt1cC5maXJzdENoaWxkLCBtYXJrdXBDb250YWluZXIsIGxvZ2ljYWxTaWJsaW5nSW5kZXgrKyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5QXR0cmlidXRlKGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgdG9Eb21FbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGZyYW1lUmVhZGVyLmF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlRnJhbWUpITtcclxuICAgIGNvbnN0IGJyb3dzZXJSZW5kZXJlcklkID0gdGhpcy5icm93c2VyUmVuZGVyZXJJZDtcclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkID0gZnJhbWVSZWFkZXIuYXR0cmlidXRlRXZlbnRIYW5kbGVySWQoYXR0cmlidXRlRnJhbWUpO1xyXG5cclxuICAgIGlmIChldmVudEhhbmRsZXJJZCkge1xyXG4gICAgICBjb25zdCBmaXJzdFR3b0NoYXJzID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoMCwgMik7XHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKDIpO1xyXG4gICAgICBpZiAoZmlyc3RUd29DaGFycyAhPT0gJ29uJyB8fCAhZXZlbnROYW1lKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRyaWJ1dGUgaGFzIG5vbnplcm8gZXZlbnQgaGFuZGxlciBJRCwgYnV0IGF0dHJpYnV0ZSBuYW1lICcke2F0dHJpYnV0ZU5hbWV9JyBkb2VzIG5vdCBzdGFydCB3aXRoICdvbicuYCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ldmVudERlbGVnYXRvci5zZXRMaXN0ZW5lcih0b0RvbUVsZW1lbnQsIGV2ZW50TmFtZSwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpcnN0IHNlZSBpZiB3ZSBoYXZlIHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRoaXMgYXR0cmlidXRlXHJcbiAgICBpZiAoIXRoaXMudHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoYmF0Y2gsIHRvRG9tRWxlbWVudCwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRnJhbWUpKSB7XHJcbiAgICAgIC8vIElmIG5vdCwgdHJlYXQgaXQgYXMgYSByZWd1bGFyIHN0cmluZy12YWx1ZWQgYXR0cmlidXRlXHJcbiAgICAgIHRvRG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZSxcclxuICAgICAgICBmcmFtZVJlYWRlci5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkhXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyeUFwcGx5U3BlY2lhbFByb3BlcnR5KGJhdGNoOiBSZW5kZXJCYXRjaCwgZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lIHwgbnVsbCkge1xyXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ3ZhbHVlJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50cnlBcHBseVZhbHVlUHJvcGVydHkoYmF0Y2gsIGVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lKTtcclxuICAgICAgY2FzZSAnY2hlY2tlZCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5QXBwbHlDaGVja2VkUHJvcGVydHkoYmF0Y2gsIGVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyeUFwcGx5VmFsdWVQcm9wZXJ0eShiYXRjaDogUmVuZGVyQmF0Y2gsIGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWUgfCBudWxsKSB7XHJcbiAgICAvLyBDZXJ0YWluIGVsZW1lbnRzIGhhdmUgYnVpbHQtaW4gYmVoYXZpb3VyIGZvciB0aGVpciAndmFsdWUnIHByb3BlcnR5XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgc3dpdGNoIChlbGVtZW50LnRhZ05hbWUpIHtcclxuICAgICAgY2FzZSAnSU5QVVQnOlxyXG4gICAgICBjYXNlICdTRUxFQ1QnOlxyXG4gICAgICBjYXNlICdURVhUQVJFQSc6IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpIDogbnVsbDtcclxuICAgICAgICAoZWxlbWVudCBhcyBhbnkpLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XHJcbiAgICAgICAgICAvLyA8c2VsZWN0PiBpcyBzcGVjaWFsLCBpbiB0aGF0IGFueXRoaW5nIHdlIHdyaXRlIHRvIC52YWx1ZSB3aWxsIGJlIGxvc3QgaWYgdGhlcmVcclxuICAgICAgICAgIC8vIGlzbid0IHlldCBhIG1hdGNoaW5nIDxvcHRpb24+LiBUbyBtYWludGFpbiB0aGUgZXhwZWN0ZWQgYmVoYXZpb3Igbm8gbWF0dGVyIHRoZVxyXG4gICAgICAgICAgLy8gZWxlbWVudCBpbnNlcnRpb24vdXBkYXRlIG9yZGVyLCBwcmVzZXJ2ZSB0aGUgZGVzaXJlZCB2YWx1ZSBzZXBhcmF0ZWx5IHNvXHJcbiAgICAgICAgICAvLyB3ZSBjYW4gcmVjb3ZlciBpdCB3aGVuIGluc2VydGluZyBhbnkgbWF0Y2hpbmcgPG9wdGlvbj4uXHJcbiAgICAgICAgICBlbGVtZW50W3NlbGVjdFZhbHVlUHJvcG5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ09QVElPTic6IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpIDogbnVsbDtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNlZSBhYm92ZSBmb3Igd2h5IHdlIGhhdmUgdGhpcyBzcGVjaWFsIGhhbmRsaW5nIGZvciA8c2VsZWN0Pi88b3B0aW9uPlxyXG4gICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgJiYgKHNlbGVjdFZhbHVlUHJvcG5hbWUgaW4gcGFyZW50RWxlbWVudCkgJiYgcGFyZW50RWxlbWVudFtzZWxlY3RWYWx1ZVByb3BuYW1lXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMudHJ5QXBwbHlWYWx1ZVByb3BlcnR5KGJhdGNoLCBwYXJlbnRFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZSk7XHJcbiAgICAgICAgICBkZWxldGUgcGFyZW50RWxlbWVudFtzZWxlY3RWYWx1ZVByb3BuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyeUFwcGx5Q2hlY2tlZFByb3BlcnR5KGJhdGNoOiBSZW5kZXJCYXRjaCwgZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlRnJhbWU6IFJlbmRlclRyZWVGcmFtZSB8IG51bGwpIHtcclxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgaGF2ZSBidWlsdC1pbiBiZWhhdmlvdXIgZm9yIHRoZWlyICdjaGVja2VkJyBwcm9wZXJ0eVxyXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gYmF0Y2guZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpIDogbnVsbDtcclxuICAgICAgKGVsZW1lbnQgYXMgYW55KS5jaGVja2VkID0gdmFsdWUgIT09IG51bGw7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRGcmFtZVJhbmdlKGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBmcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4sIHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhFeGNsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgb3JpZ0NoaWxkSW5kZXggPSBjaGlsZEluZGV4O1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydEluZGV4OyBpbmRleCA8IGVuZEluZGV4RXhjbDsgaW5kZXgrKykge1xyXG4gICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KGZyYW1lcywgaW5kZXgpO1xyXG4gICAgICBjb25zdCBudW1DaGlsZHJlbkluc2VydGVkID0gdGhpcy5pbnNlcnRGcmFtZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZSwgaW5kZXgpO1xyXG4gICAgICBjaGlsZEluZGV4ICs9IG51bUNoaWxkcmVuSW5zZXJ0ZWQ7XHJcblxyXG4gICAgICAvLyBTa2lwIG92ZXIgYW55IGRlc2NlbmRhbnRzLCBzaW5jZSB0aGV5IGFyZSBhbHJlYWR5IGRlYWx0IHdpdGggcmVjdXJzaXZlbHlcclxuICAgICAgaW5kZXggKz0gY291bnREZXNjZW5kYW50RnJhbWVzKGJhdGNoLCBmcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChjaGlsZEluZGV4IC0gb3JpZ0NoaWxkSW5kZXgpOyAvLyBUb3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gaW5zZXJ0ZWRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlTWFya3VwKG1hcmt1cDogc3RyaW5nLCBpc1N2ZzogYm9vbGVhbikge1xyXG4gIGlmIChpc1N2Zykge1xyXG4gICAgc2hhcmVkU3ZnRWxlbUZvclBhcnNpbmcuaW5uZXJIVE1MID0gbWFya3VwIHx8ICcgJztcclxuICAgIHJldHVybiBzaGFyZWRTdmdFbGVtRm9yUGFyc2luZztcclxuICB9IGVsc2Uge1xyXG4gICAgc2hhcmVkVGVtcGxhdGVFbGVtRm9yUGFyc2luZy5pbm5lckhUTUwgPSBtYXJrdXAgfHwgJyAnO1xyXG4gICAgcmV0dXJuIHNoYXJlZFRlbXBsYXRlRWxlbUZvclBhcnNpbmcuY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50RGVzY2VuZGFudEZyYW1lcyhiYXRjaDogUmVuZGVyQmF0Y2gsIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBudW1iZXIge1xyXG4gIGNvbnN0IGZyYW1lUmVhZGVyID0gYmF0Y2guZnJhbWVSZWFkZXI7XHJcbiAgc3dpdGNoIChmcmFtZVJlYWRlci5mcmFtZVR5cGUoZnJhbWUpKSB7XHJcbiAgICAvLyBUaGUgZm9sbG93aW5nIGZyYW1lIHR5cGVzIGhhdmUgYSBzdWJ0cmVlIGxlbmd0aC4gT3RoZXIgZnJhbWVzIG1heSB1c2UgdGhhdCBtZW1vcnkgc2xvdFxyXG4gICAgLy8gdG8gbWVhbiBzb21ldGhpbmcgZWxzZSwgc28gd2UgbXVzdCBub3QgcmVhZCBpdC4gV2Ugc2hvdWxkIGNvbnNpZGVyIGhhdmluZyBub21pbmFsIHN1YnR5cGVzXHJcbiAgICAvLyBvZiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIHRoYXQgcHJldmVudCBhY2Nlc3MgdG8gbm9uLWFwcGxpY2FibGUgZmllbGRzLlxyXG4gICAgY2FzZSBGcmFtZVR5cGUuY29tcG9uZW50OlxyXG4gICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudDpcclxuICAgIGNhc2UgRnJhbWVUeXBlLnJlZ2lvbjpcclxuICAgICAgcmV0dXJuIGZyYW1lUmVhZGVyLnN1YnRyZWVMZW5ndGgoZnJhbWUpIC0gMTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFpc2VFdmVudChldmVudDogRXZlbnQsIGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGNvbXBvbmVudElkOiBudW1iZXIsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KSB7XHJcbiAgaWYgKHByZXZlbnREZWZhdWx0RXZlbnRzW2V2ZW50LnR5cGVdKSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXZlbnREZXNjcmlwdG9yID0ge1xyXG4gICAgYnJvd3NlclJlbmRlcmVySWQsXHJcbiAgICBjb21wb25lbnRJZCxcclxuICAgIGV2ZW50SGFuZGxlcklkLFxyXG4gICAgZXZlbnRBcmdzVHlwZTogZXZlbnRBcmdzLnR5cGVcclxuICB9O1xyXG5cclxuICByZXR1cm4gRG90TmV0Lmludm9rZU1ldGhvZEFzeW5jKFxyXG4gICAgJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyJyxcclxuICAgICdEaXNwYXRjaEV2ZW50JyxcclxuICAgIGV2ZW50RGVzY3JpcHRvcixcclxuICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50QXJncy5kYXRhKSk7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIHJlZmVyZW5jZUNhcHR1cmVJZDogc3RyaW5nKSB7XHJcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZ2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQpLCAnJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEVsZW1lbnRCeUNhcHR1cmVJZChyZWZlcmVuY2VDYXB0dXJlSWQ6IHN0cmluZykge1xyXG4gIGNvbnN0IHNlbGVjdG9yID0gYFske2dldENhcHR1cmVJZEF0dHJpYnV0ZU5hbWUocmVmZXJlbmNlQ2FwdHVyZUlkKX1dYDtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENhcHR1cmVJZEF0dHJpYnV0ZU5hbWUocmVmZXJlbmNlQ2FwdHVyZUlkOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYF9ibF8ke3JlZmVyZW5jZUNhcHR1cmVJZH1gO1xyXG59XHJcblxyXG4vLyBTdXBwb3J0IHJlY2VpdmluZyBFbGVtZW50UmVmIGluc3RhbmNlcyBhcyBhcmdzIGluIGludGVyb3AgY2FsbHNcclxuY29uc3QgZWxlbWVudFJlZktleSA9ICdfYmxhem9yRWxlbWVudFJlZic7IC8vIEtlZXAgaW4gc3luYyB3aXRoIEVsZW1lbnRSZWYuY3NcclxuRG90TmV0LmF0dGFjaFJldml2ZXIoKGtleSwgdmFsdWUpID0+IHtcclxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShlbGVtZW50UmVmS2V5KSAmJiB0eXBlb2YgdmFsdWVbZWxlbWVudFJlZktleV0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHZhbHVlW2VsZW1lbnRSZWZLZXldKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxufSk7XHJcbiIsImltcG9ydCB7IEV2ZW50Rm9yRG90TmV0LCBVSUV2ZW50QXJncyB9IGZyb20gJy4vRXZlbnRGb3JEb3ROZXQnO1xyXG5cclxuY29uc3Qgbm9uQnViYmxpbmdFdmVudHMgPSB0b0xvb2t1cChbXHJcbiAgJ2Fib3J0JywgJ2JsdXInLCAnY2hhbmdlJywgJ2Vycm9yJywgJ2ZvY3VzJywgJ2xvYWQnLCAnbG9hZGVuZCcsICdsb2Fkc3RhcnQnLCAnbW91c2VlbnRlcicsICdtb3VzZWxlYXZlJyxcclxuICAncHJvZ3Jlc3MnLCAncmVzZXQnLCAnc2Nyb2xsJywgJ3N1Ym1pdCcsICd1bmxvYWQnLCAnRE9NTm9kZUluc2VydGVkSW50b0RvY3VtZW50JywgJ0RPTU5vZGVSZW1vdmVkRnJvbURvY3VtZW50J1xyXG5dKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT25FdmVudENhbGxiYWNrIHtcclxuICAoZXZlbnQ6IEV2ZW50LCBjb21wb25lbnRJZDogbnVtYmVyLCBldmVudEhhbmRsZXJJZDogbnVtYmVyLCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPik6IHZvaWQ7XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpYmxlIGZvciBhZGRpbmcvcmVtb3ZpbmcgdGhlIGV2ZW50SW5mbyBvbiBhbiBleHBhbmRvIHByb3BlcnR5IG9uIERPTSBlbGVtZW50cywgYW5kXHJcbi8vIGNhbGxpbmcgYW4gRXZlbnRJbmZvU3RvcmUgdGhhdCBkZWFscyB3aXRoIHJlZ2lzdGVyaW5nL3VucmVnaXN0ZXJpbmcgdGhlIHVuZGVybHlpbmcgZGVsZWdhdGVkXHJcbi8vIGV2ZW50IGxpc3RlbmVycyBhcyByZXF1aXJlZCAoYW5kIGFsc28gbWFwcyBhY3R1YWwgZXZlbnRzIGJhY2sgdG8gdGhlIGdpdmVuIGNhbGxiYWNrKS5cclxuZXhwb3J0IGNsYXNzIEV2ZW50RGVsZWdhdG9yIHtcclxuICBwcml2YXRlIHN0YXRpYyBuZXh0RXZlbnREZWxlZ2F0b3JJZCA9IDA7XHJcbiAgcHJpdmF0ZSBldmVudHNDb2xsZWN0aW9uS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBldmVudEluZm9TdG9yZTogRXZlbnRJbmZvU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb25FdmVudDogT25FdmVudENhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBldmVudERlbGVnYXRvcklkID0gKytFdmVudERlbGVnYXRvci5uZXh0RXZlbnREZWxlZ2F0b3JJZDtcclxuICAgIHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSA9IGBfYmxhem9yRXZlbnRzXyR7ZXZlbnREZWxlZ2F0b3JJZH1gO1xyXG4gICAgdGhpcy5ldmVudEluZm9TdG9yZSA9IG5ldyBFdmVudEluZm9TdG9yZSh0aGlzLm9uR2xvYmFsRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TGlzdGVuZXIoZWxlbWVudDogRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGNvbXBvbmVudElkOiBudW1iZXIsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIC8vIEVuc3VyZSB3ZSBoYXZlIGEgcGxhY2UgdG8gc3RvcmUgZXZlbnQgaW5mbyBmb3IgdGhpcyBlbGVtZW50XHJcbiAgICBsZXQgaW5mb0ZvckVsZW1lbnQ6IEV2ZW50SGFuZGxlckluZm9zRm9yRWxlbWVudCA9IGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XTtcclxuICAgIGlmICghaW5mb0ZvckVsZW1lbnQpIHtcclxuICAgICAgaW5mb0ZvckVsZW1lbnQgPSBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV0gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5mb0ZvckVsZW1lbnQuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xyXG4gICAgICAvLyBXZSBjYW4gY2hlYXBseSB1cGRhdGUgdGhlIGluZm8gb24gdGhlIGV4aXN0aW5nIG9iamVjdCBhbmQgZG9uJ3QgbmVlZCBhbnkgb3RoZXIgaG91c2VrZWVwaW5nXHJcbiAgICAgIGNvbnN0IG9sZEluZm8gPSBpbmZvRm9yRWxlbWVudFtldmVudE5hbWVdO1xyXG4gICAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLnVwZGF0ZShvbGRJbmZvLmV2ZW50SGFuZGxlcklkLCBldmVudEhhbmRsZXJJZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBHbyB0aHJvdWdoIHRoZSB3aG9sZSBmbG93IHdoaWNoIG1pZ2h0IGludm9sdmUgcmVnaXN0ZXJpbmcgYSBuZXcgZ2xvYmFsIGhhbmRsZXJcclxuICAgICAgY29uc3QgbmV3SW5mbyA9IHsgZWxlbWVudCwgZXZlbnROYW1lLCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQgfTtcclxuICAgICAgdGhpcy5ldmVudEluZm9TdG9yZS5hZGQobmV3SW5mbyk7XHJcbiAgICAgIGluZm9Gb3JFbGVtZW50W2V2ZW50TmFtZV0gPSBuZXdJbmZvO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUxpc3RlbmVyKGV2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIC8vIFRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIHdoZW5ldmVyIHRoZSAuTkVULXNpZGUgY29kZSByZXBvcnRzIHRoYXQgYSBjZXJ0YWluIGV2ZW50IGhhbmRsZXJcclxuICAgIC8vIGhhcyBiZWVuIGRpc3Bvc2VkLiBIb3dldmVyIHdlIHdpbGwgYWxyZWFkeSBoYXZlIGRpc3Bvc2VkIHRoZSBpbmZvIGFib3V0IHRoYXQgaGFuZGxlciBpZlxyXG4gICAgLy8gdGhlIGV2ZW50SGFuZGxlcklkIGZvciB0aGUgKGVsZW1lbnQsZXZlbnROYW1lKSBwYWlyIHdhcyByZXBsYWNlZCBkdXJpbmcgZGlmZiBhcHBsaWNhdGlvbi5cclxuICAgIGNvbnN0IGluZm8gPSB0aGlzLmV2ZW50SW5mb1N0b3JlLnJlbW92ZShldmVudEhhbmRsZXJJZCk7XHJcbiAgICBpZiAoaW5mbykge1xyXG4gICAgICAvLyBMb29rcyBsaWtlIHRoaXMgZXZlbnQgaGFuZGxlciB3YXNuJ3QgYWxyZWFkeSBkaXNwb3NlZFxyXG4gICAgICAvLyBSZW1vdmUgdGhlIGFzc29jaWF0ZWQgZGF0YSBmcm9tIHRoZSBET00gZWxlbWVudFxyXG4gICAgICBjb25zdCBlbGVtZW50ID0gaW5mby5lbGVtZW50O1xyXG4gICAgICBpZiAoZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSh0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXkpKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudEV2ZW50SW5mb3M6IEV2ZW50SGFuZGxlckluZm9zRm9yRWxlbWVudCA9IGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XTtcclxuICAgICAgICBkZWxldGUgZWxlbWVudEV2ZW50SW5mb3NbaW5mby5ldmVudE5hbWVdO1xyXG4gICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbGVtZW50RXZlbnRJbmZvcykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBkZWxldGUgZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkdsb2JhbEV2ZW50KGV2dDogRXZlbnQpIHtcclxuICAgIGlmICghKGV2dC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2NhbiB1cCB0aGUgZWxlbWVudCBoaWVyYXJjaHksIGxvb2tpbmcgZm9yIGFueSBtYXRjaGluZyByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXJzXHJcbiAgICBsZXQgY2FuZGlkYXRlRWxlbWVudCA9IGV2dC50YXJnZXQgYXMgRWxlbWVudCB8IG51bGw7XHJcbiAgICBsZXQgZXZlbnRBcmdzOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4gfCBudWxsID0gbnVsbDsgLy8gUG9wdWxhdGUgbGF6aWx5XHJcbiAgICBjb25zdCBldmVudElzTm9uQnViYmxpbmcgPSBub25CdWJibGluZ0V2ZW50cy5oYXNPd25Qcm9wZXJ0eShldnQudHlwZSk7XHJcbiAgICB3aGlsZSAoY2FuZGlkYXRlRWxlbWVudCkge1xyXG4gICAgICBpZiAoY2FuZGlkYXRlRWxlbWVudC5oYXNPd25Qcm9wZXJ0eSh0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXkpKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlckluZm9zID0gY2FuZGlkYXRlRWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgICAgIGlmIChoYW5kbGVySW5mb3MuaGFzT3duUHJvcGVydHkoZXZ0LnR5cGUpKSB7XHJcbiAgICAgICAgICAvLyBXZSBhcmUgZ29pbmcgdG8gcmFpc2UgYW4gZXZlbnQgZm9yIHRoaXMgZWxlbWVudCwgc28gcHJlcGFyZSBpbmZvIG5lZWRlZCBieSB0aGUgLk5FVCBjb2RlXHJcbiAgICAgICAgICBpZiAoIWV2ZW50QXJncykge1xyXG4gICAgICAgICAgICBldmVudEFyZ3MgPSBFdmVudEZvckRvdE5ldC5mcm9tRE9NRXZlbnQoZXZ0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBoYW5kbGVySW5mbyA9IGhhbmRsZXJJbmZvc1tldnQudHlwZV07XHJcbiAgICAgICAgICB0aGlzLm9uRXZlbnQoZXZ0LCBoYW5kbGVySW5mby5jb21wb25lbnRJZCwgaGFuZGxlckluZm8uZXZlbnRIYW5kbGVySWQsIGV2ZW50QXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjYW5kaWRhdGVFbGVtZW50ID0gZXZlbnRJc05vbkJ1YmJsaW5nID8gbnVsbCA6IGNhbmRpZGF0ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpYmxlIGZvciBhZGRpbmcgYW5kIHJlbW92aW5nIHRoZSBnbG9iYWwgbGlzdGVuZXIgd2hlbiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVyc1xyXG4vLyBmb3IgYSBnaXZlbiBldmVudCBuYW1lIGNoYW5nZXMgYmV0d2VlbiB6ZXJvIGFuZCBub256ZXJvXHJcbmNsYXNzIEV2ZW50SW5mb1N0b3JlIHtcclxuICBwcml2YXRlIGluZm9zQnlFdmVudEhhbmRsZXJJZDogeyBbZXZlbnRIYW5kbGVySWQ6IG51bWJlcl06IEV2ZW50SGFuZGxlckluZm8gfSA9IHt9O1xyXG4gIHByaXZhdGUgY291bnRCeUV2ZW50TmFtZTogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdsb2JhbExpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGluZm86IEV2ZW50SGFuZGxlckluZm8pIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtpbmZvLmV2ZW50SGFuZGxlcklkXSkge1xyXG4gICAgICAvLyBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgd2Ugd2FudCB0byBrbm93IGlmIGl0IGRvZXNcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCAke2luZm8uZXZlbnRIYW5kbGVySWR9IGlzIGFscmVhZHkgdHJhY2tlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdID0gaW5mbztcclxuXHJcbiAgICBjb25zdCBldmVudE5hbWUgPSBpbmZvLmV2ZW50TmFtZTtcclxuICAgIGlmICh0aGlzLmNvdW50QnlFdmVudE5hbWUuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xyXG4gICAgICB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSsrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb3VudEJ5RXZlbnROYW1lW2V2ZW50TmFtZV0gPSAxO1xyXG5cclxuICAgICAgLy8gVG8gbWFrZSBkZWxlZ2F0aW9uIHdvcmsgd2l0aCBub24tYnViYmxpbmcgZXZlbnRzLCByZWdpc3RlciBhICdjYXB0dXJlJyBsaXN0ZW5lci5cclxuICAgICAgLy8gV2UgcHJlc2VydmUgdGhlIG5vbi1idWJibGluZyBiZWhhdmlvciBieSBvbmx5IGRpc3BhdGNoaW5nIHN1Y2ggZXZlbnRzIHRvIHRoZSB0YXJnZXRlZCBlbGVtZW50LlxyXG4gICAgICBjb25zdCB1c2VDYXB0dXJlID0gbm9uQnViYmxpbmdFdmVudHMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMuZ2xvYmFsTGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZShvbGRFdmVudEhhbmRsZXJJZDogbnVtYmVyLCBuZXdFdmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWQuaGFzT3duUHJvcGVydHkobmV3RXZlbnRIYW5kbGVySWQpKSB7XHJcbiAgICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCB3ZSB3YW50IHRvIGtub3cgaWYgaXQgZG9lc1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50ICR7bmV3RXZlbnRIYW5kbGVySWR9IGlzIGFscmVhZHkgdHJhY2tlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmNlIHdlJ3JlIGp1c3QgdXBkYXRpbmcgdGhlIGV2ZW50IGhhbmRsZXIgSUQsIHRoZXJlJ3Mgbm8gbmVlZCB0byB1cGRhdGUgdGhlIGdsb2JhbCBjb3VudHNcclxuICAgIGNvbnN0IGluZm8gPSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtvbGRFdmVudEhhbmRsZXJJZF07XHJcbiAgICBkZWxldGUgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbb2xkRXZlbnRIYW5kbGVySWRdO1xyXG4gICAgaW5mby5ldmVudEhhbmRsZXJJZCA9IG5ld0V2ZW50SGFuZGxlcklkO1xyXG4gICAgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbbmV3RXZlbnRIYW5kbGVySWRdID0gaW5mbztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmUoZXZlbnRIYW5kbGVySWQ6IG51bWJlcik6IEV2ZW50SGFuZGxlckluZm8ge1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2V2ZW50SGFuZGxlcklkXTtcclxuICAgIGlmIChpbmZvKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtldmVudEhhbmRsZXJJZF07XHJcblxyXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBpbmZvLmV2ZW50TmFtZTtcclxuICAgICAgaWYgKC0tdGhpcy5jb3VudEJ5RXZlbnROYW1lW2V2ZW50TmFtZV0gPT09IDApIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5jb3VudEJ5RXZlbnROYW1lW2V2ZW50TmFtZV07XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMuZ2xvYmFsTGlzdGVuZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGluZm87XHJcbiAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50IHtcclxuICAvLyBBbHRob3VnaCB3ZSAqY291bGQqIHRyYWNrIG11bHRpcGxlIGV2ZW50IGhhbmRsZXJzIHBlciAoZWxlbWVudCwgZXZlbnROYW1lKSBwYWlyXHJcbiAgLy8gKHNpbmNlIHRoZXkgaGF2ZSBkaXN0aW5jdCBldmVudEhhbmRsZXJJZCB2YWx1ZXMpLCB0aGVyZSdzIG5vIHBvaW50IGRvaW5nIHNvIGJlY2F1c2VcclxuICAvLyBvdXIgcHJvZ3JhbW1pbmcgbW9kZWwgaXMgdGhhdCB5b3UgZGVjbGFyZSBldmVudCBoYW5kbGVycyBhcyBhdHRyaWJ1dGVzLiBBbiBlbGVtZW50XHJcbiAgLy8gY2FuIG9ubHkgaGF2ZSBvbmUgYXR0cmlidXRlIHdpdGggYSBnaXZlbiBuYW1lLCBoZW5jZSBvbmx5IG9uZSBldmVudCBoYW5kbGVyIHdpdGhcclxuICAvLyB0aGF0IG5hbWUgYXQgYW55IG9uZSB0aW1lLlxyXG4gIC8vIFNvIHRvIGtlZXAgdGhpbmdzIHNpbXBsZSwgb25seSB0cmFjayBvbmUgRXZlbnRIYW5kbGVySW5mbyBwZXIgKGVsZW1lbnQsIGV2ZW50TmFtZSlcclxuICBbZXZlbnROYW1lOiBzdHJpbmddOiBFdmVudEhhbmRsZXJJbmZvXHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudEhhbmRsZXJJbmZvIHtcclxuICBlbGVtZW50OiBFbGVtZW50O1xyXG4gIGV2ZW50TmFtZTogc3RyaW5nO1xyXG4gIGNvbXBvbmVudElkOiBudW1iZXI7XHJcbiAgZXZlbnRIYW5kbGVySWQ6IG51bWJlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9Mb29rdXAoaXRlbXM6IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gIGl0ZW1zLmZvckVhY2godmFsdWUgPT4geyByZXN1bHRbdmFsdWVdID0gdHJ1ZTsgfSk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRXZlbnRGb3JEb3ROZXQ8VERhdGEgZXh0ZW5kcyBVSUV2ZW50QXJncz4ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0eXBlOiBFdmVudEFyZ3NUeXBlLCBwdWJsaWMgcmVhZG9ubHkgZGF0YTogVERhdGEpIHtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRE9NRXZlbnQoZXZlbnQ6IEV2ZW50KTogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgRWxlbWVudDtcclxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG5cclxuICAgICAgY2FzZSAnY2hhbmdlJzoge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElzQ2hlY2tib3ggPSBpc0NoZWNrYm94KGVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGFyZ2V0SXNDaGVja2JveCA/ICEhZWxlbWVudFsnY2hlY2tlZCddIDogZWxlbWVudFsndmFsdWUnXTtcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJQ2hhbmdlRXZlbnRBcmdzPignY2hhbmdlJywgeyB0eXBlOiBldmVudC50eXBlLCB2YWx1ZTogbmV3VmFsdWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgJ2NvcHknOlxyXG4gICAgICBjYXNlICdjdXQnOlxyXG4gICAgICBjYXNlICdwYXN0ZSc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUNsaXBib2FyZEV2ZW50QXJncz4oJ2NsaXBib2FyZCcsIHsgdHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2RyYWcnOlxyXG4gICAgICBjYXNlICdkcmFnZW5kJzpcclxuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcclxuICAgICAgY2FzZSAnZHJhZ2xlYXZlJzpcclxuICAgICAgY2FzZSAnZHJhZ292ZXInOlxyXG4gICAgICBjYXNlICdkcmFnc3RhcnQnOlxyXG4gICAgICBjYXNlICdkcm9wJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRHJhZ0V2ZW50QXJncz4oJ2RyYWcnLCBwYXJzZURyYWdFdmVudChldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnZm9jdXMnOlxyXG4gICAgICBjYXNlICdibHVyJzpcclxuICAgICAgY2FzZSAnZm9jdXNpbic6XHJcbiAgICAgIGNhc2UgJ2ZvY3Vzb3V0JzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRm9jdXNFdmVudEFyZ3M+KCdmb2N1cycsIHsgdHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2tleWRvd24nOlxyXG4gICAgICBjYXNlICdrZXl1cCc6XHJcbiAgICAgIGNhc2UgJ2tleXByZXNzJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJS2V5Ym9hcmRFdmVudEFyZ3M+KCdrZXlib2FyZCcsIHBhcnNlS2V5Ym9hcmRFdmVudCg8S2V5Ym9hcmRFdmVudD5ldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxyXG4gICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XHJcbiAgICAgIGNhc2UgJ21vdXNlb3V0JzpcclxuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcclxuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcclxuICAgICAgY2FzZSAnbW91c2V1cCc6XHJcbiAgICAgIGNhc2UgJ2RibGNsaWNrJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJTW91c2VFdmVudEFyZ3M+KCdtb3VzZScsIHBhcnNlTW91c2VFdmVudCg8TW91c2VFdmVudD5ldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlFcnJvckV2ZW50QXJncz4oJ2Vycm9yJywgcGFyc2VFcnJvckV2ZW50KDxFcnJvckV2ZW50PmV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdsb2Fkc3RhcnQnOlxyXG4gICAgICBjYXNlICd0aW1lb3V0JzpcclxuICAgICAgY2FzZSAnYWJvcnQnOlxyXG4gICAgICBjYXNlICdsb2FkJzpcclxuICAgICAgY2FzZSAnbG9hZGVuZCc6XHJcbiAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJUHJvZ3Jlc3NFdmVudEFyZ3M+KCdwcm9ncmVzcycsIHBhcnNlUHJvZ3Jlc3NFdmVudCg8UHJvZ3Jlc3NFdmVudD5ldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAndG91Y2hjYW5jZWwnOlxyXG4gICAgICBjYXNlICd0b3VjaGVuZCc6XHJcbiAgICAgIGNhc2UgJ3RvdWNobW92ZSc6XHJcbiAgICAgIGNhc2UgJ3RvdWNoZW50ZXInOlxyXG4gICAgICBjYXNlICd0b3VjaGxlYXZlJzpcclxuICAgICAgY2FzZSAndG91Y2hzdGFydCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVRvdWNoRXZlbnRBcmdzPigndG91Y2gnLCBwYXJzZVRvdWNoRXZlbnQoPFRvdWNoRXZlbnQ+ZXZlbnQpKTtcclxuXHJcbiAgICAgIGNhc2UgJ2dvdHBvaW50ZXJjYXB0dXJlJzpcclxuICAgICAgY2FzZSAnbG9zdHBvaW50ZXJjYXB0dXJlJzpcclxuICAgICAgY2FzZSAncG9pbnRlcmNhbmNlbCc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJkb3duJzpcclxuICAgICAgY2FzZSAncG9pbnRlcmVudGVyJzpcclxuICAgICAgY2FzZSAncG9pbnRlcmxlYXZlJzpcclxuICAgICAgY2FzZSAncG9pbnRlcm1vdmUnOlxyXG4gICAgICBjYXNlICdwb2ludGVyb3V0JzpcclxuICAgICAgY2FzZSAncG9pbnRlcm92ZXInOlxyXG4gICAgICBjYXNlICdwb2ludGVydXAnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlQb2ludGVyRXZlbnRBcmdzPigncG9pbnRlcicsIHBhcnNlUG9pbnRlckV2ZW50KDxQb2ludGVyRXZlbnQ+ZXZlbnQpKTtcclxuXHJcbiAgICAgIGNhc2UgJ3doZWVsJzpcclxuICAgICAgY2FzZSAnbW91c2V3aGVlbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVdoZWVsRXZlbnRBcmdzPignd2hlZWwnLCBwYXJzZVdoZWVsRXZlbnQoPFdoZWVsRXZlbnQ+ZXZlbnQpKTtcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4oJ3Vua25vd24nLCB7IHR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZURyYWdFdmVudChldmVudDogYW55KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcclxuICAgIGRhdGFUcmFuc2ZlcjogZXZlbnQuZGF0YVRyYW5zZmVyLFxyXG4gICAgc2NyZWVuWDogZXZlbnQuc2NyZWVuWCxcclxuICAgIHNjcmVlblk6IGV2ZW50LnNjcmVlblksXHJcbiAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxyXG4gICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcclxuICAgIGJ1dHRvbjogZXZlbnQuYnV0dG9uLFxyXG4gICAgYnV0dG9uczogZXZlbnQuYnV0dG9ucyxcclxuICAgIGN0cmxLZXk6IGV2ZW50LmN0cmxLZXksXHJcbiAgICBzaGlmdEtleTogZXZlbnQuc2hpZnRLZXksXHJcbiAgICBhbHRLZXk6IGV2ZW50LmFsdEtleSxcclxuICAgIG1ldGFLZXk6IGV2ZW50Lm1ldGFLZXlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlV2hlZWxFdmVudChldmVudDogV2hlZWxFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5wYXJzZU1vdXNlRXZlbnQoZXZlbnQpLFxyXG4gICAgZGVsdGFYOiBldmVudC5kZWx0YVgsXHJcbiAgICBkZWx0YVk6IGV2ZW50LmRlbHRhWSxcclxuICAgIGRlbHRhWjogZXZlbnQuZGVsdGFaLFxyXG4gICAgZGVsdGFNb2RlOiBldmVudC5kZWx0YU1vZGVcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUVycm9yRXZlbnQoZXZlbnQ6IEVycm9yRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIG1lc3NhZ2U6IGV2ZW50Lm1lc3NhZ2UsXHJcbiAgICBmaWxlbmFtZTogZXZlbnQuZmlsZW5hbWUsXHJcbiAgICBsaW5lbm86IGV2ZW50LmxpbmVubyxcclxuICAgIGNvbG5vOiBldmVudC5jb2xub1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQcm9ncmVzc0V2ZW50KGV2ZW50OiBQcm9ncmVzc0V2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBsZW5ndGhDb21wdXRhYmxlOiBldmVudC5sZW5ndGhDb21wdXRhYmxlLFxyXG4gICAgbG9hZGVkOiBldmVudC5sb2FkZWQsXHJcbiAgICB0b3RhbDogZXZlbnQudG90YWxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVRvdWNoRXZlbnQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcclxuXHJcbiAgZnVuY3Rpb24gcGFyc2VUb3VjaCh0b3VjaExpc3Q6IFRvdWNoTGlzdCkge1xyXG4gICAgY29uc3QgdG91Y2hlczogVUlUb3VjaFBvaW50W10gPSBbXTtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VjaExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdG91Y2ggPSB0b3VjaExpc3RbaV07XHJcbiAgICAgIHRvdWNoZXMucHVzaCh7XHJcbiAgICAgICAgaWRlbnRpZmllcjogdG91Y2guaWRlbnRpZmllcixcclxuICAgICAgICBjbGllbnRYOiB0b3VjaC5jbGllbnRYLFxyXG4gICAgICAgIGNsaWVudFk6IHRvdWNoLmNsaWVudFksXHJcbiAgICAgICAgc2NyZWVuWDogdG91Y2guc2NyZWVuWCxcclxuICAgICAgICBzY3JlZW5ZOiB0b3VjaC5zY3JlZW5ZLFxyXG4gICAgICAgIHBhZ2VYOiB0b3VjaC5wYWdlWCxcclxuICAgICAgICBwYWdlWTogdG91Y2gucGFnZVlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG91Y2hlcztcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXHJcbiAgICB0b3VjaGVzOiBwYXJzZVRvdWNoKGV2ZW50LnRvdWNoZXMpLFxyXG4gICAgdGFyZ2V0VG91Y2hlczogcGFyc2VUb3VjaChldmVudC50YXJnZXRUb3VjaGVzKSxcclxuICAgIGNoYW5nZWRUb3VjaGVzOiBwYXJzZVRvdWNoKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSxcclxuICAgIGN0cmxLZXk6IGV2ZW50LmN0cmxLZXksXHJcbiAgICBzaGlmdEtleTogZXZlbnQuc2hpZnRLZXksXHJcbiAgICBhbHRLZXk6IGV2ZW50LmFsdEtleSxcclxuICAgIG1ldGFLZXk6IGV2ZW50Lm1ldGFLZXlcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIGtleTogZXZlbnQua2V5LFxyXG4gICAgY29kZTogZXZlbnQuY29kZSxcclxuICAgIGxvY2F0aW9uOiBldmVudC5sb2NhdGlvbixcclxuICAgIHJlcGVhdDogZXZlbnQucmVwZWF0LFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlUG9pbnRlckV2ZW50KGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ucGFyc2VNb3VzZUV2ZW50KGV2ZW50KSxcclxuICAgIHBvaW50ZXJJZDogZXZlbnQucG9pbnRlcklkLFxyXG4gICAgd2lkdGg6IGV2ZW50LndpZHRoLFxyXG4gICAgaGVpZ2h0OiBldmVudC5oZWlnaHQsXHJcbiAgICBwcmVzc3VyZTogZXZlbnQucHJlc3N1cmUsXHJcbiAgICB0aWx0WDogZXZlbnQudGlsdFgsXHJcbiAgICB0aWx0WTogZXZlbnQudGlsdFksXHJcbiAgICBwb2ludGVyVHlwZTogZXZlbnQucG9pbnRlclR5cGUsXHJcbiAgICBpc1ByaW1hcnk6IGV2ZW50LmlzUHJpbWFyeVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlTW91c2VFdmVudChldmVudDogTW91c2VFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXHJcbiAgICBzY3JlZW5YOiBldmVudC5zY3JlZW5YLFxyXG4gICAgc2NyZWVuWTogZXZlbnQuc2NyZWVuWSxcclxuICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxyXG4gICAgYnV0dG9uOiBldmVudC5idXR0b24sXHJcbiAgICBidXR0b25zOiBldmVudC5idXR0b25zLFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQ2hlY2tib3goZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ2NoZWNrYm94JztcclxufVxyXG5cclxuLy8gVGhlIGZvbGxvd2luZyBpbnRlcmZhY2VzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIFVJRXZlbnRBcmdzIEMjIGNsYXNzZXNcclxuXHJcbnR5cGUgRXZlbnRBcmdzVHlwZSA9ICdjaGFuZ2UnIHwgJ2NsaXBib2FyZCcgfCAnZHJhZycgfCAnZXJyb3InIHwgJ2ZvY3VzJyB8ICdrZXlib2FyZCcgfCAnbW91c2UnIHwgJ3BvaW50ZXInIHwgJ3Byb2dyZXNzJyB8ICd0b3VjaCcgfCAndW5rbm93bicgfCAnd2hlZWwnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVSUV2ZW50QXJncyB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlDaGFuZ2VFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUNsaXBib2FyZEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRHJhZ0V2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBkZXRhaWw6IG51bWJlcjtcclxuICBkYXRhVHJhbnNmZXI6IFVJRGF0YVRyYW5zZmVyO1xyXG4gIHNjcmVlblg6IG51bWJlcjtcclxuICBzY3JlZW5ZOiBudW1iZXI7XHJcbiAgY2xpZW50WDogbnVtYmVyO1xyXG4gIGNsaWVudFk6IG51bWJlcjtcclxuICBidXR0b246IG51bWJlcjtcclxuICBidXR0b25zOiBudW1iZXI7XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRGF0YVRyYW5zZmVyIHtcclxuICBkcm9wRWZmZWN0OiBzdHJpbmc7XHJcbiAgZWZmZWN0QWxsb3dlZDogc3RyaW5nO1xyXG4gIGZpbGVzOiBzdHJpbmdbXTtcclxuICBpdGVtczogVUlEYXRhVHJhbnNmZXJJdGVtW107XHJcbiAgdHlwZXM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlEYXRhVHJhbnNmZXJJdGVtIHtcclxuICBraW5kOiBzdHJpbmc7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlFcnJvckV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgZmlsZW5hbWU6IHN0cmluZztcclxuICBsaW5lbm86IG51bWJlcjtcclxuICBjb2xubzogbnVtYmVyO1xyXG5cclxuICAvLyBvbWl0dGluZyAnZXJyb3InIGhlcmUgc2luY2Ugd2UnZCBoYXZlIHRvIHNlcmlhbGl6ZSBpdCwgYW5kIGl0J3Mgbm90IGNsZWFyIHdlIHdpbGwgd2FudCB0b1xyXG4gIC8vIGRvIHRoYXQuIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FcnJvckV2ZW50XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUZvY3VzRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlLZXlib2FyZEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBrZXk6IHN0cmluZztcclxuICBjb2RlOiBzdHJpbmc7XHJcbiAgbG9jYXRpb246IG51bWJlcjtcclxuICByZXBlYXQ6IGJvb2xlYW47XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJTW91c2VFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgZGV0YWlsOiBudW1iZXI7XHJcbiAgc2NyZWVuWDogbnVtYmVyO1xyXG4gIHNjcmVlblk6IG51bWJlcjtcclxuICBjbGllbnRYOiBudW1iZXI7XHJcbiAgY2xpZW50WTogbnVtYmVyO1xyXG4gIGJ1dHRvbjogbnVtYmVyO1xyXG4gIGJ1dHRvbnM6IG51bWJlcjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIHNoaWZ0S2V5OiBib29sZWFuO1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBtZXRhS2V5OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlQb2ludGVyRXZlbnRBcmdzIGV4dGVuZHMgVUlNb3VzZUV2ZW50QXJncyB7XHJcbiAgcG9pbnRlcklkOiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBwcmVzc3VyZTogbnVtYmVyO1xyXG4gIHRpbHRYOiBudW1iZXI7XHJcbiAgdGlsdFk6IG51bWJlcjtcclxuICBwb2ludGVyVHlwZTogc3RyaW5nO1xyXG4gIGlzUHJpbWFyeTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJUHJvZ3Jlc3NFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgbGVuZ3RoQ29tcHV0YWJsZTogYm9vbGVhbjtcclxuICBsb2FkZWQ6IG51bWJlcjtcclxuICB0b3RhbDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlUb3VjaEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBkZXRhaWw6IG51bWJlcjtcclxuICB0b3VjaGVzOiBVSVRvdWNoUG9pbnRbXTtcclxuICB0YXJnZXRUb3VjaGVzOiBVSVRvdWNoUG9pbnRbXTtcclxuICBjaGFuZ2VkVG91Y2hlczogVUlUb3VjaFBvaW50W107XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJVG91Y2hQb2ludCB7XHJcbiAgaWRlbnRpZmllcjogbnVtYmVyO1xyXG4gIHNjcmVlblg6IG51bWJlcjtcclxuICBzY3JlZW5ZOiBudW1iZXI7XHJcbiAgY2xpZW50WDogbnVtYmVyO1xyXG4gIGNsaWVudFk6IG51bWJlcjtcclxuICBwYWdlWDogbnVtYmVyO1xyXG4gIHBhZ2VZOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVdoZWVsRXZlbnRBcmdzIGV4dGVuZHMgVUlNb3VzZUV2ZW50QXJncyB7XHJcbiAgZGVsdGFYOiBudW1iZXI7XHJcbiAgZGVsdGFZOiBudW1iZXI7XHJcbiAgZGVsdGFaOiBudW1iZXI7XHJcbiAgZGVsdGFNb2RlOiBudW1iZXI7XHJcbn1cclxuIiwiLypcclxuICBBIExvZ2ljYWxFbGVtZW50IHBsYXlzIHRoZSBzYW1lIHJvbGUgYXMgYW4gRWxlbWVudCBpbnN0YW5jZSBmcm9tIHRoZSBwb2ludCBvZiB2aWV3IG9mIHRoZVxyXG4gIEFQSSBjb25zdW1lci4gSW5zZXJ0aW5nIGFuZCByZW1vdmluZyBsb2dpY2FsIGVsZW1lbnRzIHVwZGF0ZXMgdGhlIGJyb3dzZXIgRE9NIGp1c3QgdGhlIHNhbWUuXHJcblxyXG4gIFRoZSBkaWZmZXJlbmNlIGlzIHRoYXQsIHVubGlrZSByZWd1bGFyIERPTSBtdXRhdGlvbiBBUElzLCB0aGUgTG9naWNhbEVsZW1lbnQgQVBJcyBkb24ndCB1c2VcclxuICB0aGUgdW5kZXJseWluZyBET00gc3RydWN0dXJlIGFzIHRoZSBkYXRhIHN0b3JhZ2UgZm9yIHRoZSBlbGVtZW50IGhpZXJhcmNoeS4gSW5zdGVhZCwgdGhlXHJcbiAgTG9naWNhbEVsZW1lbnQgQVBJcyB0YWtlIGNhcmUgb2YgdHJhY2tpbmcgaGllcmFyY2hpY2FsIHJlbGF0aW9uc2hpcHMgc2VwYXJhdGVseS4gVGhlIHBvaW50XHJcbiAgb2YgdGhpcyBpcyB0byBwZXJtaXQgYSBsb2dpY2FsIHRyZWUgc3RydWN0dXJlIGluIHdoaWNoIHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXBzIGRvbid0XHJcbiAgaGF2ZSB0byBiZSBtYXRlcmlhbGl6ZWQgaW4gdGVybXMgb2YgRE9NIGVsZW1lbnQgcGFyZW50L2NoaWxkIHJlbGF0aW9uc2hpcHMuIEFuZCB0aGUgcmVhc29uXHJcbiAgd2h5IHdlIHdhbnQgdGhhdCBpcyBzbyB0aGF0IGhpZXJhcmNoaWVzIG9mIEJsYXpvciBjb21wb25lbnRzIGNhbiBiZSB0cmFja2VkIGV2ZW4gd2hlbiB0aG9zZVxyXG4gIGNvbXBvbmVudHMnIHJlbmRlciBvdXRwdXQgbmVlZCBub3QgYmUgYSBzaW5nbGUgbGl0ZXJhbCBET00gZWxlbWVudC5cclxuXHJcbiAgQ29uc3VtZXJzIG9mIHRoZSBBUEkgZG9uJ3QgbmVlZCB0byBrbm93IGFib3V0IHRoZSBpbXBsZW1lbnRhdGlvbiwgYnV0IGhvdyBpdCdzIGRvbmUgaXM6XHJcbiAgLSBFYWNoIExvZ2ljYWxFbGVtZW50IGlzIG1hdGVyaWFsaXplZCBpbiB0aGUgRE9NIGFzIGVpdGhlcjpcclxuICAgIC0gQSBOb2RlIGluc3RhbmNlLCBmb3IgYWN0dWFsIE5vZGUgaW5zdGFuY2VzIGluc2VydGVkIHVzaW5nICdpbnNlcnRMb2dpY2FsQ2hpbGQnIG9yXHJcbiAgICAgIGZvciBFbGVtZW50IGluc3RhbmNlcyBwcm9tb3RlZCB0byBMb2dpY2FsRWxlbWVudCB2aWEgJ3RvTG9naWNhbEVsZW1lbnQnXHJcbiAgICAtIEEgQ29tbWVudCBpbnN0YW5jZSwgZm9yICdsb2dpY2FsIGNvbnRhaW5lcicgaW5zdGFuY2VzIGluc2VydGVkIHVzaW5nICdjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyJ1xyXG4gIC0gVGhlbiwgb24gdGhhdCBpbnN0YW5jZSAoaS5lLiwgdGhlIE5vZGUgb3IgQ29tbWVudCksIHdlIHN0b3JlIGFuIGFycmF5IG9mICdsb2dpY2FsIGNoaWxkcmVuJ1xyXG4gICAgaW5zdGFuY2VzLCBlLmcuLFxyXG4gICAgICBbZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGQsIHRoaXJkQ2hpbGQsIC4uLl1cclxuICAgIC4uLiBwbHVzIHdlIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSAnbG9naWNhbCBwYXJlbnQnIChpZiBhbnkpXHJcbiAgLSBUaGUgJ2xvZ2ljYWwgY2hpbGRyZW4nIGFycmF5IG1lYW5zIHdlIGNhbiBsb29rIHVwIGluIE8oMSk6XHJcbiAgICAtIFRoZSBudW1iZXIgb2YgbG9naWNhbCBjaGlsZHJlbiAobm90IGN1cnJlbnRseSBpbXBsZW1lbnRlZCBiZWNhdXNlIG5vdCByZXF1aXJlZCwgYnV0IHRyaXZpYWwpXHJcbiAgICAtIFRoZSBsb2dpY2FsIGNoaWxkIGF0IGFueSBnaXZlbiBpbmRleFxyXG4gIC0gV2hlbmV2ZXIgYSBsb2dpY2FsIGNoaWxkIGlzIGFkZGVkIG9yIHJlbW92ZWQsIHdlIHVwZGF0ZSB0aGUgcGFyZW50J3MgYXJyYXkgb2YgbG9naWNhbCBjaGlsZHJlblxyXG4qL1xyXG5cclxuY29uc3QgbG9naWNhbENoaWxkcmVuUHJvcG5hbWUgPSBjcmVhdGVTeW1ib2xPckZhbGxiYWNrKCdfYmxhem9yTG9naWNhbENoaWxkcmVuJyk7XHJcbmNvbnN0IGxvZ2ljYWxQYXJlbnRQcm9wbmFtZSA9IGNyZWF0ZVN5bWJvbE9yRmFsbGJhY2soJ19ibGF6b3JMb2dpY2FsUGFyZW50Jyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9Mb2dpY2FsRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldyBsb2dpY2FsIGVsZW1lbnRzIG11c3Qgc3RhcnQgZW1wdHknKTtcclxuICB9XHJcblxyXG4gIGVsZW1lbnRbbG9naWNhbENoaWxkcmVuUHJvcG5hbWVdID0gW107XHJcbiAgcmV0dXJuIGVsZW1lbnQgYXMgYW55IGFzIExvZ2ljYWxFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lcihwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyEnKTtcclxuICBpbnNlcnRMb2dpY2FsQ2hpbGQoY29udGFpbmVyRWxlbWVudCwgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuICByZXR1cm4gY29udGFpbmVyRWxlbWVudCBhcyBhbnkgYXMgTG9naWNhbEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRMb2dpY2FsQ2hpbGQoY2hpbGQ6IE5vZGUsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcikge1xyXG4gIGNvbnN0IGNoaWxkQXNMb2dpY2FsRWxlbWVudCA9IGNoaWxkIGFzIGFueSBhcyBMb2dpY2FsRWxlbWVudDtcclxuICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICBjb25zdCBleGlzdGluZ0dyYW5kY2hpbGRyZW4gPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShjaGlsZEFzTG9naWNhbEVsZW1lbnQpO1xyXG4gICAgaWYgKGV4aXN0aW5nR3JhbmRjaGlsZHJlbiAmJiBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShjaGlsZEFzTG9naWNhbEVsZW1lbnQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gVGhlcmUncyBub3RoaW5nIHRvIHN0b3AgdXMgaW1wbGVtZW50aW5nIHN1cHBvcnQgZm9yIHRoaXMgc2NlbmFyaW8sIGFuZCBpdCdzIG5vdCBkaWZmaWN1bHRcclxuICAgICAgLy8gKGFmdGVyIGluc2VydGluZyAnY2hpbGQnIGl0c2VsZiwgYWxzbyBpdGVyYXRlIHRocm91Z2ggaXRzIGxvZ2ljYWwgY2hpbGRyZW4gYW5kIHBoeXNpY2FsbHlcclxuICAgICAgLy8gcHV0IHRoZW0gYXMgZm9sbG93aW5nLXNpYmxpbmdzIGluIHRoZSBET00pLiBIb3dldmVyIHRoZXJlJ3Mgbm8gc2NlbmFyaW8gdGhhdCByZXF1aXJlcyBpdFxyXG4gICAgICAvLyBwcmVzZW50bHksIHNvIGlmIHdlIGRpZCBpbXBsZW1lbnQgaXQgdGhlcmUnZCBiZSBubyBnb29kIHdheSB0byBoYXZlIHRlc3RzIGZvciBpdC5cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQ6IGluc2VydGluZyBub24tZW1wdHkgbG9naWNhbCBjb250YWluZXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChnZXRMb2dpY2FsUGFyZW50KGNoaWxkQXNMb2dpY2FsRWxlbWVudCkpIHtcclxuICAgIC8vIExpa2V3aXNlLCB3ZSBjb3VsZCBlYXNpbHkgc3VwcG9ydCB0aGlzIHNjZW5hcmlvIHRvbyAoaW4gdGhpcyAnaWYnIGJsb2NrLCBqdXN0IHNwbGljZVxyXG4gICAgLy8gb3V0ICdjaGlsZCcgZnJvbSB0aGUgbG9naWNhbCBjaGlsZHJlbiBhcnJheSBvZiBpdHMgcHJldmlvdXMgbG9naWNhbCBwYXJlbnQgYnkgdXNpbmdcclxuICAgIC8vIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHRvIGRldGVybWluZSBpdHMgcHJldmlvdXMgc2libGluZyBpbmRleCkuXHJcbiAgICAvLyBCdXQgYWdhaW4sIHNpbmNlIHRoZXJlJ3Mgbm90IGN1cnJlbnRseSBhbnkgc2NlbmFyaW8gdGhhdCB3b3VsZCB1c2UgaXQsIHdlIHdvdWxkIG5vdFxyXG4gICAgLy8gaGF2ZSBhbnkgdGVzdCBjb3ZlcmFnZSBmb3Igc3VjaCBhbiBpbXBsZW1lbnRhdGlvbi5cclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkOiBtb3ZpbmcgZXhpc3RpbmcgbG9naWNhbCBjaGlsZHJlbicpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmV3U2libGluZ3MgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShwYXJlbnQpO1xyXG4gIGlmIChjaGlsZEluZGV4IDwgbmV3U2libGluZ3MubGVuZ3RoKSB7XHJcbiAgICAvLyBJbnNlcnRcclxuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gbmV3U2libGluZ3NbY2hpbGRJbmRleF0gYXMgYW55IGFzIE5vZGU7XHJcbiAgICBuZXh0U2libGluZy5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUoY2hpbGQsIG5leHRTaWJsaW5nKTtcclxuICAgIG5ld1NpYmxpbmdzLnNwbGljZShjaGlsZEluZGV4LCAwLCBjaGlsZEFzTG9naWNhbEVsZW1lbnQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBBcHBlbmRcclxuICAgIGFwcGVuZERvbU5vZGUoY2hpbGQsIHBhcmVudCk7XHJcbiAgICBuZXdTaWJsaW5ncy5wdXNoKGNoaWxkQXNMb2dpY2FsRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBjaGlsZEFzTG9naWNhbEVsZW1lbnRbbG9naWNhbFBhcmVudFByb3BuYW1lXSA9IHBhcmVudDtcclxuICBpZiAoIShsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZSBpbiBjaGlsZEFzTG9naWNhbEVsZW1lbnQpKSB7XHJcbiAgICBjaGlsZEFzTG9naWNhbEVsZW1lbnRbbG9naWNhbENoaWxkcmVuUHJvcG5hbWVdID0gW107XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTG9naWNhbENoaWxkKHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcikge1xyXG4gIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShwYXJlbnQpO1xyXG4gIGNvbnN0IGNoaWxkVG9SZW1vdmUgPSBjaGlsZHJlbkFycmF5LnNwbGljZShjaGlsZEluZGV4LCAxKVswXTtcclxuXHJcbiAgLy8gSWYgaXQncyBhIGxvZ2ljYWwgY29udGFpbmVyLCBhbHNvIHJlbW92ZSBpdHMgZGVzY2VuZGFudHNcclxuICBpZiAoY2hpbGRUb1JlbW92ZSBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIGNvbnN0IGdyYW5kY2hpbGRyZW5BcnJheSA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGNoaWxkVG9SZW1vdmUpO1xyXG4gICAgd2hpbGUgKGdyYW5kY2hpbGRyZW5BcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJlbW92ZUxvZ2ljYWxDaGlsZChjaGlsZFRvUmVtb3ZlLCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZpbmFsbHksIHJlbW92ZSB0aGUgbm9kZSBpdHNlbGZcclxuICBjb25zdCBkb21Ob2RlVG9SZW1vdmUgPSBjaGlsZFRvUmVtb3ZlIGFzIGFueSBhcyBOb2RlO1xyXG4gIGRvbU5vZGVUb1JlbW92ZS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChkb21Ob2RlVG9SZW1vdmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naWNhbFBhcmVudChlbGVtZW50OiBMb2dpY2FsRWxlbWVudCk6IExvZ2ljYWxFbGVtZW50IHwgbnVsbCB7XHJcbiAgcmV0dXJuIChlbGVtZW50W2xvZ2ljYWxQYXJlbnRQcm9wbmFtZV0gYXMgTG9naWNhbEVsZW1lbnQpIHx8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsQ2hpbGQocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKTogTG9naWNhbEVsZW1lbnQge1xyXG4gIHJldHVybiBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShwYXJlbnQpW2NoaWxkSW5kZXhdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTdmdFbGVtZW50KGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgcmV0dXJuIGdldENsb3Nlc3REb21FbGVtZW50KGVsZW1lbnQpLm5hbWVzcGFjZVVSSSA9PT0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICByZXR1cm4gZWxlbWVudFtsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZV0gYXMgTG9naWNhbEVsZW1lbnRbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9naWNhbE5leHRTaWJsaW5nKGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KTogTG9naWNhbEVsZW1lbnQgfCBudWxsIHtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGdldExvZ2ljYWxQYXJlbnQoZWxlbWVudCkhKTtcclxuICBjb25zdCBzaWJsaW5nSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHNpYmxpbmdzLCBlbGVtZW50KTtcclxuICByZXR1cm4gc2libGluZ3Nbc2libGluZ0luZGV4ICsgMV0gfHwgbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2xvc2VzdERvbUVsZW1lbnQobG9naWNhbEVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgaWYgKGxvZ2ljYWxFbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGxvZ2ljYWxFbGVtZW50O1xyXG4gIH0gZWxzZSBpZiAobG9naWNhbEVsZW1lbnQgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICByZXR1cm4gbG9naWNhbEVsZW1lbnQucGFyZW50Tm9kZSEgYXMgRWxlbWVudDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYSB2YWxpZCBsb2dpY2FsIGVsZW1lbnQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZERvbU5vZGUoY2hpbGQ6IE5vZGUsIHBhcmVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICAvLyBUaGlzIGZ1bmN0aW9uIG9ubHkgcHV0cyAnY2hpbGQnIGludG8gdGhlIERPTSBpbiB0aGUgcmlnaHQgcGxhY2UgcmVsYXRpdmUgdG8gJ3BhcmVudCdcclxuICAvLyBJdCBkb2VzIG5vdCB1cGRhdGUgdGhlIGxvZ2ljYWwgY2hpbGRyZW4gYXJyYXkgb2YgYW55dGhpbmdcclxuICBpZiAocGFyZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICB9IGVsc2UgaWYgKHBhcmVudCBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIGNvbnN0IHBhcmVudExvZ2ljYWxOZXh0U2libGluZyA9IGdldExvZ2ljYWxOZXh0U2libGluZyhwYXJlbnQpIGFzIGFueSBhcyBOb2RlO1xyXG4gICAgaWYgKHBhcmVudExvZ2ljYWxOZXh0U2libGluZykge1xyXG4gICAgICAvLyBTaW5jZSB0aGUgcGFyZW50IGhhcyBhIGxvZ2ljYWwgbmV4dC1zaWJsaW5nLCBpdHMgYXBwZW5kZWQgY2hpbGQgZ29lcyByaWdodCBiZWZvcmUgdGhhdFxyXG4gICAgICBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKGNoaWxkLCBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2luY2UgdGhlIHBhcmVudCBoYXMgbm8gbG9naWNhbCBuZXh0LXNpYmxpbmcsIGtlZXAgcmVjdXJzaW5nIHVwd2FyZHMgdW50aWwgd2UgZmluZFxyXG4gICAgICAvLyBhIGxvZ2ljYWwgYW5jZXN0b3IgdGhhdCBkb2VzIGhhdmUgYSBuZXh0LXNpYmxpbmcgb3IgaXMgYSBwaHlzaWNhbCBlbGVtZW50LlxyXG4gICAgICBhcHBlbmREb21Ob2RlKGNoaWxkLCBnZXRMb2dpY2FsUGFyZW50KHBhcmVudCkhKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgYXBwZW5kIG5vZGUgYmVjYXVzZSB0aGUgcGFyZW50IGlzIG5vdCBhIHZhbGlkIGxvZ2ljYWwgZWxlbWVudC4gUGFyZW50OiAke3BhcmVudH1gKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN5bWJvbE9yRmFsbGJhY2soZmFsbGJhY2s6IHN0cmluZyk6IHN5bWJvbCB8IHN0cmluZyB7XHJcbiAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgPyBTeW1ib2woKSA6IGZhbGxiYWNrO1xyXG59XHJcblxyXG4vLyBOb21pbmFsIHR5cGUgdG8gcmVwcmVzZW50IGEgbG9naWNhbCBlbGVtZW50IHdpdGhvdXQgbmVlZGluZyB0byBhbGxvY2F0ZSBhbnkgb2JqZWN0IGZvciBpbnN0YW5jZXNcclxuZXhwb3J0IGludGVyZmFjZSBMb2dpY2FsRWxlbWVudCB7IExvZ2ljYWxFbGVtZW50X19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfTtcclxuIiwiZXhwb3J0IGludGVyZmFjZSBSZW5kZXJCYXRjaCB7XHJcbiAgdXBkYXRlZENvbXBvbmVudHMoKTogQXJyYXlSYW5nZTxSZW5kZXJUcmVlRGlmZj47XHJcbiAgcmVmZXJlbmNlRnJhbWVzKCk6IEFycmF5UmFuZ2U8UmVuZGVyVHJlZUZyYW1lPjtcclxuICBkaXNwb3NlZENvbXBvbmVudElkcygpOiBBcnJheVJhbmdlPG51bWJlcj47XHJcbiAgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMoKTogQXJyYXlSYW5nZTxudW1iZXI+O1xyXG5cclxuICB1cGRhdGVkQ29tcG9uZW50c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZURpZmY+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZURpZmY7XHJcbiAgcmVmZXJlbmNlRnJhbWVzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZUZyYW1lO1xyXG4gIGRpc3Bvc2VkQ29tcG9uZW50SWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKTogbnVtYmVyO1xyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKTogbnVtYmVyO1xyXG5cclxuICBkaWZmUmVhZGVyOiBSZW5kZXJUcmVlRGlmZlJlYWRlcjtcclxuICBlZGl0UmVhZGVyOiBSZW5kZXJUcmVlRWRpdFJlYWRlcjtcclxuICBmcmFtZVJlYWRlcjogUmVuZGVyVHJlZUZyYW1lUmVhZGVyO1xyXG4gIGFycmF5UmFuZ2VSZWFkZXI6IEFycmF5UmFuZ2VSZWFkZXI7XHJcbiAgYXJyYXlTZWdtZW50UmVhZGVyOiBBcnJheVNlZ21lbnRSZWFkZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlSYW5nZVJlYWRlciB7XHJcbiAgY291bnQ8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPik6IG51bWJlcjtcclxuICB2YWx1ZXM8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPik6IEFycmF5VmFsdWVzPFQ+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5U2VnbWVudFJlYWRlciB7XHJcbiAgb2Zmc2V0PFQ+KGFycmF5U2VnbWVudDogQXJyYXlTZWdtZW50PFQ+KTogbnVtYmVyO1xyXG4gIGNvdW50PFQ+KGFycmF5U2VnbWVudDogQXJyYXlTZWdtZW50PFQ+KTogbnVtYmVyO1xyXG4gIHZhbHVlczxUPihhcnJheVNlZ21lbnQ6IEFycmF5U2VnbWVudDxUPik6IEFycmF5VmFsdWVzPFQ+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVEaWZmUmVhZGVyIHtcclxuICBjb21wb25lbnRJZChkaWZmOiBSZW5kZXJUcmVlRGlmZik6IG51bWJlcjtcclxuICBlZGl0cyhkaWZmOiBSZW5kZXJUcmVlRGlmZik6IEFycmF5U2VnbWVudDxSZW5kZXJUcmVlRWRpdD47XHJcbiAgZWRpdHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVFZGl0PiwgaW5kZXg6IG51bWJlcik6IFJlbmRlclRyZWVFZGl0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVFZGl0UmVhZGVyIHtcclxuICBlZGl0VHlwZShlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IEVkaXRUeXBlO1xyXG4gIHNpYmxpbmdJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IG51bWJlcjtcclxuICBuZXdUcmVlSW5kZXgoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBudW1iZXI7XHJcbiAgcmVtb3ZlZEF0dHJpYnV0ZU5hbWUoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVGcmFtZVJlYWRlciB7XHJcbiAgZnJhbWVUeXBlKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBGcmFtZVR5cGU7XHJcbiAgc3VidHJlZUxlbmd0aChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyO1xyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgY29tcG9uZW50SWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlcjtcclxuICBlbGVtZW50TmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICB0ZXh0Q29udGVudChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBtYXJrdXBDb250ZW50KGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBzdHJpbmc7XHJcbiAgYXR0cmlidXRlTmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBhdHRyaWJ1dGVWYWx1ZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBhdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5UmFuZ2U8VD4geyBBcnJheVJhbmdlX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5U2VnbWVudDxUPiB7IEFycmF5U2VnbWVudF9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBBcnJheVZhbHVlczxUPiB7IEFycmF5VmFsdWVzX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRGlmZiB7IFJlbmRlclRyZWVEaWZmX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVGcmFtZSB7IFJlbmRlclRyZWVGcmFtZV9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRWRpdCB7IFJlbmRlclRyZWVFZGl0X19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cclxuZXhwb3J0IGVudW0gRWRpdFR5cGUge1xyXG4gIC8vIFRoZSB2YWx1ZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVFZGl0VHlwZS5jc1xyXG4gIHByZXBlbmRGcmFtZSA9IDEsXHJcbiAgcmVtb3ZlRnJhbWUgPSAyLFxyXG4gIHNldEF0dHJpYnV0ZSA9IDMsXHJcbiAgcmVtb3ZlQXR0cmlidXRlID0gNCxcclxuICB1cGRhdGVUZXh0ID0gNSxcclxuICBzdGVwSW4gPSA2LFxyXG4gIHN0ZXBPdXQgPSA3LFxyXG4gIHVwZGF0ZU1hcmt1cCA9IDgsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZyYW1lVHlwZSB7XHJcbiAgLy8gVGhlIHZhbHVlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUZyYW1lVHlwZS5jc1xyXG4gIGVsZW1lbnQgPSAxLFxyXG4gIHRleHQgPSAyLFxyXG4gIGF0dHJpYnV0ZSA9IDMsXHJcbiAgY29tcG9uZW50ID0gNCxcclxuICByZWdpb24gPSA1LFxyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlID0gNixcclxuICBtYXJrdXAgPSA4LFxyXG59XHJcbiIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJCYXRjaCwgQXJyYXlSYW5nZSwgQXJyYXlSYW5nZVJlYWRlciwgQXJyYXlTZWdtZW50LCBSZW5kZXJUcmVlRGlmZiwgUmVuZGVyVHJlZUVkaXQsIFJlbmRlclRyZWVGcmFtZSwgQXJyYXlWYWx1ZXMsIEVkaXRUeXBlLCBGcmFtZVR5cGUsIFJlbmRlclRyZWVGcmFtZVJlYWRlciB9IGZyb20gJy4vUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBQb2ludGVyLCBTeXN0ZW1fQXJyYXkgfSBmcm9tICcuLi8uLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcblxyXG4vLyBVc2VkIHdoZW4gcnVubmluZyBvbiBNb25vIFdlYkFzc2VtYmx5IGZvciBzaGFyZWQtbWVtb3J5IGludGVyb3AuIFRoZSBjb2RlIGhlcmUgZW5jYXBzdWxhdGVzXHJcbi8vIG91ciBrbm93bGVkZ2Ugb2YgdGhlIG1lbW9yeSBsYXlvdXQgb2YgUmVuZGVyQmF0Y2ggYW5kIGFsbCByZWZlcmVuY2VkIHR5cGVzLlxyXG4vL1xyXG4vLyBJbiB0aGlzIGltcGxlbWVudGF0aW9uLCBhbGwgdGhlIERUTyB0eXBlcyBhcmUgcmVhbGx5IGhlYXAgcG9pbnRlcnMgYXQgcnVudGltZSwgaGVuY2UgYWxsXHJcbi8vIHRoZSBjYXN0cyB0byAnYW55JyB3aGVuZXZlciB3ZSBwYXNzIHRoZW0gdG8gcGxhdGZvcm0ucmVhZC5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRNZW1vcnlSZW5kZXJCYXRjaCBpbXBsZW1lbnRzIFJlbmRlckJhdGNoIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoQWRkcmVzczogUG9pbnRlcikge1xyXG4gIH1cclxuXHJcbiAgLy8gS2VlcCBpbiBzeW5jIHdpdGggbWVtb3J5IGxheW91dCBpbiBSZW5kZXJCYXRjaC5jc1xyXG4gIHVwZGF0ZWRDb21wb25lbnRzKCkgeyByZXR1cm4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPFBvaW50ZXI+KHRoaXMuYmF0Y2hBZGRyZXNzLCAwKSBhcyBhbnkgYXMgQXJyYXlSYW5nZTxSZW5kZXJUcmVlRGlmZj47IH1cclxuICByZWZlcmVuY2VGcmFtZXMoKSB7IHJldHVybiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8UG9pbnRlcj4odGhpcy5iYXRjaEFkZHJlc3MsIGFycmF5UmFuZ2VSZWFkZXIuc3RydWN0TGVuZ3RoKSBhcyBhbnkgYXMgQXJyYXlSYW5nZTxSZW5kZXJUcmVlRGlmZj47IH1cclxuICBkaXNwb3NlZENvbXBvbmVudElkcygpIHsgcmV0dXJuIHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxQb2ludGVyPih0aGlzLmJhdGNoQWRkcmVzcywgYXJyYXlSYW5nZVJlYWRlci5zdHJ1Y3RMZW5ndGggKiAyKSBhcyBhbnkgYXMgQXJyYXlSYW5nZTxudW1iZXI+OyB9XHJcbiAgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMoKSB7IHJldHVybiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8UG9pbnRlcj4odGhpcy5iYXRjaEFkZHJlc3MsIGFycmF5UmFuZ2VSZWFkZXIuc3RydWN0TGVuZ3RoICogMykgYXMgYW55IGFzIEFycmF5UmFuZ2U8bnVtYmVyPjsgfVxyXG5cclxuICB1cGRhdGVkQ29tcG9uZW50c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZURpZmY+LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYXJyYXlWYWx1ZXNFbnRyeSh2YWx1ZXMsIGluZGV4LCBkaWZmUmVhZGVyLnN0cnVjdExlbmd0aCk7XHJcbiAgfVxyXG4gIHJlZmVyZW5jZUZyYW1lc0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGFycmF5VmFsdWVzRW50cnkodmFsdWVzLCBpbmRleCwgZnJhbWVSZWFkZXIuc3RydWN0TGVuZ3RoKTtcclxuICB9XHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPG51bWJlcj4sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBvaW50ZXIgPSBhcnJheVZhbHVlc0VudHJ5KHZhbHVlcywgaW5kZXgsIC8qIGludCBsZW5ndGggKi8gNCk7XHJcbiAgICByZXR1cm4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQocG9pbnRlciBhcyBhbnkgYXMgUG9pbnRlcik7XHJcbiAgfVxyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwb2ludGVyID0gYXJyYXlWYWx1ZXNFbnRyeSh2YWx1ZXMsIGluZGV4LCAvKiBpbnQgbGVuZ3RoICovIDQpO1xyXG4gICAgcmV0dXJuIHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKHBvaW50ZXIgYXMgYW55IGFzIFBvaW50ZXIpO1xyXG4gIH1cclxuXHJcbiAgYXJyYXlSYW5nZVJlYWRlciA9IGFycmF5UmFuZ2VSZWFkZXI7XHJcbiAgYXJyYXlTZWdtZW50UmVhZGVyID0gYXJyYXlTZWdtZW50UmVhZGVyO1xyXG4gIGRpZmZSZWFkZXIgPSBkaWZmUmVhZGVyO1xyXG4gIGVkaXRSZWFkZXIgPSBlZGl0UmVhZGVyO1xyXG4gIGZyYW1lUmVhZGVyID0gZnJhbWVSZWFkZXI7XHJcbn1cclxuXHJcbi8vIEtlZXAgaW4gc3luYyB3aXRoIG1lbW9yeSBsYXlvdXQgaW4gQXJyYXlSYW5nZS5jc1xyXG5jb25zdCBhcnJheVJhbmdlUmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogOCxcclxuICB2YWx1ZXM6IDxUPihhcnJheVJhbmdlOiBBcnJheVJhbmdlPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkT2JqZWN0RmllbGQ8U3lzdGVtX0FycmF5PFQ+PihhcnJheVJhbmdlIGFzIGFueSwgMCkgYXMgYW55IGFzIEFycmF5VmFsdWVzPFQ+LFxyXG4gIGNvdW50OiA8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoYXJyYXlSYW5nZSBhcyBhbnksIDQpLFxyXG59O1xyXG5cclxuLy8gS2VlcCBpbiBzeW5jIHdpdGggbWVtb3J5IGxheW91dCBpbiBBcnJheVNlZ21lbnRcclxuY29uc3QgYXJyYXlTZWdtZW50UmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogMTIsXHJcbiAgdmFsdWVzOiA8VD4oYXJyYXlTZWdtZW50OiBBcnJheVNlZ21lbnQ8VD4pID0+IHBsYXRmb3JtLnJlYWRPYmplY3RGaWVsZDxTeXN0ZW1fQXJyYXk8VD4+KGFycmF5U2VnbWVudCBhcyBhbnksIDApIGFzIGFueSBhcyBBcnJheVZhbHVlczxUPixcclxuICBvZmZzZXQ6IDxUPihhcnJheVNlZ21lbnQ6IEFycmF5U2VnbWVudDxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoYXJyYXlTZWdtZW50IGFzIGFueSwgNCksXHJcbiAgY291bnQ6IDxUPihhcnJheVNlZ21lbnQ6IEFycmF5U2VnbWVudDxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoYXJyYXlTZWdtZW50IGFzIGFueSwgOCksXHJcbn07XHJcblxyXG4vLyBLZWVwIGluIHN5bmMgd2l0aCBtZW1vcnkgbGF5b3V0IGluIFJlbmRlclRyZWVEaWZmLmNzXHJcbmNvbnN0IGRpZmZSZWFkZXIgPSB7XHJcbiAgc3RydWN0TGVuZ3RoOiA0ICsgYXJyYXlTZWdtZW50UmVhZGVyLnN0cnVjdExlbmd0aCxcclxuICBjb21wb25lbnRJZDogKGRpZmY6IFJlbmRlclRyZWVEaWZmKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChkaWZmIGFzIGFueSwgMCksXHJcbiAgZWRpdHM6IChkaWZmOiBSZW5kZXJUcmVlRGlmZikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPFBvaW50ZXI+KGRpZmYgYXMgYW55LCA0KSBhcyBhbnkgYXMgQXJyYXlTZWdtZW50PFJlbmRlclRyZWVFZGl0PixcclxuICBlZGl0c0VudHJ5OiAodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRWRpdD4sIGluZGV4OiBudW1iZXIpID0+IGFycmF5VmFsdWVzRW50cnkodmFsdWVzLCBpbmRleCwgZWRpdFJlYWRlci5zdHJ1Y3RMZW5ndGgpLFxyXG59O1xyXG5cclxuLy8gS2VlcCBpbiBzeW5jIHdpdGggbWVtb3J5IGxheW91dCBpbiBSZW5kZXJUcmVlRWRpdC5jc1xyXG5jb25zdCBlZGl0UmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogMTYsXHJcbiAgZWRpdFR5cGU6IChlZGl0OiBSZW5kZXJUcmVlRWRpdCkgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZWRpdCBhcyBhbnksIDApIGFzIEVkaXRUeXBlLFxyXG4gIHNpYmxpbmdJbmRleDogKGVkaXQ6IFJlbmRlclRyZWVFZGl0KSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChlZGl0IGFzIGFueSwgNCksXHJcbiAgbmV3VHJlZUluZGV4OiAoZWRpdDogUmVuZGVyVHJlZUVkaXQpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGVkaXQgYXMgYW55LCA4KSxcclxuICByZW1vdmVkQXR0cmlidXRlTmFtZTogKGVkaXQ6IFJlbmRlclRyZWVFZGl0KSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZWRpdCBhcyBhbnksIDEyKSxcclxufTtcclxuXHJcbi8vIEtlZXAgaW4gc3luYyB3aXRoIG1lbW9yeSBsYXlvdXQgaW4gUmVuZGVyVHJlZUZyYW1lLmNzXHJcbmNvbnN0IGZyYW1lUmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogMjgsXHJcbiAgZnJhbWVUeXBlOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZnJhbWUgYXMgYW55LCA0KSBhcyBGcmFtZVR5cGUsXHJcbiAgc3VidHJlZUxlbmd0aDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lIGFzIGFueSwgOCksXHJcbiAgZWxlbWVudFJlZmVyZW5jZUNhcHR1cmVJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRTdHJpbmdGaWVsZChmcmFtZSBhcyBhbnksIDE2KSxcclxuICBjb21wb25lbnRJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lIGFzIGFueSwgMTIpLFxyXG4gIGVsZW1lbnROYW1lOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lIGFzIGFueSwgMTYpLFxyXG4gIHRleHRDb250ZW50OiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lIGFzIGFueSwgMTYpLFxyXG4gIG1hcmt1cENvbnRlbnQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUgYXMgYW55LCAxNikhLFxyXG4gIGF0dHJpYnV0ZU5hbWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUgYXMgYW55LCAxNiksXHJcbiAgYXR0cmlidXRlVmFsdWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUgYXMgYW55LCAyNCksXHJcbiAgYXR0cmlidXRlRXZlbnRIYW5kbGVySWQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSBhcyBhbnksIDgpLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gYXJyYXlWYWx1ZXNFbnRyeTxUPihhcnJheVZhbHVlczogQXJyYXlWYWx1ZXM8VD4sIGluZGV4OiBudW1iZXIsIGl0ZW1TaXplOiBudW1iZXIpOiBUIHtcclxuICByZXR1cm4gcGxhdGZvcm0uZ2V0QXJyYXlFbnRyeVB0cihhcnJheVZhbHVlcyBhcyBhbnkgYXMgU3lzdGVtX0FycmF5PFQ+LCBpbmRleCwgaXRlbVNpemUpIGFzIGFueSBhcyBUO1xyXG59XHJcbiIsImltcG9ydCB7IFN5c3RlbV9PYmplY3QsIFN5c3RlbV9TdHJpbmcsIFN5c3RlbV9BcnJheSwgTWV0aG9kSGFuZGxlLCBQb2ludGVyIH0gZnJvbSAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgUmVuZGVyQmF0Y2ggfSBmcm9tICcuL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgQnJvd3NlclJlbmRlcmVyIH0gZnJvbSAnLi9Ccm93c2VyUmVuZGVyZXInO1xyXG5cclxudHlwZSBCcm93c2VyUmVuZGVyZXJSZWdpc3RyeSA9IHsgW2Jyb3dzZXJSZW5kZXJlcklkOiBudW1iZXJdOiBCcm93c2VyUmVuZGVyZXIgfTtcclxuY29uc3QgYnJvd3NlclJlbmRlcmVyczogQnJvd3NlclJlbmRlcmVyUmVnaXN0cnkgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGVsZW1lbnRTZWxlY3Rvcjogc3RyaW5nLCBjb21wb25lbnRJZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFNlbGVjdG9yKTtcclxuICBpZiAoIWVsZW1lbnQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYW55IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3IgJyR7ZWxlbWVudFNlbGVjdG9yfScuYCk7XHJcbiAgfVxyXG5cclxuICBsZXQgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF07XHJcbiAgaWYgKCFicm93c2VyUmVuZGVyZXIpIHtcclxuICAgIGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdID0gbmV3IEJyb3dzZXJSZW5kZXJlcihicm93c2VyUmVuZGVyZXJJZCk7XHJcbiAgfVxyXG4gIGNsZWFyRWxlbWVudChlbGVtZW50KTtcclxuICBicm93c2VyUmVuZGVyZXIuYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZCwgZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJCYXRjaChicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBiYXRjaDogUmVuZGVyQmF0Y2gpIHtcclxuICBjb25zdCBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXTtcclxuICBpZiAoIWJyb3dzZXJSZW5kZXJlcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBicm93c2VyIHJlbmRlcmVyIHdpdGggSUQgJHticm93c2VyUmVuZGVyZXJJZH0uYCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcnJheVJhbmdlUmVhZGVyID0gYmF0Y2guYXJyYXlSYW5nZVJlYWRlcjtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c1JhbmdlID0gYmF0Y2gudXBkYXRlZENvbXBvbmVudHMoKTtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c1ZhbHVlcyA9IGFycmF5UmFuZ2VSZWFkZXIudmFsdWVzKHVwZGF0ZWRDb21wb25lbnRzUmFuZ2UpO1xyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzTGVuZ3RoID0gYXJyYXlSYW5nZVJlYWRlci5jb3VudCh1cGRhdGVkQ29tcG9uZW50c1JhbmdlKTtcclxuICBjb25zdCByZWZlcmVuY2VGcmFtZXMgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXMoKTtcclxuICBjb25zdCByZWZlcmVuY2VGcmFtZXNWYWx1ZXMgPSBhcnJheVJhbmdlUmVhZGVyLnZhbHVlcyhyZWZlcmVuY2VGcmFtZXMpO1xyXG4gIGNvbnN0IGRpZmZSZWFkZXIgPSBiYXRjaC5kaWZmUmVhZGVyO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRDb21wb25lbnRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGRpZmYgPSBiYXRjaC51cGRhdGVkQ29tcG9uZW50c0VudHJ5KHVwZGF0ZWRDb21wb25lbnRzVmFsdWVzLCBpKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gZGlmZlJlYWRlci5jb21wb25lbnRJZChkaWZmKTtcclxuICAgIGNvbnN0IGVkaXRzID0gZGlmZlJlYWRlci5lZGl0cyhkaWZmKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci51cGRhdGVDb21wb25lbnQoYmF0Y2gsIGNvbXBvbmVudElkLCBlZGl0cywgcmVmZXJlbmNlRnJhbWVzVmFsdWVzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UgPSBiYXRjaC5kaXNwb3NlZENvbXBvbmVudElkcygpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMoZGlzcG9zZWRDb21wb25lbnRJZHNSYW5nZSk7XHJcbiAgY29uc3QgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSBiYXRjaC5kaXNwb3NlZENvbXBvbmVudElkc0VudHJ5KGRpc3Bvc2VkQ29tcG9uZW50SWRzVmFsdWVzLCBpKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlQ29tcG9uZW50KGNvbXBvbmVudElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UgPSBiYXRjaC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkcygpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMoZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNSYW5nZSk7XHJcbiAgY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVySWQgPSBiYXRjaC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkc0VudHJ5KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzVmFsdWVzLCBpKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgbGV0IGNoaWxkTm9kZTogTm9kZSB8IG51bGw7XHJcbiAgd2hpbGUgKGNoaWxkTm9kZSA9IGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgTWV0aG9kSGFuZGxlLCBTeXN0ZW1fU3RyaW5nLCBTeXN0ZW1fQXJyYXkgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmNvbnN0IGh0dHBDbGllbnRBc3NlbWJseSA9ICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3Nlcic7XHJcbmNvbnN0IGh0dHBDbGllbnROYW1lc3BhY2UgPSBgJHtodHRwQ2xpZW50QXNzZW1ibHl9Lkh0dHBgO1xyXG5jb25zdCBodHRwQ2xpZW50VHlwZU5hbWUgPSAnQnJvd3Nlckh0dHBNZXNzYWdlSGFuZGxlcic7XHJcbmNvbnN0IGh0dHBDbGllbnRGdWxsVHlwZU5hbWUgPSBgJHtodHRwQ2xpZW50TmFtZXNwYWNlfS4ke2h0dHBDbGllbnRUeXBlTmFtZX1gO1xyXG5sZXQgcmVjZWl2ZVJlc3BvbnNlTWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcbmxldCBhbGxvY2F0ZUFycmF5TWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcblxyXG4vLyBUaGVzZSBhcmUgdGhlIGZ1bmN0aW9ucyB3ZSdyZSBtYWtpbmcgYXZhaWxhYmxlIGZvciBpbnZvY2F0aW9uIGZyb20gLk5FVFxyXG5leHBvcnQgY29uc3QgaW50ZXJuYWxGdW5jdGlvbnMgPSB7XHJcbiAgc2VuZEFzeW5jXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNlbmRBc3luYyhpZDogbnVtYmVyLCBib2R5OiBTeXN0ZW1fQXJyYXk8YW55PiwganNvbkZldGNoQXJnczogU3lzdGVtX1N0cmluZykge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IHJlc3BvbnNlRGF0YTogQXJyYXlCdWZmZXI7XHJcblxyXG4gIGNvbnN0IGZldGNoT3B0aW9uczogRmV0Y2hPcHRpb25zID0gSlNPTi5wYXJzZShwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoanNvbkZldGNoQXJncykpO1xyXG4gIGNvbnN0IHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCA9IE9iamVjdC5hc3NpZ24oZmV0Y2hPcHRpb25zLnJlcXVlc3RJbml0LCBmZXRjaE9wdGlvbnMucmVxdWVzdEluaXRPdmVycmlkZXMpO1xyXG5cclxuICBpZiAoYm9keSkge1xyXG4gICAgcmVxdWVzdEluaXQuYm9keSA9IHBsYXRmb3JtLnRvVWludDhBcnJheShib2R5KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZldGNoT3B0aW9ucy5yZXF1ZXN0VXJpLCByZXF1ZXN0SW5pdCk7XHJcbiAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xyXG4gIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICBkaXNwYXRjaEVycm9yUmVzcG9uc2UoaWQsIGV4LnRvU3RyaW5nKCkpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hTdWNjZXNzUmVzcG9uc2UoaWQsIHJlc3BvbnNlLCByZXNwb25zZURhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaFN1Y2Nlc3NSZXNwb25zZShpZDogbnVtYmVyLCByZXNwb25zZTogUmVzcG9uc2UsIHJlc3BvbnNlRGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICBjb25zdCByZXNwb25zZURlc2NyaXB0b3I6IFJlc3BvbnNlRGVzY3JpcHRvciA9IHtcclxuICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXHJcbiAgICBoZWFkZXJzOiBbXVxyXG4gIH07XHJcbiAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xyXG4gICAgcmVzcG9uc2VEZXNjcmlwdG9yLmhlYWRlcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKCFhbGxvY2F0ZUFycmF5TWV0aG9kKSB7XHJcbiAgICBhbGxvY2F0ZUFycmF5TWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZChcclxuICAgICAgaHR0cENsaWVudEFzc2VtYmx5LFxyXG4gICAgICBodHRwQ2xpZW50TmFtZXNwYWNlLFxyXG4gICAgICBodHRwQ2xpZW50VHlwZU5hbWUsXHJcbiAgICAgICdBbGxvY2F0ZUFycmF5J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGFsbG9jYXRlIGEgbWFuYWdlZCBieXRlW10gb2YgdGhlIHJpZ2h0IHNpemVcclxuICBjb25zdCBkb3ROZXRBcnJheSA9IHBsYXRmb3JtLmNhbGxNZXRob2QoYWxsb2NhdGVBcnJheU1ldGhvZCwgbnVsbCwgW3BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3BvbnNlRGF0YS5ieXRlTGVuZ3RoLnRvU3RyaW5nKCkpXSkgYXMgU3lzdGVtX0FycmF5PGFueT47XHJcblxyXG4gIC8vIGdldCBhbiBVaW50OEFycmF5IHZpZXcgb2YgaXRcclxuICBjb25zdCBhcnJheSA9IHBsYXRmb3JtLnRvVWludDhBcnJheShkb3ROZXRBcnJheSk7XHJcblxyXG4gIC8vIGNvcHkgdGhlIHJlc3BvbnNlRGF0YSB0byBvdXIgbWFuYWdlZCBieXRlW11cclxuICBhcnJheS5zZXQobmV3IFVpbnQ4QXJyYXkocmVzcG9uc2VEYXRhKSk7XHJcblxyXG4gIGRpc3BhdGNoUmVzcG9uc2UoXHJcbiAgICBpZCxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlRGVzY3JpcHRvcikpLFxyXG4gICAgZG90TmV0QXJyYXksXHJcbiAgICAvKiBlcnJvck1lc3NhZ2UgKi8gbnVsbFxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoRXJyb3JSZXNwb25zZShpZDogbnVtYmVyLCBlcnJvck1lc3NhZ2U6IHN0cmluZykge1xyXG4gIGRpc3BhdGNoUmVzcG9uc2UoXHJcbiAgICBpZCxcclxuICAgIC8qIHJlc3BvbnNlRGVzY3JpcHRvciAqLyBudWxsLFxyXG4gICAgLyogcmVzcG9uc2VUZXh0ICovIG51bGwsXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhlcnJvck1lc3NhZ2UpXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGF0Y2hSZXNwb25zZShpZDogbnVtYmVyLCByZXNwb25zZURlc2NyaXB0b3I6IFN5c3RlbV9TdHJpbmcgfCBudWxsLCByZXNwb25zZURhdGE6IFN5c3RlbV9BcnJheTxhbnk+IHwgbnVsbCwgZXJyb3JNZXNzYWdlOiBTeXN0ZW1fU3RyaW5nIHwgbnVsbCkge1xyXG4gIGlmICghcmVjZWl2ZVJlc3BvbnNlTWV0aG9kKSB7XHJcbiAgICByZWNlaXZlUmVzcG9uc2VNZXRob2QgPSBwbGF0Zm9ybS5maW5kTWV0aG9kKFxyXG4gICAgICBodHRwQ2xpZW50QXNzZW1ibHksXHJcbiAgICAgIGh0dHBDbGllbnROYW1lc3BhY2UsXHJcbiAgICAgIGh0dHBDbGllbnRUeXBlTmFtZSxcclxuICAgICAgJ1JlY2VpdmVSZXNwb25zZSdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwbGF0Zm9ybS5jYWxsTWV0aG9kKHJlY2VpdmVSZXNwb25zZU1ldGhvZCwgbnVsbCwgW1xyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoaWQudG9TdHJpbmcoKSksXHJcbiAgICByZXNwb25zZURlc2NyaXB0b3IsXHJcbiAgICByZXNwb25zZURhdGEsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgXSk7XHJcbn1cclxuXHJcbi8vIEtlZXAgdGhlc2UgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gQnJvd3Nlckh0dHBNZXNzYWdlSGFuZGxlci5jc1xyXG5pbnRlcmZhY2UgRmV0Y2hPcHRpb25zIHtcclxuICByZXF1ZXN0VXJpOiBzdHJpbmc7XHJcbiAgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0O1xyXG4gIHJlcXVlc3RJbml0T3ZlcnJpZGVzOiBSZXF1ZXN0SW5pdDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlc3BvbnNlRGVzY3JpcHRvciB7XHJcbiAgLy8gV2UgZG9uJ3QgaGF2ZSBCb2R5VGV4dCBpbiBoZXJlIGJlY2F1c2UgaWYgd2UgZGlkLCB0aGVuIGluIHRoZSBKU09OLXJlc3BvbnNlIGNhc2UgKHdoaWNoXHJcbiAgLy8gaXMgdGhlIG1vc3QgY29tbW9uIGNhc2UpLCB3ZSdkIGJlIGRvdWJsZS1lbmNvZGluZyBpdCwgc2luY2UgdGhlIGVudGlyZSBSZXNwb25zZURlc2NyaXB0b3JcclxuICAvLyBhbHNvIGdldHMgSlNPTiBlbmNvZGVkLiBJdCB3b3VsZCB3b3JrIGJ1dCBpcyB0d2ljZSB0aGUgYW1vdW50IG9mIHN0cmluZyBwcm9jZXNzaW5nLlxyXG4gIHN0YXR1c0NvZGU6IG51bWJlcjtcclxuICBzdGF0dXNUZXh0OiBzdHJpbmc7XHJcbiAgaGVhZGVyczogc3RyaW5nW11bXTtcclxufVxyXG4iLCJsZXQgaGFzUmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXJzID0gZmFsc2U7XHJcblxyXG4vLyBXaWxsIGJlIGluaXRpYWxpemVkIG9uY2Ugc29tZW9uZSByZWdpc3RlcnNcclxubGV0IG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrOiB7IGFzc2VtYmx5TmFtZTogc3RyaW5nLCBmdW5jdGlvbk5hbWU6IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XHJcblxyXG4vLyBUaGVzZSBhcmUgdGhlIGZ1bmN0aW9ucyB3ZSdyZSBtYWtpbmcgYXZhaWxhYmxlIGZvciBpbnZvY2F0aW9uIGZyb20gLk5FVFxyXG5leHBvcnQgY29uc3QgaW50ZXJuYWxGdW5jdGlvbnMgPSB7XHJcbiAgZW5hYmxlTmF2aWdhdGlvbkludGVyY2VwdGlvbixcclxuICBuYXZpZ2F0ZVRvLFxyXG4gIGdldEJhc2VVUkk6ICgpID0+IGRvY3VtZW50LmJhc2VVUkksXHJcbiAgZ2V0TG9jYXRpb25IcmVmOiAoKSA9PiBsb2NhdGlvbi5ocmVmLFxyXG59XHJcblxyXG5mdW5jdGlvbiBlbmFibGVOYXZpZ2F0aW9uSW50ZXJjZXB0aW9uKGFzc2VtYmx5TmFtZTogc3RyaW5nLCBmdW5jdGlvbk5hbWU6IHN0cmluZykge1xyXG4gIGlmIChoYXNSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcnMgfHwgYXNzZW1ibHlOYW1lID09PSB1bmRlZmluZWQgfHwgZnVuY3Rpb25OYW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrID0geyBhc3NlbWJseU5hbWUsIGZ1bmN0aW9uTmFtZSB9O1xyXG4gIGhhc1JlZ2lzdGVyZWRFdmVudExpc3RlbmVycyA9IHRydWU7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgLy8gSW50ZXJjZXB0IGNsaWNrcyBvbiBhbGwgPGE+IGVsZW1lbnRzIHdoZXJlIHRoZSBocmVmIGlzIHdpdGhpbiB0aGUgPGJhc2UgaHJlZj4gVVJJIHNwYWNlXHJcbiAgICAvLyBXZSBtdXN0IGV4cGxpY2l0bHkgY2hlY2sgaWYgaXQgaGFzIGFuICdocmVmJyBhdHRyaWJ1dGUsIGJlY2F1c2UgaWYgaXQgZG9lc24ndCwgdGhlIHJlc3VsdCBtaWdodCBiZSBudWxsIG9yIGFuIGVtcHR5IHN0cmluZyBkZXBlbmRpbmcgb24gdGhlIGJyb3dzZXJcclxuICAgIGNvbnN0IGFuY2hvclRhcmdldCA9IGZpbmRDbG9zZXN0QW5jZXN0b3IoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsLCAnQScpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xyXG4gICAgY29uc3QgaHJlZkF0dHJpYnV0ZU5hbWUgPSAnaHJlZic7XHJcbiAgICBpZiAoYW5jaG9yVGFyZ2V0ICYmIGFuY2hvclRhcmdldC5oYXNBdHRyaWJ1dGUoaHJlZkF0dHJpYnV0ZU5hbWUpICYmIGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICBjb25zdCBocmVmID0gYW5jaG9yVGFyZ2V0LmdldEF0dHJpYnV0ZShocmVmQXR0cmlidXRlTmFtZSkhO1xyXG4gICAgICBjb25zdCBhYnNvbHV0ZUhyZWYgPSB0b0Fic29sdXRlVXJpKGhyZWYpO1xyXG4gICAgICBjb25zdCB0YXJnZXRBdHRyaWJ1dGVWYWx1ZSA9IGFuY2hvclRhcmdldC5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xyXG4gICAgICBjb25zdCBvcGVuc0luU2FtZUZyYW1lID0gIXRhcmdldEF0dHJpYnV0ZVZhbHVlIHx8IHRhcmdldEF0dHJpYnV0ZVZhbHVlID09PSAnX3NlbGYnO1xyXG5cclxuICAgICAgLy8gRG9uJ3Qgc3RvcCBjdHJsL21ldGEtY2xpY2sgKGV0YykgZnJvbSBvcGVuaW5nIGxpbmtzIGluIG5ldyB0YWJzL3dpbmRvd3NcclxuICAgICAgaWYgKGlzV2l0aGluQmFzZVVyaVNwYWNlKGFic29sdXRlSHJlZikgJiYgIWV2ZW50SGFzU3BlY2lhbEtleShldmVudCkgJiYgb3BlbnNJblNhbWVGcmFtZSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihhYnNvbHV0ZUhyZWYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGhhbmRsZUludGVybmFsTmF2aWdhdGlvbik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0ZVRvKHVyaTogc3RyaW5nKSB7XHJcbiAgY29uc3QgYWJzb2x1dGVVcmkgPSB0b0Fic29sdXRlVXJpKHVyaSk7XHJcbiAgaWYgKGlzV2l0aGluQmFzZVVyaVNwYWNlKGFic29sdXRlVXJpKSkge1xyXG4gICAgcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihhYnNvbHV0ZVVyaSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxvY2F0aW9uLmhyZWYgPSB1cmk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtSW50ZXJuYWxOYXZpZ2F0aW9uKGFic29sdXRlSW50ZXJuYWxIcmVmOiBzdHJpbmcpIHtcclxuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAvKiBpZ25vcmVkIHRpdGxlICovICcnLCBhYnNvbHV0ZUludGVybmFsSHJlZik7XHJcbiAgaGFuZGxlSW50ZXJuYWxOYXZpZ2F0aW9uKCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUludGVybmFsTmF2aWdhdGlvbigpIHtcclxuICBpZiAobm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2spIHtcclxuICAgIGF3YWl0IERvdE5ldC5pbnZva2VNZXRob2RBc3luYyhcclxuICAgICAgbm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2suYXNzZW1ibHlOYW1lLFxyXG4gICAgICBub3RpZnlMb2NhdGlvbkNoYW5nZWRDYWxsYmFjay5mdW5jdGlvbk5hbWUsXHJcbiAgICAgIGxvY2F0aW9uLmhyZWZcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgdGVzdEFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQ7XHJcbmZ1bmN0aW9uIHRvQWJzb2x1dGVVcmkocmVsYXRpdmVVcmk6IHN0cmluZykge1xyXG4gIHRlc3RBbmNob3IgPSB0ZXN0QW5jaG9yIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICB0ZXN0QW5jaG9yLmhyZWYgPSByZWxhdGl2ZVVyaTtcclxuICByZXR1cm4gdGVzdEFuY2hvci5ocmVmO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQ2xvc2VzdEFuY2VzdG9yKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsLCB0YWdOYW1lOiBzdHJpbmcpIHtcclxuICByZXR1cm4gIWVsZW1lbnRcclxuICAgID8gbnVsbFxyXG4gICAgOiBlbGVtZW50LnRhZ05hbWUgPT09IHRhZ05hbWVcclxuICAgICAgPyBlbGVtZW50XHJcbiAgICAgIDogZmluZENsb3Nlc3RBbmNlc3RvcihlbGVtZW50LnBhcmVudEVsZW1lbnQsIHRhZ05hbWUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzV2l0aGluQmFzZVVyaVNwYWNlKGhyZWY6IHN0cmluZykge1xyXG4gIGNvbnN0IGJhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaCA9IHRvQmFzZVVyaVdpdGhUcmFpbGluZ1NsYXNoKGRvY3VtZW50LmJhc2VVUkkhKTsgLy8gVE9ETzogTWlnaHQgYmFzZVVSSSByZWFsbHkgYmUgbnVsbD9cclxuICByZXR1cm4gaHJlZi5zdGFydHNXaXRoKGJhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvQmFzZVVyaVdpdGhUcmFpbGluZ1NsYXNoKGJhc2VVcmk6IHN0cmluZykge1xyXG4gIHJldHVybiBiYXNlVXJpLnN1YnN0cigwLCBiYXNlVXJpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXZlbnRIYXNTcGVjaWFsS2V5KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgcmV0dXJuIGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50Lm1ldGFLZXk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==