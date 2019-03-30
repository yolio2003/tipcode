TipCode
  = x:(PairComment / PairValueComment / PairValueStringifyComment / LineComment / LineValueComment / LineValueStringifyComment / .)* {
    let accstr = ''
    let accarr = []
    x.reduce((acc, n) => {
      if (Object.prototype.toString.call(n) === '[object Object]') {
          if (accstr !=='') {
            acc.push({
              t: 'text',
              c: accstr
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
        t: 'text',
        c: accstr
      })
    }
    return accarr
  }

PairComment
  = '/*>' c:(!'*/' .)* '*/' {
    return {
      t: "pair",
      c: c.map(([a, b]) => b).join(''),
    }
  }

PairValueComment
  = '/*>=' c:(!'*/' .)* '*/' {
    return {
      t: "pairvalue",
      c: c.map(([a, b]) => b).join(''),
    }
  }

PairValueStringifyComment
  = '/*>==' c:(!'*/' .)* '*/' {
    return {
      t: "pairvaluestringify",
      c: c.map(([a, b]) => b).join(''),
    }
  }

Indent
 = ' ' / '\t'

LineComment
  = i:Indent* '//>' c:[^\n]* '\n'? {
    let l = location()
    let ret = {
      t: "line",
      c: c.join(''),
    }
    console.log(l)

    if (l.start.column === 1) {
      ret.i = i.join('')
    }

    return ret
  }

LineValueComment
  = i:Indent* '//>=' c:[^\n]* '\n'? {
    let l = location()
    let ret = {
      t: "linevalue",
      c: c.join(''),
    }
    console.log(l)

    if (l.start.column === 1) {
      ret.i = i.join('')
    }

    return ret
  }

LineValueStringifyComment
  = i:Indent* '//>==' c:[^\n]* '\n'? {
    let l = location()
    let ret = {
      t: "linevaluestringify",
      c: c.join(''),
    }
    console.log(l)

    if (l.start.column === 1) {
      ret.i = i.join('')
    }

    return ret
  }

_ "whitespace"
  = [ \t\n\r]