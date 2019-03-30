{
  function transform(type, code, start, end, indent, location) {
    let ret = {
      type: type,
      code: code.join(''),
      start,
      end
    }

    if (location.start.column === 1) {
      ret.indent = indent.join('')
    }

    return ret
  }
  function strpush(arr, v) {
    if (v !== '') {
      arr.push({
        type: 'text',
        code: v
      })
    }
  }
}

TipCode
  = x:(PairValStrComment / PairValComment / PairComment / LineValStrComment / LineValComment / LineComment / .)* {
    let accstr = ''
    let accarr = []
    x.map(v => {
      if (Object.prototype.toString.call(v) === '[object Object]') {
        strpush(accarr, accstr)
        accstr = ''
        accarr.push(v)
      } else {
        accstr = accstr + v
      }
    })
    strpush(accarr, accstr)
    return accarr
  }

Indent
  = ' ' / '\t'

PairComment
  = indent:Indent* start:'/*>' code:(!'*/' .)* end:'*/' {
    return transform('pair', code.map(([a, b]) => b), start, end, indent, location())
  }

PairValComment
  = indent:Indent* start:'/*>=' code:(!'*/' .)* end:'*/' {
    return transform('pair.val', code.map(([a, b]) => b), start, end, indent, location())
  }

PairValStrComment
  = indent:Indent* start:'/*>==' code:(!'*/' .)* end:'*/' {
    return transform('pair.val.str', code.map(([a, b]) => b), start, end, indent, location())
  }

LineComment
  = indent:Indent* start:'//>' code:[^\n]* end:'\n'? {
    return transform('line', code, start, end, indent, location())
  }

LineValComment
  = indent:Indent* start:'//>=' code:[^\n]* end:'\n'? {
    return transform('line.val', code, start, end, indent, location())
  }

LineValStrComment
  = indent:Indent* start:'//>==' code:[^\n]* end:'\n'? {
    return transform('line.val.str', code, start, end, indent, location())
  }