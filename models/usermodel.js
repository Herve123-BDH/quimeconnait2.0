const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            maxlength: 60,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            maxlength: 60,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 60,
            trim: true,
        },
        responseAmrx: [],
        responseAmitier: [],
        friendAmrx: [],
        friendAmitier: []
    }
)
//cette fonction se declanche avant que la requette ne soit envoyer au server
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user; 
        }
        throw Error("incorect password")
    }
    throw Error('incorect email')
}


const UserModel = mongoose.model('userAuth', UserSchema)
module.exports = UserModel; 