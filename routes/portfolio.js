const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { portfolios, mutualFunds } = require('../config/database');

const router = express.Router();

// Get user's portfolio
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user's portfolio
    const userPortfolio = portfolios.find(p => p.userId === userId);

    if (!userPortfolio) {
      return res.json({
        success: true,
        message: 'No portfolio found. Start by investing in mutual funds!',
        data: {
          holdings: [],
          summary: {
            totalInvested: 0,
            currentValue: 0,
            totalReturns: 0,
            returnPercentage: 0,
            oneDayChange: 0
          }
        }
      });
    }

    // Enhance holdings with fund details
    const enhancedHoldings = userPortfolio.holdings.map(holding => {
      const fund = mutualFunds.find(f => f.id === holding.fundId);
      const returns = holding.currentValue - holding.investedAmount;
      const returnPercentage = ((returns / holding.investedAmount) * 100);
      
      return {
        ...holding,
        fundName: fund.name,
        fundCategory: fund.category,
        currentNav: fund.nav,
        returns: parseFloat(returns.toFixed(2)),
        returnPercentage: parseFloat(returnPercentage.toFixed(2)),
        oneDayChange: parseFloat((fund.nav * 0.01).toFixed(2)) // Simulated daily change
      };
    });

    // Calculate portfolio summary
    const totalInvested = userPortfolio.totalInvested;
    const currentValue = userPortfolio.currentValue;
    const totalReturns = userPortfolio.totalReturns;
    const returnPercentage = ((totalReturns / totalInvested) * 100);

    const summary = {
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      currentValue: parseFloat(currentValue.toFixed(2)),
      totalReturns: parseFloat(totalReturns.toFixed(2)),
      returnPercentage: parseFloat(returnPercentage.toFixed(2)),
      oneDayChange: parseFloat((currentValue * 0.008).toFixed(2)) // Simulated daily portfolio change
    };

    res.json({
      success: true,
      message: 'Portfolio retrieved successfully',
      data: {
        holdings: enhancedHoldings,
        summary
      }
    });

  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio'
    });
  }
});

// Get available mutual funds
router.get('/funds', authenticateToken, (req, res) => {
  try {
    // Add some sorting and categorization
    const categorizedFunds = mutualFunds.map(fund => {
      return {
        ...fund,
        nav: parseFloat(fund.nav.toFixed(2)),
        returns: parseFloat(fund.returns.toFixed(2))
      };
    });

    res.json({
      success: true,
      message: 'Mutual funds retrieved successfully',
      data: {
        funds: categorizedFunds,
        categories: [...new Set(mutualFunds.map(f => f.category))],
        totalFunds: mutualFunds.length
      }
    });
  } catch (error) {
    console.error('Funds error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve mutual funds'
    });
  }
});

// Get fund details by ID
router.get('/funds/:fundId', authenticateToken, (req, res) => {
  try {
    const { fundId } = req.params;
    const fund = mutualFunds.find(f => f.id === fundId);

    if (!fund) {
      return res.status(404).json({
        success: false,
        message: 'Mutual fund not found'
      });
    }

    res.json({
      success: true,
      message: 'Fund details retrieved successfully',
      data: fund
    });
  } catch (error) {
    console.error('Fund details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve fund details'
    });
  }
});

module.exports = router;