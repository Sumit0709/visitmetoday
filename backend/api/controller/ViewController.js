
exports.superAdmin = (req, res) => {
    const user = req.body.user
    if(!(user.role == process.env.SUPER_ADMIN_ROLE)){
        return {
            success: false,
            error: "You are not allowed to access this content"
        }
    }
    return {
        success: true
    }
}

exports.admin = (req, res) => {
    const user = req.body.user
    if(!(user.role == process.env.ADMIN_ROLE || user.role == process.env.SUPER_ADMIN_ROLE)){
        return {
            success: false,
            error: "You are not allowed to access this content"
        }
    }
    return {
        success: true
    }
}

exports.allUser = (req,res) => {
    const user = req.body.user
    if(!(user.role == process.env.USER_ROLE || user.role == process.env.ADMIN_ROLE || user.role == process.env.SUPER_ADMIN_ROLE)){
        return {
            success: false,
            error: "You are not allowed to access this content"
        }
    }
    return {
        success: true
    }
}