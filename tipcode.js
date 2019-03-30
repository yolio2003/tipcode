// tipcode 去掉 eval  未指派
// tipcode 支持 sourcemap  未指派
// tipcode 支持 上报 和 log  未指派
// tipcode pegjs 支持  未指派
// tipcode *.tc.js //> /*> //>== //>=  未指派
// tipcode 不用 runinnewcontext 而是直接编译结果如何？  未指派

// var __version = require(__dirname+"/package.json")['version'];

let testtext = `
//>imlinecode
function simpleIncludeExample(file) {
  writeln(
    indent(
      require("fs")
        .readFileSync(file)
        .toString("utf8"),
      __
    )
  );
  writeln(indent("indent", __));
}
//>line
12323
/*>123123*/
223123
  //> simpleIncludeExample("./ms.js")
`
