const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;


    if (title == null) {
        errors.push({ field: "title", message: "This filed is required" });
    }


    if (director == null) {
        errors.push({ field: "director", message: "This filed is required" });
    }
    if (year == null) {
        errors.push({ field: "year", message: "This field is required" });
    }
    if (color == null) {
        errors.push({ field: "color", message: "This filed is required" });

    }
    if (duration == null) {
        errors.push({ field: "duration", message: "This filed is required" });
    }
    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    }
    else {
        next();
    }    // validate req.body then call next() if everything is ok
};

module.exports = {
    validateMovie,
};