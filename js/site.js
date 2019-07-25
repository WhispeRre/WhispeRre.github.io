var SemanticUIColors = [
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
  ['#3A1C71','#D76D77','#FFAF7B']
  // Custom
  ['#7F7FD5','#86A8E7','#91EAE4'] // Lan
]

$(document).ready(function() {
  $('.dream-flip-toggle').click(function() {
    var c = $('.flip-container')

    if (dreamBodyBgSwitchIndex === 0) {
      c.css('overflow', 'hidden')
      setBackground(dreamBody, dreamBodyBgSwitch[1])
      dreamBodyBgSwitchIndex = 1
      $('.flipper .front .ui.menu').css('overflow-x', '')
    } else {
      c.removeAttr('style')
      setBackground(dreamBody, dreamBodyBgSwitch[0])
      dreamBodyBgSwitchIndex = 0
      $('.flipper .front .ui.menu').css('overflow-x', 'auto')
    }

    c.toggleClass('flip-it')
  })

  var postList = $('.post-list')
  var pMaxHeight = $(window).height() - $('.ui.menu').outerHeight(true)
  postList.css('max-height', pMaxHeight)

  $('.ui.cards .image')
    .dimmer({
      opacity: 0.6,
      closable: false
    })
    .dimmer('show')

  $('.ui.accordion').accordion()

  $('#tag-category-pop').click(function() {
    var dt = $('.dream-header-tags.dream-tags')
    var dc = $('.dream-categories')
    var dtDisplay = dt.css('display')
    var dcDisplay = dc.css('display')
    if (dtDisplay === 'none') {
      dt.css('display', 'block')
      dc.css('display', 'block')
    } else {
      dt.css('display', 'none')
      dc.css('display', 'none')
    }
  })

  setSemanticUIColor()
})

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  random = Math.floor(Math.random() * (max - min)) + min
  return random
}

function setSemanticUIColor() {
  var tagsParent = $('.dream-tags')
  tagsParent.children().map(function() {
    $(this).addClass(SemanticUIColors[randomInt(0, SemanticUIColors.length)])
  })
}

function savePostAsImg() {
  var postList = $('.post-list')
  var useWidth = postList.prop('scrollWidth')
  var useHeight = postList.prop('scrollHeight')
  var removedHeight = $('.post-list .post-disqus-area').prop('scrollHeight')

  var canvas = document.createElement('canvas')
  var width = useWidth
  var height = useHeight - removedHeight
  var scale = 2
  canvas.width = width * scale
  canvas.height = height * scale
  canvas.getContext('2d').scale(scale, scale)

  html2canvas(document.querySelector('.post-single-main'), {
    canvas: canvas,
    width: width,
    height: height,
    scale: scale,
    useCORS: true
  }).then(function(canvas) {
    var ctx = canvas.getContext('2d')

    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.msImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false

    var data = canvas.toDataURL('image/png')

    var link = document.createElement('a')
    link.href = URL.createObjectURL(dataURLtoBlob(data))
    link.download = 'screenshot.png'
    link.click()
  })
  return false
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
