const PendingTransactions = require("../../../model/pendingTransactions");
const { admin } = require("../../ViewController");



exports.getPendingTransactionList = async (req, res) => {
    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const page = req.query.page? req.query.page: 1; //requestedPage
    const limit = req.query.limit? req.query.limit: 15; //documentPerPage

    PendingTransactions.paginate({},{
        page: page,
        limit: limit
    })
    .then(result => {
        if(result){
            return res.status(200).json({
                success: true,
                pendingTransactions: result.docs
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
        console.log(err);
        return res.status(500).json({
            success:  false,
            error: "Error in fetching pending transactions"
        })
    })
}