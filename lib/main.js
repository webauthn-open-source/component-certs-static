var ComponentManager = require("simple-component-manager").ComponentManager;
var Component = require("simple-component-manager").Component;
var path = require("path");
var cm = new ComponentManager();
var log;

module.exports = class Fido2ComponentCert extends Component {
    constructor() {
        super();

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
        log = cm.get("logger").create("Fido2ComponentCert");
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