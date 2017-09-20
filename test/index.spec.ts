import equal from '@async-generators/equal';
import iterable from '../src';
import { expect } from 'chai';

describe("@async-generator/filter", () => {
  it("should throw error if source is not iterable", async () => {
    let error: Error;
    try {
      for await (const _ of iterable(<any>{}));
    } catch (err) {
      error = err.message;
    }
    expect(error).to.be.eq("source parameter is not iterable");
  })


  it("should yield all source items when source is async iterable", async () => {
    let source = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    let expected = [1, 2, 3, 4];
    let result = []

    for await (let item of iterable(source())) {
      result.push(item);
    }
    expect(result).to.eql(expected);
  })

  it("should yield all source items when source is iterable", async () => {
    let source = function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    let expected = [1, 2, 3, 4];
    let result = []

    for await (let item of iterable(source())) {
      result.push(item);
    }
    expect(result).to.eql(expected);
  })

  it("should yield all source items when source is array", async () => {
    let source = [1,2,3,4];
    let expected = [1, 2, 3, 4];
    let result = []

    for await (let item of iterable(source)) {
      result.push(item);
    }
    expect(result).to.eql(expected);
  })

  it("should yield all source items when source is typed array", async () => {
    let source = new Uint8Array([1,2,3,4]);
    let expected = [1, 2, 3, 4];
    let result = []

    for await (let item of iterable(source)) {
      result.push(item);
    }
    expect(result).to.eql(expected);
  })

  it("should yield all source items when source yields from this", async () => {
    class Foo{
      items = [1,2,3,4];
      *[Symbol.iterator](){
        for(let item of this.items){
          yield item;
        }
      }
    }
    
    let source = new Foo();
    let expected = [1, 2, 3, 4];
    let result = []

    for await (let item of iterable(source)) {
      result.push(item);
    }
    expect(result).to.eql(expected);
  })
})