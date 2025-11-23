const adminAuth = (req,res,next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    console.log("Admin Auth is getting executed");

    if(!isAdminAuthorized){
        res.status(401).send("Admin is not authorized");
    }
    else{
        next();
    }
};

const userAuth = (req,res,next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    console.log("User Auth is getting executed");

    if(!isAdminAuthorized){
        res.status(401).send("Admin is not authorized");
    }
    else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
}