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

    private static parseRange(value: any, transform: (value: any, index: number) => any): any {
        if (value && value.indexOf(';') > -1) {
            const paramValue: string[] = value.split(';');

            return [
                transform(paramValue[0], 0),
                transform(paramValue[1], 1)
            ];
        }

        return transform(value, 0);
    }

    public getInt(name: string): Param {
        return this.getValue(name, true, (value: any): number => parseInt(value, 10));
    }

    public getFloat(name: string): Param {
        return this.getValue(name, true, (value: any): number => parseFloat(value));
    }

    public getDate(name: string): Param {
        return this.getValue(name, true, (value: any, index: number): Date => {
            if (index === 0) {
                return Dates.toDate(value);
            }

            return moment(Dates.toDate(value)).tz(process.env.TZ).add(1, 'day').toDate();
        });
    }

    public getDateTime(name: string): Param {
        return this.getValue(name, true, (value: any): Date => Dates.toDateTime(value));
    }

    public getBoolean(name: string): Param {
        return this.getValue(name, false, (value: any): boolean => !(!value || value === 'false'));
    }

    public getString(name: string): Param {
        return this.getValue(name, false, (value: any): string => value);
    }

    private getValue(name: string, parseRange: boolean, transform: (value: any, index: number) => any): any {
        if (!name) {
            return undefined;
        }

        const param: Param = { name: this.service ? this.service.translateParams(name) : name };

        if (this.from[name]) {
            if (this.from[name] === 'null') {
                // eslint-disable-next-line no-null/no-null
                param.value = null;
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

export default Params;
export { Param, Service };
