"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_dates_module_1 = __importDefault(require("@dfgpublicidade/node-dates-module"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
/* Module */
class Params {
    constructor(from, service) {
        this.from = from;
        this.service = service;
    }
    getInt(name) {
        const param = { name: this.service ? this.service.translateParams(name) : name };
        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue = this.from[name].split(';');
                param.value = [
                    parseInt(paramValue[0], 10),
                    parseInt(paramValue[1], 10)
                ];
            }
            else {
                param.value = parseInt(this.from[name], 10);
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }
        return param;
    }
    getFloat(name) {
        const param = { name: this.service ? this.service.translateParams(name) : name };
        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue = this.from[name].split(';');
                param.value = [
                    parseFloat(paramValue[0]),
                    parseFloat(paramValue[1])
                ];
            }
            else {
                param.value = parseFloat(this.from[name]);
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }
        return param;
    }
    getDate(name) {
        const param = { name: this.service ? this.service.translateParams(name) : name };
        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue = this.from[name].split(';');
                param.value = [
                    node_dates_module_1.default.toDate(paramValue[0]),
                    moment_timezone_1.default(node_dates_module_1.default.toDate(paramValue[1])).tz(process.env.TZ).add(1, 'day').toDate()
                ];
            }
            else {
                param.value = node_dates_module_1.default.toDate(this.from[name]);
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }
        return param;
    }
    getDateTime(name) {
        const param = { name: this.service ? this.service.translateParams(name) : name };
        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue = this.from[name].split(';');
                param.value = [
                    node_dates_module_1.default.toDateTime(paramValue[0]),
                    moment_timezone_1.default(node_dates_module_1.default.toDate(paramValue[1])).tz(process.env.TZ).add(1, 'day').toDate()
                ];
            }
            else {
                param.value = node_dates_module_1.default.toDateTime(this.from[name]);
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }
        return param;
    }
    getBoolean(name) {
        const param = { name: this.service ? this.service.translateParams(name) : name };
        // eslint-disable-next-line no-null/no-null
        if (this.from[name] !== undefined && this.from[name] !== null) {
            if (this.from[name] && this.from[name] === 'true') {
                param.value = true;
            }
            else if (this.from[name] && this.from[name] === 'false') {
                param.value = false;
            }
            else {
                param.value = undefined;
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }
        return param;
    }
    getString(name) {
        const param = { name: this.service ? this.service.translateParams(name) : name };
        // eslint-disable-next-line no-null/no-null
        param.value = this.from[name] ? this.from[name] : null;
        return param;
    }
}
exports.default = Params;
