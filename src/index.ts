import Dates from '@dfgpublicidade/node-dates-module';
import moment from 'moment-timezone';
import Param from './interfaces/param';
import Service from './interfaces/service';

/* Module */
class Params {
    private from: any;
    private service: Service;

    public constructor(from: any, service?: Service) {
        this.from = from;
        this.service = service;
    }

    public getInt(name: string): Param {
        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue: string[] = this.from[name].split(';');

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

    public getFloat(name: string): Param {
        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue: string[] = this.from[name].split(';');

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

    public getDate(name: string): Param {
        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue: string[] = this.from[name].split(';');

                param.value = [
                    Dates.toDate(paramValue[0]),
                    moment(Dates.toDate(paramValue[1])).tz(process.env.TZ).add(1, 'day').toDate()
                ];
            }
            else {
                param.value = Dates.toDate(this.from[name]);
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }

        return param;
    }

    public getDateTime(name: string): Param {
        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

        if (this.from[name]) {
            if (this.from[name].indexOf(';') > -1) {
                const paramValue: string[] = this.from[name].split(';');

                param.value = [
                    Dates.toDateTime(paramValue[0]),
                    moment(Dates.toDate(paramValue[1])).tz(process.env.TZ).add(1, 'day').toDate()
                ];
            }
            else {
                param.value = Dates.toDateTime(this.from[name]);
            }
        }
        else {
            // eslint-disable-next-line no-null/no-null
            param.value = null;
        }

        return param;
    }

    public getBoolean(name: string): Param {
        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

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

    public getString(name: string): Param {
        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

        // eslint-disable-next-line no-null/no-null
        param.value = this.from[name] ? this.from[name] : null;

        return param;
    }
}

export default Params;
export { Param };
