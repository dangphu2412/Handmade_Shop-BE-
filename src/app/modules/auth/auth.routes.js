import express from "express";
import AuthHandler from "./auth.handler";

const router = express.Router();

router.get("/users/mail/verify", AuthHandler["verifyAccount"]());

router.post("/signup", AuthHandler["signup"]());

router.post("/signin", AuthHandler["signin"]());

router.post("/oauth/google", AuthHandler["oauthGoogle"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Authenticate
  */

/**
  * @swagger
  * tags:
  *   name: User
  *   description: User information
  */

/**
  * @swagger
  * /users/mail/verify:
  *   get:
  *     description: Verify user email
  *     tags: [Auth]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: token
  *         description: Token to be verified.
  *         in: query
  *         type: integer
  *     responses:
  *       200:
  *         description: Verify success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *             data:
  *               type: object
  *       401:
  *         description: Unauthenticated
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       422:
  *         description: Invalid format of comment
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       500:
  *         description: Third party is out of service
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  */

/**
  * @swagger
  * /signin:
  *   post:
  *     description: Get city by page and amount
  *     tags: [Auth]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: Sign in.
  *         in: body
  *         type: string
  *         required: true
  *         schema:
  *             $ref: "#/definitions/SignIn"
  *     responses:
  *       200:
  *         description: Sign in success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *             data:
  *               type: string
  *               default: token
  *       401:
  *         description: Unauthenticated
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       422:
  *         description: Invalid format of comment
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       500:
  *         description: Third party is out of service
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  */

/**
  * @swagger
  * /signup:
  *   post:
  *     description: Get city by page and amount
  *     tags: [Auth]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: Sign in.
  *         in: body
  *         type: string
  *         required: true
  *         schema:
  *             $ref: "#/definitions/SignUp"
  *     responses:
  *       200:
  *         description: Sign up success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *             data:
  *               type: object
  *       401:
  *         description: Unauthenticated
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       422:
  *         description: Invalid format of comment
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       500:
  *         description: Third party is out of service
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  */
