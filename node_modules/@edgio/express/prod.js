(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 710:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __webpack_require__(622);
const portUtils_1 = __webpack_require__(566);
const config_1 = __webpack_require__(484);
const utils_1 = __webpack_require__(930);
async function prod(port) {
    var _a, _b;
    try {
        const edgioConfig = (0, config_1.getConfig)();
        const appPath = ((_a = edgioConfig === null || edgioConfig === void 0 ? void 0 : edgioConfig.express) === null || _a === void 0 ? void 0 : _a.appPath) || (0, utils_1.findDefaultAppPath)() || 'index.js';
        process.env.PORT = port.toString();
        // @ts-ignore
        let app = await import(/* webpackIgnore: true */ (0, path_1.resolve)(appPath));
        // Find the default export
        app = ((_b = app === null || app === void 0 ? void 0 : app.default) === null || _b === void 0 ? void 0 : _b.default) || (app === null || app === void 0 ? void 0 : app.default) || app;
        // When the port is occupied,
        // we assume the server started by itself in the exported module.
        if (await (0, portUtils_1.isPortBound)(port)) {
            return;
        }
        app === null || app === void 0 ? void 0 : app.listen(port);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prod;


/***/ }),

/***/ 930:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findDefaultAppPath = void 0;
const fs_1 = __webpack_require__(747);
const path_1 = __webpack_require__(622);
/**
 * Attempts to find the express app entrypoint by looking for common files.
 */
function findDefaultAppPath() {
    return [
        (0, path_1.join)('src', 'server.js'),
        (0, path_1.join)('src', 'server.ts'),
        (0, path_1.join)('src', 'app.ts'),
        (0, path_1.join)('src', 'app.js'),
        (0, path_1.join)('src', 'index.js'),
        (0, path_1.join)('src', 'index.ts'),
        (0, path_1.join)('server.js'),
        (0, path_1.join)('app.js'),
        (0, path_1.join)('index.js'),
    ].find(path => (0, fs_1.existsSync)((0, path_1.resolve)(path)));
}
exports.findDefaultAppPath = findDefaultAppPath;


/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfig = void 0;
const paths_1 = __webpack_require__(560);
const utils_1 = __webpack_require__(854);
const log_1 = __importDefault(__webpack_require__(916));
let config;
/**
 * Returns the contents of edgio.config.js
 * @param reload Set to true to ensure that the config is reloaded from disk
 * @returns
 */
function getConfig(reload = false) {
    if (!config || reload) {
        const srcPath = (0, paths_1.getConfigPath)();
        if (reload) {
            delete __webpack_require__.c[srcPath];
        }
        try {
            // NOTE: We cannot use import here to solve the issue with ESM modules
            // because this function would need to be changed to async.
            // This function is used on several places including the Router methods (onRegister for example) and there is no way to make them async
            // without breaking the method chaining feature or mess up the rules order.
            config = (0, utils_1.nonWebpackRequire)(srcPath);
        }
        catch (e) {
            if (e.code === 'ERR_REQUIRE_ESM') {
                log_1.default.error(`Error: The 'edgio.config.js' file cannot be loaded because it uses CommonJS syntax and this project is set to type 'module'. Please rename it to 'edgio.config.cjs'.`);
                process.exit(1);
            }
            throw e;
        }
        // injected by build-lambda/src/jobs/deployBuild.js
        const environment = process.env.EDGIO_ENVIRONMENT_NAME;
        // apply config overrides for the current environment
        if (environment && config.environments && config.environments[environment]) {
            log_1.default.info(`using config overrides for ${environment}`);
            Object.assign(config, config.environments[environment]);
        }
        // this is backwards compatibility for the old custom connector
        // which is now deprecated, but it was out for a bit so we need to support it
        if (config.nodejsConnector && config.customConnector) {
            config.nodejsConnector = config.customConnector;
        }
    }
    return config;
}
exports.getConfig = getConfig;


/***/ }),

