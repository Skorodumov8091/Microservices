const { UserModel } = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with data base operations
class UserRepository {

    async CreateUser({ email, password, phone, salt }){
        try{
            const user = new UserModel({
                email,
                password,
                salt,
                phone
            })
            const userResult = await user.save();
            return userResult;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create User');
        }
    }
    
    async FindUser({ email }){
        try{
            const user = await UserModel.findOne({ email: email });
            return user;
        }catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }

    async FindUserById(id){
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }

}

module.exports = UserRepository;