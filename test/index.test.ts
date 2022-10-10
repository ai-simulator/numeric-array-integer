import { NumericArrayInteger } from '../src';
describe('NumericArrayInteger', () => {
  it('initialize with correct element bit length and array length', () => {
    const integer = new NumericArrayInteger(2, 4);
    expect(integer.getData() === 0);
    expect(integer.getElementBitLength() === 2);
    expect(integer.getArrayLength() === 4);
    expect(integer.getPos(0) === 0);
    expect(integer.getPos(3) === 0);
  });

  it('initialize throw error with large length', () => {
    expect(() => {
      new NumericArrayInteger(10, 6);
    }).toThrowError('Length exceeds limit for safe integer');
  });

  it('set position, get and clear position correctly', () => {
    const integer = new NumericArrayInteger(2, 10);
    expect(integer.getPos(2)).toEqual(0);
    integer.setPos(2, 1);
    expect(integer.getPos(2)).toEqual(1);
    integer.clearPos(2);
    expect(integer.getPos(2)).toEqual(0);
  });

  it('set position, get and clear position throw error for invalid position', () => {
    const integer = new NumericArrayInteger(4, 10);
    expect(() => integer.getPos(13)).toThrowError('Position exceeds length');
    expect(() => integer.setPos(13, 2)).toThrowError('Position exceeds length');
    expect(() => integer.getPos(13)).toThrowError('Position exceeds length');
    expect(() => integer.clearPos(13)).toThrowError('Position exceeds length');
  });

  it('set position handle boundry and invalid value', () => {
    const integer = new NumericArrayInteger(4, 10);
    integer.setPos(1, 2 ** 4 - 1);
    expect(integer.getPos(1)).toEqual(2 ** 4 - 1);
    expect(() => integer.setPos(1, 2 ** 4 + 1)).toThrowError(
      'Value exceeds bit length'
    );
    expect(() => integer.setPos(1, 2 ** 4)).toThrowError(
      'Value exceeds bit length'
    );
  });

  it('save and load correctly', () => {
    const integer = new NumericArrayInteger(4, 10);
    integer.setPos(0, 3);
    integer.setPos(2, 2);
    const data = integer.getData();
    const integer2 = NumericArrayInteger.fromData(data, 4, 10);
    expect(integer2.getPos(0)).toEqual(3);
    expect(integer2.getPos(2)).toEqual(2);
  });

  it('load correctly', () => {
    const integer2 = NumericArrayInteger.fromData(5, 1, 3);
    expect(integer2.getPos(0)).toEqual(1);
    expect(integer2.getPos(2)).toEqual(1);
  });

  it('sequence of sets, gets and clear runs correctly', () => {
    const integer = new NumericArrayInteger(4, 10);
    integer.setPos(2, 4);
    expect(integer.getPos(0)).toEqual(0);
    expect(integer.getPos(2)).toEqual(4);
    expect(integer.getPos(4)).toEqual(0);
    integer.setPos(4, 2);
    expect(integer.getPos(0)).toEqual(0);
    expect(integer.getPos(2)).toEqual(4);
    expect(integer.getPos(4)).toEqual(2);
    integer.clearPos(2);
    expect(integer.getPos(0)).toEqual(0);
    expect(integer.getPos(2)).toEqual(0);
    expect(integer.getPos(4)).toEqual(2);
    integer.clearPos(0);
    expect(integer.getPos(0)).toEqual(0);
    expect(integer.getPos(2)).toEqual(0);
    expect(integer.getPos(4)).toEqual(2);
    integer.setPos(0, 3);
    expect(integer.getPos(0)).toEqual(3);
    expect(integer.getPos(2)).toEqual(0);
    expect(integer.getPos(4)).toEqual(2);
    integer.clearPos(2);
    expect(integer.getPos(0)).toEqual(3);
    expect(integer.getPos(2)).toEqual(0);
    expect(integer.getPos(4)).toEqual(2);
    integer.clearPos(4);
    expect(integer.getPos(0)).toEqual(3);
    expect(integer.getPos(2)).toEqual(0);
    expect(integer.getPos(4)).toEqual(0);
    integer.clearPos(0);
    expect(integer.getPos(0)).toEqual(0);
    expect(integer.getPos(2)).toEqual(0);
    expect(integer.getPos(4)).toEqual(0);

    expect(integer.getPos(5)).toEqual(0);
  });
});
