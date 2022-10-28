import CONFIGS from "./config.js"

const DEFAULT_SCHEMA = CONFIGS.DEFAULT_SCHEMA

/**
* Use the DataController class to manage local data storage.
* You can read and write data to and from localStorage more reliably.
* It also makes use of a DEFAULT SCHEMA, which makes understanding and structuring your data easier.
*/
class DataController {

    data = {}
    registeredElementSyncs = {}

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
     * Setter for editing user data.
     * @param {String}   key    Key you want to edit.
     * @param {*}        value  Value you want to set.
     * @return {Boolean} 
     */
    setValue(key, value) {

        if (typeof(key) != "string") return false

        if (key in this.registeredElementSyncs) {

            registeredInfo = this.registeredElementSyncs[key]
            registeredInfo["domElement"].innerHTML = registeredInfo["prepend"] + toString(value)

        }

    }

    /**
     * Getter for retrieving user data.
     * @param {String}   key  Key of which you want to get the value.
     * @return {*}            Value you retrieved using given key.
     */
     getValue(key) {

        if (typeof(key) != "string") return false
        return this.data[key]

    }

    /**
    * Method attempts to mirgrate users data from a old schema to a new schema. 
    * @param  {Object} oldData  User data using a old schema.
    * @return {Object}          Migrated data using new schema.
    */
    migrateData(oldData) {
        
        let newData = DEFAULT_SCHEMA

        for (key in DEFAULT_SCHEMA) {
            
            if (key in oldData) {

                newData[key] = oldData[key]

            }

        }

        newData.version = DEFAULT_SCHEMA.version
        this.data = newData

        return newData

    }

    /**
    * This method allows you to sync a html elements value with a value from data.
    * Whenever a synced value is changed using the setValue method the given Elements innerHTML will be set to the new value.
    * @param {Object}  domElement  The element you wish to sync.
    * @param {String}  dataKey     The key for the value you want to be sync from data.
    * @param {String}  prepend     String to prepend to data.
    * @return {Boolean}           Indicates succesion of 
    */
    registerElementSync(domElement, dataKey, prepend) {

        if (!domElement || !dataKey) return false

        if (dataKey in this.data) {

            this.registeredElementSyncs[dataKey] = {
                "prepend": prepend || "",
                "domElement": domElement
            }

            return true

        }

    }

}

export default new DataController()