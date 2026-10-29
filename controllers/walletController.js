const { wallet, transactions, processedRequests } = require('../db/database');

const getBalance = (req, res) => {
  res.json({ success: true, data: wallet });
};

const getTransactions = (req, res) => {
  res.json({ success: true, data: transactions });
};

const getTransactionById = (req, res) => {
  const txn = transactions.find(t => t.id === req.params.id);
  if (!txn) {
    return res.status(404).json({ success: false, message: "Transaction not found" });
  }
  res.json({ success: true, data: txn });
};

const transferMoney = (req, res) => {
  const idempotencyKey = req.headers['idempotency-key'];
  if (idempotencyKey && processedRequests.has(idempotencyKey)) {
    return res.json(processedRequests.get(idempotencyKey));
  }

  const { beneficiaryName, mobileNumber, amount, remarks } = req.body;
  const transferAmount = parseFloat(amount);

  if (!beneficiaryName || !mobileNumber || isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid request data" });
  }

  if (transferAmount > wallet.availableBalance) {
    return res.status(409).json({ success: false, message: "Insufficient wallet balance" });
  }

  wallet.availableBalance -= transferAmount;
  const newTxnId = `TXN${10000 + transactions.length + 1}`;
  
  const newTransaction = {
    id: newTxnId,
    type: "DEBIT",
    amount: transferAmount,
    currency: wallet.currency,
    beneficiaryName,
    status: "SUCCESS",
    createdAt: new Date().toISOString(),
    remarks: remarks || "Transfer"
  };

  transactions.unshift(newTransaction);

  const responsePayload = {
    success: true,
    data: {
      transactionId: newTxnId,
      status: "SUCCESS",
      amount: transferAmount,
      currency: wallet.currency,
      availableBalance: wallet.availableBalance,
      beneficiaryName,
      createdAt: newTransaction.createdAt
    }
  };

  if (idempotencyKey) {
    processedRequests.set(idempotencyKey, responsePayload);
  }

  res.json(responsePayload);
};

module.exports = {
  getBalance,
  getTransactions,
  getTransactionById,
  transferMoney
};