const isAdmin = async(req,res,next)=>{
    try {
        if(req.session.user && req.session.user.role === 'admin'){
            return next();
        }else{
            return res.status(403).json({message: 'Unauthorized.'});
        }

    } catch (error) {
        return res.status(error.status).json({message:error.message});
    }
    
}
module.exports = isAdmin;