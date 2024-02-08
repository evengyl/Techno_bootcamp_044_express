import sqlite3 from "sqlite3"
sqlite3.verbose()


let db = null 

export const dbInit = {

    getDb :() => {
        return db
    },

    init : () => {

        db = new sqlite3.Database('./db/database.db', (err) => {
            if(err) console.log(err)

            console.log("Database initialized successfully at : ")
            console.log(new Date())
        })
    }
}