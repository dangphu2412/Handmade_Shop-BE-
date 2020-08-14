import { checkSchema, validationResult } from "express-validator";

class Validator {
    start(validatorObject) {
        return [
            checkSchema(validatorObject),
            this.catchValidateErrors,
        ];
    }

    isInt(options, param, exists = true) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is not format like a number`,
            isInt: true,
            exists,
        };
    }

    isEmail(options, param) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is not format as a email`,
            isEmail: true,
            exists: true,
            trim: true,
        };
    }

    matchLength(options, param, { max, min }, exists = true, trim = true) {
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

    isExist(options, param) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is missing in ${options}`,
            exists: true,
        };
    }

    isArray(options, param) {
        return {
            in: [...options],
            errorMessage: `Your ${param} is missing or not format as an array`,
            isArray: true,
            exists: true,
        };
    }

    patchParams() {
        const schema = checkSchema({
            id: this.isInt(["params"], "Id"),
            status: this.isExist(["query"], "Status"),
        });
        return [
            schema,
            this.catchValidateErrors,
        ];
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
