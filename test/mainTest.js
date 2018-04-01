"use strict";

var turnOnDebugLogging = true;

var CertComponent = require("../index.js");
var assert = require("chai").assert;

var dummyComponentManager = {
    registerType: function() {},
    getType: function() {},
    register: function() {},
    get: function(name) {
        if (name === "logger") return dummyLogger;
    },
    clear: function() {},
    config: function() {},
    init: function() {},
    shutdown: function() {},
    componentList: new Map(),
    typeList: new Map()
};

var dummyLogger = {
    create: function() {
        return new Proxy(function() {}, {
            get: function() {
                return function(...msg) {
                    if (turnOnDebugLogging) console.log(...msg);
                };
            },
        });
    }
};

describe("cert tests", function() {
    var cc;
    beforeEach(function() {
        cc = new CertComponent(dummyComponentManager);
    });

    afterEach(function() {
        cc.shutdown();
    });

    it("can be initialized", function() {
        var ret = cc.init();
        assert.isUndefined(ret);
    });

    it("throws if cert file doesn't exist", function() {
        assert.throws(function() {
            cc.setKeyFile("/does/not/exist/cert.pem");
        }, TypeError);
    });

    it("throws if key file doesn't exist", function() {
        assert.throws(function() {
            cc.setKeyFile("/does/not/exist/key.pem");
        }, TypeError);
    });

    it("can set valid cert file", function() {
        assert.doesNotThrow(function() {
            cc.setKeyFile("test/helpers/certs/cert.pem");
        }, TypeError);
    });

    it("can set valid key file", function() {
        assert.doesNotThrow(function() {
            cc.setKeyFile("test/helpers/certs/key.pem");
        }, TypeError);
    });

    it("works with default dir and certs");
    it("can set cert dir");
    it("can set cert & key files");
    it("can generate certs");
});
