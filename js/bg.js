var dreamBGGradients = [
  [],
  // From https://uigradients.com
  ['#bdc3c7', '#2c3e50'],
  ['#ABDCFF', '#0396FF'],
  ['#1c92d2', '#f2fcfe'],
  ['#1c92d2', '#f2fcfe'],
  ['#654ea3', '#eaafc8'],
  ['#00B4DB', '#0083B0'],
  ['#FC5C7D', '#6A82FB'],
  ['#74ebd5', '#ACB6E5'],
  ['#36D1DC', '#5B86E5'],
  ['#000046', '#1CB5E0'],
  ['#007991', '#78ffd6'],
  ['#56CCF2', '#2F80ED'],
  ['#4AC29A', '#BDFFF3'],
  ['#B2FEFA', '#0ED2F7'],
  ['#C33764', '#1D2671'],
  ['#6190E8', '#A7BFE8'],
  ['#4568DC', '#B06AB3'],
  ['#9CECFB', '#65C7F7','#0052D4'],
  ['#3A1C71','#D76D77','#FFAF7B'],
  // Custom
  ['#7F7FD5','#86A8E7','#91EAE4'] // Lan
]

var dreamBody = $('body')
var dreamFront = $('.flip-container .front')
var dreamBack = $('.flip-container .back')

var dreamPrevBgIndex = 0
var dreamBodyBgSwitch = []
var dreamBodyBgSwitchIndex = 0

var dreamBg = dreamBGGradients[getRandomInt(0, dreamBGGradients.length)]
dreamBodyBgSwitch.push(dreamBg)
setBackground(dreamFront, dreamBg)

setBackground(dreamBody, dreamBg)

dreamBg = dreamBGGradients[getRandomInt(0, dreamBGGradients.length)]
dreamBodyBgSwitch.push(dreamBg)
setBackground(dreamBack, dreamBg)

function connect(arr) {
  var str = ''
  for (var i = 0; i < arr.length; i++) {
    if (i !== arr.length - 1) {
      str += arr[i] + ', '
    } else {
      str += arr[i]
    }
  }
  return str
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  var random
  while (1) {
    random = Math.floor(Math.random() * (max - min)) + min
    if (random !== dreamPrevBgIndex) {
      dreamPrevBgIndex = random
      break
    }
  }
  return random
}

function setBackground(target, gradient) {
  target.css({
    background: gradient[0]
  })
  target.css({
    background: 'linear-gradient(to right, ' + connect(gradient) + ')'
  })
}
