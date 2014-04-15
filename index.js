var parser = require("CSSwhat")

// [Array (css what parsed array) | String(selector string) ]
module.exports = function(selectors){
  if(typeof selectors == "string"){
    selectors = parser(selectors)
  }

  return selectors.map(function(selector){
    // chunk selectors
    return chunkSelector(selector).map(function(group){
      return fixupTokens(group.token)
    })
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
  var item = {
    tag        : undefined,
    combinator : undefined,
    attributes : [],
  }

  tokens.forEach(function(sub){
    switch(sub.type){
    case "tag":
      item.tag = sub
      break;
    case "attribute":
      item.attributes.push(sub)
      break;
    }
    // get combinator
    if(isCombinator(sub)){
      item.combinator = sub
    }
  })
  return item
}

var tokens = function(subs){
  return {
    token : subs,
  }
}

// Split by combinator
var chunkSelector = function(selector){
  var groups = []
  var chunk = []

  selector.forEach(function(token){
    chunk.push(token)
    if(isCombinator(token)){
      groups.push(tokens(chunk))
      chunk = []
    }
  })
  // push ends
  groups.push(tokens(chunk))
  return groups
}
