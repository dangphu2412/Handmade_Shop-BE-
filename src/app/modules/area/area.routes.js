import express from "express";
import AreaHandler from "./area.handler";

const router = express.Router();

router.get("/cities", AreaHandler["getCities"]());

router.get("/cities/:id/districts", AreaHandler["getDistrictsByCity"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: City
  *   description: City for banking to
  */

/**
  * @swagger
  * /cities:
  *   get:
  *     description: Get city by page and amount
  *     tags: [City]
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
  *                 $ref: '#/definitions/City'
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
