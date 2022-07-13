export class NumericArrayInteger {
  private elementBitLength: number;
  private arrayLength: number;
  private data: number;

  constructor(elementBitLength: number, arrayLength: number) {
    if (2 ** (elementBitLength * arrayLength) >= Number.MAX_SAFE_INTEGER) {
      throw new Error('Length exceeds limit for safe integer');
    }
    this.elementBitLength = elementBitLength;
    this.arrayLength = arrayLength;
    this.data = 0;
  }

  loadData(data: number) {
    this.data = data;
  }

  static fromData(data: number, elementBitLength: number, arrayLength: number) {
    const array = new NumericArrayInteger(elementBitLength, arrayLength);
    array.loadData(data);
    return array;
  }

  getData() {
    return this.data;
  }

  getArrayLength() {
    return this.arrayLength;
  }

  getElementBitLength() {
    return this.elementBitLength;
  }

  getBits() {
    return this.data
      .toString(2)
      .padStart(this.arrayLength * this.elementBitLength, '0');
  }

  getBinaryString(value: number) {
    return value
      .toString(2)
      .padStart(this.arrayLength * this.elementBitLength, '0');
  }

  setPos(position: number, value: number) {
    if (position > this.arrayLength) {
      throw new Error('Position exceeds length');
    }
    if (value > 2 ** this.elementBitLength) {
      throw new Error('Value exceeds bit length');
    }
    const mask = value << (position * this.elementBitLength);
    this.data |= mask;
  }

  clearPos(position: number) {
    if (position > this.arrayLength) {
      throw new Error('Position exceeds length');
    }
    const mask =
      (2 ** this.elementBitLength - 1) << (position * this.elementBitLength);
    this.data &= ~mask;
  }

  getPos(position: number) {
    if (position > this.arrayLength) {
      throw new Error('Position exceeds length');
    }
    const mask =
      (2 ** this.elementBitLength - 1) << (position * this.elementBitLength);
    return (this.data & mask) >> (position * this.elementBitLength);
  }
}
