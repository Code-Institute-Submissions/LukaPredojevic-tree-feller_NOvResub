import CONFIGS from "./config.js"

const DEFAULT_SCHEMA = CONFIGS.DEFAULT_SCHEMA

/**
* Use the DataController class to manage local data storage.
* You can read and write data to and from localStorage more reliably.
* It also makes use of a DEFAULT SCHEMA, which makes understanding and structuring your data easier.
*/
class DataController {



    /**
    * Initiliazies class and saves data to object from localStorage.
    * 
    */
    constructor() {
        
        let data = localStorage.getItem("data")
        
        if (data == undefined)  {

            try {
    
                data = JSON.parse(data)
    
            } catch(error) {
    
                data = DEFAULT_SCHEMA
    
            }

            if ("version" in data && data.version == DEFAULT_SCHEMA.version) {

                this.data = data

            }

        }

        this.data = DEFAULT_SCHEMA
        

    }

}

export default new DataController()