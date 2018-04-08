var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./Main/models/user.js");

var groupsRoutes    = require("./Main/routes/groups.js"),
    indexRoutes     = require("./Main/routes/index.js"),
    rewardRoutes    = require("./Main/routes/reward.js");
    
// mongoose.connect("mongodb://localhost/keep_diet_2");
mongoose.connect("mongodb://augus:123456@ds151048.mlab.com:51048/keepdiet");
//dbuser: augus dbpassword: 123456 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Once again Rusty wins cutest dog!",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set Up the Routes
app.use(indexRoutes);
app.use(groupsRoutes);
app.use(rewardRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});
