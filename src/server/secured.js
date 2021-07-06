const isloggedIn = (req, res, next) => {
  console.log("authorizeUsersAccess Middleware in");
  if (req.query.admin === "true") {
    console.log("if");
    return next();
  } else {
    console.log("Else");
    res.send("ERROR: You must be an admin");
  }
  console.log("authorizeUsersAccess Middleware out ");
  //line 10 will not execute if confition is true.Since we are returning next, not executing
};
export default isloggedIn;