/***/ 988:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FAR_FUTURE_TTL = exports.DEFLATE_ENCODING = exports.GZIP_ENCODING = exports.BROTLI_ENCODING = exports.IS_BROWSER = exports.EDGIO_IMAGE_OPTIMIZER_PATH = exports.HOSTS_NOINDEX_PERMALINK_REGEX = exports.ROUTES_NOINDEX_GROUP = exports.ROUTES_CATCH_GROUP = exports.ROUTES_FALLBACK = exports.METHOD_QUERY_PARAM = exports.POST_BODY_QUERY_PARAM = exports.HEAD_QUERY_PARAM = exports.DEVTOOLS_PREFETCH_QUERY_PARAM = exports.PREFETCH_TTL_PARAM = exports.PREFETCH_QUERY_PARAM = exports.THROTTLED_QUERY_PARAM = exports.CACHING_DEBUG_CACHEABLE = exports.CACHING_DEBUG_STATUS = exports.CACHING_DEBUG_HEADERS = exports.CACHEABLE_METHODS = exports.CACHING_STATUS = exports.HTTP_HEADERS = exports.HTTP_METHODS = exports.JS_BACKEND_HOSTNAME = exports.BACKENDS = exports.ACTIONS = exports.EDGIO_UNCACHED_PREFETCH_STATUS = exports.EDGIO_TOO_MANY_HEADERS_STATUS_CODE = exports.EDGIO_MAX_USER_HEADERS_ALLOWED = exports.EDGIO_SERVERLESS_HINTS = exports.EDGIO_SERVERLESS_HINT_HEADER = exports.EDGIO_HEADERS_PREFIX = exports.EDGIO_DEPLOYMENT_TYPE_AWS = exports.EDGIO_EDGE_FUNCTION_ENV_VARIABLES = exports.EDGIO_ENV_VARIABLES = exports.EDGIO_ASSET_ALIASES_FILE = exports.EDGIO_CONFIG_FILE = void 0;
/**
 * Edgio configuration file name.
 */
exports.EDGIO_CONFIG_FILE = 'edgio.config.js';
/**
 * Indicate asset files that need to be uploaded under a different
 * bucket key.
 * It contains values like
 * {
 *   '/posts' => '/posts/index.html'
 * }
 */
exports.EDGIO_ASSET_ALIASES_FILE = 'asset-aliases.json';
/**
 * Environment variables used by Edgio.
 */
exports.EDGIO_ENV_VARIABLES = {
    /**
     * Edgio configuration environment variable key.
     */
    config: 'EDGIO_CONFIG',
    /**
     * Edgio internal configuration environment variable key.
     */
    internalConfig: 'EDGIO_INTERNAL_CONFIG',
    /**
     * Indicates whether code is running locally or in the cloud.
     * @private
     */
    deploymentType: 'EDGIO_DEPLOYMENT_TYPE',
    /**
     * Allows Edgio development team to easily override Edgio version
     * during development process.
     * @private
     */
    versionOverride: 'EDGIO_VERSION_OVERRIDE',
    /**
     * Indicates that we are running a production build.
     * @private
     */
    productionBuild: 'EDGIO_PRODUCTION_BUILD',
    /**
     * Indicates that we are running app locally.
     * @private
     */
    local: 'EDGIO_LOCAL',
    /**
     * Turns on the cache when set to 'true'.
     * @private
     */
    cache: 'EDGIO_CACHE',
};
/**
 * Environment variables used by Edgio Edge Functions.
 */
exports.EDGIO_EDGE_FUNCTION_ENV_VARIABLES = {
    /**
     * The path to the edge function within the project.
     */
    path: '__EDGE_FUNCTION_PATH__',
    /**
     * The edge function's QuickJS bytecode (base64 encoded).
     */
    quickjsBytecodeBase64: '__EDGE_FUNCTION_QUICKJS_BYTECODE_BASE64__',
};
/**
 * Indicates that code is running in AWS.
 * @private
 */
exports.EDGIO_DEPLOYMENT_TYPE_AWS = 'AWS';
/**
 * Prefix of all Edgio headers.
 */
