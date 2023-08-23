

exports.signout = async (req, res, next)=>{
    res.clearCookie("visitme_today_token",{path: '/'});

    console.log("LOGOUT")

    return res.status(200).json({
        success: true,
        message : "User signout successfully"
    });
}