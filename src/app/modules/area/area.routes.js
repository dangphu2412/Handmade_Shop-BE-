import express from "express";
import AreaHandler from "./area.handler";

const router = express.Router();
  /**
   * @swagger
   * definitions:
   *   City:
   *     required:
   *       - id
   *     properties:
   *       id:
   *         type: string
   *       name:
   *         type: string
   *       slug:
   *         type: string
   */

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
   *         description: Array object of city
   *         schema:
   *           type: object
   *           $ref: '#/definitions/City'
   */

router.get("/cities", AreaHandler["getCities"]());

router.get("/cities/:id/districts", AreaHandler["getDistrictsByCity"]());

export default router;
