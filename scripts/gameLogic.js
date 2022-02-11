let game = {

  techs: [
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
   ],

  lockMode: false,

  firstCard: null,
  secondCard: null,

  setCard: function(id){

    let card = this.cards.filter(card => card.id === id)[0]

    if(card.flipped || this.lockMode){
      return false
    }

    if(!this.firstCard){
      this.firstCard = card
      this.firstCard.flipped = true
      return true
    }else{
      this.secondCard = card
      this.secondCard.flipped = true
      this.lockMode = true
      return true
    }

  },

  checkMatch: function(){
    if (!this.firstCard || !this.secondCard){
      return false
    }
    return this.firstCard.tech === this.secondCard.tech
  },

  clearCards: function(){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function(){
    this.firstCard.flipped = false
    this.secondCard.flipped = false
    this.clearCards()
  },

  checkGameOver: function(){
    return this.cards.filter(card=>!card.flipped).length == 0
  },

  cards: null,

  createCardsDeck: function(tech){
    this.cards = [];

    this.techs.forEach((tech)=>{
      this.cards.push(this.createPairCard(tech))
    })
    
    this.cards = this.cards.flatMap(pair => pair)
    this.shuffleCards();
    return this.cards
  },


  createPairCard: function(tech){
    
    return [
      {
        id: this.createRandomID(tech),
        tech: tech,
        flipped: false
      },
      {
        id: this.createRandomID(tech),
        tech: tech,
        flipped: false
      }
    ]
  },

  createRandomID: function(tech){
    return tech + Number.parseInt(Math.random() * 1000)
  },

  shuffleCards: function(){
    let currentIndex = this.cards.length
    let randomIndex = 0
    
    while(currentIndex !== 0){
  
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;    
  
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    }
  }

}