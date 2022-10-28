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
    * @return {Object} Object for handling user data.
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

    /**
    * Method attempts to mirgrate users data from a old schema to a new schema. 
    * @param  {Object} oldData  User data using a old schema.
    * @return {Object}          Migrated data using new schema.
    */
    migrateData(oldData) {
        
        let newData = DEFAULT_SCHEMA

        for ((key, _) in DEFAULT_SCHEMA) {
            
            if (key in oldData) {

                newData[key] = oldData[key]

            }

        }

        newData.version = DEFAULT_SCHEMA.version
        this.data = newData

        return newData

    }

}

export default new DataController()