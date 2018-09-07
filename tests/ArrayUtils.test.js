import ArrayUtils from '../src/ArrayUtils.js';
const expect = require('chai').expect;

describe('ArrayUtils', function() {
  let expected, actual;
  const even = e => e % 2 === 0;

  beforeEach(function() {
    expected = [];
    actual = [];
  });

  afterEach(function() {
    expected, (actual = null);
  });

  it('constructor instantiates properly', function() {
    expect(new ArrayUtils()).to.be.a('object');
  });

  it('remove returns and removes first index of array', function() {
    actual.push(1, 2, 3, 4, 5, 6);
    let removed = ArrayUtils.remove(actual, 0);
    expected = [2, 3, 4, 5, 6];
    expect(actual).to.have.ordered.members(expected);
    expect(removed).to.have.ordered.members([1]);
  });

  it('remove returns and removes last index of array', function() {
    actual.push(1, 2, 3, 4, 5, 6);
    let removed = ArrayUtils.remove(actual, 5);
    expected = [1, 2, 3, 4, 5];
    expect(actual).to.have.ordered.members(expected);
    expect(removed).to.have.ordered.members([6]);
  });

  it('remove returns and removes middle index of array', function() {
    actual.push(1, 2, 3, 4, 5, 6);
    let removed = ArrayUtils.remove(actual, 3);
    expected = [1, 2, 3, 5, 6];
    expect(actual).to.have.ordered.members(expected);
    expect(removed).to.have.ordered.members([4]);
  });

  it('remove returns empty array when given empty array', function() {
    ArrayUtils.remove(actual, 3);
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });

  it('remove returns empty array when given undefined', function() {
    expected = [];
    expect(ArrayUtils.remove(undefined, undefined)).to.have.ordered.members(
      expected
    );
  });

  it('remove returns sole element with array of length 1', function() {
    actual.push('A');
    let removed = ArrayUtils.remove(actual, 0);
    expected = [];
    expect(actual).to.have.ordered.members(expected);
    expect(removed).to.have.ordered.members(['A']);
  });

  it('remove should not alter array when index equals array length', function() {
    actual.push('A');
    ArrayUtils.remove(actual, 1);
    expected = ['A'];
    expect(actual).to.have.ordered.members(expected);
  });

  it('remove should not alter array when index > array length', function() {
    actual.push('A');
    ArrayUtils.remove(actual, 2);
    expected = ['A'];
    expect(actual).to.have.ordered.members(expected);
  });

  it('remove should not remove anything when index < 0', function() {
    actual.push('A');
    ArrayUtils.remove(actual, -1);
    expected = ['A'];
    expect(actual).to.have.ordered.members(expected);
  });

  it('removeElement should remove item from array', function() {
    actual.push('A');
    let removed = ArrayUtils.removeElement(actual, ele => ele === 'A');
    expected = [];
    expect(actual).to.have.ordered.members(expected);
    expect(removed).to.have.ordered.members(['A']);
  });

  it('removeElement returns empty array when given undefined', function() {
    expected = [];
    expect(ArrayUtils.removeElement(undefined, () => true)).to.have.ordered.members(
      expected
    );
  });

  it('removeElement should not alter array if element is not in array', function() {
    actual.push('A', 'B');
    ArrayUtils.removeElement(actual, ele => ele === 'C');
    expected = ['A', 'B'];
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate should rotate left for negative numbers', function() {
    actual.push('A', 'B', 'C', 'D');
    expected = ['B', 'C', 'D', 'A'];
    actual = ArrayUtils.rotate(actual, -1);
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate return empty array when both args are undefined', function() {
    expected = [];
    actual = ArrayUtils.rotate(undefined, undefined);
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate should rotate right for positive numbers', function() {
    actual.push('A', 'B', 'C', 'D');
    expected = ['B', 'C', 'D', 'A'];
    actual = ArrayUtils.rotate(actual, 3);
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate should not do anything for empty array', function() {
    expected = [];
    ArrayUtils.rotate(actual, 20);
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate should result in same array when length is 1', function() {
    actual.push('A');
    expected = ['A'];
    actual = ArrayUtils.rotate(actual, 13);
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate should revert to normal array when rotations equal |length|', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    actual = ArrayUtils.rotate(actual, 3);
    expect(actual).to.have.ordered.members(expected);
    actual = ArrayUtils.rotate(actual, -3);
    expect(actual).to.have.ordered.members(expected);
  });

  it('rotate zero times should do nothing to array', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    actual = ArrayUtils.rotate(actual);
    expect(actual).to.have.ordered.members(expected);
  });

  it('popMany does not alter original array', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    ArrayUtils.popMany(actual, 2);
    expect(actual).to.have.ordered.members(expected);
  });

  it('popMany returns empty array when both args are undefined', function() {
    expected = [];
    expect(ArrayUtils.popMany(undefined, undefined)).to.have.ordered.members(
      expected
    );
  });

  it('popMany once should only pop one element from array', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B'];
    expect(ArrayUtils.popMany(actual, 1)).to.have.ordered.members(expected);
  });

  it('popMany should return empty array when times to pop is length', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.popMany(actual, 3)).to.have.ordered.members([]);
  });

  it('popMany should return empty array when times to pop is greater than array length', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.popMany(actual, 4)).to.have.ordered.members([]);
  });

  it('popMany should return original array when times to pop is less than 0', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.popMany(actual, -1)).to.have.ordered.members(expected);
  });

  it('popMany should return original array when times to pop is 0', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.popMany(actual, 0)).to.have.ordered.members(expected);
  });

  it('popMany should return empty array when given empty array', function() {
    expected = [];
    expect(ArrayUtils.popMany(actual, 5)).to.have.ordered.members(expected);
  });
  // shift methods

  it('shiftMany does not alter original array', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    ArrayUtils.shiftMany(actual, 2);
    expect(actual).to.have.ordered.members(expected);
  });

  it('shiftMany returns empty array when given undefined', function() {
    expected = [];
    ArrayUtils.shiftMany(undefined);
    expect(actual).to.have.ordered.members(expected);
  });

  it('shiftMany once should only shift one element from array', function() {
    actual.push('A', 'B', 'C');
    expected = ['B', 'C'];
    expect(ArrayUtils.shiftMany(actual, 1)).to.have.ordered.members(expected);
  });

  it('shiftMany should return empty array when times to shift is length', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.shiftMany(actual, 3)).to.have.ordered.members([]);
  });

  it('shiftMany should return empty array when times to shift is greater than array length', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.shiftMany(actual, 4)).to.have.ordered.members([]);
  });

  it('shiftMany should return original array when times to shift is less than 0', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.shiftMany(actual, -1)).to.have.ordered.members(expected);
  });

  it('shiftMany should return original array when times to shift is 0', function() {
    actual.push('A', 'B', 'C');
    expected = ['A', 'B', 'C'];
    expect(ArrayUtils.shiftMany(actual, 0)).to.have.ordered.members(expected);
  });

  it('shiftMany should return empty array when given empty array', function() {
    expected = [];
    expect(ArrayUtils.shiftMany(actual, 5)).to.have.ordered.members(expected);
  });

  it('pushMany should push many things onto empty array', function() {
    expected = [1, 2, 3, 4, 5];
    expect(ArrayUtils.pushMany(actual, 1, 2, 3, 4, 5)).to.have.ordered.members(
      expected
    );
  });

  it('pushMany should push many things onto non-empty array', function() {
    actual.push(-1, 0);
    expected = [-1, 0, 1, 2, 3, 4, 5];
    expect(ArrayUtils.pushMany(actual, 1, 2, 3, 4, 5)).to.have.ordered.members(
      expected
    );
  });

  it('pushMany does not alter original array', function() {
    actual.push('a', 'b', 'c');
    expected = ['a', 'b', 'c', 1, 2];
    expect(ArrayUtils.pushMany(actual, 1, 2)).to.have.ordered.members(expected);
    expect(actual).to.have.ordered.members(['a', 'b', 'c']);
  });

  it('pushMany returns original array when args are empty', function() {
    expected = [];
    expect(ArrayUtils.pushMany()).to.have.ordered.members(expected);
  });

  it('unshiftMany should unshift many things onto empty array', function() {
    expected = [1, 2, 3, 4, 5];
    expect(
      ArrayUtils.unshiftMany(actual, 1, 2, 3, 4, 5)
    ).to.have.ordered.members(expected);
  });

  it('unshiftMany should return an empty array when given undefined argument', function() {
    expected = [];
    expect(ArrayUtils.unshiftMany(undefined)).to.have.ordered.members(expected);
  });

  it('unshiftMany should unshift many things onto non-empty array', function() {
    actual.push(-1, 0);
    expected = [1, 2, 3, 4, 5, -1, 0];
    expect(
      ArrayUtils.unshiftMany(actual, 1, 2, 3, 4, 5)
    ).to.have.ordered.members(expected);
  });

  it('unshiftMany does not alter original array', function() {
    actual.push('a', 'b', 'c');
    expected = [1, 2, 'a', 'b', 'c'];
    expect(ArrayUtils.unshiftMany(actual, 1, 2)).to.have.ordered.members(
      expected
    );
    expect(actual).to.have.ordered.members(['a', 'b', 'c']);
  });

  it('unshiftMany returns original array when args are empty', function() {
    actual.push('a', 'b', 'c');
    expected = ['a', 'b', 'c'];
    expect(ArrayUtils.unshiftMany(actual)).to.have.ordered.members(expected);
  });

  it('getRand returns random number in array', function() {
    actual.push('a', 'b', 'c');
    for (let i = 0; i < 25; i += 1) {
      let rand = ArrayUtils.getRand(actual);
      expect(actual.indexOf(rand)).to.not.equal(-1);
    }
  });

  it('getRand returns undefined when given undefined argument', function() {
    expect(ArrayUtils.getRand(undefined)).to.be.equal(undefined);
  });

  it('removeRand removes random index in array', function() {
    actual.push('a', 'b', 'c');
    expected = ['a', 'b', 'c'];
    while (actual.length > 0) {
      let removed = ArrayUtils.removeRand(actual);
      expect(expected.indexOf(removed[0])).to.not.be.equal(-1);
    }
  });

  it('removeRand returns empty array when given undefined argument', function() {
    expect(ArrayUtils.removeRand(undefined)).to.have.ordered.members([]);
  });

  it('shuffle shufles array indicies', function() {
    actual.push('a', 'b', 'c', 'd', 'e', 1, 4);
    for (let i = 0; i < 20; i += 1) {
      ArrayUtils.shuffle(actual);
    }
    expect(actual).to.have.members(['a', 'b', 'c', 4, 1, 'e', 'd']);
  });

  it('shuffle does not shuffle empty array', function() {
    for (let i = 0; i < 20; i += 1) {
      ArrayUtils.shuffle(actual);
    }
    expect(actual).to.have.members([]);
  });

  it('shuffle does not throw error when given undefined arg', function() {
    expect(() => ArrayUtils.shuffle()).to.not.throw(Error);
  });

  it('flatten does nothing to flattened array', function() {
    actual.push('a', 'b');
    ArrayUtils.flatten(actual);
    expected = ['a', 'b'];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten one level deep elements', function() {
    actual.push(['a'], ['b']);
    ArrayUtils.flatten(actual);
    expected = ['a', 'b'];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten four level deep elements', function() {
    actual.push([[[['a']]]], [[[[['b']]]]]);
    ArrayUtils.flatten(actual);
    expected = ['a', 'b'];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten some elmeents array, some not', function() {
    actual.push([1, 2, 3], 'e', 'f', [7, 8]);
    ArrayUtils.flatten(actual);
    expected = [1, 2, 3, 'e', 'f', 7, 8];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });
  it('flatten some elmements array, some not multiple levels (arrays of arrays)(1)', function() {
    actual.push([1, [2, 2.5, 2.6, [2.7, [2.8, 2.9, [2.91]]]], 3], ['e'], 'f', [
      [7, 8]
    ]);
    ArrayUtils.flatten(actual);
    expected = [1, 2, 2.5, 2.6, 2.7, 2.8, 2.9, 2.91, 3, 'e', 'f', 7, 8];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten some elmeents array, some not multiple levels (arrays of arrays)(2)', function() {
    actual.push([
      1,
      [2, [3, [[[[[[[[[[[4, [[[[[[[5, [[[['help']]]]]]]]]]]]]]]]]]]]]]]],
      6
    ]);
    ArrayUtils.flatten(actual);
    expected = [1, 2, 3, 4, 5, 'help', 6];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten flattens with objects and arrays (1)', function() {
    let obj = {};
    let a = [];
    actual.push([
      1,
      [obj, [3, [[[[[[[[[[[4, [[[[[[[a, [[[['help']]]]]]]]]]]]]]]]]]]]]]]],
      obj,
      a
    ]);
    ArrayUtils.flatten(actual);
    expected = [1, obj, 3, 4, 'help', obj];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten flattens with objects and arrays (2)', function() {
    let obj = {};
    let a = ['InArray'];
    actual.push([
      1,
      [obj, [3, [[[[[[[[[[[4, [[[[[[[a, [[[['help']]]]]]]]]]]]]]]]]]]]]]]],
      obj,
      a
    ]);
    ArrayUtils.flatten(actual);
    expected = [1, obj, 3, 4, 'InArray', 'help', obj, 'InArray'];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten should not flatten empty array', function() {
    ArrayUtils.flatten(actual);
    expected = [];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('flatten empty arrays and objects case', function() {
    let y = {};
    let z = {};
    actual.push([], [], [], [], y, z);
    ArrayUtils.flatten(actual);
    expected = [y, z];
    expect(ArrayUtils.flatten(actual)).to.have.ordered.members(expected);
  });

  it('chunk should return an empty array for array of length 0', function() {
    expected = [];
    expect(ArrayUtils.chunk(actual, 1)).to.have.ordered.members(expected);
  });

  it('chunk should return empty array when given undefined args', function() {
    expected = [];
    expect(ArrayUtils.chunk()).to.have.ordered.members(expected);
  });

  it('chunk should return an empty array for undefined argument', function() {
    expected = [];
    expect(ArrayUtils.chunk(undefined, 1)).to.have.ordered.members(expected);
  });

  it('chunk should return the input array when chunk size is array length', function() {
    actual.push(1, 2, 3, 4);
    actual = ArrayUtils.chunk(actual, 4);
    expected = [[1, 2, 3, 4]];
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.have.ordered.members(expected[i]);
    }
  });

  it('chunk should return the input array when chunk size is greater than array length', function() {
    actual.push(1, 2, 3, 4);
    actual = ArrayUtils.chunk(actual, 5);
    expected = [[1, 2, 3, 4]];
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.have.ordered.members(expected[i]);
    }
  });

  it('chunk should return the input array when chunk size is less than or equal to zero', function() {
    actual.push(1, 2, 3, 4);
    expected = [];
    expect(ArrayUtils.chunk(actual, -1)).to.have.ordered.members(expected);
    expect(ArrayUtils.chunk(actual, 0)).to.have.ordered.members(expected);
  });

  it('chunk should return as many possible times (arrayLength/chunks) as possible and add the remainder divides oddly', function() {
    actual.push(1, 2, 3, 4, 5);
    actual = ArrayUtils.chunk(actual, 2);
    expected = [[1, 2], [3, 4], [5]];
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.have.ordered.members(expected[i]);
    }
  });

  it('chunk should return as many possible times (arrayLength/chunks) as possible divides evenly', function() {
    actual.push(1, 2, 3);
    actual = ArrayUtils.chunk(actual, 1);
    expected = [[1], [2], [3]];
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i]).to.have.ordered.members(expected[i]);
    }
  });

  it('find finds and returns first element that passes the test', function() {
    actual.push(1, 2, 3, 4);
    expected = actual[1];
    expect(ArrayUtils.find(actual, even)).to.be.equal(expected);
  });

  it('find finds and returns undefined for failed tests for all', function() {
    actual.push(1, 2, 3, 4);
    expect(ArrayUtils.find(actual, e => e > 4)).to.be.equal();
  });

  it('find returns undefined for empty array', function() {
    expect(ArrayUtils.find(actual, e => e > 4)).to.be.equal();
  });

  it('findIndex returns first index that passes the test', function() {
    actual.push(1, 2, 3, 4);
    expected = 1;
    expect(ArrayUtils.findIndex(actual, even)).to.be.equal(expected);
  });

  it('findIndex returns -1 for failed tests for all', function() {
    actual.push(1, 2, 3, 4);
    expect(ArrayUtils.findIndex(actual, e => e > 4)).to.be.equal(-1);
  });

  it('findIndex returns -1 for empty array', function() {
    expect(ArrayUtils.findIndex(actual, e => e > 4)).to.be.equal(-1);
  });

  it('filterNot returns all elements that fail a given test ', function() {
    actual.push(1, 2, 3, 4);
    expected = [1, 3];
    expect(ArrayUtils.filterNot(actual, even)).to.have.ordered.members(
      expected
    );
  });

  it('filterNot returns empty array for empty input array', function() {
    expect(ArrayUtils.filterNot(actual, even)).to.have.ordered.members([]);
  });

  it('mapIf only maps elements that pass test', function() {
    actual.push(1, 2, 3, 4);
    expect(ArrayUtils.mapIf(actual, even, e => e * 3)).to.have.ordered.members([
      6,
      12
    ]);
  });

  it('mapIf returns empty array for empty input array', function() {
    expect(ArrayUtils.mapIf(actual, even, e => e * 3)).to.have.ordered.members(
      []
    );
  });

  it('mapIf returns empty array when no element passes test', function() {
    actual.push(3, 1, 7, 9);
    expect(ArrayUtils.mapIf(actual, even, e => e * 3)).to.have.ordered.members(
      []
    );
  });
});
