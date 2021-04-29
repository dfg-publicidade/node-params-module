import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import Params, { Param, Service } from '../src';

/* Tests */
describe('index.ts', (): void => {
    let service: Service;

    let testDate: Date;
    let testDate2: Date;
    let testDateTime: Date;
    let testDateTime2: Date;

    before(async (): Promise<void> => {
        service = {
            translateParams: (key: string): string => key.split('.').map((keyPart: string, index: number): string => {
                if (index > 0 && keyPart.length > 0) {
                    keyPart = keyPart.substring(0, 1).toUpperCase() + keyPart.substring(1).toLowerCase();
                }

                return keyPart;
            }).join('')
        };

        testDate = new Date();
        // eslint-disable-next-line no-magic-numbers
        testDate.setFullYear(2021);
        testDate.setMonth(0);
        testDate.setDate(1);
        testDate.setHours(0);
        testDate.setMinutes(0);
        testDate.setSeconds(0);
        testDate.setMilliseconds(0);

        testDate2 = new Date();
        // eslint-disable-next-line no-magic-numbers
        testDate2.setFullYear(2022);
        testDate2.setMonth(0);
        testDate2.setDate(1);
        testDate2.setHours(0);
        testDate2.setMinutes(0);
        testDate2.setSeconds(0);
        testDate2.setMilliseconds(0);

        testDateTime = new Date();
        // eslint-disable-next-line no-magic-numbers
        testDateTime.setFullYear(2021);
        testDateTime.setMonth(0);
        testDateTime.setDate(1);
        // eslint-disable-next-line no-magic-numbers
        testDateTime.setHours(10);
        testDateTime.setMinutes(0);
        testDateTime.setSeconds(0);
        testDateTime.setMilliseconds(0);

        testDateTime2 = new Date();
        // eslint-disable-next-line no-magic-numbers
        testDateTime2.setFullYear(2021);
        testDateTime2.setMonth(0);
        testDateTime2.setDate(1);
        // eslint-disable-next-line no-magic-numbers
        testDateTime2.setHours(11);
        testDateTime2.setMinutes(0);
        testDateTime2.setSeconds(0);
        testDateTime2.setMilliseconds(0);
    });

    it('1. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1'
        });

        const param: Param = params.getInt(undefined);

        expect(param).to.be.undefined;
    });

    it('2. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1'
        });

        const param: Param = params.getInt('invalid');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('invalid');
        expect(param).to.have.property('value').undefined;
    });

    it('3. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1'
        });

        const param: Param = params.getInt('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').eq(1);
    });

    it('4. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1;2'
        });

        const param: Param = params.getInt('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').deep.eq([1, 2]);
    });

    it('5. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '1'
        }, service);

        const param: Param = params.getInt('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        expect(param).to.have.property('value').eq(1);
    });

    it('6. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '1;2'
        }, service);

        const param: Param = params.getInt('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        expect(param).to.have.property('value').deep.eq([1, 2]);
    });

    it('7. getInt', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'null'
        }, service);

        const param: Param = params.getInt('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-null/no-null
        expect(param).to.have.property('value').eq('null');
    });

    it('8. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1.5'
        });

        const param: Param = params.getFloat(undefined);

        expect(param).to.be.undefined;
    });

    it('9. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1.5'
        });

        const param: Param = params.getFloat('invalid');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('invalid');
        expect(param).to.have.property('value').undefined;
    });

    it('10. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1.5'
        });

        const param: Param = params.getFloat('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-magic-numbers
        expect(param).to.have.property('value').eq(1.5);
    });

    it('11. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            test: '1.5;2.5'
        });

        const param: Param = params.getFloat('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-magic-numbers
        expect(param).to.have.property('value').deep.eq([1.5, 2.5]);
    });

    it('12. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '1.5'
        }, service);

        const param: Param = params.getFloat('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        // eslint-disable-next-line no-magic-numbers
        expect(param).to.have.property('value').eq(1.5);
    });

    it('13. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '1.5;2.5'
        }, service);

        const param: Param = params.getFloat('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        // eslint-disable-next-line no-magic-numbers
        expect(param).to.have.property('value').deep.eq([1.5, 2.5]);
    });

    it('14. getFloat', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'null'
        }, service);

        const param: Param = params.getFloat('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-null/no-null
        expect(param).to.have.property('value').eq('null');
    });

    it('15. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021'
        });

        const param: Param = params.getDate(undefined);

        expect(param).to.be.undefined;
    });

    it('16. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021'
        });

        const param: Param = params.getDate('invalid');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('invalid');
        expect(param).to.have.property('value').undefined;
    });

    it('17. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021'
        });

        const param: Param = params.getDate('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').deep.eq(testDate);
    });

    it('18. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021;31/12/2021'
        });

        const param: Param = params.getDate('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').deep.eq([testDate, testDate2]);
    });

    it('19. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '01/01/2021'
        }, service);

        const param: Param = params.getDate('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        expect(param).to.have.property('value').deep.eq(testDate);
    });

    it('20. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '01/01/2021;31/12/2021'
        }, service);

        const param: Param = params.getDate('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        expect(param).to.have.property('value').deep.eq([testDate, testDate2]);
    });

    it('21. getDate', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'null'
        }, service);

        const param: Param = params.getDate('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-null/no-null
        expect(param).to.have.property('value').eq('null');
    });

    it('22. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021 10:00'
        });

        const param: Param = params.getDateTime(undefined);

        expect(param).to.be.undefined;
    });

    it('23. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021 10:00'
        });

        const param: Param = params.getDateTime('invalid');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('invalid');
        expect(param).to.have.property('value').undefined;
    });

    it('24. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021 10:00'
        });

        const param: Param = params.getDateTime('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').deep.eq(testDateTime);
    });

    it('25. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            test: '01/01/2021 10:00;01/01/2021 11:00'
        });

        const param: Param = params.getDateTime('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').deep.eq([testDateTime, testDateTime2]);
    });

    it('26. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '01/01/2021 10:00'
        }, service);

        const param: Param = params.getDateTime('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        expect(param).to.have.property('value').deep.eq(testDateTime);
    });

    it('27. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            'test.test': '01/01/2021 10:00;01/01/2021 11:00'
        }, service);

        const param: Param = params.getDateTime('test.test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('testTest');
        expect(param).to.have.property('value').deep.eq([testDateTime, testDateTime2]);
    });

    it('28. getDateTime', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'null'
        }, service);

        const param: Param = params.getDateTime('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-null/no-null
        expect(param).to.have.property('value').eq('null');
    });

    it('29. getBoolean', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'true'
        });

        const param: Param = params.getBoolean(undefined);

        expect(param).to.be.undefined;
    });

    it('30. getBoolean', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'true'
        });

        const param: Param = params.getBoolean('invalid');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('invalid');
        expect(param).to.have.property('value').undefined;
    });

    it('31. getBoolean', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'true'
        });

        const param: Param = params.getBoolean('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').eq(true);
    });

    it('32. getBoolean', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'false'
        });

        const param: Param = params.getBoolean('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').eq(false);
    });

    it('33. getBoolean', async (): Promise<void> => {
        const params: Params = new Params({
            test: undefined
        });

        const param: Param = params.getBoolean('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').eq(undefined);
    });

    it('34. getBoolean', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'null'
        }, service);

        const param: Param = params.getBoolean('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-null/no-null
        expect(param).to.have.property('value').eq('null');
    });

    it('35. getString', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'test1'
        });

        const param: Param = params.getString('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        expect(param).to.have.property('value').eq('test1');
    });

    it('36. getString', async (): Promise<void> => {
        const params: Params = new Params({
            test: 'null'
        }, service);

        const param: Param = params.getString('test');

        expect(param).to.exist;
        expect(param).to.have.property('name').eq('test');
        // eslint-disable-next-line no-null/no-null
        expect(param).to.have.property('value').eq('null');
    });
});