exports.EDGIO_HEADERS_PREFIX = 'x-edg-';
/**
 * Instructs the runtime to forward the request directly to the user's app or a function rather than processing
 * edge-control rules.
 * @private
 */
exports.EDGIO_SERVERLESS_HINT_HEADER = 'x-edg-serverless-hint';
/**
 * Instructs the runtime to forward the request directly one of the router's functions by hint name.
 * @private
 */
exports.EDGIO_SERVERLESS_HINTS = {
    // Instructs the runtime to forward the request directly to the user's app.
    app: 'app',
    // Instructs the runtime to forward the request directly one of the router's functions by index.
    compute: 'compute',
    // Instructs the runtime to invoke a compute that will execute a redirect and return early.
    redirect: 'redirect',
    // Instructs the runtime to invoke a compute that will execute a redirect and return early.
    proxy: 'proxy',
};
/**
 * Maximum number of user headers allowed by Edgio platform.
 *
 * We limit the request and response headers allowed to 70. This is due to a limitation that edge has
 * which at the moment supports up to 96 headers. Edge provider itself needs to use some of those headers
 * with the remainder used by our edge code.
 *
 * NOTE: This constant must be equal ot the constant of the same name defined in Edgio buffer proxy.
 * NOTE: If this constant is updated then the constant of the same name has to be updated in @edgio/build-lambda module.
 */
exports.EDGIO_MAX_USER_HEADERS_ALLOWED = 70;
/**
 * Status code returned when there are too many request or response headers.
 *
 * Must be equal to HeaderOverflowError status code as defined in build lambda and Edgio buffer proxy.
 */
exports.EDGIO_TOO_MANY_HEADERS_STATUS_CODE = 542;
/**
 * The status code returned when the edgio_prefetch query param is present and a response could not be found in the cache.
 */
exports.EDGIO_UNCACHED_PREFETCH_STATUS = 412;
/**
 * CDN-as-code configuration actions
 */
exports.ACTIONS = {
    setHeader: 'set-header',
    updateHeader: 'update-header',
    removeHeader: 'remove-header',
    syntheticRes: 'synthetic-response',
    updatePath: 'update-path',
    proxy: 'proxy',
    addCookie: 'add-cookie',
    updateCookie: 'update-cookie',
    removeCookie: 'remove-cookie',
};
/**
 * The backend for cloud functions
 */
exports.BACKENDS = {
    js: '__js__',
    static: '__static__',
    permanentStatic: '__permanent_static__',
    imageOptimizer: '__image_optimizer__',
};
/**
 * The hostname used for the internal service running the user's application.
 */
exports.JS_BACKEND_HOSTNAME = '127.0.0.1';
exports.HTTP_METHODS = {
    head: 'head',
    get: 'get',
    post: 'post',
    delete: 'delete',
    put: 'put',
    patch: 'patch',
    options: 'options',
};
/**
 * Common HTTP headers.
 */
exports.HTTP_HEADERS = {
    acceptEncoding: 'accept-encoding',
    authorization: 'authorization',
    cacheControl: 'cache-control',
    contentEncoding: 'content-encoding',
    contentLength: 'content-length',
    contentType: 'content-type',
    cookie: 'cookie',
    expires: 'expires',
    host: 'host',
    location: 'location',
    range: 'range',
    serverTiming: 'server-timing',
    setCookie: 'set-cookie',
    userAgent: 'user-agent',
    vary: 'vary',
    via: 'via',
    transferEncoding: 'transfer-encoding',
    xEcDebug: 'x-ec-debug',
    xForwardedFor: 'x-forwarded-for',
    xRequestId: 'x-request-id',
    xSwCacheControl: 'x-sw-cache-control',
    xEdgeBrowser: 'x-edg-browser',
    xEdgeCacheControl: 'x-edg-cache-control',
    xEdgeCachingStatus: 'x-edg-caching-status',
    xEdgeClientIp: 'x-edg-client-ip',
    xEdgeComponents: 'x-edg-components',
    xEdgeDestination: 'x-edg-destination',
    xEdgeDevice: 'x-edg-device',
    xEdgeDeviceIsBot: 'x-edg-device-is-bot',
    xEdgeGeoCity: 'x-edg-geo-city',
    xEdgeGeoCountryCode: 'x-edg-geo-country-code',
    xEdgeGeoLatitude: 'x-edg-geo-latitude',
    xEdgeGeoLongitude: 'x-edg-geo-longitude',
    xEdgeGeoPostalCode: 'x-edg-geo-postal-code',
    xEdgeMatchedRoutes: 'x-edg-matched-routes',
    xEdgeProtocol: 'x-edg-protocol',
    xEdgeRoute: 'x-edg-route',
    xEdgeStatus: 'x-edg-status',
    xEdgeSurrogateKey: 'x-edg-surrogate-key',
    xEdgeT: 'x-edg-t',
    xEdgeUserT: 'x-edg-user-t',
    xEdgeVendor: 'x-edg-vendor',
    xEdgeVersion: 'x-edg-version',
    xEdgServerlessError: 'x-edg-serverless-error',
    x0ClientIp: 'x-0-client-ip',
    x0Protocol: 'x-0-protocol',
    x0Version: 'x-0-version',
};
/**
 * Values for x-edg-caching-status
 */
