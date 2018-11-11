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
let playerHands = []
let whichPlayer = 1
let players
let maxHandLength
function chooseRandomSpot(deckArray, arrayIndex) {
  if (isNaN(arrayIndex)) {
    let randomNumber = Math.floor(Math.random() * 52);
    let newSpot = deckArray[randomNumber]
    return chooseRandomSpot(deckArray, newSpot)
  } else {
    return arrayIndex
  }
}

function shuffle() {
  let deckArray = [...Array(cards.length).keys()]
  let shuffleNumber = 0
  while (shuffleNumber < 50) {
    for (let card of cards) {
      let randomNumber = Math.floor(Math.random() * 52);
      let arrayIndex = deckArray[randomNumber]
      let randomSpot = chooseRandomSpot(deckArray, arrayIndex)
      deckArray[randomSpot] = card
    }
    cards = deckArray
    deckArray = [...Array(cards.length).keys()]
    shuffleNumber++
  }
  console.log(cards)
}

function chooseGamePoker5() {
  document.getElementById('shuffle-btn').disabled = true
  returnAllCards()
  shuffle()
  players = document.getElementById('players').value
  maxHandLength = 5

  let cardsToDeal = players * maxHandLength
  while (playerHands.length < players) {
    playerHands.push([])
  }
  deal(cardsToDeal)
  document.getElementById('choose-or-play').innerHTML = `<button onclick='deal()'>Deal</button>`
}

function chooseGameBlackjack() {
  document.getElementById('shuffle-btn').disabled = true
  returnAllCards()
  shuffle()
  players = document.getElementById('players').value

  let cardsToDeal = players * 2
  while (playerHands.length < players) {
    playerHands.push([])
  }
  deal(cardsToDeal)
  playBlackjack()
}

function deal(numberOfCardsToDeal, dealToPlayer) {

  throwAwayCards()
  let dealToDiv = document.getElementById('deal-to')
  if (!dealToPlayer && dealToDiv) {
    dealToPlayer = document.getElementById('deal-to').value
  }
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
        }
      }
    }
  } else {
    let cardsDealt = 0
    if (dealToPlayer && dealToPlayer <= playerHands.length) {
      hand = playerHands[dealToPlayer - 1]
      while (cardsDealt < numberOfCardsToDeal && cards.length !== 0) {
        hand.push(cards.shift())
        cardsDealt++
      }
    } else if (!dealToPlayer) {
      while (cardsDealt < numberOfCardsToDeal && cards.length !== 0) {
        for (let hand of playerHands) {
          hand.push(cards.shift())
          cardsDealt++
        }
      }
    }
  }
  displayCards()
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

function reset() {
  document.getElementById('shuffle-btn').disabled = false
  returnAllCards()
  shuffle()
  document.getElementById('choose-or-play').innerHTML = `<div># of Players: </div><input id='players' type='text' value='2' /><button onclick='chooseGamePoker5()'>5 Card Poker</button><button onclick='chooseGameBlackjack()'>Blackjack</button>`
  document.getElementById('message').textContent = ''
}

function playBlackjack() {
  let handTotal = calculateHandTotal()
  document.getElementById('message').textContent = (`Player ${whichPlayer} hand total ${handTotal}.`)
  if (handTotal === 21 && whichPlayer === playerHands.length) {
    endBlackjack()
  } else if (handTotal === 21) {
    whichPlayer++
    playBlackjack()
  } else {
    document.getElementById('choose-or-play').innerHTML = `<div>Player ${whichPlayer}: </div><button onclick='hit()'>Hit</button><button onclick='stay()'>Stay</button>`
  }
}

function hit() {
  deal(1, whichPlayer)
  let handTotal = calculateHandTotal()
  if (handTotal < 21) {
    playBlackjack()
  } else if (handTotal === 21) {
    document.getElementById('message').textContent = (`Player ${whichPlayer} got 21!`)
    if (whichPlayer == playerHands.length) {
      whichPlayer = 1
      endBlackjack()
    } else {
      whichPlayer++
      playBlackjack()
    }
  } else if (handTotal > 21) {
    if (whichPlayer == playerHands.length) {
      whichPlayer = 1
      endBlackjack()
    } else {
      whichPlayer++
      playBlackjack()
    }
  }
}

function stay() {
  if (whichPlayer == playerHands.length) {
    whichPlayer = 1
    endBlackjack()
  } else {
    whichPlayer++
    playBlackjack()
  }
}

function calculateHandTotal() {
  let handTotalArray = []
  let acesArray = []
  for (let cardNumber of playerHands[whichPlayer - 1]) {
    if (cardNumber.length === 2 && cardNumber !== 10) {
      cardNumber = cardNumber.slice(0, 1)
    } else if (cardNumber.length === 3) {
      cardNumber = cardNumber.slice(0, 2)
    }
    if (cardNumber === 'K' || cardNumber === 'Q' || cardNumber === 'J') {
      cardNumber = 10
    }
    if (cardNumber === 'A') {
      acesArray.push(cardNumber)
    } else {
      handTotalArray.push(cardNumber)
    }
  }
  let handTotal = handTotalArray.reduce(
    (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
    0
  );

  while (acesArray.length > 0) {
    if (handTotal <= 10) {
      handTotal = handTotal + 11
      acesArray.pop()
    } else if (handTotal > 10) {
      handTotal++
      acesArray.pop()
    }
  }
  return handTotal
}

function endBlackjack() {
  document.getElementById('shuffle-btn').disabled = false
  document.getElementById('choose-or-play').innerHTML = `<div>Play again?</div><div># of Players: </div><input id='players' type='text' value='${players}' /><button onclick='chooseGamePoker5()'>5 Card Poker</button><button onclick='chooseGameBlackjack()'>Blackjack</button>`
  document.getElementById('message').textContent = ''
}