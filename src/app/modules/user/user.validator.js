import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AuthValidator extends CoreValidator {}

export default new AuthValidator();
