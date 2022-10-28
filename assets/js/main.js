import DataController from "./data.js"
console.log(DataController)

const tree = document.getElementById("tree")

const statElements = {
    "woodCount": document.getElementById("wood-count"),
    "woodPerSecond": document.getElementById("wood-per-second"),
    "totalWood": document.getElementById("total-wood"),
    "ingameTime": document.getElementById("ingame-time"),
    "passedTime": document.getElementById("passed-time")
}

const audio = new Audio("assets/audio/click.wav");

var lastInteract = 0
var animating = false

if (localStorage.data) {

    var playerData = JSON.parse(localStorage.data)
    var playerUpgrades = playerData.upgrades
    var playerStats = playerData.stats

} else {

    var playerUpgrades = {
        "axes": 0,
        "workers": 0
    }

    var playerStats = {
        "woodCount": 0,
        "woodPerSecond": 1,
        "totalWood": 0,
        "ingameTime": 0,
        "joinTime": Date.now()
    }
    
}

const shop = new Shop(playerUpgrades)
shop.updateShop(playerStats)

for (const [type, product] of Object.entries(shop.products)) {

    product.element.addEventListener("click", () => {

        let price = shop.buyProduct(playerStats, type)

        if (price) {

            playerStats.woodCount -= price
            product.update(playerUpgrades[type])

            
        }
        

    });

}

function syncStatsDisplay() {

    playerStats.ingameTime += 0.1
    playerStats.woodPerSecond = shop.calculateWpsMultiplier(1)

    statElements.woodCount.setAttribute("data-value", Math.floor(playerStats.woodCount))
    statElements.woodPerSecond.setAttribute("data-value", playerStats.woodPerSecond)

    statElements.totalWood.setAttribute("data-value", Math.floor(playerStats.totalWood))
    statElements.ingameTime.setAttribute("data-value", Math.floor(playerStats.ingameTime))
    statElements.passedTime.setAttribute("data-value", Math.floor((Date.now() - playerStats.joinTime) * 0.001))


}

function onPlayerClick() {

    woodIncrement = shop.calculateClickMultiplier(1)

    playerStats.woodCount += woodIncrement
    playerStats.totalWood += woodIncrement

    animating = true
    lastInteract = Date.now()
    tree.classList.add("tree-feedback")
    audio.play();

}

function tickWoodPerSecond() {

    woodIncrement = shop.calculateWpsMultiplier(1) * 0.1

    playerStats.woodCount += woodIncrement
    playerStats.totalWood += woodIncrement

    shop.updateShop(playerStats)

}

function checkAnimation() {

    if (animating & Date.now() - lastInteract >= 100) {

        tree.classList.remove("tree-feedback")

    }
    
}

setInterval(checkAnimation, 10)
setInterval(syncStatsDisplay, 100)
setInterval(tickWoodPerSecond, 100)

setInterval(() => {

    localStorage.setItem("data", JSON.stringify({
        "stats": playerStats,
        "upgrades": playerUpgrades
    }))

}, 1000)

tree.addEventListener("click", onPlayerClick);