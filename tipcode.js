const fs = require("fs");
const pegjs = require("pegjs");
// const peg = require("./tipcode.parser.js");

const log = console;
const stringify = v => JSON.stringify(v, null, 2);
const read = p => fs.readFileSync(p, "utf8");
const write = (p, v) => fs.writeFileSync(p, v, "utf8");

// tipcode 去掉 eval  未指派
// tipcode 支持 sourcemap  未指派
// tipcode 支持 上报 和 log  未指派
// tipcode pegjs 支持  未指派
// tipcode *.tc.js //> /*> //>== //>=  未指派
// tipcode 不用 runinnewcontext 而是直接编译结果如何？  未指派

let peg = pegjs.generate(read("./tipcode.parser.pegjs"));

let parsed = peg.parse(read("./tipcode.input.js"));
// log.log(parsed);
write("./tipcode.parser.json", stringify(parsed));

let complied = [
  `let version = '${require(__dirname + "/package.json")["version"]}'`,
  "let out = ''"
];
parsed.map(v => {
  switch (v.type) {
    case "text":
      complied.push("out += `" + v.code + "`");
      break;
    case "line":
      complied.push(v.code + (v.end ? v.end : ""));
      break;
    case "line.val":
    case "line.val.str":
      complied.push("out += " + v.code);
      break;
      // complied.push(
      //   "out += `" + v.indent + v.start + v.code + (v.end ? v.end : "") + "`"
      // );
      break;
    case "pair":
      complied.push(v.code);
      break;
    case "pair.val":
    case "pair.val.str":
      complied.push("out += " + v.code);
      break;
      // complied.push(
      //   "out += `" + v.indent + v.start + v.code + (v.end ? v.end : "") + "`"
      // );
      break;
  }
});
complied.push(
  "\nconsole.log(out)"
  // "\nconsole.log(out === require('fs').readFileSync('./tipcode.input.js', 'utf8'))"
);

// log.log(complied.join(""));
write("./tipcode.output.js", complied.join("\n"));

require("./tipcode.output.js");

// parsed.map(v => {
//   switch (v.type) {
//     case "text":
//       complied.push(v.code);
//       break;
//       case "line":
//       case "line.val":
//       case "line.val.str":
//       complied.push(v.indent + v.start + v.code + (v.end?v.end:''));
//       break;
//     case "pair":
//     case "pair.val":
//     case "pair.val.str":
//       complied.push(v.indent + v.start + v.code + (v.end?v.end:''));
//       break;
//   }
// });

// log.log(complied.join(""));
