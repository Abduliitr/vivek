window.hjSiteSettings = window.hjSiteSettings || {
    "features": [],
    "site_id": 490196,
    "integrations": {
        "optimizely": {
            "tag_recordings": false
        }
    },
    "privacy_policy_url": null,
    "deferred_page_contents": [],
    "surveys": [],
    "feedback_widgets": [],
    "anonymize_digits": false,
    "forms": [],
    "state_change_listen_mode": "automatic",
    "testers_widgets": [],
    "legal_name": null,
    "recording_capture_keystrokes": false,
    "rec_value": 1.0,
    "suppress_text": null,
    "suppress_location": false,
    "record_targeting_rules": [],
    "heatmaps": [],
    "polls": [],
    "record": false,
    "r": 0.1500113851,
    "suppress_all": false,
    "anonymize_emails": false
};

window.hjBootstrap = window.hjBootstrap || function(f, k) {
    function g() {
        setTimeout(function() {
            a.body.appendChild(c)
        }, 50)
    }
    var d = function(a, b) {
        window.hjBootstrapCalled = (window.hjBootstrapCalled || []).concat(b);
        window.hj && (window.hj._init && window.hj._init._verifyInstallation) && hj._init._verifyInstallation()
    };
    d(f, k);
    var a = document, h = a.head || a.getElementsByTagName("head")[0], b, c, e;
    a.addEventListener && (b = a.createElement("script"),
    b.async = 1,
    b.src = f,
    h.appendChild(b),
    e = ["iframe#_hjRemoteVarsFrame {", "display: none !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important;", "}"],
    b = a.createElement("style"),
    b.type = "text/css",
    b.styleSheet ? b.styleSheet.cssText = e.join("") : b.appendChild(a.createTextNode(e.join(""))),
    h.appendChild(b),
    c = a.createElement("iframe"),
    c.style.cssText = e[1],
    c.name = "_hjRemoteVarsFrame",
    c.title = "_hjRemoteVarsFrame",
    c.id = "_hjRemoteVarsFrame",
    c.src = "https://" + (window._hjSettings.varsHost || "vars.hotjar.com") + "/box-de263bbc9261861ab6eefe1285fa249b.html",
    c.onload = function() {
        d.varsLoaded = !0;
        "undefined" !== typeof hj && hj.event && hj.event.signal("varsLoaded")
    }
    ,
    d.varsJar = c,
    "interactive" === a.readyState || "complete" === a.readyState || "loaded" === a.readyState ? g() : a.addEventListener("DOMContentLoaded", g),
    d.revision = "9be17d51",
    window.hjBootstrap = d)
}
;

hjBootstrap('https://script.hotjar.com/modules-ab5ba0ccf53ded68dfc9bbcb1e84cd7b.js', '490196');
