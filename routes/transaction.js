const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('../middleware/auth');
const { portfolios, mutualFunds, transactions } = require('../config/database');

const router = express.Router();

// Buy mutual funds
router.post('/buy', authenticateToken, (req, res) => {
  try {
    const { fundId, amount } = req.body;
    const userId = req.user.userId;

    // Input validation
    if (!fundId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Fund ID and amount are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Find the mutual fund
    const fund = mutualFunds.find(f => f.id === fundId);
    if (!fund) {
      return res.status(404).json({
        success: false,
        message: 'Mutual fund not found'
      });
    }

    // Check minimum investment
    if (amount < fund.minInvestment) {
      return res.status(400).json({
        success: false,
        message: `Minimum investment for this fund is ${fund.minInvestment}`
      });
    }

    // Calculate units based on current NAV
    const units = amount / fund.nav;
    const transactionId = uuidv4();

    // Create transaction record
    const transaction = {
      id: transactionId,
      userId,
      fundId,
      type: 'BUY',
      units,
      amount,
      nav: fund.nav,
      timestamp: new Date()
    };

    transactions.push(transaction);

    // Update or create portfolio
    let userPortfolio = portfolios.find(p => p.userId === userId);
    
    if (!userPortfolio) {
      // Create new portfolio if it doesn't exist
      userPortfolio = {
        id: `PORT${uuidv4()}`,
        userId,
        holdings: [],
        totalInvested: 0,
        currentValue: 0,
        totalReturns: 0
      };
      portfolios.push(userPortfolio);
    }

    // Update existing holding or add new one
    const existingHolding = userPortfolio.holdings.find(h => h.fundId === fundId);
    
    if (existingHolding) {
      // Update existing holding
      const totalUnits = existingHolding.units + units;
      const totalInvested = existingHolding.investedAmount + amount;
      const newAverageNav = totalInvested / totalUnits;
      
      existingHolding.units = totalUnits;
      existingHolding.averageNav = newAverageNav;
      existingHolding.investedAmount = totalInvested;
      existingHolding.currentValue = totalUnits * fund.nav;
    } else {
      // Add new holding
      userPortfolio.holdings.push({
        fundId,
        units,
        averageNav: fund.nav,
        investedAmount: amount,
        currentValue: units * fund.nav
      });
    }

    // Update portfolio totals
    userPortfolio.totalInvested = userPortfolio.holdings.reduce((sum, h) => sum + h.investedAmount, 0);
    userPortfolio.currentValue = userPortfolio.holdings.reduce((sum, h) => sum + h.currentValue, 0);
    userPortfolio.totalReturns = userPortfolio.currentValue - userPortfolio.totalInvested;

    res.json({
      success: true,
      message: 'Mutual fund purchase successful',
      data: {
        transactionId,
        fund: {
          id: fund.id,
          name: fund.name
        },
        units: parseFloat(units.toFixed(4)),
        amount,
        nav: fund.nav,
        timestamp: transaction.timestamp
      }
    });

  } catch (error) {
    console.error('Buy transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process purchase'
    });
  }
});

// Sell mutual funds
router.post('/sell', authenticateToken, (req, res) => {
  try {
    const { fundId, unitsToSell } = req.body;
    const userId = req.user.userId;

    // Input validation
    if (!fundId || !unitsToSell) {
      return res.status(400).json({
        success: false,
        message: 'Fund ID and units to sell are required'
      });
    }

    if (unitsToSell <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Units to sell must be greater than 0'
      });
    }

    // Find user's portfolio and holding
    const userPortfolio = portfolios.find(p => p.userId === userId);
    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: 'No portfolio found'
      });
    }

    const holding = userPortfolio.holdings.find(h => h.fundId === fundId);
    if (!holding) {
      return res.status(404).json({
        success: false,
        message: 'Holding not found for this fund'
      });
    }

    // Check if user has enough units
    if (holding.units < unitsToSell) {
      return res.status(400).json({
        success: false,
        message: `Insufficient units. Available: ${holding.units}`
      });
    }

    const fund = mutualFunds.find(f => f.id === fundId);
    const amount = unitsToSell * fund.nav;
    const transactionId = uuidv4();

    // Create sell transaction record
    const transaction = {
      id: transactionId,
      userId,
      fundId,
      type: 'SELL',
      units: unitsToSell,
      amount,
      nav: fund.nav,
      timestamp: new Date()
    };

    transactions.push(transaction);

    // Update holding
    holding.units -= unitsToSell;
    holding.investedAmount = holding.units * holding.averageNav;
    holding.currentValue = holding.units * fund.nav;

    // Remove holding if no units left
    if (holding.units === 0) {
      userPortfolio.holdings = userPortfolio.holdings.filter(h => h.fundId !== fundId);
    }

    // Update portfolio totals
    userPortfolio.totalInvested = userPortfolio.holdings.reduce((sum, h) => sum + h.investedAmount, 0);
    userPortfolio.currentValue = userPortfolio.holdings.reduce((sum, h) => sum + h.currentValue, 0);
    userPortfolio.totalReturns = userPortfolio.currentValue - userPortfolio.totalInvested;

    res.json({
      success: true,
      message: 'Mutual fund sale successful',
      data: {
        transactionId,
        fund: {
          id: fund.id,
          name: fund.name
        },
        units: unitsToSell,
        amount: parseFloat(amount.toFixed(2)),
        nav: fund.nav,
        timestamp: transaction.timestamp
      }
    });

  } catch (error) {
    console.error('Sell transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process sale'
    });
  }
});

// Get transaction history
router.get('/history', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const userTransactions = transactions
      .filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(transaction => {
        const fund = mutualFunds.find(f => f.id === transaction.fundId);
        return {
          ...transaction,
          fundName: fund.name
        };
      });

    res.json({
      success: true,
      message: 'Transaction history retrieved successfully',
      data: userTransactions
    });

  } catch (error) {
    console.error('Transaction history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transaction history'
    });
  }
});

module.exports = router;