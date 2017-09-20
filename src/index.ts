export default function <T>(
  source: AsyncIterable<T> | Iterable<T>,
  errmsg:string = "source parameter is not iterable"
): AsyncIterable<T> {
  const It = source[Symbol.asyncIterator] || source[Symbol.iterator];
  if (typeof It !== "function")
    throw Error(errmsg);
  return {
    [Symbol.asyncIterator]() { return It.call(source); }
  }
}