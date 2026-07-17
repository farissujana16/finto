/**
 * @openapi
 * /account:
 *   get:
 *     tags: [Account]
 *     summary: Get all account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /account/{id}:
 *   get:
 *     tags: [Account]
 *     summary: Get account by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /account:
 *   post:
 *     tags: [Account]
 *     summary: Create account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 50
 *                 example: BCA
 *               type:
 *                 type: string
 *                 enum:
 *                   - cash
 *                   - bank
 *                   - ewallet
 *                   - investment
 *                 example: bank
 *               balance:
 *                 type: number
 *                 format: double
 *                 example: 1000000
 *               colorOne:
 *                 type: string
 *                 maxLength: 20
 *                 example: 0A58CA
 *               colorTwo:
 *                 type: string
 *                 maxLength: 20
 *                 example: 0A58CA
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @openapi
 * /account/{id}:
 *   patch:
 *     tags: [Account]
 *     summary: Update account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 50
 *                 example: Mandiri
 *               type:
 *                 type: string
 *                 enum:
 *                   - cash
 *                   - bank
 *                   - ewallet
 *                   - investment
 *                 example: ewallet
 *               balance:
 *                 type: number
 *                 format: double
 *                 example: 2500000
 *               colorOne:
 *                 type: string
 *                 maxLength: 20
 *                 example: 0A58CA
 *               colorTwo:
 *                 type: string
 *                 maxLength: 20
 *                 example: 0A58CA
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @openapi
 * /account/{id}:
 *   delete:
 *     tags: [Account]
 *     summary: Delete account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */

module.exports = {};
