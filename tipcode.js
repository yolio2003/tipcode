const peg = require("./tipcode.parser.js");
const log = console;
// tipcode 去掉 eval  未指派
// tipcode 支持 sourcemap  未指派
// tipcode 支持 上报 和 log  未指派
// tipcode pegjs 支持  未指派
// tipcode *.tc.js //> /*> //>== //>=  未指派
// tipcode 不用 runinnewcontext 而是直接编译结果如何？  未指派

// var __version = require(__dirname+"/package.json")['version'];

let TESTTEXT = `
//>imlinecode
function simpleIncludeExample(/*>file*/) {
  writeln(
    indent(
      require("/*>=file*/")
        .readFileSync(file)
        .toString("/*>==file*/"),
      __
    )
  );
  writeln(indent("indent", __));
}
//>=line
12323
/*>123123*/
223123
  //>== simpleIncludeExample("./ms.js")
`;

let parsed = peg.parse(TESTTEXT);
// log.log(parsed);
let complied = [];
parsed.map(v => {
  switch (v.type) {
    case "text":
      complied.push(v.code);
      break;
      case "line":
      case "line.val":
      case "line.val.str":
      complied.push(v.indent + v.start + v.code + (v.end?v.end:''));
      break;
    case "pair":
    case "pair.val":
    case "pair.val.str":
      complied.push(v.indent + v.start + v.code + (v.end?v.end:''));
      break;
  }
});

log.log(complied.join(""));
