import { validationResult } from "express-validator";

class Validator {
    checkNumber(options, msg) {
        return {
            in: [...options],
            errorMessage: msg,
            isInt: true,
            exists: true,
        };
    }

    checkEmail(options, msg) {
        return {
            in: [...options],
            errorMessage: msg,
            isEmail: true,
            exists: true,
        };
    }

    checkWithLength(options, msg, { max, min }) {
        return {
            in: [...options],
            errorMessage: msg,
            isLength: {
                errorMessage: `Password should be at least ${min} chars long and max ${max}`,
                options: { max, min },
            },
            isInt: true,
            exists: true,
        };
    }

    checkExistsOnly(options, msg) {
        return {
            in: [...options],
            errorMessage: msg,
            exists: true,
        };
    }

    catchValidateErrors(request, response, next) {
        try {
            if (validationResult(request).isEmpty()) {
                return next();
            }
            validationResult(request).throw();
        } catch (error) {
            return response.status(422).json({
                status: 422,
                errors: error.errors,
            });
        }
    }
}

export default Validator;
