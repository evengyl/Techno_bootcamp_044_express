import { dbInit } from '../models/dbInit.js'
import bcrypt from "bcrypt"

export const VerifyUsers = {


    verify : (req, res, next) =>{

        let isOk = false

        //dans mon bussineess, le user a le droit de blablabla si userName_idUser est valable
        let userName = req.body.userName
        let password = req.body.password


        dbInit.getDb().get('SELECT * FROM users WHERE name = :name', { ":name" : userName }, (err, row) => 
        {

            
            
            if(err) return res.status(500).json({error : err})
            
            if(row == undefined) isOk = false
            else isOk = true
            
                      

            //-> si le users n'est pas bon/connecter/ etc...
            if(isOk == false)
            {
                return res.status(401).json({
                    error : 401,
                    message : "Vous n'êtes pas authorisé à acceder a cette page"
                })
            }
            else
            {
                if(row.name == userName){
                    //ici je vais VERIFY password!!!

                    if(bcrypt.compareSync(password, row.password))
                        next()
                    else
                        return res.status(401).json({
                            error : 401,
                            message : "Vous n'êtes pas authorisé à acceder a cette page"
                        })
                }
                else //techniquement c'est un "never"
                    return res.status(500).json({error : err})
            }

        })

    }
}