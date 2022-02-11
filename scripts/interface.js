const BACK = "back_card"
const FRONT = "front_card"
const CARD = "card"
const ICON = "icon"

startGame();

function startGame(){
  initializeCards(game.createCardsDeck(game.techs))
}

function initializeCards(){

  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = ''
  game.cards.forEach(card=>{

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

  if(game.setCard(this.id)){

    this.classList.add("flip")
    if(game.secondCard) {
      if(game.checkMatch()){
        game.clearCards()
        if(game.checkGameOver()){
          let gameOverLayer = document.getElementById('gameOver')
          gameOverLayer.style.display = 'flex'
        }
      }else{

        setTimeout(()=>{
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id)

        firstCardView.classList.remove('flip')
        secondCardView.classList.remove('flip')
        game.unflipCards()
        },1000)
      }
    }
  }
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

function restart(){
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById('gameOver')
  gameOverLayer.style.display = 'none'
  
}