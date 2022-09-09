
const gameArea = document.getElementById("interaction-area")
const tree = document.getElementById("tree")

var lastInteract = 0
var animating = false

const statElements = {
    "woodCount": document.getElementById("wood-count"),
    "woodPerSecond": document.getElementById("wood-per-second"),
    "totalWood": document.getElementById("total-wood"),
    "ingameTime": document.getElementById("ingame-time"),
    "passedTime": document.getElementById("passed-time")
}

if (localStorage.data) {

    var statValues = JSON.parse(localStorage.data)

} else {

    var statValues = {
        "woodCount": 0,
        "woodPerSecond": 0,
        "totalWood": 0,
        "ingameTime": 0,
        "joinTime": Date.now()
    }
    
}


function syncStatsDisplay() {

    statValues.ingameTime += 0.1

    statElements.woodCount.setAttribute("data-value", statValues.woodCount)
    statElements.woodPerSecond.setAttribute("data-value", statValues.woodPerSecond)

    statElements.totalWood.setAttribute("data-value", statValues.totalWood)
    statElements.ingameTime.setAttribute("data-value", Math.floor(statValues.ingameTime))
    statElements.passedTime.setAttribute("data-value", Math.floor((Date.now() - statValues.joinTime) * 0.001))


}

function onPlayerClick() {

    statValues.woodCount += 1
    statValues.totalWood += 1

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
setInterval(syncStatsDisplay, 100)

setInterval(() => {

    localStorage.setItem("data", JSON.stringify(statValues))

}, 1000)

tree.addEventListener("click", onPlayerClick);