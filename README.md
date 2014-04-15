# chunkwhat

> Grouping [CSSwHat](https://github.com/fb55/CSSwhat) parsed selector.

## Example

- Parsed selector group by combinator
- Grouped chunk is seplarated below
  - tokens[Array]
    - some selectors token(attribute, pseudo, tag)
    - each type is grouped by array
  - combinator
    - before
    - after

- combinator split sample
```js
var chunkwhat = require("chunkwhat")
chunkwhat("a b")
expect = [
  [
    { tokens : { tag: [ { type: 'tag', name: 'a' } ] },
      combinator: {
        before : undefined, after : { type: 'descendant' }
      }
    },
    { tokens : { tag: [ { type: 'tag', name: 'b' } ] } ,
      combinator: {
        before : { type: 'descendant' } , after : undefined
      }
    }
  ]
]
```

- some attribute sample
```js
var chunkwhat = require("chunkwhat")
chunkwhat("div.foo#baz:bar")
expect = [ [
  { tokens:
    { tag: [ { type: 'tag', name: 'div' } ],
      attribute: [
            { type: 'attribute',     // .foo
              name: 'class',
              action: 'element',
              value: 'foo',
              ignoreCase: false },
            { type: 'attribute',     // #baz
              name: 'id',
              action: 'equals',
              value: 'baz',
              ignoreCase: false } ],
      pseudo: [
        { type: 'pseudo', name: 'bar', data: null }  // :bar
      ]
    },
    combinator: { before: undefined, after: undefined } } ] ]
```
