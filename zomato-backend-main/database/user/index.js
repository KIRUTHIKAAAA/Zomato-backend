import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ details: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }]
}, {
    timestamps: true
})


userSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp")
}

//for Signup
userSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    //check wether email and phone ecists in our database or not
    const checkUserByEmail = await UserModel.findOne({ email })
    const checkUserByPhone = await UserModel.findOne({ phoneNumber })

    if (checkUserByEmail || checkUserByPhone) {

        throw new Error('User already exists!!!!')
    }
    return false;
}

//for Signin
userSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does not exists!!!");

    //Compare password
    const doesPassword = await bcrypt.compare(password, user.password)

    if (!doesPassword) throw new Error("Invalid Password!!!");


    return user;
}

// userSchema.pre("save", function (next) {
//     const user = this;


//     //password is modified
//     if (!user.isModified("password")) return next();

//     //generate bcrypt salt;
//     bcrypt.genSalt(8, (error, salt) => {
//         if (error) return next(error);

//         //hash the password

//         bcrypt.hash(user.password, salt, (error, hash) => {
//             if (error) return next(error);

//             //assign hashed password
//             user.password = hash;
//             return next();
//         });
//     });
// })


userSchema.pre("save", function (next) {
    const user = this;

    //password is modified
    if (!user.isModified("password")) return next();

    //generate bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        // hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //assign hashed password
            user.password = hash;
            return next();
        });
    });
});
export const UserModel = mongoose.model("users", userSchema);