exports.CACHING_STATUS = {
    cached: 'cached',
    hit: 'hit',
    bypassed: 'bypassed',
    private: 'private',
    method: 'method',
    bodyTooBig: 'body-too-big',
    code: 'code',
    setCookie: 'set-cookie',
    noMaxAge: 'no-max-age',
};
exports.CACHEABLE_METHODS = new Set(['get', 'head']);
/**
 * Values for x-edg-caching-status
 */
exports.CACHING_DEBUG_HEADERS = {
    cache: 'x-ec-cache',
    checkCacheable: 'x-ec-check-cacheable',
    cacheState: 'x-ec-cache-state',
    cacheKey: 'x-ec-cache-key',
};
// Caching debug status codes.
// https://docs.edgecast.com/cdn/Content/Reference/Cache_Status_Codes.htm
exports.CACHING_DEBUG_STATUS = {
    configNoCache: 'CONFIG_NOCACHE',
    none: 'NONE',
    tcpClientRefreshMiss: 'TCP_CLIENT_REFRESH_MISS',
    tcpExpiredHit: 'TCP_EXPIRED_HIT',
    tcpExpiredMiss: 'TCP_EXPIRED_MISS',
    tcpHit: 'TCP_HIT',
    tcpMiss: 'TCP_MISS',
    tcpPartialHit: 'TCP_PARTIAL_HIT',
    uncacheable: 'UNCACHEABLE',
};
exports.CACHING_DEBUG_CACHEABLE = {
    yes: 'YES',
    no: 'NO',
};
/**
 * When present, this query parameter will cause Edgio to return a 412 status
 * if a response could not be found in the cache.
 */
exports.THROTTLED_QUERY_PARAM = 'edgio_prefetch';
/**
 * Same value as above but DEPRECATED.
 */
exports.PREFETCH_QUERY_PARAM = exports.THROTTLED_QUERY_PARAM;
/**
 Adds query parameter with custom maxAgeSecond value for service-worker cache if it's specified in PrefetchConfiguration
 */
exports.PREFETCH_TTL_PARAM = 'edgio_prefetch_ttl';
/**
 Labels the request so that devtools will display as prefetched
 */
exports.DEVTOOLS_PREFETCH_QUERY_PARAM = 'edgio_dt_pf';
/**
 * The name of the query parameter used to detect HEAD requests.
 */
exports.HEAD_QUERY_PARAM = 'edgio_head';
/**
 * The name of the query parameter used for the body of POST requests, which is used for the cache key
 */
exports.POST_BODY_QUERY_PARAM = 'pref_edgio_body';
/**
 * The name of the query parameter used for the method of requests, which is used for the cache key
 */
exports.METHOD_QUERY_PARAM = 'pref_edgio_method';
/**
 * Route Group name, which is used in router for fallback routes
 */
exports.ROUTES_FALLBACK = 'fallback';
/**
 * Route Group name, which is used in router for error page routes
 */
