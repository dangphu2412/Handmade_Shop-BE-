import express from "express";
import CategoryHandler from "./category.handler";

const router = express.Router();

router.get("/categories", CategoryHandler["getCategories"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: Category
  *   description: Category information
  */

/**
  * @swagger
  * /categories:
  *   get:
  *     description: Get category by page and amount
  *     tags: [Category]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: page
  *         description: Page get list cities.
  *         in: query
  *         type: integer
  *       - name: amount
  *         description: Amount get list cities.
  *         in: query
  *         type: integer
  *     responses:
  *       200:
  *         description: Get cities success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *             data:
  *               type: array
  *               items:
  *                 type: object
  *                 $ref: '#/definitions/Category'
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
