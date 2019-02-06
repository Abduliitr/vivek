/*! * Snowplow - The world's most powerful web analytics platform
 *
 * @description JavaScript tracker for Snowplow
 * @version     2.5.1
 * @author      Alex Dean, Simon Andersson, Anthon Pang, Fred Blundun
 * @copyright   Anthon Pang, Snowplow Analytics Ltd
 * @license     Simplified BSD
 */
(function e(b, g, d) {
    function c(l, i) {
        if (!g[l]) {
            if (!b[l]) {
                var h = typeof require == "function" && require;
                if (!i && h) {
                    return h(l, !0)
                }
                if (a) {
                    return a(l, !0)
                }
                throw new Error("Cannot find module '" + l + "'")
            }
            var j = g[l] = {
                exports: {}
            };
            b[l][0].call(j.exports, function(m) {
                var o = b[l][1][m];
                return c(o ? o : m)
            }, j, j.exports, e, b, g, d)
        }
        return g[l].exports
    }
    var a = typeof require == "function" && require;
    for (var f = 0; f < d.length; f++) {
        c(d[f])
    }
    return c
}
)({
    1: [function(require, module, exports) {
        var JSON;
        if (!JSON) {
            JSON = {}
        }
        (function() {
            var global = Function("return this")()
              , JSON = global.JSON;
            if (!JSON) {
                JSON = {}
            }
            function f(n) {
                return n < 10 ? "0" + n : n
            }
            if (typeof Date.prototype.toJSON !== "function") {
                Date.prototype.toJSON = function(key) {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                }
                ;
                String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
                    return this.valueOf()
                }
            }
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }, rep;
            function quote(string) {
                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                    var c = meta[a];
                    return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + string + '"'
            }
            function str(key, holder) {
                var i, k, v, length, mind = gap, partial, value = holder[key];
                if (value && typeof value === "object" && typeof value.toJSON === "function") {
                    value = value.toJSON(key)
                }
                if (typeof rep === "function") {
                    value = rep.call(holder, key, value)
                }
                switch (typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null"
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null"
                        }
                        v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === "string") {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v
                }
            }
            if (typeof JSON.stringify !== "function") {
                JSON.stringify = function(value, replacer, space) {
                    var i;
                    gap = "";
                    indent = "";
                    if (typeof space === "number") {
                        for (i = 0; i < space; i += 1) {
                            indent += " "
                        }
                    } else {
                        if (typeof space === "string") {
                            indent = space
                        }
                    }
                    rep = replacer;
                    if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                        throw new Error("JSON.stringify")
                    }
                    return str("", {
                        "": value
                    })
                }
            }
            if (typeof JSON.parse !== "function") {
                JSON.parse = function(text, reviver) {
                    var j;
                    function walk(holder, key) {
                        var k, v, value = holder[key];
                        if (value && typeof value === "object") {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v
                                    } else {
                                        delete value[k]
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value)
                    }
                    text = String(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function(a) {
                            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        })
                    }
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                        j = eval("(" + text + ")");
                        return typeof reviver === "function" ? walk({
                            "": j
                        }, "") : j
                    }
                    throw new SyntaxError("JSON.parse")
                }
            }
            global.JSON = JSON;
            module.exports = JSON
        }())
    }
    , {}],
    2: [function(b, c, a) {
        this.cookie = function(f, h, d, j, g, i) {
            if (arguments.length > 1) {
                return document.cookie = f + "=" + escape(h) + (d ? "; expires=" + new Date(+new Date() + (d * 1000)).toUTCString() : "") + (j ? "; path=" + j : "") + (g ? "; domain=" + g : "") + (i ? "; secure" : "")
            }
            return unescape((("; " + document.cookie).split("; " + f + "=")[1] || "").split(";")[0])
        }
    }
    , {}],
    3: [function(b, c, a) {
        (function(d) {
            var f = (function() {
                var h = "s"
                  , i = function(q) {
                    var r = -q.getTimezoneOffset();
                    return (r !== null ? r : 0)
                }
                  , m = function(r, s, q) {
                    var t = new Date();
                    if (r !== undefined) {
                        t.setFullYear(r)
                    }
                    t.setMonth(s);
                    t.setDate(q);
                    return t
                }
                  , j = function(q) {
                    return i(m(q, 0, 2))
                }
                  , n = function(q) {
                    return i(m(q, 5, 2))
                }
                  , g = function(r) {
                    var s = r.getMonth() > 7
                      , v = s ? n(r.getFullYear()) : j(r.getFullYear())
                      , q = i(r)
                      , u = v < 0
                      , t = v - q;
                    if (!u && !s) {
                        return t < 0
                    }
                    return t !== 0
                }
                  , l = function() {
                    var q = j()
                      , r = n()
                      , s = q - r;
                    if (s < 0) {
                        return q + ",1"
                    } else {
                        if (s > 0) {
                            return r + ",1," + h
                        }
                    }
                    return q + ",0"
                }
                  , o = function() {
                    var q = l();
                    return new f.TimeZone(f.olson.timezones[q])
                }
                  , p = function(q) {
                    var r = new Date(2010,6,15,1,0,0,0)
                      , s = {
                        "America/Denver": new Date(2011,2,13,3,0,0,0),
                        "America/Mazatlan": new Date(2011,3,3,3,0,0,0),
                        "America/Chicago": new Date(2011,2,13,3,0,0,0),
                        "America/Mexico_City": new Date(2011,3,3,3,0,0,0),
                        "America/Asuncion": new Date(2012,9,7,3,0,0,0),
                        "America/Santiago": new Date(2012,9,3,3,0,0,0),
                        "America/Campo_Grande": new Date(2012,9,21,5,0,0,0),
                        "America/Montevideo": new Date(2011,9,2,3,0,0,0),
                        "America/Sao_Paulo": new Date(2011,9,16,5,0,0,0),
                        "America/Los_Angeles": new Date(2011,2,13,8,0,0,0),
                        "America/Santa_Isabel": new Date(2011,3,5,8,0,0,0),
                        "America/Havana": new Date(2012,2,10,2,0,0,0),
                        "America/New_York": new Date(2012,2,10,7,0,0,0),
                        "Europe/Helsinki": new Date(2013,2,31,5,0,0,0),
                        "Pacific/Auckland": new Date(2011,8,26,7,0,0,0),
                        "America/Halifax": new Date(2011,2,13,6,0,0,0),
                        "America/Goose_Bay": new Date(2011,2,13,2,1,0,0),
                        "America/Miquelon": new Date(2011,2,13,5,0,0,0),
                        "America/Godthab": new Date(2011,2,27,1,0,0,0),
                        "Europe/Moscow": r,
                        "Asia/Amman": new Date(2013,2,29,1,0,0,0),
                        "Asia/Beirut": new Date(2013,2,31,2,0,0,0),
                        "Asia/Damascus": new Date(2013,3,6,2,0,0,0),
                        "Asia/Jerusalem": new Date(2013,2,29,5,0,0,0),
                        "Asia/Yekaterinburg": r,
                        "Asia/Omsk": r,
                        "Asia/Krasnoyarsk": r,
                        "Asia/Irkutsk": r,
                        "Asia/Yakutsk": r,
                        "Asia/Vladivostok": r,
                        "Asia/Baku": new Date(2013,2,31,4,0,0),
                        "Asia/Yerevan": new Date(2013,2,31,3,0,0),
                        "Asia/Kamchatka": r,
                        "Asia/Gaza": new Date(2010,2,27,4,0,0),
                        "Africa/Cairo": new Date(2010,4,1,3,0,0),
                        "Europe/Minsk": r,
                        "Pacific/Apia": new Date(2010,10,1,1,0,0,0),
                        "Pacific/Fiji": new Date(2010,11,1,0,0,0),
                        "Australia/Perth": new Date(2008,10,1,1,0,0,0)
                    };
                    return s[q]
                };
                return {
                    determine: o,
                    date_is_dst: g,
                    dst_start_for: p
                }
            }());
            f.TimeZone = function(g) {
                var h = {
                    "America/Denver": ["America/Denver", "America/Mazatlan"],
                    "America/Chicago": ["America/Chicago", "America/Mexico_City"],
                    "America/Santiago": ["America/Santiago", "America/Asuncion", "America/Campo_Grande"],
                    "America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"],
                    "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Asia/Beirut", "Europe/Helsinki", "Asia/Damascus"],
                    "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
                    "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
                    "America/New_York": ["America/Havana", "America/New_York"],
                    "America/Halifax": ["America/Goose_Bay", "America/Halifax"],
                    "America/Godthab": ["America/Miquelon", "America/Godthab"],
                    "Asia/Dubai": ["Europe/Moscow"],
                    "Asia/Dhaka": ["Asia/Yekaterinburg"],
                    "Asia/Jakarta": ["Asia/Omsk"],
                    "Asia/Shanghai": ["Asia/Krasnoyarsk", "Australia/Perth"],
                    "Asia/Tokyo": ["Asia/Irkutsk"],
                    "Australia/Brisbane": ["Asia/Yakutsk"],
                    "Pacific/Noumea": ["Asia/Vladivostok"],
                    "Pacific/Tarawa": ["Asia/Kamchatka", "Pacific/Fiji"],
                    "Pacific/Tongatapu": ["Pacific/Apia"],
                    "Asia/Baghdad": ["Europe/Minsk"],
                    "Asia/Baku": ["Asia/Yerevan", "Asia/Baku"],
                    "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
                }
                  , i = g
                  , l = function() {
                    var m = h[i]
                      , o = m.length
                      , n = 0
                      , p = m[0];
                    for (; n < o; n += 1) {
                        p = m[n];
                        if (f.date_is_dst(f.dst_start_for(p))) {
                            i = p;
                            return
                        }
                    }
                }
                  , j = function() {
                    return typeof (h[i]) !== "undefined"
                };
                if (j()) {
                    l()
                }
                return {
                    name: function() {
                        return i
                    }
                }
            }
            ;
            f.olson = {};
            f.olson.timezones = {
                "-720,0": "Pacific/Majuro",
                "-660,0": "Pacific/Pago_Pago",
                "-600,1": "America/Adak",
                "-600,0": "Pacific/Honolulu",
                "-570,0": "Pacific/Marquesas",
                "-540,0": "Pacific/Gambier",
                "-540,1": "America/Anchorage",
                "-480,1": "America/Los_Angeles",
                "-480,0": "Pacific/Pitcairn",
                "-420,0": "America/Phoenix",
                "-420,1": "America/Denver",
                "-360,0": "America/Guatemala",
                "-360,1": "America/Chicago",
                "-360,1,s": "Pacific/Easter",
                "-300,0": "America/Bogota",
                "-300,1": "America/New_York",
                "-270,0": "America/Caracas",
                "-240,1": "America/Halifax",
                "-240,0": "America/Santo_Domingo",
                "-240,1,s": "America/Santiago",
                "-210,1": "America/St_Johns",
                "-180,1": "America/Godthab",
                "-180,0": "America/Argentina/Buenos_Aires",
                "-180,1,s": "America/Montevideo",
                "-120,0": "America/Noronha",
                "-120,1": "America/Noronha",
                "-60,1": "Atlantic/Azores",
                "-60,0": "Atlantic/Cape_Verde",
                "0,0": "UTC",
                "0,1": "Europe/London",
                "60,1": "Europe/Berlin",
                "60,0": "Africa/Lagos",
                "60,1,s": "Africa/Windhoek",
                "120,1": "Asia/Beirut",
                "120,0": "Africa/Johannesburg",
                "180,0": "Asia/Baghdad",
                "180,1": "Europe/Moscow",
                "210,1": "Asia/Tehran",
                "240,0": "Asia/Dubai",
                "240,1": "Asia/Baku",
                "270,0": "Asia/Kabul",
                "300,1": "Asia/Yekaterinburg",
                "300,0": "Asia/Karachi",
                "330,0": "Asia/Kolkata",
                "345,0": "Asia/Kathmandu",
                "360,0": "Asia/Dhaka",
                "360,1": "Asia/Omsk",
                "390,0": "Asia/Rangoon",
                "420,1": "Asia/Krasnoyarsk",
                "420,0": "Asia/Jakarta",
                "480,0": "Asia/Shanghai",
                "480,1": "Asia/Irkutsk",
                "525,0": "Australia/Eucla",
                "525,1,s": "Australia/Eucla",
                "540,1": "Asia/Yakutsk",
                "540,0": "Asia/Tokyo",
                "570,0": "Australia/Darwin",
                "570,1,s": "Australia/Adelaide",
                "600,0": "Australia/Brisbane",
                "600,1": "Asia/Vladivostok",
                "600,1,s": "Australia/Sydney",
                "630,1,s": "Australia/Lord_Howe",
                "660,1": "Asia/Kamchatka",
                "660,0": "Pacific/Noumea",
                "690,0": "Pacific/Norfolk",
                "720,1,s": "Pacific/Auckland",
                "720,0": "Pacific/Tarawa",
                "765,1,s": "Pacific/Chatham",
                "780,0": "Pacific/Tongatapu",
                "780,1,s": "Pacific/Apia",
                "840,0": "Pacific/Kiritimati"
            };
            if (typeof a !== "undefined") {
                a.jstz = f
            } else {
                d.jstz = f
            }
        }
        )(this)
    }
    , {}],
    4: [function(b, c, a) {
        (function() {
            var i = this;
            function g(q, m) {
                var j = q.length, p = m ^ j, o = 0, n;
                while (j >= 4) {
                    n = ((q.charCodeAt(o) & 255)) | ((q.charCodeAt(++o) & 255) << 8) | ((q.charCodeAt(++o) & 255) << 16) | ((q.charCodeAt(++o) & 255) << 24);
                    n = (((n & 65535) * 1540483477) + ((((n >>> 16) * 1540483477) & 65535) << 16));
                    n ^= n >>> 24;
                    n = (((n & 65535) * 1540483477) + ((((n >>> 16) * 1540483477) & 65535) << 16));
                    p = (((p & 65535) * 1540483477) + ((((p >>> 16) * 1540483477) & 65535) << 16)) ^ n;
                    j -= 4;
                    ++o
                }
                switch (j) {
                case 3:
                    p ^= (q.charCodeAt(o + 2) & 255) << 16;
                case 2:
                    p ^= (q.charCodeAt(o + 1) & 255) << 8;
                case 1:
                    p ^= (q.charCodeAt(o) & 255);
                    p = (((p & 65535) * 1540483477) + ((((p >>> 16) * 1540483477) & 65535) << 16))
                }
                p ^= p >>> 13;
                p = (((p & 65535) * 1540483477) + ((((p >>> 16) * 1540483477) & 65535) << 16));
                p ^= p >>> 15;
                return p >>> 0
            }
            function f(t, p) {
                var u, v, r, l, o, j, m, s, q, n;
                u = t.length & 3;
                v = t.length - u;
                r = p;
                o = 3432918353;
                m = 461845907;
                n = 0;
                while (n < v) {
                    q = ((t.charCodeAt(n) & 255)) | ((t.charCodeAt(++n) & 255) << 8) | ((t.charCodeAt(++n) & 255) << 16) | ((t.charCodeAt(++n) & 255) << 24);
                    ++n;
                    q = ((((q & 65535) * o) + ((((q >>> 16) * o) & 65535) << 16))) & 4294967295;
                    q = (q << 15) | (q >>> 17);
                    q = ((((q & 65535) * m) + ((((q >>> 16) * m) & 65535) << 16))) & 4294967295;
                    r ^= q;
                    r = (r << 13) | (r >>> 19);
                    l = ((((r & 65535) * 5) + ((((r >>> 16) * 5) & 65535) << 16))) & 4294967295;
                    r = (((l & 65535) + 27492) + ((((l >>> 16) + 58964) & 65535) << 16))
                }
                q = 0;
                switch (u) {
                case 3:
                    q ^= (t.charCodeAt(n + 2) & 255) << 16;
                case 2:
                    q ^= (t.charCodeAt(n + 1) & 255) << 8;
                case 1:
                    q ^= (t.charCodeAt(n) & 255);
                    q = (((q & 65535) * o) + ((((q >>> 16) * o) & 65535) << 16)) & 4294967295;
                    q = (q << 15) | (q >>> 17);
                    q = (((q & 65535) * m) + ((((q >>> 16) * m) & 65535) << 16)) & 4294967295;
                    r ^= q
                }
                r ^= t.length;
                r ^= r >>> 16;
                r = (((r & 65535) * 2246822507) + ((((r >>> 16) * 2246822507) & 65535) << 16)) & 4294967295;
                r ^= r >>> 13;
                r = ((((r & 65535) * 3266489909) + ((((r >>> 16) * 3266489909) & 65535) << 16))) & 4294967295;
                r ^= r >>> 16;
                return r >>> 0
            }
            var d = f;
            d.v2 = g;
            d.v3 = f;
            if (typeof (c) != "undefined") {
                c.exports = d
            } else {
                var h = i.murmur;
                d.noConflict = function() {
                    i.murmur = h;
                    return d
                }
                ;
                i.murmur = d
            }
        }())
    }
    , {}],
    5: [function(c, d, b) {
        var a = {
            utf8: {
                stringToBytes: function(f) {
                    return a.bin.stringToBytes(unescape(encodeURIComponent(f)))
                },
                bytesToString: function(f) {
                    return decodeURIComponent(escape(a.bin.bytesToString(f)))
                }
            },
            bin: {
                stringToBytes: function(h) {
                    for (var f = [], g = 0; g < h.length; g++) {
                        f.push(h.charCodeAt(g) & 255)
                    }
                    return f
                },
                bytesToString: function(f) {
                    for (var h = [], g = 0; g < f.length; g++) {
                        h.push(String.fromCharCode(f[g]))
                    }
                    return h.join("")
                }
            }
        };
        d.exports = a
    }
    , {}],
    6: [function(b, c, a) {
        (function() {
            var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , f = {
                rotl: function(h, g) {
                    return (h << g) | (h >>> (32 - g))
                },
                rotr: function(h, g) {
                    return (h << (32 - g)) | (h >>> g)
                },
                endian: function(h) {
                    if (h.constructor == Number) {
                        return f.rotl(h, 8) & 16711935 | f.rotl(h, 24) & 4278255360
                    }
                    for (var g = 0; g < h.length; g++) {
                        h[g] = f.endian(h[g])
                    }
                    return h
                },
                randomBytes: function(h) {
                    for (var g = []; h > 0; h--) {
                        g.push(Math.floor(Math.random() * 256))
                    }
                    return g
                },
                bytesToWords: function(h) {
                    for (var l = [], j = 0, g = 0; j < h.length; j++,
                    g += 8) {
                        l[g >>> 5] |= h[j] << (24 - g % 32)
                    }
                    return l
                },
                wordsToBytes: function(i) {
                    for (var h = [], g = 0; g < i.length * 32; g += 8) {
                        h.push((i[g >>> 5] >>> (24 - g % 32)) & 255)
                    }
                    return h
                },
                bytesToHex: function(g) {
                    for (var j = [], h = 0; h < g.length; h++) {
                        j.push((g[h] >>> 4).toString(16));
                        j.push((g[h] & 15).toString(16))
                    }
                    return j.join("")
                },
                hexToBytes: function(h) {
                    for (var g = [], i = 0; i < h.length; i += 2) {
                        g.push(parseInt(h.substr(i, 2), 16))
                    }
                    return g
                },
                bytesToBase64: function(h) {
                    for (var g = [], m = 0; m < h.length; m += 3) {
                        var n = (h[m] << 16) | (h[m + 1] << 8) | h[m + 2];
                        for (var l = 0; l < 4; l++) {
                            if (m * 8 + l * 6 <= h.length * 8) {
                                g.push(d.charAt((n >>> 6 * (3 - l)) & 63))
                            } else {
                                g.push("=")
                            }
                        }
                    }
                    return g.join("")
                },
                base64ToBytes: function(h) {
                    h = h.replace(/[^A-Z0-9+\/]/ig, "");
                    for (var g = [], j = 0, l = 0; j < h.length; l = ++j % 4) {
                        if (l == 0) {
                            continue
                        }
                        g.push(((d.indexOf(h.charAt(j - 1)) & (Math.pow(2, -2 * l + 8) - 1)) << (l * 2)) | (d.indexOf(h.charAt(j)) >>> (6 - l * 2)))
                    }
                    return g
                }
            };
            c.exports = f
        }
        )()
    }
    , {}],
    7: [function(b, c, a) {
        (function() {
            var h = b("crypt")
              , d = b("charenc").utf8
              , f = b("charenc").bin
              , i = function(r) {
                if (r.constructor == String) {
                    r = d.stringToBytes(r)
                }
                var z = h.bytesToWords(r)
                  , A = r.length * 8
                  , s = []
                  , v = 1732584193
                  , u = -271733879
                  , q = -1732584194
                  , p = 271733878
                  , o = -1009589776;
                z[A >> 5] |= 128 << (24 - A % 32);
                z[((A + 64 >>> 9) << 4) + 15] = A;
                for (var C = 0; C < z.length; C += 16) {
                    var H = v
                      , G = u
                      , F = q
                      , E = p
                      , D = o;
                    for (var B = 0; B < 80; B++) {
                        if (B < 16) {
                            s[B] = z[C + B]
                        } else {
                            var y = s[B - 3] ^ s[B - 8] ^ s[B - 14] ^ s[B - 16];
                            s[B] = (y << 1) | (y >>> 31)
                        }
                        var x = ((v << 5) | (v >>> 27)) + o + (s[B] >>> 0) + (B < 20 ? (u & q | ~u & p) + 1518500249 : B < 40 ? (u ^ q ^ p) + 1859775393 : B < 60 ? (u & q | u & p | q & p) - 1894007588 : (u ^ q ^ p) - 899497514);
                        o = p;
                        p = q;
                        q = (u << 30) | (u >>> 2);
                        u = v;
                        v = x
                    }
                    v += H;
                    u += G;
                    q += F;
                    p += E;
                    o += D
                }
                return [v, u, q, p, o]
            }
              , g = function(m, j) {
                var l = h.wordsToBytes(i(m));
                return j && j.asBytes ? l : j && j.asString ? f.bytesToString(l) : h.bytesToHex(l)
            };
            g._blocksize = 16;
            g._digestsize = 20;
            c.exports = g
        }
        )()
    }
    , {
        charenc: 5,
        crypt: 6
    }],
    8: [function(b, c, a) {
        c.exports = b("./lib/core")
    }
    , {
        "./lib/core": 10
    }],
    9: [function(b, c, a) {
        (function() {
            var d = typeof a !== "undefined" ? a : this;
            function f(q) {
                var m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var l, j, h, v, u, t, s, w, p = 0, x = 0, o = "", n = [];
                if (!q) {
                    return q
                }
                q = unescape(encodeURIComponent(q));
                do {
                    l = q.charCodeAt(p++);
                    j = q.charCodeAt(p++);
                    h = q.charCodeAt(p++);
                    w = l << 16 | j << 8 | h;
                    v = w >> 18 & 63;
                    u = w >> 12 & 63;
                    t = w >> 6 & 63;
                    s = w & 63;
                    n[x++] = m.charAt(v) + m.charAt(u) + m.charAt(t) + m.charAt(s)
                } while (p < q.length);o = n.join("");
                var g = q.length % 3;
                return (g ? o.slice(0, g - 3) : o) + "===".slice(g || 3)
            }
            d.base64encode = f
        }())
    }
    , {}],
    10: [function(b, c, a) {
        var g = b("./payload.js");
        var d = b("uuid");
        function f(j, p) {
            if (typeof j === "undefined") {
                j = true
            }
            var h = {};
            function m(q, r) {
                h[q] = r
            }
            function l(s, t) {
                var r = {};
                t = t || {};
                for (var q in s) {
                    if (t[q] || (s[q] !== null && typeof s[q] !== "undefined")) {
                        r[q] = s[q]
                    }
                }
                return r
            }
            function n(q) {
                if (q && q.length) {
                    return {
                        schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                        data: q
                    }
                }
            }
            function i(s, r, q) {
                s.addDict(h);
                s.add("eid", d.v4());
                s.add("dtm", q || new Date().getTime());
                if (r) {
                    s.addJson("cx", "co", n(r))
                }
                if (typeof p === "function") {
                    p(s)
                }
                return s
            }
            function o(s, r, q) {
                var u = g.payloadBuilder(j);
                var t = {
                    schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
                    data: s
                };
                u.add("e", "ue");
                u.addJson("ue_px", "ue_pr", t);
                return i(u, r, q)
            }
            return {
                setBase64Encoding: function(q) {
                    j = q
                },
                addPayloadPair: m,
                addPayloadDict: function(r) {
                    for (var q in r) {
                        if (r.hasOwnProperty(q)) {
                            h[q] = r[q]
                        }
                    }
                },
                resetPayloadPairs: function(q) {
                    h = g.isJson(q) ? q : {}
                },
                setTrackerVersion: function(q) {
                    m("tv", q)
                },
                setTrackerNamespace: function(q) {
                    m("tna", q)
                },
                setAppId: function(q) {
                    m("aid", q)
                },
                setPlatform: function(q) {
                    m("p", q)
                },
                setUserId: function(q) {
                    m("uid", q)
                },
                setScreenResolution: function(r, q) {
                    m("res", r + "x" + q)
                },
                setViewport: function(r, q) {
                    m("vp", r + "x" + q)
                },
                setColorDepth: function(q) {
                    m("cd", q)
                },
                setTimezone: function(q) {
                    m("tz", q)
                },
                setLang: function(q) {
                    m("lang", q)
                },
                setIpAddress: function(q) {
                    m("ip", q)
                },
                trackUnstructEvent: o,
                trackPageView: function(u, t, s, r, q) {
                    var v = g.payloadBuilder(j);
                    v.add("e", "pv");
                    v.add("url", u);
                    v.add("page", t);
                    v.add("refr", s);
                    return i(v, r, q)
                },
                trackPagePing: function(s, t, x, y, u, r, z, q, v) {
                    var w = g.payloadBuilder(j);
                    w.add("e", "pp");
                    w.add("url", s);
                    w.add("page", t);
                    w.add("refr", x);
                    w.add("pp_mix", y);
                    w.add("pp_max", u);
                    w.add("pp_miy", r);
                    w.add("pp_may", z);
                    return i(w, q, v)
                },
                trackStructEvent: function(t, w, r, v, u, s, q) {
                    var x = g.payloadBuilder(j);
                    x.add("e", "se");
                    x.add("se_ca", t);
                    x.add("se_ac", w);
                    x.add("se_la", r);
                    x.add("se_pr", v);
                    x.add("se_va", u);
                    return i(x, s, q)
                },
                trackEcommerceTransaction: function(x, w, u, t, q, y, r, v, A, s, z) {
                    var B = g.payloadBuilder(j);
                    B.add("e", "tr");
                    B.add("tr_id", x);
                    B.add("tr_af", w);
                    B.add("tr_tt", u);
                    B.add("tr_tx", t);
                    B.add("tr_sh", q);
                    B.add("tr_ci", y);
                    B.add("tr_st", r);
                    B.add("tr_co", v);
                    B.add("tr_cu", A);
                    return i(B, s, z)
                },
                trackEcommerceTransactionItem: function(t, x, q, r, v, u, y, s, w) {
                    var z = g.payloadBuilder(j);
                    z.add("e", "ti");
                    z.add("ti_id", t);
                    z.add("ti_sk", x);
                    z.add("ti_nm", q);
                    z.add("ti_ca", r);
                    z.add("ti_pr", v);
                    z.add("ti_qu", u);
                    z.add("ti_cu", y);
                    return i(z, s, w)
                },
                trackScreenView: function(r, t, s, q) {
                    return o({
                        schema: "iglu:com.snowplowanalytics.snowplow/screen_view/jsonschema/1-0-0",
                        data: l({
                            name: r,
                            id: t
                        })
                    }, s, q)
                },
                trackLinkClick: function(x, s, u, r, w, v, q) {
                    var t = {
                        schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
                        data: l({
                            targetUrl: x,
                            elementId: s,
                            elementClasses: u,
                            elementTarget: r,
                            elementContent: w
                        })
                    };
                    return o(t, v, q)
                },
                trackAdImpression: function(u, q, s, t, A, v, w, z, r, y) {
                    var x = {
                        schema: "iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0",
                        data: l({
                            impressionId: u,
                            costModel: q,
                            cost: s,
                            targetUrl: t,
                            bannerId: A,
                            zoneId: v,
                            advertiserId: w,
                            campaignId: z
                        })
                    };
                    return o(x, r, y)
                },
                trackAdClick: function(s, y, q, t, B, v, u, w, A, r, z) {
                    var x = {
                        schema: "iglu:com.snowplowanalytics.snowplow/ad_click/jsonschema/1-0-0",
                        data: l({
                            targetUrl: s,
                            clickId: y,
                            costModel: q,
                            cost: t,
                            bannerId: B,
                            zoneId: v,
                            impressionId: u,
                            advertiserId: w,
                            campaignId: A
                        })
                    };
                    return o(x, r, z)
                },
                trackAdConversion: function(B, q, t, s, v, z, A, u, y, r, x) {
                    var w = {
                        schema: "iglu:com.snowplowanalytics.snowplow/ad_conversion/jsonschema/1-0-0",
                        data: l({
                            conversionId: B,
                            costModel: q,
                            cost: t,
                            category: s,
                            action: v,
                            property: z,
                            initialValue: A,
                            advertiserId: u,
                            campaignId: y
                        })
                    };
                    return o(w, r, x)
                },
                trackSocialInteraction: function(u, t, v, s, q) {
                    var r = {
                        schema: "iglu:com.snowplowanalytics.snowplow/social_interaction/jsonschema/1-0-0",
                        data: l({
                            action: u,
                            network: t,
                            target: v
                        })
                    };
                    return o(r, s, q)
                },
                trackAddToCart: function(x, s, u, v, w, r, t, q) {
                    return o({
                        schema: "iglu:com.snowplowanalytics.snowplow/add_to_cart/jsonschema/1-0-0",
                        data: l({
                            sku: x,
                            name: s,
                            category: u,
                            unitPrice: v,
                            quantity: w,
                            currency: r
                        })
                    }, t, q)
                },
                trackRemoveFromCart: function(x, s, u, v, w, r, t, q) {
                    return o({
                        schema: "iglu:com.snowplowanalytics.snowplow/remove_from_cart/jsonschema/1-0-0",
                        data: l({
                            sku: x,
                            name: s,
                            category: u,
                            unitPrice: v,
                            quantity: w,
                            currency: r
                        })
                    }, t, q)
                },
                trackFormChange: function(w, r, x, u, s, v, t, q) {
                    return o({
                        schema: "iglu:com.snowplowanalytics.snowplow/change_form/jsonschema/1-0-0",
                        data: l({
                            formId: w,
                            elementId: r,
                            nodeName: x,
                            type: u,
                            elementClasses: s,
                            value: v
                        }, {
                            value: true
                        })
                    }, t, q)
                },
                trackFormSubmission: function(u, s, t, r, q) {
                    return o({
                        schema: "iglu:com.snowplowanalytics.snowplow/submit_form/jsonschema/1-0-0",
                        data: l({
                            formId: u,
                            formClasses: s,
                            elements: t
                        })
                    }, r, q)
                },
                trackSiteSearch: function(v, u, r, s, t, q) {
                    return o({
                        schema: "iglu:com.snowplowanalytics.snowplow/site_search/jsonschema/1-0-0",
                        data: l({
                            terms: v,
                            filters: u,
                            totalResults: r,
                            pageResults: s
                        })
                    }, t, q)
                }
            }
        }
        c.exports = f
    }
    , {
        "./payload.js": 11,
        uuid: 14
    }],
    11: [function(b, c, a) {
        (function() {
            var h = b("JSON")
              , d = b("./base64")
              , g = typeof a !== "undefined" ? a : this;
            function f(j) {
                if (!j) {
                    return j
                }
                var i = d.base64encode(j);
                return i.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
            }
            g.isJson = function(i) {
                return (typeof i !== "undefined" && i !== null && (i.constructor === {}.constructor || i.constructor === [].constructor))
            }
            ;
            g.isNonEmptyJson = function(j) {
                if (!g.isJson(j)) {
                    return false
                }
                for (var i in j) {
                    if (j.hasOwnProperty(i)) {
                        return true
                    }
                }
                return false
            }
            ;
            g.payloadBuilder = function(j) {
                var n = {};
                var m = function(o, p) {
                    if (p !== undefined && p !== null && p !== "") {
                        n[o] = p
                    }
                };
                var i = function(p) {
                    for (var o in p) {
                        if (p.hasOwnProperty(o)) {
                            m(o, p[o])
                        }
                    }
                };
                var l = function(o, p, q) {
                    if (g.isNonEmptyJson(q)) {
                        var r = h.stringify(q);
                        if (j) {
                            m(o, f(r))
                        } else {
                            m(p, r)
                        }
                    }
                };
                return {
                    add: m,
                    addDict: i,
                    addJson: l,
                    build: function() {
                        return n
                    }
                }
            }
        }())
    }
    , {
        "./base64": 9,
        JSON: 1
    }],
    12: [function(b, c, a) {
        c.exports = Array
    }
    , {}],
    13: [function(b, c, a) {
        (function(i) {
            var f;
            if (i.crypto && crypto.getRandomValues) {
                var d = new Uint8Array(16);
                f = function g() {
                    crypto.getRandomValues(d);
                    return d
                }
            }
            if (!f) {
                var h = new Array(16);
                f = function() {
                    for (var j = 0, l; j < 16; j++) {
                        if ((j & 3) === 0) {
                            l = Math.random() * 4294967296
                        }
                        h[j] = l >>> ((j & 3) << 3) & 255
                    }
                    return h
                }
            }
            c.exports = f
        }
        ).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }
    , {}],
    14: [function(j, c, u) {
        var l = j("./rng");
        var o = j("./buffer");
        var g = [];
        var h = {};
        for (var r = 0; r < 256; r++) {
            g[r] = (r + 256).toString(16).substr(1);
            h[g[r]] = r
        }
        function n(y, v, z) {
            var w = (v && z) || 0
              , x = 0;
            v = v || [];
            y.toLowerCase().replace(/[0-9a-f]{2}/g, function(i) {
                if (x < 16) {
                    v[w + x++] = h[i]
                }
            });
            while (x < 16) {
                v[w + x++] = 0
            }
            return v
        }
        function m(v, x) {
            var w = x || 0
              , y = g;
            return y[v[w++]] + y[v[w++]] + y[v[w++]] + y[v[w++]] + "-" + y[v[w++]] + y[v[w++]] + "-" + y[v[w++]] + y[v[w++]] + "-" + y[v[w++]] + y[v[w++]] + "-" + y[v[w++]] + y[v[w++]] + y[v[w++]] + y[v[w++]] + y[v[w++]] + y[v[w++]]
        }
        var f = l();
        var s = [f[0] | 1, f[1], f[2], f[3], f[4], f[5]];
        var t = (f[6] << 8 | f[7]) & 16383;
        var b = 0
          , p = 0;
        function d(H, x, B) {
            var C = x && B || 0;
            var D = x || [];
            H = H || {};
            var A = H.clockseq !== undefined ? H.clockseq : t;
            var v = H.msecs !== undefined ? H.msecs : new Date().getTime();
            var G = H.nsecs !== undefined ? H.nsecs : p + 1;
            var w = (v - b) + (G - p) / 10000;
            if (w < 0 && H.clockseq === undefined) {
                A = A + 1 & 16383
            }
            if ((w < 0 || v > b) && H.nsecs === undefined) {
                G = 0
            }
            if (G >= 10000) {
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
            }
            b = v;
            p = G;
            t = A;
            v += 12219292800000;
            var F = ((v & 268435455) * 10000 + G) % 4294967296;
            D[C++] = F >>> 24 & 255;
            D[C++] = F >>> 16 & 255;
            D[C++] = F >>> 8 & 255;
            D[C++] = F & 255;
            var E = (v / 4294967296 * 10000) & 268435455;
            D[C++] = E >>> 8 & 255;
            D[C++] = E & 255;
            D[C++] = E >>> 24 & 15 | 16;
            D[C++] = E >>> 16 & 255;
            D[C++] = A >>> 8 | 128;
            D[C++] = A & 255;
            var z = H.node || s;
            for (var y = 0; y < 6; y++) {
                D[C + y] = z[y]
            }
            return x ? x : m(D)
        }
        function a(w, v, A) {
            var x = v && A || 0;
            if (typeof (w) == "string") {
                v = w == "binary" ? new o(16) : null;
                w = null
            }
            w = w || {};
            var z = w.random || (w.rng || l)();
            z[6] = (z[6] & 15) | 64;
            z[8] = (z[8] & 63) | 128;
            if (v) {
                for (var y = 0; y < 16; y++) {
                    v[x + y] = z[y]
                }
            }
            return v || m(z)
        }
        var q = a;
        q.v1 = d;
        q.v4 = a;
        q.parse = n;
        q.unparse = m;
        q.BufferClass = o;
        c.exports = q
    }
    , {
        "./buffer": 12,
        "./rng": 13
    }],
    15: [function(b, c, a) {
        c.exports = b(13)
    }
    , {}],
    16: [function(c, b, h) {
        var d = c("./rng");
        var r = [];
        var j = {};
        for (var l = 0; l < 256; l++) {
            r[l] = (l + 256).toString(16).substr(1);
            j[r[l]] = l
        }
        function f(x, u, y) {
            var v = (u && y) || 0
              , w = 0;
            u = u || [];
            x.toLowerCase().replace(/[0-9a-f]{2}/g, function(i) {
                if (w < 16) {
                    u[v + w++] = j[i]
                }
            });
            while (w < 16) {
                u[v + w++] = 0
            }
            return u
        }
        function n(u, w) {
            var v = w || 0
              , x = r;
            return x[u[v++]] + x[u[v++]] + x[u[v++]] + x[u[v++]] + "-" + x[u[v++]] + x[u[v++]] + "-" + x[u[v++]] + x[u[v++]] + "-" + x[u[v++]] + x[u[v++]] + "-" + x[u[v++]] + x[u[v++]] + x[u[v++]] + x[u[v++]] + x[u[v++]] + x[u[v++]]
        }
        var t = d();
        var q = [t[0] | 1, t[1], t[2], t[3], t[4], t[5]];
        var g = (t[6] << 8 | t[7]) & 16383;
        var o = 0
          , m = 0;
        function s(G, w, A) {
            var B = w && A || 0;
            var C = w || [];
            G = G || {};
            var z = G.clockseq !== undefined ? G.clockseq : g;
            var u = G.msecs !== undefined ? G.msecs : new Date().getTime();
            var F = G.nsecs !== undefined ? G.nsecs : m + 1;
            var v = (u - o) + (F - m) / 10000;
            if (v < 0 && G.clockseq === undefined) {
                z = z + 1 & 16383
            }
            if ((v < 0 || u > o) && G.nsecs === undefined) {
                F = 0
            }
            if (F >= 10000) {
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
            }
            o = u;
            m = F;
            g = z;
            u += 12219292800000;
            var E = ((u & 268435455) * 10000 + F) % 4294967296;
            C[B++] = E >>> 24 & 255;
            C[B++] = E >>> 16 & 255;
            C[B++] = E >>> 8 & 255;
            C[B++] = E & 255;
            var D = (u / 4294967296 * 10000) & 268435455;
            C[B++] = D >>> 8 & 255;
            C[B++] = D & 255;
            C[B++] = D >>> 24 & 15 | 16;
            C[B++] = D >>> 16 & 255;
            C[B++] = z >>> 8 | 128;
            C[B++] = z & 255;
            var y = G.node || q;
            for (var x = 0; x < 6; x++) {
                C[B + x] = y[x]
            }
            return w ? w : n(C)
        }
        function p(v, u, z) {
            var w = u && z || 0;
            if (typeof (v) == "string") {
                u = v == "binary" ? new Array(16) : null;
                v = null
            }
            v = v || {};
            var y = v.random || (v.rng || d)();
            y[6] = (y[6] & 15) | 64;
            y[8] = (y[8] & 63) | 128;
            if (u) {
                for (var x = 0; x < 16; x++) {
                    u[w + x] = y[x]
                }
            }
            return u || n(y)
        }
        var a = p;
        a.v1 = s;
        a.v4 = p;
        a.parse = f;
        a.unparse = n;
        b.exports = a
    }
    , {
        "./rng": 15
    }],
    17: [function(c, d, a) {
        var g = c("./lib_managed/lodash")
          , f = c("./lib/helpers")
          , b = typeof a !== "undefined" ? a : this;
        b.getFormTrackingManager = function(m, l, o) {
            var r = ["textarea", "input", "select"];
            var h = l + "form";
            var s = function(u) {
                return true
            };
            var j = function(u) {
                return true
            };
            function q(u) {
                return u[g.find(["name", "id", "type", "nodeName"], function(v) {
                    return u[v] && typeof u[v] === "string"
                })]
            }
            function t(u) {
                while (u && u.nodeName.toUpperCase() !== "HTML" && u.nodeName.toUpperCase() !== "FORM") {
                    u = u.parentNode
                }
                if (u.nodeName.toUpperCase() === "FORM") {
                    return q(u)
                }
            }
            function i(v) {
                var u = [];
                g.forEach(r, function(w) {
                    var x = g.filter(v.getElementsByTagName(w), function(y) {
                        return y.hasOwnProperty(h)
                    });
                    g.forEach(x, function(z) {
                        if (z.type === "submit") {
                            return
                        }
                        var y = {
                            name: q(z),
                            value: z.value,
                            nodeName: z.nodeName
                        };
                        if (z.type && z.nodeName.toUpperCase() === "INPUT") {
                            y.type = z.type
                        }
                        if ((z.type === "checkbox" || z.type === "radio") && !z.checked) {
                            y.value = null
                        }
                        u.push(y)
                    })
                });
                return u
            }
            function n(u) {
                return function(y) {
                    var v = y.target;
                    var w = v.nodeName.toUpperCase() === "INPUT" ? v.type : null;
                    var x = (v.type === "checkbox" && !v.checked) ? null : v.value;
                    m.trackFormChange(t(v), q(v), v.nodeName, w, g.map(v.classList), x, o(u))
                }
            }
            function p(u) {
                return function(x) {
                    var w = x.target;
                    var v = i(w);
                    m.trackFormSubmission(q(w), g.map(w.classList), v, o(u))
                }
            }
            return {
                configureFormTracking: function(u, v) {
                    if (u) {
                        s = f.getFilter(u.forms, true);
                        j = f.getFilter(u.fields, false)
                    }
                },
                addFormListeners: function(u) {
                    g.forEach(document.getElementsByTagName("form"), function(v) {
                        if (s(v) && !v[h]) {
                            g.forEach(r, function(w) {
                                g.forEach(v.getElementsByTagName(w), function(x) {
                                    if (j(x) && !x[h]) {
                                        f.addEventListener(x, "change", n(u), false);
                                        x[h] = true
                                    }
                                })
                            });
                            f.addEventListener(v, "submit", p(u));
                            v[h] = true
                        }
                    })
                }
            }
        }
    }
    , {
        "./lib/helpers": 21,
        "./lib_managed/lodash": 23
    }],
    18: [function(b, c, a) {
        (function() {
            var h = b("./lib_managed/lodash")
              , g = b("./lib/helpers")
              , f = b("uuid")
              , d = typeof a !== "undefined" ? a : this;
            d.InQueueManager = function(j, r, q, n, s) {
                var o = f.v4()
                  , l = {};
                function u(y) {
                    var z = [];
                    if (!y || y.length === 0) {
                        z = h.map(l)
                    } else {
                        for (var x = 0; x < y.length; x++) {
                            if (l.hasOwnProperty(y[x])) {
                                z.push(l[y[x]])
                            } else {
                                g.warn('Warning: Tracker namespace "' + y[x] + '" not configured')
                            }
                        }
                    }
                    if (z.length === 0) {
                        g.warn("Warning: No tracker configured")
                    }
                    return z
                }
                function m(y, z, x) {
                    g.warn(y + " is deprecated. Set the collector when a new tracker instance using newTracker.");
                    var i;
                    if (h.isUndefined(x)) {
                        i = "sp"
                    } else {
                        i = x
                    }
                    t(i);
                    l[i][y](z)
                }
                function t(x, y, i) {
                    i = i || {};
                    l[x] = new j(s,x,r,o,q,i);
                    l[x].setCollectorUrl(y)
                }
                function w(z) {
                    var y = z.split(":")
                      , i = y[0]
                      , x = (y.length > 1) ? y[1].split(";") : [];
                    return [i, x]
                }
                function v() {
                    var z, y, B, A, x, E, C, D;
                    for (z = 0; z < arguments.length; z += 1) {
                        A = arguments[z];
                        x = Array.prototype.shift.call(A);
                        if (h.isFunction(x)) {
                            x.apply(l, A);
                            continue
                        }
                        E = w(x);
                        B = E[0];
                        C = E[1];
                        if (B === "newTracker") {
                            t(A[0], A[1], A[2]);
                            continue
                        }
                        if ((B === "setCollectorCf" || B === "setCollectorUrl") && (!C || C.length === 0)) {
                            m(B, A[0], A[1]);
                            continue
                        }
                        D = u(C);
                        for (y = 0; y < D.length; y++) {
                            D[y][B].apply(D[y], A)
                        }
                    }
                }
                for (var p = 0; p < n.length; p++) {
                    v(n[p])
                }
                return {
                    push: v
                }
            }
        }())
    }
    , {
        "./lib/helpers": 21,
        "./lib_managed/lodash": 23,
        uuid: 16
    }],
    19: [function(d, f, b) {
        var h = d("./snowplow"), g, a, c = window;
        if (c.GlobalSnowplowNamespace && c.GlobalSnowplowNamespace.length > 0) {
            g = c.GlobalSnowplowNamespace.shift();
            a = c[g];
            a.q = new h.Snowplow(a.q,g)
        } else {
            c._snaq = c._snaq || [];
            c._snaq = new h.Snowplow(c._snaq,"_snaq")
        }
    }
    , {
        "./snowplow": 26
    }],
    20: [function(b, c, a) {
        (function() {
            var n = b("../lib_managed/lodash")
              , m = b("murmurhash").v3
              , h = b("jstimezonedetect").jstz.determine()
              , f = b("browser-cookie-lite")
              , i = typeof a !== "undefined" ? a : this
              , l = window
              , d = navigator
              , j = screen
              , g = document;
            i.hasSessionStorage = function() {
                try {
                    return !!l.sessionStorage
                } catch (o) {
                    return true
                }
            }
            ;
            i.hasLocalStorage = function() {
                try {
                    return !!l.localStorage
                } catch (o) {
                    return true
                }
            }
            ;
            i.localStorageAccessible = function() {
                var o = "modernizr";
                if (!i.hasLocalStorage()) {
                    return false
                }
                try {
                    l.localStorage.setItem(o, o);
                    l.localStorage.removeItem(o);
                    return true
                } catch (p) {
                    return false
                }
            }
            ;
            i.hasCookies = function(o) {
                var p = o || "testcookie";
                if (n.isUndefined(d.cookieEnabled)) {
                    f.cookie(p, "1");
                    return f.cookie(p) === "1" ? "1" : "0"
                }
                return d.cookieEnabled ? "1" : "0"
            }
            ;
            i.detectSignature = function(t) {
                var r = [d.userAgent, [j.height, j.width, j.colorDepth].join("x"), (new Date()).getTimezoneOffset(), i.hasSessionStorage(), i.hasLocalStorage()];
                var o = [];
                if (d.plugins) {
                    for (var s = 0; s < d.plugins.length; s++) {
                        var p = [];
                        for (var q = 0; q < d.plugins[s].length; q++) {
                            p.push([d.plugins[s][q].type, d.plugins[s][q].suffixes])
                        }
                        o.push([d.plugins[s].name + "::" + d.plugins[s].description, p.join("~")])
                    }
                }
                return m(r.join("###") + "###" + o.sort().join(";"), t)
            }
            ;
            i.detectTimezone = function() {
                return (typeof (h) === "undefined") ? "" : h.name()
            }
            ;
            i.detectViewport = function() {
                var p = l
                  , o = "inner";
                if (!("innerWidth"in l)) {
                    o = "client";
                    p = g.documentElement || g.body
                }
                return p[o + "Width"] + "x" + p[o + "Height"]
            }
            ;
            i.detectDocumentSize = function() {
                var s = g.documentElement
                  , q = g.body
                  , r = q ? Math.max(q.offsetHeight, q.scrollHeight) : 0;
                var o = Math.max(s.clientWidth, s.offsetWidth, s.scrollWidth);
                var p = Math.max(s.clientHeight, s.offsetHeight, s.scrollHeight, r);
                return isNaN(o) || isNaN(p) ? "" : o + "x" + p
            }
            ;
            i.detectBrowserFeatures = function(q, p) {
                var o, s, t = {
                    pdf: "application/pdf",
                    qt: "video/quicktime",
                    realp: "audio/x-pn-realaudio-plugin",
                    wma: "application/x-mplayer2",
                    dir: "application/x-director",
                    fla: "application/x-shockwave-flash",
                    java: "application/x-java-vm",
                    gears: "application/x-googlegears",
                    ag: "application/x-silverlight"
                }, r = {};
                if (d.mimeTypes && d.mimeTypes.length) {
                    for (o in t) {
                        if (Object.prototype.hasOwnProperty.call(t, o)) {
                            s = d.mimeTypes[t[o]];
                            r[o] = (s && s.enabledPlugin) ? "1" : "0"
                        }
                    }
                }
                if (typeof d.javaEnabled !== "unknown" && !n.isUndefined(d.javaEnabled) && d.javaEnabled()) {
                    r.java = "1"
                }
                if (n.isFunction(l.GearsFactory)) {
                    r.gears = "1"
                }
                r.res = j.width + "x" + j.height;
                r.cd = j.colorDepth;
                if (q) {
                    r.cookie = i.hasCookies(p)
                }
                return r
            }
        }())
    }
    , {
        "../lib_managed/lodash": 23,
        "browser-cookie-lite": 2,
        jstimezonedetect: 3,
        murmurhash: 4
    }],
    21: [function(b, c, a) {
        (function() {
            var g = b("../lib_managed/lodash")
              , d = typeof a !== "undefined" ? a : this;
            d.fixupTitle = function(i) {
                if (!g.isString(i)) {
                    i = i.text || "";
                    var h = document.getElementsByTagName("title");
                    if (h && !g.isUndefined(h[0])) {
                        i = h[0].text
                    }
                }
                return i
            }
            ;
            d.getHostName = function(h) {
                var j = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)")
                  , i = j.exec(h);
                return i ? i[1] : h
            }
            ;
            d.fixupDomain = function(i) {
                var h = i.length;
                if (i.charAt(--h) === ".") {
                    i = i.slice(0, h)
                }
                if (i.slice(0, 2) === "*.") {
                    i = i.slice(1)
                }
                return i
            }
            ;
            d.getReferrer = function(j) {
                var i = "";
                var h = d.fromQuerystring("referrer", window.location.href) || d.fromQuerystring("referer", window.location.href);
                if (h) {
                    return h
                }
                if (j) {
                    return j
                }
                try {
                    i = window.top.document.referrer
                } catch (m) {
                    if (window.parent) {
                        try {
                            i = window.parent.document.referrer
                        } catch (l) {
                            i = ""
                        }
                    }
                }
                if (i === "") {
                    i = document.referrer
                }
                return i
            }
            ;
            d.addEventListener = function(l, j, i, h) {
                if (l.addEventListener) {
                    l.addEventListener(j, i, h);
                    return true
                }
                if (l.attachEvent) {
                    return l.attachEvent("on" + j, i)
                }
                l["on" + j] = i
            }
            ;
            d.fromQuerystring = function(j, i) {
                var h = new RegExp("^[^#]*[?&]" + j + "=([^&#]*)").exec(i);
                if (!h) {
                    return null
                }
                return decodeURIComponent(h[1].replace(/\+/g, " "))
            }
            ;
            d.warn = function(h) {
                if (typeof console !== "undefined") {
                    console.warn("Snowplow: " + h)
                }
            }
            ;
            function f(h, m) {
                var l = g.map(h.classList), j;
                for (j = 0; j < l.length; j++) {
                    if (m[l[j]]) {
                        return true
                    }
                }
                return false
            }
            d.getFilter = function(n, o) {
                if (g.isArray(n) || !g.isObject(n)) {
                    return function(i) {
                        return true
                    }
                }
                if (n.hasOwnProperty("filter")) {
                    return n.filter
                } else {
                    var j = n.hasOwnProperty("whitelist");
                    var m = n.whitelist || n.blacklist;
                    if (!g.isArray(m)) {
                        m = [m]
                    }
                    var h = {};
                    for (var l = 0; l < m.length; l++) {
                        h[m[l]] = true
                    }
                    if (o) {
                        return function(i) {
                            return f(i, h) === j
                        }
                    } else {
                        return function(i) {
                            return i.name in h === j
                        }
                    }
                }
            }
            ;
            d.decorateQuerystring = function(h, j, s) {
                var q = j + "=" + s;
                var p = h.split("#");
                var l = p[0].split("?");
                var o = l.shift();
                var t = l.join("?");
                if (!t) {
                    t = q
                } else {
                    var m = true;
                    var r = t.split("&");
                    for (var n = 0; n < r.length; n++) {
                        if (r[n].substr(0, j.length + 1) === j + "=") {
                            m = false;
                            r[n] = q;
                            t = r.join("&");
                            break
                        }
                    }
                    if (m) {
                        t = q + "&" + t
                    }
                }
                p[0] = o + "?" + t;
                return p.join("#")
            }
            ;
            d.attemptGetLocalStorage = function(h) {
                try {
                    return localStorage.getItem(h)
                } catch (i) {}
            }
            ;
            d.attemptWriteLocalStorage = function(h, i) {
                try {
                    localStorage.setItem(h, i);
                    return true
                } catch (j) {
                    return false
                }
            }
        }())
    }
    , {
        "../lib_managed/lodash": 23
    }],
    22: [function(b, c, a) {
        (function() {
            var g = b("./helpers")
              , d = typeof a !== "undefined" ? a : this;
            function i(l) {
                var j = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
                return j.test(l)
            }
            function f(n) {
                var l, j;
                if (i(n)) {
                    try {
                        l = document.body.children[0].children[0].children[0].children[0].children[0].children[0].innerHTML;
                        j = "You have reached the cached page for";
                        return l.slice(0, j.length) === j
                    } catch (m) {
                        return false
                    }
                }
            }
            function h(m, l) {
                var o = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)")
                  , n = o.exec(m)
                  , j = g.fromQuerystring(l, n[1]);
                return j
            }
            d.fixupUrl = function(m, j, l) {
                if (m === "translate.googleusercontent.com") {
                    if (l === "") {
                        l = j
                    }
                    j = h(j, "u");
                    m = g.getHostName(j)
                } else {
                    if (m === "cc.bingj.com" || m === "webcache.googleusercontent.com" || f(m)) {
                        j = document.links[0].href;
                        m = g.getHostName(j)
                    }
                }
                return [m, j, l]
            }
        }())
    }
    , {
        "./helpers": 21
    }],
    23: [function(b, c, a) {
        (function(d) {
            (function() {
                var ag = [];
                var aa = {};
                var X = 40;
                var aj = /\w*$/;
                var af = /^\s*function[ \n\r\t]+\w/;
                var h = /\bthis\b/;
                var K = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
                var j = "[object Arguments]"
                  , H = "[object Array]"
                  , an = "[object Boolean]"
                  , r = "[object Date]"
                  , aL = "[object Error]"
                  , u = "[object Function]"
                  , at = "[object Number]"
                  , av = "[object Object]"
                  , ay = "[object RegExp]"
                  , R = "[object String]";
                var W = {};
                W[u] = false;
                W[j] = W[H] = W[an] = W[r] = W[at] = W[av] = W[ay] = W[R] = true;
                var aI = {
                    configurable: false,
                    enumerable: false,
                    value: null,
                    writable: false
                };
                var U = {
                    args: "",
                    array: null,
                    bottom: "",
                    firstArg: "",
                    init: "",
                    keys: null,
                    loop: "",
                    shadowedProps: null,
                    support: null,
                    top: "",
                    useHas: false
                };
                var am = {
                    "boolean": false,
                    "function": true,
                    object: true,
                    number: false,
                    string: false,
                    "undefined": false
                };
                var aD = (am[typeof window] && window) || this;
                var v = am[typeof a] && a && !a.nodeType && a;
                var N = am[typeof c] && c && !c.nodeType && c;
                var aN = N && N.exports === v && v;
                var ap = am[typeof d] && d;
                if (ap && (ap.global === ap || ap.window === ap)) {
                    aD = ap
                }
                function aP() {
                    return ag.pop() || []
                }
                function S(aT) {
                    return typeof aT.toString != "function" && typeof (aT + "") == "string"
                }
                function az(aT) {
                    aT.length = 0;
                    if (ag.length < X) {
                        ag.push(aT)
                    }
                }
                function z(aY, aX, aU) {
                    aX || (aX = 0);
                    if (typeof aU == "undefined") {
                        aU = aY ? aY.length : 0
                    }
                    var aV = -1
                      , aW = aU - aX || 0
                      , aT = Array(aW < 0 ? 0 : aW);
                    while (++aV < aW) {
                        aT[aV] = aY[aX + aV]
                    }
                    return aT
                }
                var n = [];
                var l = Error.prototype
                  , aF = Object.prototype
                  , Z = String.prototype;
                var al = aF.toString;
                var q = RegExp("^" + String(al).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$");
                var y = Function.prototype.toString
                  , ad = aF.hasOwnProperty
                  , i = n.push
                  , ac = aF.propertyIsEnumerable
                  , aH = n.unshift;
                var w = (function() {
                    try {
                        var aW = {}
                          , aU = O(aU = Object.defineProperty) && aU
                          , aT = aU(aW, aW, aW) && aU
                    } catch (aV) {}
                    return aT
                }());
                var P = O(P = Object.create) && P
                  , t = O(t = Array.isArray) && t
                  , aO = O(aO = Object.keys) && aO;
                var ae = {};
                ae[H] = Array;
                ae[an] = Boolean;
                ae[r] = Date;
                ae[u] = Function;
                ae[av] = Object;
                ae[at] = Number;
                ae[ay] = RegExp;
                ae[R] = String;
                var au = {};
                au[H] = au[r] = au[at] = {
                    constructor: true,
                    toLocaleString: true,
                    toString: true,
                    valueOf: true
                };
                au[an] = au[R] = {
                    constructor: true,
                    toString: true,
                    valueOf: true
                };
                au[aL] = au[u] = au[ay] = {
                    constructor: true,
                    toString: true
                };
                au[av] = {
                    constructor: true
                };
                (function() {
                    var aV = K.length;
                    while (aV--) {
                        var aT = K[aV];
                        for (var aU in au) {
                            if (ad.call(au, aU) && !ad.call(au[aU], aT)) {
                                au[aU][aT] = false
                            }
                        }
                    }
                }());
                function A() {}
                var aG = A.support = {};
                (function() {
                    var aW = function() {
                        this.x = 1
                    }
                      , aT = {
                        "0": 1,
                        length: 1
                    }
                      , aV = [];
                    aW.prototype = {
                        valueOf: 1,
                        y: 1
                    };
                    for (var aU in new aW) {
                        aV.push(aU)
                    }
                    for (aU in arguments) {}
                    aG.argsClass = al.call(arguments) == j;
                    aG.argsObject = arguments.constructor == Object && !(arguments instanceof Array);
                    aG.enumErrorProps = ac.call(l, "message") || ac.call(l, "name");
                    aG.enumPrototypes = ac.call(aW, "prototype");
                    aG.funcDecomp = !O(aD.WinRTError) && h.test(function() {
                        return this
                    });
                    aG.funcNames = typeof Function.name == "string";
                    aG.nonEnumArgs = aU != 0;
                    aG.nonEnumShadows = !/valueOf/.test(aV);
                    aG.spliceObjects = (n.splice.call(aT, 0, 1),
                    !aT[0]);
                    aG.unindexedChars = ("x"[0] + Object("x")[0]) != "xx";
                    try {
                        aG.nodeClass = !(al.call(document) == av && !({
                            toString: 0
                        } + ""))
                    } catch (aX) {
                        aG.nodeClass = true
                    }
                }(1));
                var ab = function(aV) {
                    var aT = "var index, iterable = " + (aV.firstArg) + ", result = " + (aV.init) + ";\nif (!iterable) return result;\n" + (aV.top) + ";";
                    if (aV.array) {
                        aT += "\nvar length = iterable.length; index = -1;\nif (" + (aV.array) + ") {  ";
                        if (aG.unindexedChars) {
                            aT += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "
                        }
                        aT += "\n  while (++index < length) {\n    " + (aV.loop) + ";\n  }\n}\nelse {  "
                    } else {
                        if (aG.nonEnumArgs) {
                            aT += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + (aV.loop) + ";\n    }\n  } else {  "
                        }
                    }
                    if (aG.enumPrototypes) {
                        aT += "\n  var skipProto = typeof iterable == 'function';\n  "
                    }
                    if (aG.enumErrorProps) {
                        aT += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  "
                    }
                    var aU = [];
                    if (aG.enumPrototypes) {
                        aU.push('!(skipProto && index == "prototype")')
                    }
                    if (aG.enumErrorProps) {
                        aU.push('!(skipErrorProps && (index == "message" || index == "name"))')
                    }
                    if (aV.useHas && aV.keys) {
                        aT += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n";
                        if (aU.length) {
                            aT += "    if (" + (aU.join(" && ")) + ") {\n  "
                        }
                        aT += (aV.loop) + ";    ";
                        if (aU.length) {
                            aT += "\n    }"
                        }
                        aT += "\n  }  "
                    } else {
                        aT += "\n  for (index in iterable) {\n";
                        if (aV.useHas) {
                            aU.push("hasOwnProperty.call(iterable, index)")
                        }
                        if (aU.length) {
                            aT += "    if (" + (aU.join(" && ")) + ") {\n  "
                        }
                        aT += (aV.loop) + ";    ";
                        if (aU.length) {
                            aT += "\n    }"
                        }
                        aT += "\n  }    ";
                        if (aG.nonEnumShadows) {
                            aT += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ";
                            for (k = 0; k < 7; k++) {
                                aT += "\n    index = '" + (aV.shadowedProps[k]) + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))";
                                if (!aV.useHas) {
                                    aT += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"
                                }
                                aT += ") {\n      " + (aV.loop) + ";\n    }      "
                            }
                            aT += "\n  }    "
                        }
                    }
                    if (aV.array || aG.nonEnumArgs) {
                        aT += "\n}"
                    }
                    aT += (aV.bottom) + ";\nreturn result";
                    return aT
                };
                function G(aX) {
                    var aW = aX[0]
                      , aU = aX[2]
                      , aT = aX[4];
                    function aV() {
                        if (aU) {
                            var a0 = z(aU);
                            i.apply(a0, arguments)
                        }
                        if (this instanceof aV) {
                            var aZ = s(aW.prototype)
                              , aY = aW.apply(aZ, a0 || arguments);
                            return E(aY) ? aY : aZ
                        }
                        return aW.apply(aT, a0 || arguments)
                    }
                    aM(aV, aX);
                    return aV
                }
                function ao(a2, aZ, a3, aX, aV) {
                    if (a3) {
                        var a4 = a3(a2);
                        if (typeof a4 != "undefined") {
                            return a4
                        }
                    }
                    var aW = E(a2);
                    if (aW) {
                        var a0 = al.call(a2);
                        if (!W[a0] || (!aG.nodeClass && S(a2))) {
                            return a2
                        }
                        var a1 = ae[a0];
                        switch (a0) {
                        case an:
                        case r:
                            return new a1(+a2);
                        case at:
                        case R:
                            return new a1(a2);
                        case ay:
                            a4 = a1(a2.source, aj.exec(a2));
                            a4.lastIndex = a2.lastIndex;
                            return a4
                        }
                    } else {
                        return a2
                    }
                    var aY = f(a2);
                    if (aZ) {
                        var aU = !aX;
                        aX || (aX = aP());
                        aV || (aV = aP());
                        var aT = aX.length;
                        while (aT--) {
                            if (aX[aT] == a2) {
                                return aV[aT]
                            }
                        }
                        a4 = aY ? a1(a2.length) : {}
                    } else {
                        a4 = aY ? z(a2) : aC({}, a2)
                    }
                    if (aY) {
                        if (ad.call(a2, "index")) {
                            a4.index = a2.index
                        }
                        if (ad.call(a2, "input")) {
                            a4.input = a2.input
                        }
                    }
                    if (!aZ) {
                        return a4
                    }
                    aX.push(a2);
                    aV.push(a4);
                    (aY ? L : Y)(a2, function(a5, a6) {
                        a4[a6] = ao(a5, aZ, a3, aX, aV)
                    });
                    if (aU) {
                        az(aX);
                        az(aV)
                    }
                    return a4
                }
                function s(aT, aU) {
                    return E(aT) ? P(aT) : {}
                }
                if (!P) {
                    s = (function() {
                        function aT() {}
                        return function(aV) {
                            if (E(aV)) {
                                aT.prototype = aV;
                                var aU = new aT;
                                aT.prototype = null
                            }
                            return aU || aD.Object()
                        }
                    }())
                }
                function aS(aU, aT, aX) {
                    if (typeof aU != "function") {
                        return T
                    }
                    if (typeof aT == "undefined" || !("prototype"in aU)) {
                        return aU
                    }
                    var aW = aU.__bindData__;
                    if (typeof aW == "undefined") {
                        if (aG.funcNames) {
                            aW = !aU.name
                        }
                        aW = aW || !aG.funcDecomp;
                        if (!aW) {
                            var aV = y.call(aU);
                            if (!aG.funcNames) {
                                aW = !af.test(aV)
                            }
                            if (!aW) {
                                aW = h.test(aV);
                                aM(aU, aW)
                            }
                        }
                    }
                    if (aW === false || (aW !== true && aW[1] & 1)) {
                        return aU
                    }
                    switch (aX) {
                    case 1:
                        return function(aY) {
                            return aU.call(aT, aY)
                        }
                        ;
                    case 2:
                        return function(aZ, aY) {
                            return aU.call(aT, aZ, aY)
                        }
                        ;
                    case 3:
                        return function(aZ, aY, a0) {
                            return aU.call(aT, aZ, aY, a0)
                        }
                        ;
                    case 4:
                        return function(aY, a0, aZ, a1) {
                            return aU.call(aT, aY, a0, aZ, a1)
                        }
                    }
                    return aE(aU, aT)
                }
                function Q(aW) {
                    var aY = aW[0]
                      , aV = aW[1]
                      , a0 = aW[2]
                      , aU = aW[3]
                      , a3 = aW[4]
                      , aT = aW[5];
                    var aX = aV & 1
                      , a5 = aV & 2
                      , a2 = aV & 4
                      , a1 = aV & 8
                      , a4 = aY;
                    function aZ() {
                        var a7 = aX ? a3 : this;
                        if (a0) {
                            var a8 = z(a0);
                            i.apply(a8, arguments)
                        }
                        if (aU || a2) {
                            a8 || (a8 = z(arguments));
                            if (aU) {
                                i.apply(a8, aU)
                            }
                            if (a2 && a8.length < aT) {
                                aV |= 16 & ~32;
                                return Q([aY, (a1 ? aV : aV & ~3), a8, null, a3, aT])
                            }
                        }
                        a8 || (a8 = arguments);
                        if (a5) {
                            aY = a7[a4]
                        }
                        if (this instanceof aZ) {
                            a7 = s(aY.prototype);
                            var a6 = aY.apply(a7, a8);
                            return E(a6) ? a6 : a7
                        }
                        return aY.apply(a7, a8)
                    }
                    aM(aZ, aW);
                    return aZ
                }
                function aB(bb, ba, a0, a7, bd, bc) {
                    if (a0) {
                        var a5 = a0(bb, ba);
                        if (typeof a5 != "undefined") {
                            return !!a5
                        }
                    }
                    if (bb === ba) {
                        return bb !== 0 || (1 / bb == 1 / ba)
                    }
                    var aZ = typeof bb
                      , aX = typeof ba;
                    if (bb === bb && !(bb && am[aZ]) && !(ba && am[aX])) {
                        return false
                    }
                    if (bb == null || ba == null) {
                        return bb === ba
                    }
                    var aU = al.call(bb)
                      , a3 = al.call(ba);
                    if (aU == j) {
                        aU = av
                    }
                    if (a3 == j) {
                        a3 = av
                    }
                    if (aU != a3) {
                        return false
                    }
                    switch (aU) {
                    case an:
                    case r:
                        return +bb == +ba;
                    case at:
                        return (bb != +bb) ? ba != +ba : (bb == 0 ? (1 / bb == 1 / ba) : bb == +ba);
                    case ay:
                    case R:
                        return bb == String(ba)
                    }
                    var a1 = aU == H;
                    if (!a1) {
                        var a6 = ad.call(bb, "__wrapped__")
                          , aT = ad.call(ba, "__wrapped__");
                        if (a6 || aT) {
                            return aB(a6 ? bb.__wrapped__ : bb, aT ? ba.__wrapped__ : ba, a0, a7, bd, bc)
                        }
                        if (aU != av || (!aG.nodeClass && (S(bb) || S(ba)))) {
                            return false
                        }
                        var aY = !aG.argsObject && g(bb) ? Object : bb.constructor
                          , aV = !aG.argsObject && g(ba) ? Object : ba.constructor;
                        if (aY != aV && !(aA(aY) && aY instanceof aY && aA(aV) && aV instanceof aV) && ("constructor"in bb && "constructor"in ba)) {
                            return false
                        }
                    }
                    var a4 = !bd;
                    bd || (bd = aP());
                    bc || (bc = aP());
                    var aW = bd.length;
                    while (aW--) {
                        if (bd[aW] == bb) {
                            return bc[aW] == ba
                        }
                    }
                    var a8 = 0;
                    a5 = true;
                    bd.push(bb);
                    bc.push(ba);
                    if (a1) {
                        aW = bb.length;
                        a8 = ba.length;
                        a5 = a8 == aW;
                        if (a5 || a7) {
                            while (a8--) {
                                var a2 = aW
                                  , a9 = ba[a8];
                                if (a7) {
                                    while (a2--) {
                                        if ((a5 = aB(bb[a2], a9, a0, a7, bd, bc))) {
                                            break
                                        }
                                    }
                                } else {
                                    if (!(a5 = aB(bb[a8], a9, a0, a7, bd, bc))) {
                                        break
                                    }
                                }
                            }
                        }
                    } else {
                        ai(ba, function(bg, bf, be) {
                            if (ad.call(be, bf)) {
                                a8++;
                                return (a5 = ad.call(bb, bf) && aB(bb[bf], bg, a0, a7, bd, bc))
                            }
                        });
                        if (a5 && !a7) {
                            ai(bb, function(bg, bf, be) {
                                if (ad.call(be, bf)) {
                                    return (a5 = --a8 > -1)
                                }
                            })
                        }
                    }
                    bd.pop();
                    bc.pop();
                    if (a4) {
                        az(bd);
                        az(bc)
                    }
                    return a5
                }
                function F(aZ, aW, a0, aV, a5, aT) {
                    var aY = aW & 1
                      , a6 = aW & 2
                      , a3 = aW & 4
                      , a2 = aW & 8
                      , aU = aW & 16
                      , a1 = aW & 32;
                    if (!a6 && !aA(aZ)) {
                        throw new TypeError
                    }
                    if (aU && !a0.length) {
                        aW &= ~16;
                        aU = a0 = false
                    }
                    if (a1 && !aV.length) {
                        aW &= ~32;
                        a1 = aV = false
                    }
                    var aX = aZ && aZ.__bindData__;
                    if (aX && aX !== true) {
                        aX = z(aX);
                        if (aX[2]) {
                            aX[2] = z(aX[2])
                        }
                        if (aX[3]) {
                            aX[3] = z(aX[3])
                        }
                        if (aY && !(aX[1] & 1)) {
                            aX[4] = a5
                        }
                        if (!aY && aX[1] & 1) {
                            aW |= 8
                        }
                        if (a3 && !(aX[1] & 4)) {
                            aX[5] = aT
                        }
                        if (aU) {
                            i.apply(aX[2] || (aX[2] = []), a0)
                        }
                        if (a1) {
                            aH.apply(aX[3] || (aX[3] = []), aV)
                        }
                        aX[1] |= aW;
                        return F.apply(null, aX)
                    }
                    var a4 = (aW == 1 || aW === 17) ? G : Q;
                    return a4([aZ, aW, a0, aV, a5, aT])
                }
                function ar() {
                    U.shadowedProps = K;
                    U.array = U.bottom = U.loop = U.top = "";
                    U.init = "iterable";
                    U.useHas = true;
                    for (var aW, aV = 0; aW = arguments[aV]; aV++) {
                        for (var aX in aW) {
                            U[aX] = aW[aX]
                        }
                    }
                    var aU = U.args;
                    U.firstArg = /^[^,]+/.exec(aU)[0];
                    var aT = Function("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + aU + ") {\n" + ab(U) + "\n}");
                    return aT(aS, aL, l, ad, aa, g, f, aJ, U.keys, aF, am, au, R, Z, al)
                }
                function O(aT) {
                    return typeof aT == "function" && q.test(aT)
                }
                var aM = !w ? aw : function(aT, aU) {
                    aI.value = aU;
                    w(aT, "__bindData__", aI)
                }
                ;
                function g(aT) {
                    return aT && typeof aT == "object" && typeof aT.length == "number" && al.call(aT) == j || false
                }
                if (!aG.argsClass) {
                    g = function(aT) {
                        return aT && typeof aT == "object" && typeof aT.length == "number" && ad.call(aT, "callee") && !ac.call(aT, "callee") || false
                    }
                }
                var f = t || function(aT) {
                    return aT && typeof aT == "object" && typeof aT.length == "number" && al.call(aT) == H || false
                }
                ;
                var V = ar({
                    args: "object",
                    init: "[]",
                    top: "if (!(objectTypes[typeof object])) return result",
                    loop: "result.push(index)"
                });
                var J = !aO ? V : function(aT) {
                    if (!E(aT)) {
                        return []
                    }
                    if ((aG.enumPrototypes && typeof aT == "function") || (aG.nonEnumArgs && aT.length && g(aT))) {
                        return V(aT)
                    }
                    return aO(aT)
                }
                ;
                var aK = {
                    args: "collection, callback, thisArg",
                    top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
                    array: "typeof length == 'number'",
                    keys: J,
                    loop: "if (callback(iterable[index], index, collection) === false) return result"
                };
                var I = {
                    args: "object, source, guard",
                    top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",
                    keys: J,
                    loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
                    bottom: "  }\n}"
                };
                var ak = {
                    top: "if (!objectTypes[typeof iterable]) return result;\n" + aK.top,
                    array: false
                };
                var L = ar(aK);
                var aC = ar(I, {
                    top: I.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),
                    loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"
                });
                function B(aV, aU, aW, aT) {
                    if (typeof aU != "boolean" && aU != null) {
                        aT = aW;
                        aW = aU;
                        aU = false
                    }
                    return ao(aV, aU, typeof aW == "function" && aS(aW, aT, 1))
                }
                var ai = ar(aK, ak, {
                    useHas: false
                });
                var Y = ar(aK, ak);
                function m(aT) {
                    return aT && typeof aT == "object" && al.call(aT) == r || false
                }
                function p(aW) {
                    var aT = true;
                    if (!aW) {
                        return aT
                    }
                    var aU = al.call(aW)
                      , aV = aW.length;
                    if ((aU == H || aU == R || (aG.argsClass ? aU == j : g(aW))) || (aU == av && typeof aV == "number" && aA(aW.splice))) {
                        return !aV
                    }
                    Y(aW, function() {
                        return (aT = false)
                    });
                    return aT
                }
                function aA(aT) {
                    return typeof aT == "function"
                }
                if (aA(/x/)) {
                    aA = function(aT) {
                        return typeof aT == "function" && al.call(aT) == u
                    }
                }
                function E(aT) {
                    return !!(aT && am[typeof aT])
                }
                function aQ(aT) {
                    return aT === null
                }
                function aJ(aT) {
                    return typeof aT == "string" || aT && typeof aT == "object" && al.call(aT) == R || false
                }
                function M(aT) {
                    return typeof aT == "undefined"
                }
                function ah(aV, aW, aU) {
                    var aT = {};
                    aW = A.createCallback(aW, aU, 3);
                    Y(aV, function(aZ, aY, aX) {
                        aT[aY] = aW(aZ, aY, aX)
                    });
                    return aT
                }
                function D(aY, aZ, aU) {
                    var aT = [];
                    aZ = A.createCallback(aZ, aU, 3);
                    if (f(aY)) {
                        var aV = -1
                          , aW = aY.length;
                        while (++aV < aW) {
                            var aX = aY[aV];
                            if (aZ(aX, aV, aY)) {
                                aT.push(aX)
                            }
                        }
                    } else {
                        L(aY, function(a1, a0, a2) {
                            if (aZ(a1, a0, a2)) {
                                aT.push(a1)
                            }
                        })
                    }
                    return aT
                }
                function aR(aY, aZ, aU) {
                    aZ = A.createCallback(aZ, aU, 3);
                    if (f(aY)) {
                        var aV = -1
                          , aW = aY.length;
                        while (++aV < aW) {
                            var aX = aY[aV];
                            if (aZ(aX, aV, aY)) {
                                return aX
                            }
                        }
                    } else {
                        var aT;
                        L(aY, function(a1, a0, a2) {
                            if (aZ(a1, a0, a2)) {
                                aT = a1;
                                return false
                            }
                        });
                        return aT
                    }
                }
                function ax(aW, aX, aT) {
                    if (aX && typeof aT == "undefined" && f(aW)) {
                        var aU = -1
                          , aV = aW.length;
                        while (++aU < aV) {
                            if (aX(aW[aU], aU, aW) === false) {
                                break
                            }
                        }
                    } else {
                        L(aW, aX, aT)
                    }
                    return aW
                }
                function x(aX, aY, aU) {
                    var aV = -1
                      , aW = aX ? aX.length : 0
                      , aT = Array(typeof aW == "number" ? aW : 0);
                    aY = A.createCallback(aY, aU, 3);
                    if (f(aX)) {
                        while (++aV < aW) {
                            aT[aV] = aY(aX[aV], aV, aX)
                        }
                    } else {
                        L(aX, function(a0, aZ, a1) {
                            aT[++aV] = aY(a0, aZ, a1)
                        })
                    }
                    return aT
                }
                function C(aX) {
                    var aU = -1
                      , aV = aX ? aX.length : 0
                      , aT = [];
                    while (++aU < aV) {
                        var aW = aX[aU];
                        if (aW) {
                            aT.push(aW)
                        }
                    }
                    return aT
                }
                function aE(aU, aT) {
                    return arguments.length > 2 ? F(aU, 17, z(arguments, 2), null, aT) : F(aU, 1, null, null, aT)
                }
                function o(aY, aU, aZ) {
                    var aX = typeof aY;
                    if (aY == null || aX == "function") {
                        return aS(aY, aU, aZ)
                    }
                    if (aX != "object") {
                        return aq(aY)
                    }
                    var aW = J(aY)
                      , aV = aW[0]
                      , aT = aY[aV];
                    if (aW.length == 1 && aT === aT && !E(aT)) {
                        return function(a1) {
                            var a0 = a1[aV];
                            return aT === a0 && (aT !== 0 || (1 / aT == 1 / a0))
                        }
                    }
                    return function(a1) {
                        var a2 = aW.length
                          , a0 = false;
                        while (a2--) {
                            if (!(a0 = aB(a1[aW[a2]], aY[aW[a2]], null, true))) {
                                break
                            }
                        }
                        return a0
                    }
                }
                function T(aT) {
                    return aT
                }
                function aw() {}
                function aq(aT) {
                    return function(aU) {
                        return aU[aT]
                    }
                }
                A.assign = aC;
                A.bind = aE;
                A.compact = C;
                A.createCallback = o;
                A.filter = D;
                A.forEach = ax;
                A.forIn = ai;
                A.forOwn = Y;
                A.keys = J;
                A.map = x;
                A.mapValues = ah;
                A.property = aq;
                A.collect = x;
                A.each = ax;
                A.extend = aC;
                A.select = D;
                A.clone = B;
                A.find = aR;
                A.identity = T;
                A.isArguments = g;
                A.isArray = f;
                A.isDate = m;
                A.isEmpty = p;
                A.isFunction = aA;
                A.isNull = aQ;
                A.isObject = E;
                A.isString = aJ;
                A.isUndefined = M;
                A.noop = aw;
                A.detect = aR;
                A.findWhere = aR;
                A.VERSION = "2.4.1";
                if (v && N) {
                    if (aN) {
                        (N.exports = A)._ = A
                    }
                }
            }
            .call(this))
        }
        ).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }
    , {}],
    24: [function(c, d, a) {
        var g = c("./lib_managed/lodash")
          , f = c("./lib/helpers")
          , b = typeof a !== "undefined" ? a : this;
        b.getLinkTrackingManager = function(p, j, s) {
            var i, h, o, t, n, q;
            function u(x, w) {
                var E, G, C, D, B, F;
                while ((E = x.parentNode) !== null && !g.isUndefined(E) && ((G = x.tagName.toUpperCase()) !== "A" && G !== "AREA")) {
                    x = E
                }
                if (!g.isUndefined(x.href)) {
                    var A = x.hostname || f.getHostName(x.href)
                      , y = A.toLowerCase()
                      , v = x.href.replace(A, y)
                      , z = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):","i");
                    if (!z.test(v)) {
                        C = x.id;
                        D = g.map(x.classList);
                        B = x.target;
                        F = o ? x.innerHTML : null;
                        v = unescape(v);
                        p.trackLinkClick(v, C, D, B, F, s(w))
                    }
                }
            }
            function r(v) {
                return function(w) {
                    var x, y;
                    w = w || window.event;
                    x = w.which || w.button;
                    y = w.target || w.srcElement;
                    if (w.type === "click") {
                        if (y) {
                            u(y, v)
                        }
                    } else {
                        if (w.type === "mousedown") {
                            if ((x === 1 || x === 2) && y) {
                                n = x;
                                q = y
                            } else {
                                n = q = null
                            }
                        } else {
                            if (w.type === "mouseup") {
                                if (x === n && y === q) {
                                    u(y, v)
                                }
                                n = q = null
                            }
                        }
                    }
                }
            }
            function m(v) {
                if (h) {
                    f.addEventListener(v, "mouseup", r(t), false);
                    f.addEventListener(v, "mousedown", r(t), false)
                } else {
                    f.addEventListener(v, "click", r(t), false)
                }
            }
            function l(w, y) {
                var v = g.map(w.classList), x;
                for (x = 0; x < v.length; x++) {
                    if (y[v[x]]) {
                        return true
                    }
                }
                return false
            }
            return {
                configureLinkClickTracking: function(x, v, y, w) {
                    o = y;
                    t = w;
                    h = v;
                    i = f.getFilter(x, true)
                },
                addClickListeners: function() {
                    var w = document.links, v;
                    for (v = 0; v < w.length; v++) {
                        if (i(w[v]) && !w[v][j]) {
                            m(w[v]);
                            w[v][j] = true
                        }
                    }
                }
            }
        }
    }
    , {
        "./lib/helpers": 21,
        "./lib_managed/lodash": 23
    }],
    25: [function(b, c, a) {
        (function() {
            var g = b("JSON")
              , i = b("./lib_managed/lodash")
              , f = b("./lib/detectors").localStorageAccessible
              , h = b("./lib/helpers")
              , d = typeof a !== "undefined" ? a : this;
            d.OutQueueManager = function(z, s, u, B, y, o, m) {
                var n, j = false, x, l;
                y = y && window.XMLHttpRequest && ("withCredentials"in new XMLHttpRequest());
                var t = y ? "/com.snowplowanalytics.snowplow/tp2" : "/i";
                o = (f() && B && y && o) || 1;
                n = ["snowplowOutQueue", z, s, y ? "post2" : "get"].join("_");
                if (B) {
                    try {
                        l = g.parse(localStorage.getItem(n))
                    } catch (w) {}
                }
                if (!i.isArray(l)) {
                    l = []
                }
                u.outQueues.push(l);
                if (y && o > 1) {
                    u.bufferFlushers.push(function() {
                        if (!j) {
                            A()
                        }
                    })
                }
                function q(J) {
                    var F = "?"
                      , G = {
                        co: true,
                        cx: true
                    }
                      , E = true;
                    for (var I in J) {
                        if (J.hasOwnProperty(I) && !(G.hasOwnProperty(I))) {
                            if (!E) {
                                F += "&"
                            } else {
                                E = false
                            }
                            F += encodeURIComponent(I) + "=" + encodeURIComponent(J[I])
                        }
                    }
                    for (var H in G) {
                        if (J.hasOwnProperty(H) && G.hasOwnProperty(H)) {
                            F += "&" + H + "=" + encodeURIComponent(J[H])
                        }
                    }
                    return F
                }
                function C(E) {
                    var F = i.mapValues(E, function(G) {
                        return G.toString()
                    });
                    return {
                        evt: F,
                        bytes: D(g.stringify(F))
                    }
                }
                function D(G) {
                    var E = 0;
                    for (var F = 0; F < G.length; F++) {
                        var H = G.charCodeAt(F);
                        if (H <= 127) {
                            E += 1
                        } else {
                            if (H <= 2047) {
                                E += 2
                            } else {
                                if (H >= 55296 && H <= 57343) {
                                    E += 4;
                                    F++
                                } else {
                                    if (H < 65535) {
                                        E += 3
                                    } else {
                                        E += 4
                                    }
                                }
                            }
                        }
                    }
                    return E
                }
                function v(H, G) {
                    x = G + t;
                    if (y) {
                        var E = C(H);
                        if (E.bytes >= m) {
                            h.warn("Event of size " + E.bytes + " is too long - the maximum size is " + m);
                            var I = p(x);
                            I.send(r([E.evt]));
                            return
                        } else {
                            l.push(E)
                        }
                    } else {
                        l.push(q(H))
                    }
                    var F = false;
                    if (B) {
                        F = h.attemptWriteLocalStorage(n, g.stringify(l))
                    }
                    if (!j && (!F || l.length >= o)) {
                        A()
                    }
                }
                function A() {
                    while (l.length && typeof l[0] !== "string" && typeof l[0] !== "object") {
                        l.shift()
                    }
                    if (l.length < 1) {
                        j = false;
                        return
                    }
                    if (!i.isString(x)) {
                        throw "No Snowplow collector configured, cannot track"
                    }
                    j = true;
                    var I = l[0];
                    if (y) {
                        var J = p(x);
                        var E = setTimeout(function() {
                            J.abort();
                            j = false
                        }, 5000);
                        function F(L) {
                            var N = 0;
                            var M = 0;
                            while (N < L.length) {
                                M += L[N].bytes;
                                if (M >= m) {
                                    break
                                } else {
                                    N += 1
                                }
                            }
                            return N
                        }
                        var K = F(l);
                        J.onreadystatechange = function() {
                            if (J.readyState === 4 && J.status >= 200 && J.status < 400) {
                                for (var L = 0; L < K; L++) {
                                    l.shift()
                                }
                                if (B) {
                                    h.attemptWriteLocalStorage(n, g.stringify(l))
                                }
                                clearTimeout(E);
                                A()
                            } else {
                                if (J.readyState === 4 && J.status >= 400) {
                                    clearTimeout(E);
                                    j = false
                                }
                            }
                        }
                        ;
                        var G = i.map(l.slice(0, K), function(L) {
                            return L.evt
                        });
                        if (G.length > 0) {
                            J.send(r(G))
                        }
                    } else {
                        var H = new Image(1,1);
                        H.onload = function() {
                            l.shift();
                            if (B) {
                                h.attemptWriteLocalStorage(n, g.stringify(l))
                            }
                            A()
                        }
                        ;
                        H.onerror = function() {
                            j = false
                        }
                        ;
                        H.src = x + I
                    }
                }
                function p(E) {
                    var F = new XMLHttpRequest();
                    F.open("POST", E, true);
                    F.withCredentials = true;
                    F.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                    return F
                }
                function r(E) {
                    return g.stringify({
                        schema: "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-3",
                        data: E
                    })
                }
                return {
                    enqueueRequest: v,
                    executeQueue: A
                }
            }
        }())
    }
    , {
        "./lib/detectors": 20,
        "./lib/helpers": 21,
        "./lib_managed/lodash": 23,
        JSON: 1
    }],
    26: [function(b, c, a) {
        (function() {
            var i = b("./lib_managed/lodash")
              , h = b("./lib/helpers")
              , d = b("./in_queue")
              , g = b("./tracker")
              , f = typeof a !== "undefined" ? a : this;
            f.Snowplow = function(m, r) {
                var l = document
                  , n = window
                  , p = "js-2.5.1"
                  , o = {
                    outQueues: [],
                    bufferFlushers: [],
                    expireDateTime: null,
                    hasLoaded: false,
                    registeredOnLoadHandlers: []
                };
                function q() {
                    var t;
                    i.forEach(o.bufferFlushers, function(u) {
                        u()
                    });
                    if (o.expireDateTime) {
                        do {
                            t = new Date();
                            if (i.filter(o.outQueues, function(u) {
                                return u.length > 0
                            }).length === 0) {
                                break
                            }
                        } while (t.getTime() < o.expireDateTime)
                    }
                }
                function s() {
                    var t;
                    if (!o.hasLoaded) {
                        o.hasLoaded = true;
                        for (t = 0; t < o.registeredOnLoadHandlers.length; t++) {
                            o.registeredOnLoadHandlers[t]()
                        }
                    }
                    return true
                }
                function j() {
                    var u;
                    if (l.addEventListener) {
                        h.addEventListener(l, "DOMContentLoaded", function t() {
                            l.removeEventListener("DOMContentLoaded", t, false);
                            s()
                        })
                    } else {
                        if (l.attachEvent) {
                            l.attachEvent("onreadystatechange", function t() {
                                if (l.readyState === "complete") {
                                    l.detachEvent("onreadystatechange", t);
                                    s()
                                }
                            });
                            if (l.documentElement.doScroll && n === n.top) {
                                (function t() {
                                    if (!o.hasLoaded) {
                                        try {
                                            l.documentElement.doScroll("left")
                                        } catch (v) {
                                            setTimeout(t, 0);
                                            return
                                        }
                                        s()
                                    }
                                }())
                            }
                        }
                    }
                    if ((new RegExp("WebKit")).test(navigator.userAgent)) {
                        u = setInterval(function() {
                            if (o.hasLoaded || /loaded|complete/.test(l.readyState)) {
                                clearInterval(u);
                                s()
                            }
                        }, 10)
                    }
                    h.addEventListener(n, "load", s, false)
                }
                n.Snowplow = {
                    getTrackerCf: function(v) {
                        var u = new g.Tracker(r,"",p,o,{});
                        u.setCollectorCf(v);
                        return u
                    },
                    getTrackerUrl: function(u) {
                        var v = new g.Tracker(r,"",p,o,{});
                        v.setCollectorUrl(u);
                        return v
                    },
                    getAsyncTracker: function() {
                        return new g.Tracker(r,"",p,o,{})
                    }
                };
                h.addEventListener(n, "beforeunload", q, false);
                j();
                return new d.InQueueManager(g.Tracker,p,o,m,r)
            }
        }())
    }
    , {
        "./in_queue": 18,
        "./lib/helpers": 21,
        "./lib_managed/lodash": 23,
        "./tracker": 27
    }],
    27: [function(b, c, a) {
        (function() {
            var s = b("./lib_managed/lodash")
              , g = b("./lib/helpers")
              , j = b("./lib/proxies")
              , h = b("browser-cookie-lite")
              , q = b("./lib/detectors")
              , l = b("JSON")
              , p = b("sha1")
              , r = b("./links")
              , f = b("./forms")
              , n = b("./out_queue")
              , o = b("snowplow-tracker-core")
              , d = b("uuid")
              , i = typeof a !== "undefined" ? a : this;
            i.Tracker = function m(bb, aK, Q, a2, B, av) {
                var z = o(true, function(bh) {
                    L(bh);
                    ae(bh, aD)
                }), am = document, ac = window, S = navigator, v = j.fixupUrl(am.domain, ac.location.href, g.getReferrer()), aT = g.fixupDomain(v[0]), ba = v[1], aG = v[2], af, av = av || {}, aE = "GET", J = av.hasOwnProperty("platform") ? av.platform : "web", x, aW = av.hasOwnProperty("appId") ? av.appId : "", aq, aI = am.title, C, aD = av.hasOwnProperty("pageUnloadTimer") ? av.pageUnloadTimer : 500, E, R, F, a7 = av.hasOwnProperty("cookieName") ? av.cookieName : "_sp_", H = av.hasOwnProperty("cookieDomain") ? av.cookieDomain : null, a8 = "/", X = S.doNotTrack || S.msDoNotTrack, a0 = av.hasOwnProperty("respectDoNotTrack") ? av.respectDoNotTrack && (X === "yes" || X === "1") : false, ai, K = 63072000, O = av.hasOwnProperty("sessionCookieTimeout") ? av.sessionCookieTimeout : 1800, T = av.hasOwnProperty("userFingerprintSeed") ? av.userFingerprintSeed : 123412414, aY = am.characterSet || am.charset, aL = av.hasOwnProperty("forceSecureTracker") ? (av.forceSecureTracker === true) : false, ah = av.hasOwnProperty("useLocalStorage") ? av.useLocalStorage : true, ax = av.hasOwnProperty("useCookies") ? av.useCookies : true, I = S.userLanguage || S.language, aX = q.detectBrowserFeatures(ax, N("testcookie")), y = (av.userFingerprint === false) ? "" : q.detectSignature(T), M = bb + "_" + aK, aH = false, aF, a6 = new Date().getTime(), aB, ar, an, Z, ab = p, aJ, aj, W, V = 1, bg, D = aQ(), u = r.getLinkTrackingManager(z, M, a4), ao = f.getFormTrackingManager(z, M, a4), a3 = new n.OutQueueManager(bb,aK,B,ah,av.post,av.bufferSize,av.maxPostBytes || 40000), aP = false, bc = av.contexts || {}, bd = [];
                if (bc.webPage) {
                    bd.push(aV())
                }
                if (bc.gaCookies) {
                    bd.push(G())
                }
                if (bc.geolocation) {
                    a9()
                }
                z.setBase64Encoding(av.hasOwnProperty("encodeBase64") ? av.encodeBase64 : true);
                z.setTrackerVersion(Q);
                z.setTrackerNamespace(aK);
                z.setAppId(aW);
                z.setPlatform(J);
                z.setTimezone(q.detectTimezone());
                z.addPayloadPair("lang", I);
                z.addPayloadPair("cs", aY);
                for (var aa in aX) {
                    if (Object.prototype.hasOwnProperty.call(aX, aa)) {
                        if (aa === "res" || aa === "cd" || aa === "cookie") {
                            z.addPayloadPair(aa, aX[aa])
                        } else {
                            z.addPayloadPair("f_" + aa, aX[aa])
                        }
                    }
                }
                function bf() {
                    v = j.fixupUrl(am.domain, ac.location.href, g.getReferrer());
                    if (v[1] !== ba) {
                        aG = g.getReferrer(ba)
                    }
                    aT = g.fixupDomain(v[0]);
                    ba = v[1]
                }
                function ak(bj) {
                    var bh = new Date().getTime();
                    var bi = "_sp=" + aj + "." + bh;
                    if (this.href) {
                        this.href = g.decorateQuerystring(this.href, "_sp", aj + "." + bh)
                    }
                }
                function w(bj) {
                    for (var bi = 0; bi < document.links.length; bi++) {
                        var bh = document.links[bi];
                        if (!bh.spDecorationEnabled && bj(bh)) {
                            g.addEventListener(bh, "click", ak, true);
                            g.addEventListener(bh, "mousedown", ak, true);
                            bh.spDecorationEnabled = true
                        }
                    }
                }
                function aQ() {
                    return {
                        transaction: {},
                        items: []
                    }
                }
                function a1(bh) {
                    var bi;
                    if (F) {
                        bi = new RegExp("#.*");
                        return bh.replace(bi, "")
                    }
                    return bh
                }
                function be(bh) {
                    var bj = new RegExp("^([a-z]+):")
                      , bi = bj.exec(bh);
                    return bi ? bi[1] : null
                }
                function aS(bj, bh) {
                    var bk = be(bh), bi;
                    if (bk) {
                        return bh
                    }
                    if (bh.slice(0, 1) === "/") {
                        return be(bj) + "://" + g.getHostName(bj) + bh
                    }
                    bj = a1(bj);
                    if ((bi = bj.indexOf("?")) >= 0) {
                        bj = bj.slice(0, bi)
                    }
                    if ((bi = bj.lastIndexOf("/")) !== bj.length - 1) {
                        bj = bj.slice(0, bi + 1)
                    }
                    return bj + bh
                }
                function ae(bj, bi) {
                    var bh = new Date();
                    if (!a0) {
                        a3.enqueueRequest(bj.build(), x);
                        B.expireDateTime = bh.getTime() + bi
                    }
                }
                function N(bh) {
                    return a7 + bh + "." + aJ
                }
                function ag(bh) {
                    return h.cookie(N(bh))
                }
                function az() {
                    bf();
                    aJ = ab((H || aT) + (a8 || "/")).slice(0, 4)
                }
                function aU() {
                    var bh = new Date();
                    aF = bh.getTime()
                }
                function aN() {
                    ap();
                    aU()
                }
                function au() {
                    var bh = (am.compatMode && am.compatMode != "BackCompat") ? am.documentElement : am.body;
                    return [bh.scrollLeft || ac.pageXOffset, bh.scrollTop || ac.pageYOffset]
                }
                function ay() {
                    var bi = au();
                    var bh = bi[0];
                    aB = bh;
                    ar = bh;
                    var bj = bi[1];
                    an = bj;
                    Z = bj
                }
                function ap() {
                    var bi = au();
                    var bh = bi[0];
                    if (bh < aB) {
                        aB = bh
                    } else {
                        if (bh > ar) {
                            ar = bh
                        }
                    }
                    var bj = bi[1];
                    if (bj < an) {
                        an = bj
                    } else {
                        if (bj > Z) {
                            Z = bj
                        }
                    }
                }
                function U(bi) {
                    var bh = Math.round(bi);
                    if (!isNaN(bh)) {
                        return bh
                    }
                }
                function al() {
                    h.cookie(N("ses"), "*", O, a8, H)
                }
                function a5(bj, bi, bh, bl, bk, bm) {
                    h.cookie(N("id"), bj + "." + bi + "." + bh + "." + bl + "." + bk + "." + bm, K, a8, H)
                }
                function aA() {
                    return ab((S.userAgent || "") + (S.platform || "") + l.stringify(aX) + Math.round(new Date().getTime() / 1000)).slice(0, 16)
                }
                function A() {
                    var bi = ax && !!ag("ses");
                    var bh = aO();
                    if (bh[1]) {
                        aj = bh[1]
                    } else {
                        aj = aA();
                        bh[1] = aj
                    }
                    W = bh[6];
                    if (!bi) {
                        bh[3]++;
                        W = d.v4();
                        bh[6] = W;
                        bh[5] = bh[4]
                    }
                    al();
                    bh[4] = Math.round(new Date().getTime() / 1000);
                    bh.shift();
                    a5.apply(null, bh)
                }
                function aO() {
                    if (!ax) {
                        return []
                    }
                    var bi = new Date(), bh = Math.round(bi.getTime() / 1000), bk = ag("id"), bj;
                    if (bk) {
                        bj = bk.split(".");
                        bj.unshift("0")
                    } else {
                        bj = ["1", aj, bh, 0, bh, ""]
                    }
                    if (!bj[6]) {
                        bj[6] = d.v4()
                    }
                    return bj
                }
                function L(bo) {
                    var bj = Math.round(new Date().getTime() / 1000)
                      , bm = N("id")
                      , bl = N("ses")
                      , bq = ag("ses")
                      , bi = aO()
                      , br = bi[0]
                      , bp = bi[1]
                      , bt = bi[2]
                      , bk = bi[3]
                      , bs = bi[4]
                      , bh = bi[5]
                      , bn = bi[6];
                    if (a0 && ax) {
                        h.cookie(bm, "", -1, a8, H);
                        h.cookie(bl, "", -1, a8, H);
                        return
                    }
                    if (br === "0") {
                        W = bn;
                        if (!bq && ax) {
                            bk++;
                            bh = bs;
                            W = d.v4()
                        }
                        V = bk
                    } else {
                        if ((new Date().getTime() - a6) > O * 1000) {
                            W = d.v4();
                            V++
                        }
                    }
                    bo.add("vp", q.detectViewport());
                    bo.add("ds", q.detectDocumentSize());
                    bo.add("vid", V);
                    bo.add("sid", W);
                    bo.add("duid", bp);
                    bo.add("fp", y);
                    bo.add("uid", bg);
                    bf();
                    bo.add("refr", a1(af || aG));
                    bo.add("url", a1(aq || ba));
                    if (ax) {
                        a5(bp, bt, V, bj, bh, W);
                        al()
                    }
                    a6 = new Date().getTime()
                }
                function ad(bh) {
                    return aR(bh + ".cloudfront.net")
                }
                function aR(bh) {
                    if (aL) {
                        return ("https://" + bh)
                    } else {
                        return ("https:" === am.location.protocol ? "https" : "http") + "://" + bh
                    }
                }
                function a4(bh) {
                    var bj = bd.concat(bh || []);
                    if (bc.performanceTiming) {
                        var bi = P();
                        if (bi) {
                            bj.push(bi)
                        }
                    }
                    return bj
                }
                function aV() {
                    return {
                        schema: "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
                        data: {
                            id: a2
                        }
                    }
                }
                function P() {
                    var bj = ac.performance || ac.mozPerformance || ac.msPerformance || ac.webkitPerformance;
                    if (bj) {
                        var bi = {};
                        for (var bh in bj.timing) {
                            if (!s.isFunction(bj.timing[bh])) {
                                bi[bh] = bj.timing[bh]
                            }
                        }
                        delete bi.requestEnd;
                        if (ac.chrome && ac.chrome.loadTimes && typeof ac.chrome.loadTimes().firstPaintTime === "number") {
                            bi.chromeFirstPaint = Math.round(ac.chrome.loadTimes().firstPaintTime * 1000)
                        }
                        return {
                            schema: "iglu:org.w3/PerformanceTiming/jsonschema/1-0-0",
                            data: bi
                        }
                    }
                }
                function a9() {
                    if (!aP && S.geolocation && S.geolocation.getCurrentPosition) {
                        aP = true;
                        navigator.geolocation.getCurrentPosition(function(bh) {
                            var bj = bh.coords;
                            var bi = {
                                schema: "iglu:com.snowplowanalytics.snowplow/geolocation_context/jsonschema/1-1-0",
                                data: {
                                    latitude: bj.latitude,
                                    longitude: bj.longitude,
                                    latitudeLongitudeAccuracy: bj.accuracy,
                                    altitude: bj.altitude,
                                    altitudeAccuracy: bj.altitudeAccuracy,
                                    bearing: bj.heading,
                                    speed: bj.speed,
                                    timestamp: bh.timestamp
                                }
                            };
                            bd.push(bi)
                        })
                    }
                }
                function G() {
                    var bh = {};
                    s.forEach(["__utma", "__utmb", "__utmc", "__utmv", "__utmz", "_ga"], function(bi) {
                        var bj = h.cookie(bi);
                        if (bj) {
                            bh[bi] = bj
                        }
                    });
                    return {
                        schema: "iglu:com.google.analytics/cookies/jsonschema/1-0-0",
                        data: bh
                    }
                }
                function aC(bi, bh) {
                    return (bi || []).concat(bh ? bh() : [])
                }
                function aw(bm, bj, bh) {
                    bf();
                    aI = am.title;
                    C = bm;
                    var bl = g.fixupTitle(C || aI);
                    z.trackPageView(a1(aq || ba), bl, a1(af || aG), a4(aC(bj, bh)));
                    var bi = new Date();
                    if (E && R && !aH) {
                        aH = true;
                        ay();
                        g.addEventListener(am, "click", aU);
                        g.addEventListener(am, "mouseup", aU);
                        g.addEventListener(am, "mousedown", aU);
                        g.addEventListener(am, "mousemove", aU);
                        g.addEventListener(am, "mousewheel", aU);
                        g.addEventListener(ac, "DOMMouseScroll", aU);
                        g.addEventListener(ac, "scroll", aN);
                        g.addEventListener(am, "keypress", aU);
                        g.addEventListener(am, "keydown", aU);
                        g.addEventListener(am, "keyup", aU);
                        g.addEventListener(ac, "resize", aU);
                        g.addEventListener(ac, "focus", aU);
                        g.addEventListener(ac, "blur", aU);
                        aF = bi.getTime();
                        setInterval(function bk() {
                            var bn = new Date();
                            if ((aF + R) > bn.getTime()) {
                                if (E < bn.getTime()) {
                                    t(aC(bj, bh))
                                }
                            }
                        }, R)
                    }
                }
                function t(bh) {
                    bf();
                    newDocumentTitle = am.title;
                    if (newDocumentTitle !== aI) {
                        aI = newDocumentTitle;
                        C = null
                    }
                    z.trackPagePing(a1(aq || ba), g.fixupTitle(C || aI), a1(af || aG), U(aB), U(ar), U(an), U(Z), a4(bh));
                    ay()
                }
                function aM(bm, bl, bq, bn, bh, bo, bi, bk, bp, bj) {
                    z.trackEcommerceTransaction(bm, bl, bq, bn, bh, bo, bi, bk, bp, a4(bj))
                }
                function at(bh, bo, bj, bm, bl, bn, bi, bk) {
                    z.trackEcommerceTransactionItem(bh, bo, bj, bm, bl, bn, bi, a4(bk))
                }
                function aZ(bi, bh) {
                    if (bi !== "") {
                        return bi + bh.charAt(0).toUpperCase() + bh.slice(1)
                    }
                    return bh
                }
                function Y(bm) {
                    var bl, bh, bk = ["", "webkit", "ms", "moz"], bj;
                    if (!ai) {
                        for (bh = 0; bh < bk.length; bh++) {
                            bj = bk[bh];
                            if (am[aZ(bj, "hidden")]) {
                                if (am[aZ(bj, "visibilityState")] === "prerender") {
                                    bl = true
                                }
                                break
                            }
                        }
                    }
                    if (bl) {
                        g.addEventListener(am, bj + "visibilitychange", function bi() {
                            am.removeEventListener(bj + "visibilitychange", bi, false);
                            bm()
                        });
                        return
                    }
                    bm()
                }
                az();
                A();
                if (av.crossDomainLinker) {
                    w(av.crossDomainLinker)
                }
                return {
                    getUserId: function() {
                        return bg
                    },
                    getDomainUserId: function() {
                        return (aO())[1]
                    },
                    getDomainUserInfo: function() {
                        return aO()
                    },
                    getUserFingerprint: function() {
                        return y
                    },
                    setAppId: function(bh) {
                        g.warn('setAppId is deprecated. Instead add an "appId" field to the argmap argument of newTracker.');
                        z.setAppId(bh)
                    },
                    setReferrerUrl: function(bh) {
                        af = bh
                    },
                    setCustomUrl: function(bh) {
                        bf();
                        aq = aS(ba, bh)
                    },
                    setDocumentTitle: function(bh) {
                        aI = am.title;
                        C = bh
                    },
                    discardHashTag: function(bh) {
                        F = bh
                    },
                    setCookieNamePrefix: function(bh) {
                        g.warn('setCookieNamePrefix is deprecated. Instead add a "cookieName" field to the argmap argument of newTracker.');
                        a7 = bh
                    },
                    setCookieDomain: function(bh) {
                        g.warn('setCookieDomain is deprecated. Instead add a "cookieDomain" field to the argmap argument of newTracker.');
                        H = g.fixupDomain(bh);
                        az()
                    },
                    setCookiePath: function(bh) {
                        a8 = bh;
                        az()
                    },
                    setVisitorCookieTimeout: function(bh) {
                        K = bh
                    },
                    setSessionCookieTimeout: function(bh) {
                        O = bh
                    },
                    setUserFingerprintSeed: function(bh) {
                        g.warn('setUserFingerprintSeed is deprecated. Instead add a "userFingerprintSeed" field to the argmap argument of newTracker.');
                        T = bh;
                        y = q.detectSignature(T)
                    },
                    enableUserFingerprint: function(bh) {
                        g.warn('enableUserFingerprintSeed is deprecated. Instead add a "userFingerprint" field to the argmap argument of newTracker.');
                        if (!bh) {
                            y = ""
                        }
                    },
                    respectDoNotTrack: function(bi) {
                        g.warn('This usage of respectDoNotTrack is deprecated. Instead add a "respectDoNotTrack" field to the argmap argument of newTracker.');
                        var bh = S.doNotTrack || S.msDoNotTrack;
                        a0 = bi && (bh === "yes" || bh === "1")
                    },
                    crossDomainLinker: function(bh) {
                        w(bh)
                    },
                    addListener: function(bj, bh, bi) {
                        addClickListener(bj, bh, bi)
                    },
                    enableLinkClickTracking: function(bj, bh, bk, bi) {
                        if (B.hasLoaded) {
                            u.configureLinkClickTracking(bj, bh, bk, bi);
                            u.addClickListeners()
                        } else {
                            B.registeredOnLoadHandlers.push(function() {
                                u.configureLinkClickTracking(bj, bh, bk, bi);
                                u.addClickListeners()
                            })
                        }
                    },
                    refreshLinkClickTracking: function() {
                        if (B.hasLoaded) {
                            u.addClickListeners()
                        } else {
                            B.registeredOnLoadHandlers.push(function() {
                                u.addClickListeners()
                            })
                        }
                    },
                    enableActivityTracking: function(bi, bh) {
                        E = new Date().getTime() + bi * 1000;
                        R = bh * 1000
                    },
                    enableFormTracking: function(bh, bi) {
                        if (B.hasLoaded) {
                            ao.configureFormTracking(bh);
                            ao.addFormListeners(bi)
                        } else {
                            B.registeredOnLoadHandlers.push(function() {
                                ao.configureFormTracking(bh);
                                ao.addFormListeners(bi)
                            })
                        }
                    },
                    killFrame: function() {
                        if (ac.location !== ac.top.location) {
                            ac.top.location = ac.location
                        }
                    },
                    redirectFile: function(bh) {
                        if (ac.location.protocol === "file:") {
                            ac.location = bh
                        }
                    },
                    setCountPreRendered: function(bh) {
                        ai = bh
                    },
                    setUserId: function(bh) {
                        bg = bh
                    },
                    setUserIdFromLocation: function(bh) {
                        bf();
                        bg = g.fromQuerystring(bh, ba)
                    },
                    setUserIdFromReferrer: function(bh) {
                        bf();
                        bg = g.fromQuerystring(bh, aG)
                    },
                    setUserIdFromCookie: function(bh) {
                        bg = h.cookie(bh)
                    },
                    setCollectorCf: function(bh) {
                        x = ad(bh)
                    },
                    setCollectorUrl: function(bh) {
                        x = aR(bh)
                    },
                    setPlatform: function(bh) {
                        g.warn('setPlatform is deprecated. Instead add a "platform" field to the argmap argument of newTracker.');
                        z.setPlatform(bh)
                    },
                    encodeBase64: function(bh) {
                        g.warn('This usage of encodeBase64 is deprecated. Instead add an "encodeBase64" field to the argmap argument of newTracker.');
                        z.setBase64Encoding(bh)
                    },
                    flushBuffer: function() {
                        a3.executeQueue()
                    },
                    enableGeolocationContext: a9,
                    trackPageView: function(bj, bi, bh) {
                        Y(function() {
                            aw(bj, bi, bh)
                        })
                    },
                    trackStructEvent: function(bj, bm, bh, bl, bk, bi) {
                        z.trackStructEvent(bj, bm, bh, bl, bk, a4(bi))
                    },
                    trackUnstructEvent: function(bh, bi) {
                        z.trackUnstructEvent(bh, a4(bi))
                    },
                    addTrans: function(bm, bl, bq, bn, bh, bo, bi, bk, bp, bj) {
                        D.transaction = {
                            orderId: bm,
                            affiliation: bl,
                            total: bq,
                            tax: bn,
                            shipping: bh,
                            city: bo,
                            state: bi,
                            country: bk,
                            currency: bp,
                            context: bj
                        }
                    },
                    addItem: function(bh, bo, bj, bm, bl, bn, bi, bk) {
                        D.items.push({
                            orderId: bh,
                            sku: bo,
                            name: bj,
                            category: bm,
                            price: bl,
                            quantity: bn,
                            currency: bi,
                            context: bk
                        })
                    },
                    trackTrans: function() {
                        aM(D.transaction.orderId, D.transaction.affiliation, D.transaction.total, D.transaction.tax, D.transaction.shipping, D.transaction.city, D.transaction.state, D.transaction.country, D.transaction.currency, D.transaction.context);
                        for (var bh = 0; bh < D.items.length; bh++) {
                            var bi = D.items[bh];
                            at(bi.orderId, bi.sku, bi.name, bi.category, bi.price, bi.quantity, bi.currency, bi.context)
                        }
                        D = aQ()
                    },
                    trackLinkClick: function(bm, bi, bj, bh, bl, bk) {
                        Y(function() {
                            z.trackLinkClick(bm, bi, bj, bh, bl, a4(bk))
                        })
                    },
                    trackAdImpression: function(bl, bh, bj, bk, bp, bm, bn, bo, bi) {
                        Y(function() {
                            z.trackAdImpression(bl, bh, bj, bk, bp, bm, bn, bo, a4(bi))
                        })
                    },
                    trackAdClick: function(bj, bo, bh, bk, bq, bm, bl, bn, bp, bi) {
                        z.trackAdClick(bj, bo, bh, bk, bq, bm, bl, bn, bp, a4(bi))
                    },
                    trackAdConversion: function(bq, bh, bk, bj, bm, bo, bp, bl, bn, bi) {
                        z.trackAdConversion(bq, bh, bk, bj, bm, bo, bp, bl, bn, a4(bi))
                    },
                    trackSocialInteraction: function(bj, bi, bk, bh) {
                        z.trackSocialInteraction(bj, bi, bk, a4(bh))
                    },
                    trackAddToCart: function(bn, bi, bk, bl, bm, bh, bj) {
                        z.trackAddToCart(bn, bi, bk, bl, bm, bh, a4(bj))
                    },
                    trackRemoveFromCart: function(bn, bi, bk, bl, bm, bh, bj) {
                        z.trackRemoveFromCart(bn, bi, bk, bl, bm, bh, a4(bj))
                    },
                    trackSiteSearch: function(bl, bk, bh, bi, bj) {
                        z.trackSiteSearch(bl, bk, bh, bi, a4(bj))
                    },
                    trackTiming: function(bl, bi, bk, bh, bj) {
                        z.trackUnstructEvent({
                            schema: "iglu:com.snowplowanalytics.snowplow/timing/jsonschema/1-0-0",
                            data: {
                                category: bl,
                                variable: bi,
                                timing: bk,
                                label: bh
                            }
                        }, a4(bj))
                    }
                }
            }
        }())
    }
    , {
        "./forms": 17,
        "./lib/detectors": 20,
        "./lib/helpers": 21,
        "./lib/proxies": 22,
        "./lib_managed/lodash": 23,
        "./links": 24,
        "./out_queue": 25,
        JSON: 1,
        "browser-cookie-lite": 2,
        sha1: 7,
        "snowplow-tracker-core": 8,
        uuid: 16
    }]
}, {}, [19]);
