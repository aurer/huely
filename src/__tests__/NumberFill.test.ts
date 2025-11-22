import NumberFill from '../lib/NumberFill';

// between
it('fills numbers between 1 and 3', () => {
	expect(NumberFill.numbersBetween(1, 3, 1)).toEqual([2]);
});

it('fills numbers between 1 and 4', () => {
	expect(NumberFill.numbersBetween(1, 4, 2)).toEqual([2, 3]);
});

it('fills numbersBetween 1 and 2', () => {
	expect(NumberFill.numbersBetween(1, 2, 1)).toEqual([1.5]);
});

it('fills numbersBetween 10 and 100', () => {
	expect(NumberFill.numbersBetween(10, 100, 8)).toEqual([20, 30, 40, 50, 60, 70, 80, 90]);
});

// between inclusive
it('inclusively fills numbers between 1 and 3', () => {
	expect(NumberFill.numbersBetweenInclusive(1, 3, 1)).toEqual([1, 2, 3]);
});

it('inclusively fills numbers between 10 and 100', () => {
	expect(NumberFill.numbersBetweenInclusive(10, 100, 8)).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
});

// interval
it('get the interval for 1 * * 4', () => {
	expect(NumberFill.intervalBetween(1, 4, 2)).toBe(1);
});

it('get the interval for 1 * * * 5', () => {
	expect(NumberFill.intervalBetween(1, 5, 3)).toBe(1);
});

it('get the interval for 1 * * 7', () => {
	expect(NumberFill.intervalBetween(1, 7, 2)).toBe(2);
});

it('get the interval 5 for 1 * 2', () => {
	expect(NumberFill.intervalBetween(1, 2, 1)).toBe(0.5);
});

// fill blanks
it('fills single gaps', () => {
	const input: Array<number | null> = [null, 1, null];
	const result = NumberFill.fillBlanks(input);
	expect(result).toEqual([0, 1, 2]);
});

it('fills multiple gaps correctly with null ends', () => {
	const input = [null, null, 2, null, null];
	const result = NumberFill.fillBlanks(input);
	expect(result).toEqual([0, 1, 2, 3, 4]);
});

it('fills multiple gaps correctly with populated ends', () => {
	const input = [1, null, null, null, 5, null, null, 8];
	const result = NumberFill.fillBlanks(input);
	expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

it('fills fractional gaps correctly', () => {
	const input = [1, null, 2, null, 3];
	const result = NumberFill.fillBlanks(input);
	expect(result).toEqual([1, 1.5, 2, 2.5, 3]);
});
