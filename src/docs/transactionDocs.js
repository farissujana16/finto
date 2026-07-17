/**
 * @openapi
 * /transaction:
 *   get:
 *     tags: [Transaction]
 *     summary: Get all transaction
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /transaction/{id}:
 *   get:
 *     tags: [Transaction]
 *     summary: Get transaction by ID
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
 * /transaction:
 *   post:
 *     tags: [Transaction]
 *     summary: Create transaction
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
 *               - accountId
 *               - amount
 *               - transactionDate
 *               - type
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               accountId:
 *                 type: integer
 *                 example: 1
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *               amount:
 *                 type: number
 *                 format: double
 *                 example: 150000
 *               transactionDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-15"
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                   - transfer
 *                 example: expense
 *               description:
 *                 type: string
 *                 example: Lunch with client
 *               toAccountId:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @openapi
 * /transaction/{id}:
 *   patch:
 *     tags: [Transaction]
 *     summary: Update transaction
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
 *               accountId:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *               amount:
 *                 type: number
 *                 format: double
 *               transactionDate:
 *                 type: string
 *                 format: date
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                   - transfer
 *               description:
 *                 type: string
 *               toAccountId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @openapi
 * /transaction/{id}:
 *   delete:
 *     tags: [Transaction]
 *     summary: Delete transaction
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