exports.ROUTES_CATCH_GROUP = 'catch';
/**
 * Route Group name, which is used in router for noindex routes
 */
exports.ROUTES_NOINDEX_GROUP = 'noindex';
/**
 * Regex used to determine if the host should be excluded from
 * SE indexing
 */
exports.HOSTS_NOINDEX_PERMALINK_REGEX = /\.edgio\.link|\.edgio-perma\.link/;
/**
 * The path for the built-in image optimizer.
 */
// TODO: APPOPS-15850 We are unable to affect this path from XDN repo
exports.EDGIO_IMAGE_OPTIMIZER_PATH = '/__layer0_image_optimizer';
/**
 * Is current environment 'browser'
 */
exports.IS_BROWSER = typeof window !== 'undefined';
/**
 * Brotli encoding code.
 */
exports.BROTLI_ENCODING = 'br';
/**
 * Gzip encoding code.
 */
exports.GZIP_ENCODING = 'gzip';
/**
 * Deflate encoding code.
 */
exports.DEFLATE_ENCODING = 'deflate';
/**
 * One year in seconds
 */
exports.FAR_FUTURE_TTL = '1y';


/***/ }),

/***/ 560:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getJsInternalPath = exports.getJsAppPath = exports.getStaticAssetManifestPath = exports.getConfigPath = exports.getRouterPath = exports.pathForBackend = exports.STATIC_ASSET_EXPIRATION_FILE_NAME = exports.STATIC_ASSET_MANIFEST_FILE_NAME = exports.CONFIG_FILE_NAME = exports.ROUTES_FILE_NAME = exports.TMP_DIR = exports.SOURCES_DIR = exports.PERMANENT_ASSETS_DIR = exports.ASSETS_DIR = exports.EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH = exports.EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME = exports.EDGE_FUNCTIONS_INDEX_PATH = exports.EDGE_FUNCTIONS_BUNDLE_PATH = exports.EDGE_FUNCTIONS_BUNDLE_FILENAME = exports.EDGE_FUNCTIONS_INDEX_FILENAME = exports.JS_APP_DIR = exports.JS_APP_DIR_NAME = exports.JS_INTERNAL_DIR = exports.JS_INTERNAL_DIR_NAME = exports.LAMBDA_DIR = exports.EDGIO_DIR = void 0;
const fs_1 = __webpack_require__(747);
const path_1 = __webpack_require__(622);
const environment_1 = __webpack_require__(679);
/**
 * The .edgio build directory
 */
exports.EDGIO_DIR = '.edgio';
/**
 * The destination directory with entrypoint for lambda function.
 * This directory contains two directories: internal and app.
 */
exports.LAMBDA_DIR = (0, path_1.join)(exports.EDGIO_DIR, 'lambda');
/**
 * The name of destination directory for our internal JS files such as
 * handler, backends, router etc...
 */
exports.JS_INTERNAL_DIR_NAME = 'internal';
/**
 * The relative path to destination directory for our internal JS files such as
 * handler, backends, router etc...
 */
exports.JS_INTERNAL_DIR = (0, path_1.join)(exports.LAMBDA_DIR, exports.JS_INTERNAL_DIR_NAME);
/**
 * The name of destination directory for user's file with JS code
 * with server and its dependencies
 */
exports.JS_APP_DIR_NAME = 'app';
/**
 * The relative path to destination directory for user's file with JS code
 * with server and its dependencies
 */
exports.JS_APP_DIR = (0, path_1.join)(exports.LAMBDA_DIR, exports.JS_APP_DIR_NAME);
/**
 * The name of the bundled edge functions index file
 */
exports.EDGE_FUNCTIONS_INDEX_FILENAME = '__edge-functions-index__.js';
/**
 * The name of the bundled edge functions file
 */
exports.EDGE_FUNCTIONS_BUNDLE_FILENAME = 'edge-function.js';
/**
 * The path of the bundled edge functions file
 */
