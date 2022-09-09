
const productContainer = document.getElementById("products")
const purchaseAudio = new Audio("assets/audio/purchase.wav");

const productData = {

    "axes": [
        {
            "name": "Wooden Axe",
            "image": "assets/images/axes/wooden-axe.webp",

            "price": 20,
            "multipliers": {
                "wood": 2,
                "woodPerSecond": 2
            }
        },
        {
            "name": "Stone Axe",
            "image": "assets/images/axes/stone-axe.webp",
            
            "price": 400,
            "multipliers": {
                "wood": 4,
                "woodPerSecond": 3
            }
        },
        {
            "name": "Iron Axe",
            "image": "assets/images/axes/iron-axe.webp",

            "price": 1600,
            "multipliers": {
                "wood": 16,
                "woodPerSecond": 10

            }
        },
        {
            "name": "Gold Axe",
            "image": "assets/images/axes/gold-axe.webp",

            "price": 100000,
            "multipliers": {
                "wood": 100,
                "woodPerSecond": 100
            }
        },
        {
            "name": "WIP",
            "image": "assets/images/WIP.webp",
            
            "price": 1e99,
            "multipliers": {}
        }
    ],

    "workers": [
        {
            "name": "Human",
            "image": "assets/images/humans/human.webp",
            
            "price": 50,
            "multipliers": {
                "woodPerSecond": 5
            }
        },
        {
            "name": "Human",
            "image": "assets/images/humans/human.webp",
            
            "price": 200,
            "multipliers": {
                "woodPerSecond": 25
            }
        },
        {
            "name": "Human",
            "image": "assets/images/humans/human.webp",
            
            "price": 5000,
            "multipliers": {
                "woodPerSecond": 250
            }
        },
        {
            "name": "WIP",
            "image": "assets/images/WIP.webp",
            
            "price": 1e99,
            "multipliers": {}
        }
    ]

}

function createProductElement(productData) {

    let product = document.createElement("li")
    product.classList.add("product")

    let icon = document.createElement("img")
    icon.src = productData.image
    icon.alt = "A Icon for a shop product."

    let price = document.createElement("h3")
    price.innerHTML = productData.price + " Wood"

    product.appendChild(icon)
    product.appendChild(price)
    productContainer.appendChild(product)

    return product

}

class Product {

    constructor(productType, productLevel) {

        this.type = productType
        this.level = productLevel
        this.data = productData[this.type][this.level]
        this.element = createProductElement(this.data)
        this.locked = false

    }

    update(productLevel) {

        this.level = productLevel
        this.data = productData[this.type][productLevel]
        console.log(this.data)

        this.element.getElementsByTagName("img").src = this.data.image
        this.element.getElementsByTagName("h3").innerHTML = this.data.price + " Wood"

    }

}

class Shop {

    constructor(playerUpgrades) {

        this.products = {}
        this.upgrades = playerUpgrades
        console.log(playerUpgrades)

        for (const [type, _] of Object.entries(this.upgrades)) {

            this.products[type] = new Product(type, this.upgrades[type])

        }

    }

    updateShop(playerStats) {

        let playerWood = playerStats.woodCount

        for (const [type, product] of Object.entries(this.products)) {

            if (product.data.price <= playerWood && product.locked) {

                product.element.classList.remove("locked-product")
                product.locked = false

            } else if (product.data.price > playerWood && !product.locked) {

                product.element.classList.add("locked-product")
                product.locked = true

            }

        }
        
    }

    buyProduct(playerStats, productType) {

        let playerWood = playerStats.woodCount
        let product = this.products[productType]

        if (playerWood >= product.data.price) {

            this.upgrades[productType]++
            purchaseAudio.play()

            return product.data.price

        }

        return false

    }

    calculateClickMultiplier(baseAmount) {

        let multiplier = 1

        for (const [type, level] of Object.entries(this.upgrades)) {

            if (level > 0) {
    
                multiplier += productData[type][level - 1].multipliers.wood | 0
    
            }

        }

        return baseAmount * multiplier
    }

    calculateWpsMultiplier(baseAmount) {

        let multiplier = 1

        for (const [type, level] of Object.entries(this.upgrades)) {

            if (level > 0) {
    
                multiplier += productData[type][level - 1].multipliers.woodPerSecond | 0
            
            }

        }

        return baseAmount * multiplier
    }

}