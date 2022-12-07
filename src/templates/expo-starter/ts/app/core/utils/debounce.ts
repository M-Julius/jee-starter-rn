export default function debounce<T>(callback: (props: T) => any, time: number) {
  let currentTime = 0;
  function runFn(args: T, current: number) {
    if (current === currentTime) { callback(args); }
  }
  function debounced(args: T) {
    const current = Date.now();
    currentTime = current;
    setTimeout(() => runFn(args, current), time);
  }
  function cancel() {
    currentTime = 0;
  }
  debounced.cancel = cancel;
  return debounced;
}
