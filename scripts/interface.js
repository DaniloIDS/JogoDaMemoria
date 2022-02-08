let BACK = "back_card"
let FRONT = "front_card"

let techs = [
 "html",
 "css",
 "javascript",
 "firebase",
 "node",
 "boostrap",
 "python",
 "react",
 "electron",
 "mongodb"
]

//Criar o baralho

createCardsDeck(techs)

function createCardsDeck(tech){
  let cards = []

  for(tech of techs){
  cards.push(createPairCard(tech))
  }
  
  return cards.flatMap(pair => pair)
}

function createPairCard(tech){
  
  return [
    {
      id: createRandomID(tech),
      tech: tech,
      flipped: false
    },
    {
      id: createRandomID(tech),
      tech: tech,
      flipped: false
    }
  ]
}

function createRandomID(tech){
  return tech + Number.parseInt(Math.random() * 1000)
}