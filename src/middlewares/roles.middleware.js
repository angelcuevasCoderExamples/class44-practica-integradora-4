const applyRolesPolicy = (roles)=>{ //["PUBLIC"] --- ["TEACHER"]--- ["STUDENT"]

    return (req, res, next)=>{
        if(roles.includes("PUBLIC")) {return next()};
        if(!req.user || !req.user.role) return res.status(401).send({status:'error', error:'Not authenticated'})
        if(!roles.includes(req.user.role.toUpperCase())) return res.status(403).send({status:'error', error:'Not authorized'})
        next()
    }
}

module.exports = applyRolesPolicy; 
