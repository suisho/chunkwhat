var chunkwhat = require("../")
var CSSwhat = require("CSSwhat")
var selector ="a > b:active + #c ~ .d, i p"
var parsed = CSSwhat(selector)



suite("parser", function(){
  bench("pseudopseudo", function(){
    CSSwhat(selector)
  })
  bench("chunkwhat", function(){
    chunkwhat(selector)
  })
})


suite("only chunk", function(){
  bench("chunkwhat", function(){
    chunkwhat(parsed)
  })
})
