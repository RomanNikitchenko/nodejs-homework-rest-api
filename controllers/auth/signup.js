const { User, joiRegisterSchema } = require('../../models/user');
const { Conflict } = require("http-errors");
const { createError } = require('../../helpers');

const signup = async (req, res, next) => {
    try {
        const { error } = joiRegisterSchema.validate(req.body);
        if (error) {
            throw createError(400, "BadL Request");
        }

        const { password, email, subscription } = req.body
        
        const user = await User.findOne({ email });
        if (user) {
            throw Conflict("Email in use");
        }

        const result = await User.create({ password, email, subscription });
        res.status(201).json({
            ResponseBody: {
                user: {
                    email,
                    subscription
                }
            }
        })  
    } catch (error) {
        next(error);
    }
};

module.exports = signup;
