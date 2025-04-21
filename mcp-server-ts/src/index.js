"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
var NWS_API_BASE = "https://api.weather.gov";
var USER_AGENT = "weather-app/1.0";
var server = new index_js_1.Server({
    name: "weather",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// Helper function for making NWS API requests
function makeNWSRequest(url) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {
                        "User-Agent": USER_AGENT,
                        Accept: "application/geo+json",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3: return [2 /*return*/, (_a.sent())];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error making NEW request:", error_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
server.setRequestHandler(types_js_1.ListToolsRequestSchema, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                tools: [
                    {
                        name: "get_forecast",
                        description: "Get weather forecast for a location",
                        inputSchema: {
                            type: "object",
                            properties: {
                                latitude: {
                                    type: "number",
                                    description: "Latitude of the location",
                                },
                                longitude: {
                                    type: "number",
                                    description: "Longitude of the location",
                                },
                            },
                        },
                    },
                ],
            }];
    });
}); });
// [3] Toolの利用
server.setRequestHandler(types_js_1.CallToolRequestSchema, function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitude, longitude, pointsUrl, pointsData, forecastUrl, forecastData, periods, formattedForecast, forecastText;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (request.params.name !== "get_forecast") {
                    throw new Error("Unknown prompt");
                }
                _a = request.params.arguments, latitude = _a.latitude, longitude = _a.longitude;
                pointsUrl = "".concat(NWS_API_BASE, "/points/").concat(latitude.toFixed(4), ",").concat(longitude.toFixed(4));
                return [4 /*yield*/, makeNWSRequest(pointsUrl)];
            case 1:
                pointsData = _d.sent();
                if (!pointsData) {
                    return [2 /*return*/, {
                            content: [
                                {
                                    type: "text",
                                    text: "Failed to retrieve grid point data for coordinates: ".concat(latitude, ", ").concat(longitude, ". This location may not be supported by the NWS API (only US locations are supported)."),
                                },
                            ],
                        }];
                }
                forecastUrl = (_b = pointsData.properties) === null || _b === void 0 ? void 0 : _b.forecast;
                if (!forecastUrl) {
                    return [2 /*return*/, {
                            content: [
                                {
                                    type: "text",
                                    text: "Failed to get forecast URL from grid point data",
                                },
                            ],
                        }];
                }
                return [4 /*yield*/, makeNWSRequest(forecastUrl)];
            case 2:
                forecastData = _d.sent();
                if (!forecastData) {
                    return [2 /*return*/, {
                            content: [
                                {
                                    type: "text",
                                    text: "Failed to retrieve forecast data",
                                },
                            ],
                        }];
                }
                periods = ((_c = forecastData.properties) === null || _c === void 0 ? void 0 : _c.periods) || [];
                if (periods.length === 0) {
                    return [2 /*return*/, {
                            content: [
                                {
                                    type: "text",
                                    text: "No forecast periods available",
                                },
                            ],
                        }];
                }
                formattedForecast = periods.map(function (period) {
                    return [
                        "".concat(period.name || "Unknown", ":"),
                        "Temperature: ".concat(period.temperature || "Unknown", "\u00B0").concat(period.temperatureUnit || "F"),
                        "Wind: ".concat(period.windSpeed || "Unknown", " ").concat(period.windDirection || ""),
                        "".concat(period.shortForecast || "No forecast available"),
                        "---",
                    ].join("\n");
                });
                forecastText = "Forecast for ".concat(latitude, ", ").concat(longitude, ":\n\n").concat(formattedForecast.join("\n"));
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: forecastText,
                            },
                        ],
                    }];
        }
    });
}); });
var transport = new stdio_js_1.StdioServerTransport();
await server.connect(transport);
