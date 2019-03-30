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
log.log(parsed);
let complied = [];
parsed.map(v => {
  if (v.type === "text") {
  } else if (v.type === "line") {
  } else if (v.type === "linevalue") {
  } else if (v.type === "linevaluestringify") {
  } else if (v.type === "pair") {
  } else if (v.type === "pairvalue") {
  } else if (v.type === "pairvaluestringify") {
  }
  complied.push(v.code + (v.tail?v.tail:''));
});

log.log(complied.join(""));
