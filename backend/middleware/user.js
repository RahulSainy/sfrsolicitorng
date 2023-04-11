const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // verify already decode the tokem for us so stored it in const to use in product route
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};


// // middleware function to check if user has completed their profile
// const checkProfileCompletion = async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id);
//       if (!user.profileCompleted) {
//         return res.status(403).json({ message: "Please complete your profile before accessing the dashboard." });
//       }
//       next();
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  
//   // apply middleware to dashboard routes
//   router.get("/dashboard", checkProfileCompletion, async (req, res) => {
//     // return dashboard data
//   });
  