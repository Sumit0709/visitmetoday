const ReferalCode = require("../../model/referalCode")
const variable = require("../../../variable")

const { customAlphabet } = require('nanoid');
const { default: mongoose } = require("mongoose");
const alphabet = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ123456789';
const nanoid = customAlphabet(alphabet, variable.referalCodeLength);

exports.createFirstReferalCode = async (req, res) => {

    const referalCode = nanoid();

    const userId = new mongoose.Types.ObjectId(req.body.userId);

    const referal = new ReferalCode({
        signupId: userId,
        referalCodeValue: referalCode,
        referedBy: "FIRST_PARENT"
    });

    referal.save()
        .then(result => {
            if(result){
                return res.status(200).json({
                    success: true,
                    result
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err
            })
        })

}