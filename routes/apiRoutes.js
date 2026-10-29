const express = require('express');
const router = express.Router();

const { login, getProfile } = require('../controllers/authController');
const { 
  getBalance, 
  getTransactions, 
  getTransactionById, 
  transferMoney 
} = require('../controllers/walletController');
const { authenticateToken } = require('../helpers/authMiddleware');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user & get access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: demo@jstack.co
 *               password:
 *                 type: string
 *                 example: Demo@123
 *     responses:
 *       200:
 *         description: Successful login with access token
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', login);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/users/profile', authenticateToken, getProfile);

/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Fetch current wallet balance
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/wallet/balance', authenticateToken, getBalance);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Fetch transaction history list
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *       401:
 *         description: Unauthorized
 */
router.get('/transactions', authenticateToken, getTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Fetch transaction details by ID
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: TXN10001
 *     responses:
 *       200:
 *         description: Transaction detail found
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
router.get('/transactions/:id', authenticateToken, getTransactionById);

/**
 * @swagger
 * /transactions/transfer:
 *   post:
 *     summary: Simulate money transfer to a beneficiary
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: idempotency-key
 *         required: false
 *         schema:
 *           type: string
 *         description: Unique key to prevent duplicate transfer deductions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - beneficiaryName
 *               - mobileNumber
 *               - amount
 *             properties:
 *               beneficiaryName:
 *                 type: string
 *                 example: Rahul Sharma
 *               mobileNumber:
 *                 type: string
 *                 example: "9876543210"
 *               amount:
 *                 type: number
 *                 example: 1500.00
 *               remarks:
 *                 type: string
 *                 example: Payment for services
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Insufficient wallet balance
 */
router.post('/transactions/transfer', authenticateToken, transferMoney);

module.exports = router;