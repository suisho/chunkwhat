var chunkwhat = require("../index.js")
var parser = require("CSSwhat")
var assert = require("assert")
describe("string", function(){
  var assertion = function(selector, expect){
    var result = chunkwhat(selector)
    assert.deepEqual(result,expect)
    // object mode
    assert.deepEqual(chunkwhat(parser(selector)), result)
  }
  it("a.foo", function(){
    var expect =  [ [
    { tag:       [ { type: 'tag', name: 'a' } ],
      attribute: [ { type: 'attribute',
                     name: 'class',
                     action: 'element',
                     value: 'foo',
                     ignoreCase: false } ] }
    ] ]
    assertion("a.foo", expect)
  })
  it("a:active", function(){
    var expect =  [ [ {
      tag: [ { type: 'tag', name: 'a' } ],
      pseudo: [ { type: 'pseudo', name: 'active', data: null }]
    } ] ]
    assertion("a:active", expect)
  })
  it("a:nth-child(2n+1)", function(){
    var expect =  [ [ {
      tag: [ { type: 'tag', name: 'a' } ],
      pseudo: [ { type: 'pseudo', name: 'nth-child', data: '2n+1' } ]
    } ] ]
    assertion("a:nth-child(2n+1)", expect)
  })
  it("a:foo:bar", function(){
    var expect  = [ [ {
      tag: [ { type: 'tag', name: 'a' } ],
      pseudo:
       [ { type: 'pseudo', name: 'not', data: '.foo' },
         { type: 'pseudo', name: 'nth-child', data: 'n' } ]
     } ] ]
    assertion("a:not(.foo):nth-child(n)", expect)
  })
  it("a,b (comma separated)", function(){
    var expect  = [
      [ { tag: [ { type: 'tag', name: 'a' } ] } ],
      [ { tag: [ { type: 'tag', name: 'b' } ] } ]
    ]
    assertion("a ,b", expect)
  })
  it("a b", function(){
    var expect  = [
      [
        { tag: [ { type: 'tag', name: 'a' } ],
          combinator: { type: 'descendant' } },
        { tag: [ { type: 'tag', name: 'b' } ] }
      ]
    ]
    assertion("a b", expect)
  })
  it("a > b", function(){
    var expect  = [
      [
        { tag: [ { type: 'tag', name: 'a' } ],
          combinator: { type: 'child' } },
        { tag: [ { type: 'tag', name: 'b' } ] }
      ]
    ]
    assertion("a > b", expect)
  })
  it("a ~ b", function(){
    var expect  = [
      [
        { tag: [ { type: 'tag', name: 'a' } ],
          combinator: { type: 'sibling' } },
        { tag: [ { type: 'tag', name: 'b' } ] }
      ]
    ]
    assertion("a ~ b", expect)
  })
  it("a + b", function(){
    var expect  = [
      [
        { tag: [ { type: 'tag', name: 'a' } ],
          combinator: { type: 'adjacent' } },
        { tag: [ { type: 'tag', name: 'b' } ] }
      ]
    ]
    assertion("a + b", expect)
  })
  it("a+>b", function(){
    var expect  =[ [
      { tag: [ { type: 'tag', name: 'a' } ],
        combinator: { type: 'adjacent' } },

      { combinator: { type: 'child' } },

      { tag: [ { type: 'tag', name: 'b' } ] }
    ] ]
    assertion("a +> b", expect)
  })
  it("*", function(){
    var expect = [ [
       { universal: [ { type: 'universal' } ],
        combinator: { type: 'descendant' } },
        { tag: [ { type: 'tag', name: 'a' } ] }
    ] ]
    assertion("* a", expect)
  })
  it("div.baz#foo (mult attributes)", function(){
    var expect = [ [
      { tag: [ { type: 'tag', name: 'div' } ],
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
             ignoreCase: false } ] }
    ] ]
    assertion("div.baz#foo", expect)
  })
})
