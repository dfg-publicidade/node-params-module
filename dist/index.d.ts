import Param from './interfaces/param';
import Service from './interfaces/service';
declare class Params {
    private from;
    private service;
    constructor(from: any, service?: Service);
    private static parseRange;
    getInt(name: string): Param;
    getFloat(name: string): Param;
    getDate(name: string): Param;
    getDateTime(name: string): Param;
    getBoolean(name: string): Param;
    getString(name: string): Param;
    private getValue;
}
export default Params;
export { Param, Service };
