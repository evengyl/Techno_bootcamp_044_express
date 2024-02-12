import * as yup from 'yup'


const regexPassWord = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/
const messageRegex = "Your Password is too weakly"

export const registerUserComplexeValidator = yup.object().shape({
    pseudo : yup.string().trim().required().min(3).max(25),
    email : yup.string().email().required(),
    password : yup.string().trim().required().min(8).max(255).matches(regexPassWord, messageRegex)
})
