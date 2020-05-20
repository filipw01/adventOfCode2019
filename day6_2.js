var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
var _b;
// Calculate orbits map checksum
var fs = require("fs");
var file = fs.readFileSync("day6.txt", "utf-8");
var input = file.split("\n").map(function (el) { return el.split(")"); });
var map = {};
//create map object from file
for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
    var orbit = input_1[_i];
    var orbited = orbit[0], orbiting = orbit[1];
    map[orbited] = {
        directlyOrbitedBy: __assign(__assign({}, (_b = map[orbited]) === null || _b === void 0 ? void 0 : _b.directlyOrbitedBy), (_a = {}, _a[orbiting] = true, _a))
    };
}
// insert childName planet from root to the planet it's orbiting
function deepInsertChild(rootMap, map, childName) {
    if (Object.keys(map).length === 0)
        return 0;
    for (var key in map) {
        if (key === childName || map[key].directlyOrbitedBy === undefined)
            continue;
        if (map[key].directlyOrbitedBy[childName]) {
            if (map[key] == undefined)
                continue;
            map[key].directlyOrbitedBy[childName] = rootMap[childName];
            delete rootMap[childName];
            return 1;
        }
        if (deepInsertChild(rootMap, map[key].directlyOrbitedBy, childName) == 1) {
            return 1;
        }
    }
    return 0;
}
// reduce the map to the graph until there is only one element that isn't orbiting anything
while (Object.keys(map).length !== 1) {
    for (var key in map) {
        if (map.hasOwnProperty(key)) {
            deepInsertChild(map, map, key);
        }
    }
}
console.log(map);
function pathToCOM(target, graph) {
    if (graph === true)
        return [];
    for (var key in graph) {
        if (key === target) {
            console.log(target);
            return [target];
        }
        var tempPath = pathToCOM(target, graph[key].directlyOrbitedBy);
        if (tempPath.length !== 0) {
            return __spreadArrays(tempPath, [key]);
        }
    }
    return [];
}
var pathYou = [];
var pathSanta = [];
while (pathYou[pathYou.length - 1] !== "COM") {
    pathYou = pathToCOM("YOU", map);
}
while (pathSanta[pathSanta.length - 1] !== "COM") {
    pathSanta = pathToCOM("SAN", map);
}
var planetFound = false;
for (var _c = 0, pathSanta_1 = pathSanta; _c < pathSanta_1.length; _c++) {
    var santaPlanet = pathSanta_1[_c];
    for (var _d = 0, pathYou_1 = pathYou; _d < pathYou_1.length; _d++) {
        var youPlanet = pathYou_1[_d];
        if (youPlanet === santaPlanet) {
            planetFound = true;
            console.log(youPlanet);
            console.log(pathSanta.indexOf(youPlanet) + pathYou.indexOf(youPlanet) - 2);
            break;
        }
    }
    if (planetFound)
        break;
}