exports.EDGE_FUNCTIONS_BUNDLE_PATH = (0, path_1.join)(exports.JS_INTERNAL_DIR, exports.EDGE_FUNCTIONS_BUNDLE_FILENAME);
/**
 * The path to the edge functions index file
 */
exports.EDGE_FUNCTIONS_INDEX_PATH = (0, path_1.join)(exports.JS_INTERNAL_DIR, exports.EDGE_FUNCTIONS_INDEX_FILENAME);
/**
 * The name of the bundled edge functions index compiled QuickJS bytecode file
 */
exports.EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME = '__edge-functions__.qbc';
/**
 * The path to the bundled edge functions index compiled QuickJS bytecode file
 */
exports.EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH = (0, path_1.join)(exports.JS_INTERNAL_DIR, exports.EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME);
/**
 * The destination directory for static assets
 */
exports.ASSETS_DIR = (0, path_1.join)(exports.EDGIO_DIR, 's3');
exports.PERMANENT_ASSETS_DIR = (0, path_1.join)(exports.EDGIO_DIR, 's3-permanent');
/**
 * The directory into which source code is copied for debugging purposes
 */
exports.SOURCES_DIR = (0, path_1.join)(exports.EDGIO_DIR, 'src');
/**
 * The directory for temporary files during the build process.
 * This directory is cleaned after the build process is complete.
 */
exports.TMP_DIR = (0, path_1.join)(exports.EDGIO_DIR, 'tmp');
/**
 * The name of the compiled routes file
 */
exports.ROUTES_FILE_NAME = 'routes.cjs';
/**
 * The name of the compiled edgio config file
 */
exports.CONFIG_FILE_NAME = 'edgio.config.cjs';
/**
 * The static asset manifest file name
 * @private
 */
exports.STATIC_ASSET_MANIFEST_FILE_NAME = 'static-asset-manifest.json';
/**
 * The static asset expiration file name
 * @private
 */
exports.STATIC_ASSET_EXPIRATION_FILE_NAME = 'static-asset-expiration.json';
/**
 * Returns the destination path within the lambda dir for the specified backend
 * @param backend A backend name
 * @return a file path
 */
function pathForBackend(backend) {
    return (0, path_1.join)('__backends__', `${backend}.cjs`);
}
exports.pathForBackend = pathForBackend;
/**
 * Returns the path to the routes.js file with the router.
 * @param config The config from edgio.config.js
 * @param cwd The current working directory
 * @returns
 */
function getRouterPath(config) {
    // When app is running in production mode,
    // the built router file from the internal folder is returned.
    // Otherwise, the router file from the project root folder is returned.
    const folder = (0, environment_1.isProductionBuild)() && (0, environment_1.isCloud)() ? getJsInternalPath() : process.cwd();
    const result = ((config === null || config === void 0 ? void 0 : config.routes)
        ? [(0, path_1.join)(process.cwd(), config.routes)]
        : [(0, path_1.join)(folder, 'routes.js'), (0, path_1.join)(folder, 'routes.ts'), (0, path_1.join)(folder, 'routes.cjs')]).find(fs_1.existsSync);
    if (result == null) {
        const srcFile = (config === null || config === void 0 ? void 0 : config.routes) || `routes.js, routes.ts, or routes.cjs`;
        throw new Error(`Edgio routes file not found. Please create ${srcFile} in the root directory of your project.`);
    }
    return result;
}
exports.getRouterPath = getRouterPath;
/**
 * Gets the path to edgio.config.js file
 * @returns
 */
function getConfigPath() {
    // When app is running in production mode,
    // the built config file from the internal folder is returned.
    // Otherwise, the config file from the project root folder is returned.
    const folder = (0, environment_1.isProductionBuild)() && (0, environment_1.isCloud)() ? getJsInternalPath() : process.cwd();
    const result = [
        (0, path_1.join)(folder, 'edgio.config.js'),
        (0, path_1.join)(folder, 'edgio.config.ts'),
        (0, path_1.join)(folder, 'edgio.config.cjs'),
    ].find(fs_1.existsSync);
    if (result == null) {
        throw new Error('Edgio config file not found. Please create edgio.config.js or edgio.config.cjs in the root directory of your project.');
    }
    return result;
}
exports.getConfigPath = getConfigPath;
/**
 * Gets the path to static-asset-manifest.json file
 * @returns
 */
