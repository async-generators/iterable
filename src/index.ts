if(Symbol["asyncIterator"] === undefined) ((<any>Symbol)["asyncIterator"]) = Symbol.for("asyncIterator");

export default function iterable<T>(
  source: AsyncIterable<T> | Iterable<T> | (() => AsyncIterable<T> | Iterable<T>),
  errmsg: string = "source parameter is not iterable"
): AsyncIterable<T> {
  if (source == undefined) {
    throw Error(errmsg);
  }

  const It = source[Symbol.asyncIterator] || source[Symbol.iterator];

  if (typeof It !== "function") {
    if (typeof source === "function") {
      return iterable(source(), errmsg);
    }
    throw Error(errmsg);
  }

  return {
    [Symbol.asyncIterator]() { return It.call(source); }
  }
}