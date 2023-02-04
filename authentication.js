const User = require("./model/user");



const express = require("express");
const app = express();


const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

function authenticate(app){
        
   
    app.use(session({
        secret: 'john Social_Media_API',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true }
    }));

    app.use(passport.initialize());
    app.use(passport.session());



    passport.use(new localStrategy(async(username, password, cb) => {
        try{
            const user = await User.findOne({username: username});
            if(user){
                console.log("user found");
                const passwordMatch = await bcrypt.compare(user.password, password);
                if(passwordMatch){
                    console.log("User found, password matched");
                    return cb(null, user);
                }
                if(!passwordMatch){
                    console.log("user found,  password not matched");
                    return cb(null, user);
                }
            }
            else if(!user){
                console.log("user not found");
                return cb(null, false);
            }
        }catch(error){
            console.log(error);
            return cb(error);
        }
   
    }))

    passport.serializeUser((user, done)=>{
        return done(null, user);
    })

    passport.deserializeUser((user, done) => {
        return done(null, user);
    })
}


module.exports = { authenticate}