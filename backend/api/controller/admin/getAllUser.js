const Signup = require('../../model/signup')

const { admin } = require("../ViewController")

exports.getAllUsers = async (req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // console.log(req.query);

    
    const page = req.query.page? req.query.page: 1; //requestedPage
    const limit = req.query.limit? req.query.limit: 15; //documentPerPage
    const role = req.query.role? req.query.role: 0; 
    const  isActive = req.query.isActive? req.query.isActive: true

    let filter = {};
    if(req.query.isActive) {filter = {...filter, isActive: req.query.isActive}}
    if(req.query.role) {filter = {...filter, role: req.query.role}}


    Signup.paginate(filter,{
        page: page,
        limit: limit,
        projection: {
            email: 1,
            mobileNumber: 1,
            _id: 1,
            isActive: 1
        }
    })
    .then(result => {
        if(result){
            return res.status(200).json({
                success: true,
                users: result.docs,
                hasPrevPage : result.hasPrevPage,
                hasNextPage : result.hasNextPage,
                totalPages : result.totalPages,
                currentPage : result.page,
            })
        }
        else{
            return res.status(401).json({
                success: false,
                error: "Users List is empty"
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            success:  false,
            error: "Error in fetching user's list"
        })
    })

}