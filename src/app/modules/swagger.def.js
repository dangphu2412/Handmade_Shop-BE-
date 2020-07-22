/**
  * @swagger
  * securityDefinitions:
  *   authentication:
  *     type: http
  *     name: Authorization
  *     in: header
  *     bearerFormat: JWT
*/

/**
   * @swagger
  * definitions:
  *   ApiResponse:
  *     type: object
  *     properties:
  *       status:
  *         type: integer
  *         format: int32
  *       message:
  *         type: string
  *       data:
  *         type: object
  *   ErrorResponse:
  *     type: object
  *     properties:
  *       status:
  *         type: integer
  *       message:
  *         type: string
*/

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
  * definitions:
  *   District:
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
  * definitions:
  *   User:
  *     required:
  *       - id
  *     properties:
  *       id:
  *         type: string
  *       username:
  *         type: string
  *       name:
  *         type: string
  *       slug:
  *         type: string
  *       avatar:
  *         type: string
  *       shopActive:
  *         type: string
  */

/**
  * @swagger
  * definitions:
  *   SignIn:
  *     required:
  *       - username
  *       - password
  *     properties:
  *       username:
  *         type: string
  *       password:
  *         type: string
  */

/**
  * @swagger
  * definitions:
  *   SignUp:
  *     required:
  *       - name
  *       - username
  *       - password
  *     properties:
  *       name:
  *         type: string
  *       username:
  *         type: string
  *       password:
  *         type: string
  */

/**
  * @swagger
  * definitions:
  *   Shop:
  *     required:
  *       - name
  *       - description
  *       - thumbnail
  *       - cardNumber
  *       - bankId
  *       - bankAccount
  *       - districtId
  *     properties:
  *       name:
  *         type: string
  *       description:
  *         type: string
  *       thumbnail:
  *         type: string
  *       cardNumber:
  *         type: string
  *       bankId:
  *         type: integer
  *       bankAccount:
  *         type: string
  *       districtId:
  *         type: integer
  */

/**
  * @swagger
  * definitions:
  *   Product:
  *     required:
  *       - name
  *       - categoryId
  *       - description
  *       - price
  *       - amount
  *       - materialId
  *       - transportId
  *       - gallery
  *     properties:
  *       name:
  *         type: string
  *       categoryId:
  *         type: integer
  *       description:
  *         type: string
  *       price:
  *         type: string
  *       amount:
  *         type: string
  *       materialId:
  *         type: array
  *         items:
  *            type: integer
  *       transportId:
  *         type: array
  *         items:
  *            type: integer
  *       gallery:
  *         type: array
  *         items:
  *           type: object
  *           $ref: "#/definitions/Gallery"
  */

/**
  * @swagger
  * definitions:
  *   Gallery:
  *     required:
  *       - kind
  *       - src
  *     properties:
  *       kind:
  *         type: string
  *       src:
  *         type: string
  */

/**
  * @swagger
  * definitions:
  *   Material:
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
  * definitions:
  *   Transport:
  *     required:
  *       - id
  *     properties:
  *       id:
  *         type: string
  *       brand:
  *         type: string
  *       fee:
  *         type: string
  */

/**
  * @swagger
  * definitions:
  *   Category:
  *     required:
  *       - id
  *     properties:
  *       id:
  *         type: string
  *       name:
  *         type: string
  *       slug:
  *         type: string
  *       children:
  *         type: array
  *         items:
  *           type: object
  *           schema:
  *             $ref: '#/definitions/Category'
  */
