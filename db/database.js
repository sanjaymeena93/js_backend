// In-Memory Database State
let wallet = {
  walletId: "WALLET10001",
  currency: "INR",
  availableBalance: 25450.75,
  maskedAccountNumber: "XXXX XXXX 4589"
};

let userProfile = {
  id: "USR10001",
  name: "Demo User",
  email: "demo@jstack.co"
};

let transactions = [
  { id: "TXN10001", type: "DEBIT", amount: 1500.00, currency: "INR", beneficiaryName: "Rahul Sharma", status: "SUCCESS", createdAt: "2026-10-20T10:30:00Z", remarks: "Services" },
  { id: "TXN10002", type: "CREDIT", amount: 5000.00, currency: "INR", beneficiaryName: "Amit Kumar", status: "SUCCESS", createdAt: "2026-10-19T14:15:00Z", remarks: "Refund" },
  { id: "TXN10003", type: "DEBIT", amount: 250.00, currency: "INR", beneficiaryName: "Priya Singh", status: "SUCCESS", createdAt: "2026-10-18T09:10:00Z", remarks: "Tea & Snacks" },
  { id: "TXN10004", type: "DEBIT", amount: 1200.00, currency: "INR", beneficiaryName: "Electric Utility", status: "SUCCESS", createdAt: "2026-10-17T18:45:00Z", remarks: "Bill Payment" },
  { id: "TXN10005", type: "CREDIT", amount: 10000.00, currency: "INR", beneficiaryName: "Salary Account", status: "SUCCESS", createdAt: "2026-10-15T08:00:00Z", remarks: "Bonus" },
  { id: "TXN10006", type: "DEBIT", amount: 450.00, currency: "INR", beneficiaryName: "Zomato", status: "SUCCESS", createdAt: "2026-10-14T20:30:00Z", remarks: "Dinner" },
  { id: "TXN10007", type: "DEBIT", amount: 800.00, currency: "INR", beneficiaryName: "Uber", status: "SUCCESS", createdAt: "2026-10-13T11:20:00Z", remarks: "Cab Ride" },
  { id: "TXN10008", type: "CREDIT", amount: 1200.00, currency: "INR", beneficiaryName: "Vikas Verma", status: "SUCCESS", createdAt: "2026-10-12T16:00:00Z", remarks: "Split Bill" },
  { id: "TXN10009", type: "DEBIT", amount: 3500.00, currency: "INR", beneficiaryName: "Amazon", status: "SUCCESS", createdAt: "2026-10-10T14:00:00Z", remarks: "Shopping" },
  { id: "TXN10010", type: "DEBIT", amount: 150.00, currency: "INR", beneficiaryName: "Metro Recharge", status: "SUCCESS", createdAt: "2026-10-09T10:00:00Z", remarks: "Travel" }
];

const processedRequests = new Map();

module.exports = {
  wallet,
  userProfile,
  transactions,
  processedRequests
};