function getStaticAssetManifestPath() {
    const filePath = (0, path_1.join)(getJsInternalPath(), exports.STATIC_ASSET_MANIFEST_FILE_NAME);
    if (!(0, fs_1.existsSync)(filePath)) {
        throw new Error(`The '${filePath}' file was not found. Please try to re-run 'edgio build'.`);
    }
    return filePath;
}
exports.getStaticAssetManifestPath = getStaticAssetManifestPath;
/**
 * Returns the correct path to the '.edgio/lambda/app' folder
 * with user's JS code in both dev and prod modes.
 * @param cwd
 * @returns
 */
function getJsAppPath(cwd = process.cwd()) {
    const pathInDev = (0, path_1.join)(cwd, exports.JS_APP_DIR);
    const pathInProduction = (0, path_1.join)(cwd, '..', exports.JS_APP_DIR_NAME);
    const path = (0, environment_1.isProductionBuild)() && (0, environment_1.isCloud)() ? pathInProduction : pathInDev;
    return (0, fs_1.existsSync)(path) ? path : process.cwd();
}
exports.getJsAppPath = getJsAppPath;
/**
 * Returns the path to the '.edgio/lambda/internal' folder
 * with our edgio's JS files such as routes.cjs or edgio.config.cjs.
 * @param cwd
 * @returns
 */
function getJsInternalPath(cwd = process.cwd()) {
    const pathInDev = (0, path_1.join)(cwd, exports.JS_INTERNAL_DIR);
    const pathInProduction = (0, path_1.join)(cwd, '..', exports.JS_INTERNAL_DIR_NAME);
    const path = (0, environment_1.isProductionBuild)() && (0, environment_1.isCloud)() ? pathInProduction : pathInDev;
    return (0, fs_1.existsSync)(path) ? path : process.cwd();
}
exports.getJsInternalPath = getJsInternalPath;


/***/ }),

/***/ 679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBrowser = exports.isEdgioRunDev = exports.isProductionBuild = exports.isLocal = exports.isCloud = void 0;
const constants_1 = __webpack_require__(988);
/**
 * Used to determine if the app is running in the cloud.
 * @returns `true` when running in the cloud, `false` otherwise
 */
function isCloud() {
    return process.env[constants_1.EDGIO_ENV_VARIABLES.deploymentType] === constants_1.EDGIO_DEPLOYMENT_TYPE_AWS;
}
exports.isCloud = isCloud;
/**
 * Returns true when running locally, either in dev or production mode
 */
function isLocal() {
    return process.env[constants_1.EDGIO_ENV_VARIABLES.local] === 'true';
}
exports.isLocal = isLocal;
/**
 * Used to determine if the app is running on a production build.
 * @returns `true` when running a production build, either locally or in the cloud; `false` otherwise
 */
function isProductionBuild() {
    return (
    // Users can change the value of NODE_ENV in the cloud https://docs.edg.io/guides/basics/environments#built-in-environment-variables
     true ||
        // To reliably detect a prod build, we set variable EDGIO_PRODUCTION_BUILD true in lambdas which users can't change
        // We can't use isCloud in those cases, as we need to use this function also in local cases
        0);
}
exports.isProductionBuild = isProductionBuild;
/**
 * Used to determine if the app is running in `edgio run` development environment
 * @returns `true` when running with `edgio run`without production flag, `false` otherwise
 */
function isEdgioRunDev() {
    return !isCloud() && !isProductionBuild();
}
exports.isEdgioRunDev = isEdgioRunDev;
/**
 * Determines whether or not we are running in a browser
 * @returns `true` when running in a browser, otherwise false
 */
function isBrowser() {
    return typeof window !== 'undefined';
}
exports.isBrowser = isBrowser;


/***/ }),

