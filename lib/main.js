"use strict";

var Component = require("component-class");
var fs = require("fs");
var log;

module.exports = class ComponentStaticCert extends Component {
    constructor(cm) {
        super(cm);

        this.addFeature("set-cert-file", this.setCertFile);
        this.addFeature("set-key-file", this.setKeyFile);
        this.addFeature("get-certs", this.getCerts);

        this.addDependency("logger");
    }

    init() {
        var logger = this.cm.get("logger");
        if (logger === undefined) {
            throw new Error("logger component not found");
        }
        log = logger.create("Fido2ComponentCert");
    }

    setCertFile(filename) {
        if (typeof filename !== "string") {
            throw new TypeError("expected filename to be of type string, got " + typeof filename);
        }

        var readable;
        try {
            fs.accessSync(filename, fs.constants.R_OK);
            readable = true;
        } catch (e) {
            readable = false;
        }
        if (!readable) {
            throw new TypeError("can't read file: " + filename);
        }

        this.cert = fs.readFileSync(filename);
    }

    setKeyFile(filename) {
        if (typeof filename !== "string") {
            throw new TypeError("expected filename to be of type string, got " + typeof filename);
        }

        var readable;
        try {
            fs.accessSync(filename, fs.constants.R_OK);
            readable = true;
        } catch (e) {
            readable = false;
        }
        if (!readable) {
            throw new TypeError("can't read file: " + filename);
        }

        this.key = fs.readFileSync(filename);
    }

    setCertDir(dirname) {
        if (typeof dirname !== "string") {
            throw new TypeError("expected dirname to be of type string, got " + typeof filename);
        }
    }

    getCerts() {
        // console.log ("getCrets returning:");
        // console.log ("CERT:\n" + this.cert);
        // console.log ("KEY:\n" + this.key);

        if (!this.cert || !this.key) {
            throw new Error("cert manager couldn't find valid keys");
        }

        return {
            cert: this.cert,
            key: this.key
        };
    }

    getCert() {
        return this.cert;
    }

    getKey() {
        return this.key;
    }
};
