import { dbInit } from "./dbInit.js"

export const categsModel  = {

   
     
    getAll : (res) => {

        dbInit.getDb().all('SELECT * FROM categories', function(err, rows) {
            if(err) return res.status(500).json({ error : err})

            if(row == undefined) return res.status(404).json({ error : "Categories not found" })
        
            return res.json(rows)
        
        })
    },

    getOneById : (id, res) => {

        dbInit.getDb().get("SELECT * FROM categories WHERE id = :id", { ":id" : id }, function(err, row){
            if(err) return res.status(500).json({ error : err})

            if(row == undefined) return res.status(404).json({ error : "Category not found" })

            return res.json(row)
        })

    },

    createOne : (newCateg, res) => {

        dbInit.getDb().run(`INSERT INTO categories (name) VALUES ("${newCateg.name}")`, function(err, row) {
            
            if(err) return res.status(500).json({ error : err})
            
            return res.json({
                "message" : "categories created successfully",
                "id" : this.lastID
            })
        })

    },
    
    updateOne : (idToUpdate, updatedCategName, res) => {

       dbInit.getDb().get("SELECT id FROM categories WHERE id = :id", { ":id" : idToUpdate}, function(err, row){
            
           
            if(err) return res.status(500).json({ error : err})
           

            if(row == undefined) return res.status(404).json({ error : "Category not found" })


            dbInit.getDb().run("UPDATE categories SET name = :name WHERE id = :id",
                { ":name" : updatedCategName, ":id" : idToUpdate}, function(err, result){
                    
                if(err) return res.status(500).json({ error : err})

                return res.json({
                    id : idToUpdate,
                    message : "Category name updated successfully"
                })
            })
            
       })
    },

    deleteOne : (idToDelete, res) => {


        dbInit.getDb().get("SELECT * FROM categories WHERE id = :id", { ":id" : idToDelete }, function(err, row){
            if(err) return res.status(500).json({ error : err})

            if(row == undefined) return res.status(404).json({ error : "Category not found" })


            dbInit.getDb().run("DELETE FROM categories WHERE id = :id", { ":id" : idToDelete}, function(err, result){
        
                if(err) return res.status(500).json({ error : err})
    
                return res.json({
                    id : idToDelete,
                    message : "Category deleted successfully"
                })
            })

        })
    }
}