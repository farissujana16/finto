/**
 * @openapi
 * /goal:
 *   get:
 *     tags: [Goal]
 *     summary: Get all goal
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /goal/{id}:
 *   get:
 *     tags: [Goal]
 *     summary: Get goal by ID
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
 * /goal:
 *   post:
 *     tags: [Goal]
 *     summary: Create goal
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
 *               - targetAmount
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: Buy MacBook Pro
 *               targetAmount:
 *                 type: number
 *                 format: double
 *                 example: 25000000
 *               currentAmount:
 *                 type: number
 *                 format: double
 *                 example: 5000000
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2027-12-31"
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @openapi
 * /goal/{id}:
 *   patch:
 *     tags: [Goal]
 *     summary: Update goal
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
 *                 maxLength: 100
 *                 example: Buy House
 *               targetAmount:
 *                 type: number
 *                 format: double
 *                 example: 500000000
 *               currentAmount:
 *                 type: number
 *                 format: double
 *                 example: 100000000
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2028-12-31"
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @openapi
 * /goal/{id}:
 *   delete:
 *     tags: [Goal]
 *     summary: Delete goal
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
