import express from "express";
import GalleryHandler from "./gallery.handler";

const router = express.Router();

router.post("/gallery", GalleryHandler["uploadImage"]());

  /**
   * @swagger
   * tags:
   *   name: Gallery
   *   description: Api with gallery
   */

  /**
   * @swagger
   * /galleries/image:
   *   post:
   *     description: Post image to cloud to get url
   *     tags: [Gallery]
   *     consumes:
   *       - multipart/form-data
   *     parameters:
   *       - name: image
   *         in: formData
   *         type: file
   *         description: File image to upload
   *     responses:
   *       200:
   *         description: Url link of image
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ApiResponse'
   *       422:
   *         description: Invalid format of image
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ErrorResponse'
   *       500:
   *         description: Third party is out of service
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ErrorResponse'
   */

export default router;
