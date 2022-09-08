
const gameArea = document.getElementById("interaction-area")
const tree = document.getElementById("tree")

var playerWood = 0
var animationFrames = 0

function onPlayerClick() {

    playerWood++
    playAnimation()
}

function stepFrame() {

    if (animationFrames == -1) return

    tree.style.backgroundPosition = (animationFrames * 280) + "px , 0px"
    animationFrames--

}

function playAnimation() {

    animationFrames = 5

}

setInterval(stepFrame, 50)
tree.addEventListener("click", onPlayerClick);