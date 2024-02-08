let listCateg = [
    { id : 1, name : "categ 1"},
    { id : 2, name : "categ 2"},
    { id : 3, name : "categ 3"},
]

export const categsModel  = {

   
     
    getAll : () => {
        return listCateg
    },

    getOne : (id) => {
        let categ = listCateg.find(categ => categ.id == id)
        return categ
    },

    createOne : (newCateg) => {
        let newId = Math.floor(Math.random() *  100)
        newCateg.id = newId
        listCateg.push(newCateg)
        return newId
    },
    
    updateOne : (updateCateg, id) => {
        let categToUpdate = listCateg.find(categ => categ.id == id)
        categToUpdate.name = updateCateg.name
        
        return id
    },

    deleteOne : (id) => {
        let categDeletedIndex = listCateg.findIndex(categ => categ.id == id)
        listCateg.splice(categDeletedIndex, 1)
        return id
    }
}