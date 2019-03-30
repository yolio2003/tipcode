let version = '1.0.1'
let out = ''
out += `//>imlinecode
`
out += `function simpleIncludeExample(`
out += `/*>file*/`
out += `) {
  writeln(
    indent(
      require("`
out += `/*>=file*/`
out += `")
        .readFileSync(file)
        .toString("`
out += `/*>==file*/`
out += `"),
      __
    )
  );
  writeln(indent("indent", __));
}
`
out += `//>=line
`
out += `12323
`
out += `/*>123123*/`
out += `
223123
`
out += `  //>== simpleIncludeExample("./ms.js")
`

console.log(out === require('fs').readFileSync('./tipcode.input.js', 'utf8'))