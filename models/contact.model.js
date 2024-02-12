import { dbInit } from "./dbInit.js"

export const contactModel = {

    saveContactMessage : (messageToSave, res) => {
        dbInit.getDb().run("INSERT INTO contact (message) VALUES (:message)", { ":message" : messageToSave.message}, function(err, result){
            
            if(err) return res.status(500).json({ error : err})

            return res.json({
                "message" : "contact message created successfully",
                "id" : this.lastID
            })
        })
    }
}