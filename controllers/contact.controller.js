export const contactController = {

    postMessage : (req, res) => {
        console.log(req.body)
        res.send("bien recu")
    },

    getForm : (req, res) => {
        res.render("contactForm.ejs")
    }
}