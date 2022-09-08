
const gameArea = document.getElementById("interaction-area")
const tree = document.getElementById("tree")

var playerWood = 0

var lastInteract = 0
var animating = false

function onPlayerClick() {

    playerWood++

    animating = true
    lastInteract = Date.now()
    tree.classList.add("tree-feedback")

}

function checkAnimation() {

    if (animating & Date.now() - lastInteract >= 100) {

        tree.classList.remove("tree-feedback")

    }
    
}

setInterval(checkAnimation, 10)

tree.addEventListener("click", onPlayerClick);