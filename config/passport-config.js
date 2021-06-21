import passport from "passport";
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from "bcryptjs";
import User from "./../api/models/User";



function initialize(passport) {
    const authenticateUser = async (req, email, password, done) => {

        // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        let logindata = { 'emailId': email, 'isActive': '1'}

        await User.findOne(logindata)
            .then(async function (data) {
                if (data == null) {
                    return done(null, false, { message: 'No user with that email', status: false })
                }

                try {
                    if (await bcrypt.compare(password, data.password)) {
                        return done(null, data, { message: 'Login Successfully', status: true })
                    } else {
                        return done(null, false, { message: 'Password incorrect', status: false })
                    }
                } catch (e) {
                    return done(e)
                }
            })
            .catch(function (err) {
                console.log(err);
                return done(null, false, { message: 'Server error.', status: false })
            });
    }

    passport.use(new LocalStrategy({ usernameField: 'emailId', passReqToCallback: true }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        await User.findById(id, function (err, user) { done(err, user); });
    })
}

module.exports = initialize;


