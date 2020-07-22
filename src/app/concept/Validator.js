import { validationResult } from 'express-validator';

class Validator {
    checkNumber(options, param, exists = true) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is not format like a number`,
            isInt: true,
            exists,
        };
    }

    checkEmail(options, param) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is not format as a email`,
            isEmail: true,
            exists: true,
            trim: true,
        };
    }

    checkWithLength(options, param, { max, min }, exists = true, trim = true) {
        return {
            in: [...options],
            errorMessage: `${param} is missing`,
            isLength: {
                errorMessage: `${param} should be at least ${min} chars long and max ${max}`,
                options: { max, min },
            },
            exists,
            trim,
        };
    }

    checkExistsOnly(options, param) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is missing in ${options}`,
            exists: true,
        };
    }

    checkArray(options, param) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is missing or not format as an array`,
            isArray: true,
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
            console.log(error);
            return response.status(422).json({
                status: 422,
                message: `${error.errors[0].msg} in ${error.errors[0].location}`,
            });
        }
    }
}

export default Validator;
