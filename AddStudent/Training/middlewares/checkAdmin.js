const checkAdmin = function(req,res,next){
    try {
     if(!req.session.admin){
         return res.redirect('/')
       }
       next();
    } catch (error) {
     console.log(error)
    }
 }
 
 module.exports = checkAdmin;