import SET from '../src/Set.js';
var expect = require('chai').expect;

describe('Set', function() {
  let Set, Set2, expected;

  beforeEach(function() {
    Set = new SET();
    Set2 = new SET();
  });

  afterEach(function() {
    expected, Set, (Set2 = null);
  });

  it('intersect should return intersection when this set is larger than that set', function() {
    Set.add('a');
    Set.add('b');
    Set.add('c');
    Set2.add('b');
    Set2.add('c');
    expect(Set.intersect(Set2)).to.have.members(['b', 'c']);
  });

  it('intersect should return intersection when this set is same size of that set', function() {
    Set.add('a');
    Set.add('b');
    Set2.add('b');
    Set2.add('c');
    expect(Set.intersect(Set2)).to.have.members(['b']);
  });

  it('intersect should return intersection when this set is smaller than that set', function() {
    Set.add('a');
    Set.add('b');
    Set2.add('b')
      .add('c')
      .add('d')
      .add('e');
    expect(Set.intersect(Set2)).to.have.members(['b']);
  });

  it('intersect should return empty array when two sets have no intersection', function() {
    Set.add('a');
    Set.add('b');
    Set.add('c');
    Set2.add('e');
    Set2.add('f');
    Set2.add('g');
    Set2.add('r');
    expect(Set.intersect(Set2)).to.have.members([]);
  });

  it('intersect should return empty array when other set is empty', function() {
    Set.add('a');
    expect(Set.intersect(Set2)).to.have.members([]);
  });

  it("intersect should return empty array when 'this' is empty", function() {
    Set2.add('b');
    Set.intersect(Set2);
    expect(Set.intersect(Set2)).to.have.members([]);
  });

  it('intersect should return empty array when both are empty', function() {
    Set.intersect(Set2);
    expect(Set.intersect(Set2)).to.have.members([]);
  });

  it('diff should return this set when no difference', function() {
    Set.add('a');
    Set.add('b');
    Set.add('c');
    Set2.add('d');
    Set2.add('e');
    Set2.add('f');
    expect(Set.diff(Set2)).to.have.members(['a', 'b', 'c']);
  });

  it('diff should return difference when difference', function() {
    Set.add('a');
    Set.add('b');
    Set.add('c');
    Set2.add('c');
    expect(Set.diff(Set2)).to.have.members(['a', 'b']);
  });

  it('diff should return empty array for equal sets', function() {
    Set.add('a');
    Set.add('b');
    Set.add('c');
    Set2.add('c')
      .add('b')
      .add('a');
    expect(Set.diff(Set2)).to.have.members([]);
  });

  it("diff should return empty array 'this' set is empty", function() {
    Set2.add('f');
    expect(Set.diff(Set2)).to.have.members([]);
  });

  it('diff should return difference when other set is empty', function() {
    Set.add('a');
    Set.add('b');
    Set.add('c');
    expect(Set.diff(Set2)).to.have.members(['a', 'b', 'c']);
  });

  it('diff should return empty array when both are empty', function() {
    expect(Set.diff(Set2)).to.have.members([]);
  });

  it('union should return empty array when both are empty', function() {
    expect(Set.union(Set2)).to.have.members([]);
  });

  it('union should not include duplicates in union', function() {
    Set.add(9).add(10);
    Set2.add(9)
      .add(11)
      .add(10);
    expect(Set.union(Set2)).to.have.members([9, 10, 11]);
  });

  it('union should return union when both sets are totally different', function() {
    Set.add(1)
      .add(2)
      .add(3);
    Set2.add(9).add(13);
    expect(Set.union(Set2)).to.have.members([1, 2, 3, 9, 13]);
  });

  it('remove should remove an element from the set', function() {
    Set.add(1)
      .add(2)
      .add(3);
    Set.remove(2);
    expect(Set.union(Set2)).to.have.members([3, 1]);
  });
});
