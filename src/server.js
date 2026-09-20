const express = require("express");

const app = express();

app.use(express.json());

const account = {
    accountNumber: "FS10001",
    customerName: "FinSmart Demo User",
    balance: 75000
};

const transactions = [
    {
        id: "TXN001",
        type: "Credit",
        description: "Salary",
        amount: 50000
    },
    {
        id: "TXN002",
        type: "Debit",
        description: "Shopping",
        amount: 2500
    },
    {
        id: "TXN003",
        type: "Debit",
        description: "Electricity Bill",
        amount: 1800
    }
];

// Home
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to FinSmart Banking API",
        version: "1.0.0",
        status: "Running"
    });
});

// View account balance
app.get("/api/account/balance", (req, res) => {
    res.json({
        accountNumber: account.accountNumber,
        customerName: account.customerName,
        balance: account.balance
    });
});

// View transactions
app.get("/api/transactions", (req, res) => {
    res.json(transactions);
});

// Transfer money
app.post("/api/transfer", (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Transfer amount must be greater than zero"
        });
    }

    if (amount > account.balance) {
        return res.status(400).json({
            success: false,
            message: "Insufficient balance"
        });
    }

    account.balance -= amount;

    res.json({
        success: true,
        message: "Money transferred successfully",
        transactionId: "TXN" + Date.now(),
        amount: amount,
        remainingBalance: account.balance
    });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`FinSmart server running on port ${PORT}`);
    });
}

module.exports = app;