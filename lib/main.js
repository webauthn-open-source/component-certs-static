var Component = require("component-class");
var path = require("path");
var fs = require("fs");
var log;

module.exports = class ComponentStaticCert extends Component {
    constructor(cm) {
        super(cm);

        this.configTable["set-cert-file"] = this.setCertFile;
        this.configTable["set-key-file"] = this.setKeyFile;
        this.configTable["get-certs"] = this.getCerts;

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
            throw new TypeError ("expected filename to be of type string, got " + typeof filename);
        }

        var readable;
        try {
            fs.accessSync(filename, fs.constants.R_OK);
            readable = true;
        } catch(e) {
            readable = false;
        }
        if (!readable) {
            throw new TypeError ("can't read file: " + filename);
        }

        this.cert = fs.readFileSync(filename);
    }

    setKeyFile(filename) {
        if (typeof filename !== "string") {
            throw new TypeError ("expected filename to be of type string, got " + typeof filename);
        }

        var readable;
        try {
            fs.accessSync(filename, fs.constants.R_OK);
            readable = true;
        } catch(e) {
            readable = false;
        }
        if (!readable) {
            throw new TypeError ("can't read file: " + filename);
        }

        this.cert = fs.readFileSync(filename);
    }

    setCertDir(dirname) {
        if (typeof dirname !== "string") {
            throw new TypeError ("expected dirname to be of type string, got " + typeof filename);
        }
    }

    getCerts() {
        log.debug ("Static self-signed cert path:", this.staticCertDir);
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