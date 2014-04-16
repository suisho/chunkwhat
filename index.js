var parser = require("CSSwhat")

// [Array (css what parsed array) | String(selector string) ]
module.exports = function(selectors){
  if(typeof selectors == "string"){
    selectors = parser(selectors)
  }

  return selectors.map(function(selector){
    return new SubSelector(selector)
  })
}

var isCombinator = function(sub){
  switch(sub.type){
  case "child":
  case "parent":
  case "sibling":
  case "adjacent":
  case "descendant":
    return true
  }
  return false
}

var fixupTokens = function(tokens){
  var item = {}

  tokens.forEach(function(token){
    var arr = item[token.type]
    if(arr === undefined) arr = []
    arr.push(token)
    item[token.type] = arr
  })
  return item
}


var chunkSet = function(beforeCombinator){
  return {
    tokens : [],
    combinator : {
      before : beforeCombinator,
      after : undefined
    }
  }
}

var Chunk = function(token, beforeCombinator, afterCombinator){
  this.token = token
  this.tag =
  this.beforeCombinator = beforeCombinator
  this.afterCombinator = afterCombinator
}

Chunk.prototype.stringify = function(withBeforeCombinator, withAfterCombinator){
  var simpleSelectors = {
  	child    : ">",
  	parent   : "<",
  	sibling  : "~",
  	adjacent : "+"
  };
  var actionTypes = {
    exists: 'undefined',
    equals: '',
    element: '~',
    start: '^',
    end: '$',
    any: '*',
    not: '!',
    hyphen: '|'
  }

  var str = ""
  if(withBeforeCombinator){

  }

}

var SubSelector = function(selector){
  var chunks = chunkSelector(selector)
  chunks.forEach(function(chunk){
    chunk.tokens = fixupTokens(chunk.tokens)
  })
  this.chunks = chunks
}


// Split by combinator
var chunkSelector = function(selector){
  var groups = []
  var chunk = chunkSet()
  var beforeCombinator = null

  selector.forEach(function(sub){

    if(isCombinator(sub)){
      beforeCombinator = chunk.combinator.after = sub
      groups.push(chunk)
      // renew chunk
      chunk = chunkSet(beforeCombinator)
    }else{
      chunk.tokens.push(sub)
    }

  })
  // push ends
  groups.push(chunk)
  return groups
}
