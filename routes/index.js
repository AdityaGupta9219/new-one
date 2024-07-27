var express = require('express');
var router = express.Router();
var flash = require("connect-flash");
var passport = require('passport')
var userModel = require('./users');
var localstrategy = require('passport-local');
passport.use(new localstrategy(userModel.authenticate()));
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login',function(req, res, next) {
  
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post("/register",function(req,res){
  let user = new userModel({
    username:req.body.username,
    secret:req.body.secret
  })
  userModel.register(user,req.body.password)
  .then(function(registeruser){
    passport.authenticate("local")(req,res,function(){
      req.flash("user",user.username);
      res.redirect(`/profile${user.username}`);
    })
  })
  
})


router.get('/subscribe', function(req, res, next) {
  res.render('subscribe');
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/error"
}), function(req, res) {
  // This function will only be called if authentication succeeds.
  // You can handle the successful login here.
  
  res.redirect(`/profile${req.body.username}`); // Redirect to a success page or send a success message
});
router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/")
  })
})
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/error")
}
router.get('/profile:username',isLoggedIn,async function(req,res,next){

 await res.render('profile',{"name":req.params.username});
})

router.get('/home:username',isLoggedIn,async function(req,res,next){
 await res.render('home',{"name":req.params.username});
})

router.get('/index',function(req,res,next){
  res.render('index')
})
module.exports = router;
