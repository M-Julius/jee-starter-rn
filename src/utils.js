// change str to pascal case ex: PascalCase
function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

// change str to dash ex: test-dash
function toDashize(string) {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toLowerCase();
    })
    .replace(/[\s-]+/g, "-");
}


module.exports = {
  toPascalCase,
  toDashize,
};
