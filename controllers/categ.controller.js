import { categsModel } from "../models/categ.model.js"

export const categController = {

    getAll : (req, res) => {
        let listAllCategs = categsModel.getAll()
        
        res.json(listAllCategs)
    }
}