

export const bodyValidation = (yupValidatorSchema) => {


    return (req, res, next) => {
        
        yupValidatorSchema.noUnknown().validate(req.body).then((data) => {
            next()
        })
        .catch((err) => {
            res.status(422).json({
                "message": "erreur de validation",
                "error" : err.errors
            })
        })

    }
}

/*
techniquement bodyValidation ne recois que yupValidatorSchema....

mais j'ai besoin d'avoir req, res, next


on peux utiliser un tricks, que l'on nomme souvent de l'inversion de callback.......................................... 

expressRouter.post("/usersComplexe", bodyValidation(registerUserComplexeValidator),(req, res, next) => {}, userController.createOne)
                    req, res, next ------- req, res ,next --------| break cassé --------------------- req, res, next
                    req, res, next ----req, res, next ----req, res, next ----req, res, next ----



*/