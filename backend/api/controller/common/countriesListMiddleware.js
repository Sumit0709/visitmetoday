
exports.countriesListMiddleware = (req, res, next) => {

    const countries = [
        "India",
        "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Albania",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Br. Virgin Isds",
      "Brazil",
      "Brunei Darussalam",
      "Bulgaria",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo",
      "Cook Isds",
      "Costa Rica",
      "Croatia",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Estonia",
      "Eswatini",
      "Fiji Islands",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern and Antarctic Lands",
      "Gabon",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "Indonesia",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lesotho",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Mali",
      "Malta",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Nepal",
      "Netherlands",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines (the)",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Vincent and the Grenadines",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Isds",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "Sweden",
      "Switzerland",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Virgin islands (US)",
      "Zambia",
    ]

    req.countries = countries;
    next();
}