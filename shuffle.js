let cards = [
  '1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', 'jd', 'qd', 'kd',
  '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', 'jh', 'qh', 'kh',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'js', 'qs', 'ks',
  '1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '10c', 'jc', 'qc', 'kc',
]
let shuffleNumber = 0
function chooseRandomSpot(deckArray, arrayIndex) {
  if (isNaN(arrayIndex)) {
    let randomNumber = (Math.floor((Math.random() * 52) + 1));
    let newSpot = deckArray[randomNumber-1]
    return chooseRandomSpot(deckArray, newSpot)
  } else {
    return arrayIndex
  }
}

function shuffle() {
  let deckArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
  ]
  for (let card of cards) {
    let randomNumber = (Math.floor((Math.random() * 52) + 1));
    let arrayIndex = deckArray[randomNumber-1]
    let randomSpot = chooseRandomSpot(deckArray, arrayIndex)
    deckArray[randomSpot-1] = card
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