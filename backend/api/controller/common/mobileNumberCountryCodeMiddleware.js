

exports.mobileNumberCountryCodeMiddleware = (req, res, next) => {

    const mobileNumberCountryCodes = [
        "India +91",
        "Australia +61",
        "Canada +1",
        "England +44",
        "France +33",
        "Germany +49",
        "Poland +48",
        "USA +1",
    ]

    req.mobileNumberCountryCode = mobileNumberCountryCodes;
    next();

}