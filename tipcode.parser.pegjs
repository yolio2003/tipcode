Tipcode
  = x:(Paircomment / Linecomment / .)* {
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
    accarr.push({
      t: 'text',
      c: accstr
    })
    return accarr
  }

Paircomment
  = '/*>' c:(!'*/' .)* '*/' {
    return {
      t: "block",
      c: c.map(([a, b]) => b).join(''),
    }
  }

Indent
 = ' ' / '\t'

Linecomment
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

_ "whitespace"
  = [ \t\n\r]