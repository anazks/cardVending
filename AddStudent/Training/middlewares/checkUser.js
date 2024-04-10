const checkUser = function(req,res,next){
   try {
    if(req.isAuthenticated()===false){
        return res.redirect('/')
      }
      next();
   } catch (error) {
    console.log(error)
   }
}

module.exports = checkUser;