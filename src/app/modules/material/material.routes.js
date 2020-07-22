import express from "express";
import MaterialHandler from "./material.handler";

const router = express.Router();

router.get("/materials", MaterialHandler["getMaterial"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: Material
  *   description: Material information
  */

/**
  * @swagger
  * /materials:
  *   get:
  *     description: Get materials by page and amount
  *     tags: [Material]
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
  *                 $ref: '#/definitions/Material'
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
