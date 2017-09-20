export default function <T>(
  source: AsyncIterable<T> | Iterable<T>
): AsyncIterable<T> {
  const It = source[Symbol.asyncIterator] || source[Symbol.iterator];
  if (typeof It !== "function")
    throw Error("source parameter is not iterable");
  return {
    [Symbol.asyncIterator]() { return It.call(source); }
  }
}