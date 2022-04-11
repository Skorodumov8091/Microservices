const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError } = require('../utils/app-errors')

// All Business logic will be here
class UserService {

    constructor(){
        this.repository = new UserRepository();
    }

    async SignIn(userInputs){
        const { email, password } = userInputs;
        try {
            const user = await this.repository.FindUser({ email});
            if(user){
                const validPassword = await ValidatePassword(password, user.password, user.salt);
                if(validPassword){
                    const token = await GenerateSignature({ email: user.email, _id: user._id});
                    return FormateData({id: user._id, token });
                } 
            }
            return FormateData(null);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async SignUp(userInputs){
        const { email, password, phone } = userInputs;
        try {
            let salt = await GenerateSalt();
            let userPassword = await GeneratePassword(password, salt);
            const user = await this.repository.CreateUser({ email, password: userPassword, phone, salt});
            const token = await GenerateSignature({ email: email, _id: user._id});
            return FormateData({id: user._id, token });
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async GetProfile(id){
        try {
            const user = await this.repository.FindUserById(id);
            console.log(user);
            return FormateData(user);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }
}

module.exports = UserService;