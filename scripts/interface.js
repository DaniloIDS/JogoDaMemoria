const BACK = "back_card"
const FRONT = "front_card"
const CARD = "card"
const ICON = "icon"


let techs = [
 "HTML",
 "CSS",
 "Javascript",
 "Firebase",
 "Node",
 "Boostrap",
 "Python",
 "React",
 "Electron",
 "Mongodb"
]

let cards = null

function startGame(){
  cards = createCardsDeck(techs)
  shuffleCards(cards)
  console.log(cards)

  initializeCards(cards)
}

startGame();


function createCardsDeck(tech){
  let cards = [];

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

function shuffleCards(cards){
  let currentIndex = cards.length
  let randomIndex = 0
  
  while(currentIndex !== 0){

    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;    

    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
  }
}

function initializeCards(cards){

  let gameBoard = document.getElementById("gameBoard");

  cards.forEach(card=>{

    let cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.tech

    createCardContent(card, cardElement)
    
    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)

  })
}

function flipCard(){
  this.classList.add("flip")
}

function createCardContent(card, cardElement){
   createCardFace(FRONT, card, cardElement)
   createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element){
  let cardElementFace = document.createElement('div')

  cardElementFace.classList.add(face)

  if(face === FRONT){
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = "./assets/images/icon" + card.tech + ".png"
    cardElementFace.appendChild(iconElement)
  }else{
    cardElementFace.innerHTML = "&lt;/&gt";
  }

  element.appendChild(cardElementFace)
}