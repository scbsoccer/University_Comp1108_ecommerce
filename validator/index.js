exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required!")
        .notEmpty()
        .isLength({ max: 32 })
        .withMessage("Name is not longer than 32 characters!");
    req.check("email", "Email must be between 3 to 32 characters!")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contains @ and follow email pattern!")
        .isLength({
            min: 4,
            max: 32,
        });
    req.check("password", "Password is required!").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain 6 characters!")
        .matches(/\d/)
        .withMessage("Password must contains a number!");
    req.check("address", "Address is required!")
        .notEmpty()
        .isLength({ max: 200 })
        .withMessage("Address is not longer than 200 characters!");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
