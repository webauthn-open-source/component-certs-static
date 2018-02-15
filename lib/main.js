var Component = require("component-class");
var path = require("path");
var log;

module.exports = class ComponentStaticCert extends Component {
    constructor(cm) {
        super(cm);

        this.cm = cm;

        this.configTable["get-certs"] = this.getCerts;
        this.configTable["set-domain"] = this.setDomain;
        this.staticCertDir = path.join (__dirname, "../certs");
    }

    dependencies() {
        return [
            "logger"
        ];
    }

    init() {
        var logger = this.cm.get("logger");
        if (logger === undefined) {
            throw new Error("logger component not found");
        }
        log = logger.create("Fido2ComponentCert");

        log.debug ("Static Component Cert running.");
    }

    setDomain(domain) {
        if (typeof domain !== "string") {
            throw new TypeError ("expected 'domain' to be string; got: " + typeof domain);
        }
        this.domain = domain;
    }

    getCerts() {
        if (this.domain === undefined) {
            log.debug ("Static self-signed cert path:", this.staticCertDir);
            var ret = {
                cert: path.join(this.staticCertDir, "cert.pem"),
                key: path.join(this.staticCertDir, "key.pem")
            };
            return ret;
        }
        log.error("getCerts for domains not implemented. I hate Daplie.");
        throw new Error ("getCerts for domain not implemented");
    }
};