
import session from "express-session"
import passport from "passport"
import { Strategy } from "passport-local"
const LocalStrategy = Strategy
import  express from "express"
import dbConnect from "./db-connect.js"
import User from "./db-helpers.js"
import bodyParser from "body-parser"
const app = express()

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            console.log("goes hree")
            const user = await User.findOne({ username: username });
            if(!user){
                return done(null, false, { message: "Incorrect username" });
            }
            if(user.password != password){
                return done(null , false , {message : "Password does not match"});
            }
            return done(null, user);
        }
        catch(err){
            return done (err);
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

await dbConnect()

app.post("/sign-up" ,async (req, res , next) => {
    const data = {
        "status": "",
        "data" : ""
    }
    try {
        const user  = new User({
            username: req.body.username,
            password: req.body.password
        })
        await user.save()
        return res.json(data)
    }   
    catch (err){
        return next(err)

    }

})

app.get("/", (req, res) =>{
    return res.json({
        "user":req.user
    })
})


app.post("/login" , passport.authenticate("local" ,{
    successRedirect: "/",
    failureRedirect: "/"
}), (req, res)=>{
    return res.json({
        "data":"data"
    })
})
app.listen(3000, ()=>{
    console.log("Server running")
})
// console.log(User.find({}).exec().then((data)=>console.log(data)))


