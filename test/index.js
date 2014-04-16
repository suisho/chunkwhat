var chunkwhat = require("../index.js")
var parser = require("CSSwhat")
var assert = require("assert")
describe("string", function(){
  var assertion = function(selector, expect){
    var result = chunkwhat(selector)
    //console.log(require("util").inspect(result, {depth:null}))
    result.forEach(function(subSelector, i){
      assert.deepEqual(subSelector.chunks,expect[i])
    })
    // object mode
    assert.deepEqual(chunkwhat(parser(selector)), result)
  }
  it("complex sample", function(){
    assertion("a > b:active + #c ~ .d, i p",
  [ [ { tokens: { tag: [ { type: 'tag', name: 'a' } ] },
      combinator: { before: undefined, after: { type: 'child' } } },
    { tokens:
       { tag: [ { type: 'tag', name: 'b' } ],
         pseudo: [ { type: 'pseudo', name: 'active', data: null } ] },
      combinator: { before: { type: 'child' }, after: { type: 'adjacent' } } },
    { tokens:
       { attribute:
          [ { type: 'attribute',
              name: 'id',
              action: 'equals',
              value: 'c',
              ignoreCase: false } ] },
      combinator: { before: { type: 'adjacent' }, after: { type: 'sibling' } } },
    { tokens:
       { attribute:
          [ { type: 'attribute',
              name: 'class',
              action: 'element',
              value: 'd',
              ignoreCase: false } ] },
      combinator: { before: { type: 'sibling' }, after: undefined } } ],
  [ { tokens: { tag: [ { type: 'tag', name: 'i' } ] },
      combinator: { before: undefined, after: { type: 'descendant' } } },
    { tokens: { tag: [ { type: 'tag', name: 'p' } ] },
      combinator: { before: { type: 'descendant' }, after: undefined } } ] ])
  })
  it("a.foo", function(){
    var expect =  [ [ {
      tokens: { tag:       [ { type: 'tag', name: 'a' } ],
              attribute: [ { type: 'attribute',
                     name: 'class',
                     action: 'element',
                     value: 'foo',
                     ignoreCase: false } ] },
      combinator: { before: undefined, after: undefined }
    } ] ]
    assertion("a.foo", expect)
  })
  it("a:active", function(){
    var expect =  [ [ {
      tokens : {
        tag: [ { type: 'tag', name: 'a' } ],
        pseudo: [ { type: 'pseudo', name: 'active', data: null }]
      },
      combinator: { before: undefined, after: undefined }
    } ] ]
    assertion("a:active", expect)
  })
  it("a:nth-child(2n+1)", function(){
    var expect =  [ [ {
      tokens :{
        tag: [ { type: 'tag', name: 'a' } ],
        pseudo: [ { type: 'pseudo', name: 'nth-child', data: '2n+1' } ]
      },
      combinator: { before: undefined, after: undefined }
    } ] ]
    assertion("a:nth-child(2n+1)", expect)
  })
  it("a:foo:bar", function(){
    var expect  = [ [ {
      tokens : {
        tag: [ { type: 'tag', name: 'a' } ],
        pseudo:
         [ { type: 'pseudo', name: 'not', data: '.foo' },
           { type: 'pseudo', name: 'nth-child', data: 'n' } ]
      },
      combinator: { before: undefined, after: undefined }
     } ] ]
    assertion("a:not(.foo):nth-child(n)", expect)
  })
  it("a,b (comma separated)", function(){
    var expect  = [
      [ { tokens : {tag: [ { type: 'tag', name: 'a' } ] },
          combinator: { before: undefined, after: undefined }
      } ],
      [ { tokens : { tag: [ { type: 'tag', name: 'b' } ] },
          combinator: { before: undefined, after: undefined }

      } ]
    ]
    assertion("a ,b", expect)
  })
  it("a b", function(){
    var expect  = [
      [ { tokens : { tag: [ { type: 'tag', name: 'a' } ] },
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
    assertion("a b", expect)
  })
  it("a > b", function(){
    var expect  = [
      [
        { tokens : { tag: [ { type: 'tag', name: 'a' } ] },
          combinator: {
            before: undefined, after: { type: 'child' }
          }
        },
        { tokens : { tag: [ { type: 'tag', name: 'b' } ] },
          combinator: {
            before: { type: 'child' }, after: undefined
          }
        }
      ]
    ]
    assertion("a > b", expect)
  })
  it("a ~ b", function(){
    var expect  = [
      [
        { tokens : { tag: [ { type: 'tag', name: 'a' } ] },
          combinator: {
            before: undefined, after: { type: 'sibling' }
          }
        },
        { tokens : { tag: [ { type: 'tag', name: 'b' } ] },
          combinator: {
            before: { type: 'sibling' }, after: undefined
          }
        }
      ]
    ]
    assertion("a ~ b", expect)
  })
  it("a + b", function(){
    var expect  = [
      [
        { tokens : { tag: [ { type: 'tag', name: 'a' } ] },
          combinator: {
            before: undefined, after: { type: 'adjacent' }
          }
        },
        { tokens : { tag: [ { type: 'tag', name: 'b' } ] },
          combinator: {
            before: { type: 'adjacent' }, after: undefined
          }
        }
      ]
    ]
    assertion("a + b", expect)
  })
  it("a+>b", function(){
    var expect  =[ [
        { tokens : { tag: [ { type: 'tag', name: 'a' } ] },
          combinator: {
            before: undefined, after: { type: 'adjacent' }
          }
        },
        {
          tokens : {},
          combinator: {
            before: { type: 'adjacent' }, after: {type: 'child'}
          }
        },
        { tokens : { tag: [ { type: 'tag', name: 'b' } ] },
          combinator: {
            before: { type: 'child' }, after: undefined
          }
        }
      ]
    ]
    assertion("a +> b", expect)
  })
  it("* a", function(){
    var expect = [ [ {
      tokens : { universal: [ { type: 'universal' } ] },
      combinator: { before: undefined, after: { type: 'descendant' } }
    },{
      tokens : { tag: [ { type: 'tag', name: 'a' } ] },
      combinator: { before: { type: 'descendant' }, after: undefined }
    } ] ]
    assertion("* a", expect)
  })
  it("div.baz#foo (mult attributes)", function(){
    var expect = [ [ {
       tokens : {
          tag: [ { type: 'tag', name: 'div' } ],
          attribute:
           [ { type: 'attribute',
               name: 'class',
               action: 'element',
               value: 'baz',
               ignoreCase: false },
             { type: 'attribute',
               name: 'id',
               action: 'equals',
               value: 'foo',
               ignoreCase: false } ]
        },
        combinator : { before : undefined , after :undefined }
    } ] ]
    assertion("div.baz#foo", expect)
  })
})
