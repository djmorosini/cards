// ♥ ♣ ♠ ♦ 🃏
let cards = [
  'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦',
  'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥',
  'A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠',
  'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣',
]
let red = [
  'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦',
  'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥'
]
let shuffleNumber = 0
let playerHands = []
function chooseRandomSpot(deckArray, arrayIndex) {
  if (isNaN(arrayIndex)) {
    let randomNumber = (Math.floor((Math.random() * 52) + 1));
    let newSpot = deckArray[randomNumber - 1]
    return chooseRandomSpot(deckArray, newSpot)
  } else {
    return arrayIndex
  }
}

function shuffle() {
  if (cards.length !== 52) {
    returnAllCards()
  }
  let deckArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
  ]
  for (let card of cards) {
    let randomNumber = (Math.floor((Math.random() * 52) + 1));
    let arrayIndex = deckArray[randomNumber - 1]
    let randomSpot = chooseRandomSpot(deckArray, arrayIndex)
    deckArray[randomSpot - 1] = card
  }
  cards = deckArray

  shuffleNumber++
  if (shuffleNumber <= 100) {
    shuffle()
  } else {
    shuffleNumber = 0
    console.log(cards)
    return cards
  }
}

function chooseGame() {
  returnAllCards()
  shuffle()
  let players = document.getElementById('players').value
  let cardsToDeal = document.getElementById('cards').value
  while (playerHands.length < players) {
    playerHands.push([])
  }
  deal(cardsToDeal)
}

function deal(numberOfCardsToDeal, maxHandLength) {
  maxHandLength = maxHandLength || document.getElementById('max-hand').value
  numberOfCardsToDeal = numberOfCardsToDeal || document.getElementById('cards').value
  throwAwayCards()

  let players = document.getElementById('players').value
  if (playerHands.length !== players) {
    while (playerHands.length < players) {
      playerHands.push([])
    }
  }
  if (maxHandLength) {
    while (playerHands.join(',').split(',').length < maxHandLength * players) {
      for (let hand of playerHands) {
        if (hand.length < maxHandLength) {
          hand.push(cards.shift())
        } else {
          console.log('hand full')
        }
      }
    }
  } else {
    let cardsDealt = 0
    let dealToPlayer = document.getElementById('deal-to').value
    if (dealToPlayer && dealToPlayer <= playerHands.length) {
      hand = playerHands[dealToPlayer - 1]
      while (cardsDealt < numberOfCardsToDeal && cards.length !== 0) {
        hand.push(cards.shift())
        cardsDealt++
      }
      document.getElementById('deal-to').value = ''
    } else if (!dealToPlayer) {
      while (cardsDealt < numberOfCardsToDeal && cards.length !== 0) {
        for (let hand of playerHands) {
          hand.push(cards.shift())
          cardsDealt++
        }
      }
    }
  }
  console.log(playerHands)
  console.log(cards)
  displayCards()
  return playerHands
}
function displayCards() {
  let handsDiv = document.getElementById('hands-wrap')
  handsDiv.innerHTML = ''
  let player = 1
  for (let hand of playerHands) {
    handsDiv.innerHTML += 'Player ' + player + ': '
    handsDiv.innerHTML += `<div class="player-hand" id="player${player}"></div>`
    playerHandDiv = document.getElementById(`player${player}`)
    for (let card of hand) {
      if (red.includes(card)) {
        playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">${card}</div>`
      } else {
        playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">${card}</div>`
      }
    }
    player++
  }
}

function returnAllCards() {
  for (let hand of playerHands) {
    for (let card of hand) {
      cards.push(card)
    }
  }
  playerHands = []
  let handsDiv = document.getElementById('hands-wrap')
  handsDiv.innerHTML = ''
  return cards
}

function throwAwayCards() {
  let throwAways = document.getElementsByClassName('active')
  let throwAwayArray = []
  for (let discards of throwAways) {
    throwAwayArray.push(discards.id)
    cards.push(discards.id)
  }
  let i = 0
  for (let hand of playerHands) {
    hand = hand.filter(thecard => !throwAwayArray.includes(thecard))
    playerHands[i] = hand
    i++
  }
  return playerHands
}

function discardCard(id, cardColor) {
  let cardFace = document.getElementById(id);
  if (cardFace.className.includes('active')) {
    cardFace.style = 'border: 2px solid black;'
    cardFace.className = 'card-face ' + cardColor
  } else {
    cardFace.style = 'border: 2px solid rgb(255, 0, 0);'
    cardFace.className += ' active'
  }
}