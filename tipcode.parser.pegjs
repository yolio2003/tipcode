{
  function blockfn(type, code, start, end, indent, location) {
    let ret = {
      type: type,
      code: code.map(([a, b]) => b).join(''),
      start,
      end
    }

    if (location.start.column === 1) {
      ret.indent = indent.join('')
    }

    return ret
  }
  function linefn(type, code, tail, indent, location) {
    let ret = {
      type: type,
      code: code.join(''),
      tail,
    }

    if (location.start.column === 1) {
      ret.indent = indent.join('')
    }

    return ret
  }
}

TipCode
  = x:(PairValStrComment / PairValComment / PairComment / LineValStrComment / LineValComment / LineComment / .)* {
    let accstr = ''
    let accarr = []
    x.reduce((acc, n) => {
      if (Object.prototype.toString.call(n) === '[object Object]') {
          if (accstr !=='') {
            acc.push({
              type: 'text',
              code: accstr
            })
          }
          accstr = ''
          acc.push(n)
          return acc
      } else {
          accstr = accstr + n
          return acc
      }
    }, accarr)
    if (accstr !=='') {
      acc.push({
        type: 'text',
        code: accstr
      })
    }
    return accarr
  }

Indent
  = ' ' / '\t'

PairComment
  = indent:Indent* start:'/*>' code:(!'*/' .)* end:'*/' {
    return blockfn('pair', code, start, end, indent, location())
  }

PairValComment
  = indent:Indent* start:'/*>=' code:(!'*/' .)* end:'*/' {
    return blockfn('pair.val', code, start, end, indent, location())
  }

PairValStrComment
  = indent:Indent* start:'/*>==' code:(!'*/' .)* end:'*/' {
    return blockfn('pair.val.str', code, start, end, indent, location())
  }

LineComment
  = indent:Indent* '//>' code:[^\n]* tail:'\n'? {
    return linefn('line', code, tail, indent, location())
  }

LineValComment
  = indent:Indent* '//>=' code:[^\n]* tail:'\n'? {
    return linefn('line.val', code, tail, indent, location())
  }

LineValStrComment
  = indent:Indent* '//>==' code:[^\n]* tail:'\n'? {
    return linefn('line.val.str', code, tail, indent, location())
  }