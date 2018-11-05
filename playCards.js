let cards = [
  '1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', 'jd', 'qd', 'kd',
  '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', 'jh', 'qh', 'kh',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'js', 'qs', 'ks',
  '1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '10c', 'jc', 'qc', 'kc',
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

function deal() {
  let players = document.getElementById('players').value
  let numberOfCards = document.getElementById('cards').value
  let maxHandLength = numberOfCards / players
  if (cards.length >= (players * maxHandLength) && (numberOfCards % players) === 0) {
    throwAwayCards()
    while (playerHands.length < players) {
      playerHands.push([])
    }
    while (playerHands.join(',').split(',').length < maxHandLength * players) {
      for (let hand of playerHands) {
        if (hand.length < maxHandLength) {
          hand.push(cards.shift())
        } else {
          console.log('hand full')
        }
      }
    }
    console.log(playerHands)
    console.log(cards)
    displayCards()
    return playerHands
  } else {
    console.log('not enough cards for each player')
  }
}
// ♥ ♣ ♠ ♦ 🃏
function displayCards() {
  let handsDiv = document.getElementById('hands-wrap')
  handsDiv.innerHTML = ''
  let player = 1
  for (let hand of playerHands) {
    handsDiv.innerHTML += 'Player ' + player + ': '
    handsDiv.innerHTML += `<div class="player-hand" id="player${player}"></div>`
    playerHandDiv = document.getElementById(`player${player}`)
    for (let card of hand) {
      switch (card) {
        case '1d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">A♦</div>`
          break
        case '2d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">2♦</div>`
          break
        case '3d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">3♦</div>`
          break
        case '4d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">4♦</div>`
          break
        case '5d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">5♦</div>`
          break
        case '6d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">6♦</div>`
          break
        case '7d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">7♦</div>`
          break
        case '8d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">8♦</div>`
          break
        case '9d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">9♦</div>`
          break
        case '10d':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">10♦</div>`
          break
        case 'jd':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">J♦</div>`
          break
        case 'qd':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">Q♦</div>`
          break
        case 'kd':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">K♦</div>`
          break

        case '1h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">A♥</div>`
          break
        case '2h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">2♥</div>`
          break
        case '3h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">3♥</div>`
          break
        case '4h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">4♥</div>`
          break
        case '5h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">5♥</div>`
          break
        case '6h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">6♥</div>`
          break
        case '7h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">7♥</div>`
          break
        case '8h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">8♥</div>`
          break
        case '9h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">9♥</div>`
          break
        case '10h':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">10♥</div>`
          break
        case 'jh':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">J♥</div>`
          break
        case 'qh':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">Q♥</div>`
          break
        case 'kh':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'red')" class="card-face red">K♥</div>`
          break

        case '1c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">A♣</div>`
          break
        case '2c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">2♣</div>`
          break
        case '3c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">3♣</div>`
          break
        case '4c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">4♣</div>`
          break
        case '5c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">5♣</div>`
          break
        case '6c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">6♣</div>`
          break
        case '7c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">7♣</div>`
          break
        case '8c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">8♣</div>`
          break
        case '9c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">9♣</div>`
          break
        case '10c':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">10♣</div>`
          break
        case 'jc':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">J♣</div>`
          break
        case 'qc':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">Q♣</div>`
          break
        case 'kc':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">K♣</div>`
          break

        case '1s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">A♠</div>`
          break
        case '2s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">2♠</div>`
          break
        case '3s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">3♠</div>`
          break
        case '4s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">4♠</div>`
          break
        case '5s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">5♠</div>`
          break
        case '6s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">6♠</div>`
          break
        case '7s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">7♠</div>`
          break
        case '8s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">8♠</div>`
          break
        case '9s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">9♠</div>`
          break
        case '10s':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">10♠</div>`
          break
        case 'js':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">J♠</div>`
          break
        case 'qs':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">Q♠</div>`
          break
        case 'ks':
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}', 'black')" class="card-face black">K♠</div>`
          break

        default:
          playerHandDiv.innerHTML += `<div id="${card}" onclick="discardCard('${card}')" class="card-face">🃏🃏</div>`
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