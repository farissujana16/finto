/**
 * @openapi
 * /budget:
 *   get:
 *     tags: [Budget]
 *     summary: Get all budget
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /budget/{id}:
 *   get:
 *     tags: [Budget]
 *     summary: Get budget by ID
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
 * /budget:
 *   post:
 *     tags: [Budget]
 *     summary: Create budget
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
 *               - categoryId
 *               - limitAmount
 *               - periodMonth
 *               - periodYear
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *               limitAmount:
 *                 type: number
 *                 format: double
 *                 example: 3000000
 *               periodMonth:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 example: 7
 *               periodYear:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @openapi
 * /budget/{id}:
 *   patch:
 *     tags: [Budget]
 *     summary: Update budget
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
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *               limitAmount:
 *                 type: number
 *                 format: double
 *                 example: 3500000
 *               periodMonth:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 example: 8
 *               periodYear:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @openapi
 * /budget/{id}:
 *   delete:
 *     tags: [Budget]
 *     summary: Delete budget
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