/***/ 916:
/***/ ((__unused_webpack_module, exports) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
})(LogLevel || (LogLevel = {}));
const key = (_a = process.env.LOG_LEVEL) === null || _a === void 0 ? void 0 : _a.toUpperCase();
const configuredLogLevel = key ? LogLevel[key] : null;
const logger = {
    trace(...params) {
        logger.log(LogLevel.TRACE, ...params);
    },
    debug(...params) {
        logger.log(LogLevel.DEBUG, ...params);
    },
    info(...params) {
        logger.log(LogLevel.INFO, ...params);
    },
    warn(...params) {
        logger.log(LogLevel.WARN, ...params);
    },
    error(...params) {
        logger.log(LogLevel.WARN, ...params);
    },
    log(level, ...params) {
        // If given a single function as a param, call it and log the result
        // This allows us to skip computation of expensive log output if it would
        // not be shown based on the configured level
        if (params.length === 1 && typeof params[0] === 'function') {
            params = [params[0]()];
        }
        if (configuredLogLevel != null && configuredLogLevel <= level) {
            console.log(`${LogLevel[level].padEnd(5, ' ')}`, ...params);
        }
    },
};
exports.default = logger;


/***/ }),

/***/ 854:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nonWebpackRequire = void 0;
var nonWebpackRequire_1 = __webpack_require__(879);
Object.defineProperty(exports, "nonWebpackRequire", ({ enumerable: true, get: function () { return __importDefault(nonWebpackRequire_1).default; } }));


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const slash_1 = __importDefault(__webpack_require__(313));
/**
 * Loads a module at runtime, ensuring that it won't be bundled by webpack. This function
 * also ensures proper behavior on windows, *nix, and macos filesystems, even if the module
 * path is derived from a file path with backslashes. This function will return undefined if
 * the module could not be loaded.
 * @param modulePath The path to the module to load
 * @param options.ignoreErrors Will return undefined if the module fails to load
 */
function nonWebpackRequire(modulePath, { ignoreErrors = false } = {}) {
    try {
        return eval('require')((0, slash_1.default)(modulePath));
    }
    catch (e) {
        if (ignoreErrors) {
            return undefined;
        }
        else {
            throw e;
        }
    }
}
exports.default = nonWebpackRequire;


/***/ }),

/***/ 566:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isPortBound = exports.getNearestUnboundPort = void 0;
const net_1 = __importDefault(__webpack_require__(631));
/**
 * Attempts to find the nearest unbound port
 * @param port
 */
async function getNearestUnboundPort(port) {
    if (port > 65535) {
        return undefined;
    }
    const portBound = await isPortBound(port);
    return portBound ? getNearestUnboundPort(port + 1) : port;
}
exports.getNearestUnboundPort = getNearestUnboundPort;
/**
 * Returns true if the port is in use
 * @param port
 * @param host
 */
async function isPortBound(port, host = '127.0.0.1') {
    return new Promise((resolve, reject) => {
        let client;
        if (port > 65535 || port <= 0) {
            reject(new Error('Invalid port'));
            return;
        }
        if (!net_1.default.isIP(host)) {
            reject(new Error('Invalid host'));
            return;
        }
        const clean = () => {
            if (client) {
                client.removeAllListeners('connect');
                client.removeAllListeners('error');
            }
        };
        const onConnect = () => {
            resolve(true);
            clean();
        };
        const onError = (error) => {
            if (error.code !== 'ECONNREFUSED') {
                reject(error);
                return;
            }
            resolve(false);
            clean();
        };
        client = new net_1.default.Socket();
        client.once('connect', onConnect);
        client.once('error', onError);
        client.connect({ port: port, host: host }, () => { });
    });
}
exports.isPortBound = isPortBound;


/***/ }),

/***/ 313:
/***/ ((module) => {


module.exports = path => {
	const isExtendedLengthPath = /^\\\\\?\\/.test(path);
	const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

	if (isExtendedLengthPath || hasNonAscii) {
		return path;
	}

	return path.replace(/\\/g, '/');
};


/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ 631:
/***/ ((module) => {

module.exports = require("net");;

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(710);
/******/ })()
;
});