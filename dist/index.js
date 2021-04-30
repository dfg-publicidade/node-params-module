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
    static parseRange(value, transform) {
        if (value && value.indexOf(';') > -1) {
            const paramValue = value.split(';');
            return [
                transform(paramValue[0], 0),
                transform(paramValue[1], 1)
            ];
        }
        return transform(value, 0);
    }
    getInt(name) {
        return this.getValue(name, true, (value) => parseInt(value, 10));
    }
    getFloat(name) {
        return this.getValue(name, true, (value) => parseFloat(value));
    }
    getDate(name) {
        return this.getValue(name, true, (value, index) => {
            if (index === 0) {
                return node_dates_module_1.default.toDate(value);
            }
            return moment_timezone_1.default(node_dates_module_1.default.toDate(value)).tz(process.env.TZ).add(1, 'day').toDate();
        });
    }
    getDateTime(name) {
        return this.getValue(name, true, (value) => node_dates_module_1.default.toDateTime(value));
    }
    getBoolean(name) {
        return this.getValue(name, false, (value) => !(!value || value === 'false'));
    }
    getString(name) {
        return this.getValue(name, false, (value) => value);
    }
    getValue(name, parseRange, transform) {
        if (!name) {
            return undefined;
        }
        const param = { name: this.service ? this.service.translateParams(name) : name };
        if (this.from[name]) {
            if (this.from[name] === 'null') {
                // eslint-disable-next-line no-null/no-null
                param.value = 'null';
            }
            else {
                if (parseRange) {
                    param.value = Params.parseRange(this.from[name].toString(), transform);
                }
                else {
                    param.value = transform(this.from[name].toString(), 0);
                }
            }
        }
        else {
            param.value = undefined;
        }
        return param;
    }
}
exports.default = Params;
