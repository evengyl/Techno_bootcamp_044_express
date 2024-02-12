import { contactModel } from "../models/contact.model.js"

export const contactController = {

    getForm : (req, res) => {
        res.render("contactForm.ejs")
    },

    postMessage : (req, res) => {
        console.log(req.body)
        //DTO TO MODEL
        let messageToSave = {
            message : req.body.message
        }
        contactModel.saveContactMessage(messageToSave, res)
    }
}