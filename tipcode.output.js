let version = '1.0.1'
let out = ''
 let a = "a"

function simpleIncludeExample(a) {
  return a
}
let b = "b"

out += `
  writeln(
    indent(
      require("`
out += b
out += `")
        .readFileSync(file)
        .toString("`
out += a
out += `"),
      __
    )
  );
  writeln(indent("indent", __));
`
out += a
out += `12323
`
123123
out += `
223123
`
out +=  simpleIncludeExample("./ms.js")

console.log(out)