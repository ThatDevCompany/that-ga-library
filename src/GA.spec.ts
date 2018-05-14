import {GA} from './GA';
import {GACitizen} from './GACitizen';

describe('GA', () => {
	it('should work', () => {
		let ga = new GA((x: GACitizen): number => { return 0; });
		expect(true).toEqual(true);
	})
});
