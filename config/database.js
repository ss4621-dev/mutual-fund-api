// In-memory database simulation for demo purposes
const bcrypt = require('bcryptjs');

// Initialize with empty users array - users will be registered via API
const users = [];

const mutualFunds = [
  {
    id: 'MF001',
    name: 'HDFC Top 100 Fund',
    category: 'Large-Cap Equity',
    nav: 845.75,
    returns: 14.2,
    risk: 'High',
    minInvestment: 1000,
    description: 'Focuses on large-cap companies with strong growth potential'
  },
  {
    id: 'MF002',
    name: 'ICICI Prudential Bluechip Fund',
    category: 'Large-Cap Equity',
    nav: 632.40,
    returns: 13.8,
    risk: 'High',
    minInvestment: 1000,
    description: 'Invests in bluechip companies across sectors'
  },
  {
    id: 'MF003',
    name: 'SBI Liquid Fund',
    category: 'Liquid Debt',
    nav: 2856.32,
    returns: 6.8,
    risk: 'Low',
    minInvestment: 500,
    description: 'Ultra-short duration fund for parking surplus funds'
  },
  {
    id: 'MF004',
    name: 'HDFC Hybrid Equity Fund',
    category: 'Aggressive Hybrid',
    nav: 745.18,
    returns: 11.5,
    risk: 'Medium',
    minInvestment: 1000,
    description: 'Balanced mix of equity and debt instruments'
  },
  {
    id: 'MF005',
    name: 'Nippon India Small Cap Fund',
    category: 'Small-Cap Equity',
    nav: 125.65,
    returns: 18.3,
    risk: 'Very High',
    minInvestment: 1000,
    description: 'High-risk fund focusing on small-cap companies'
  },
  {
    id: 'MF006',
    name: 'ICICI Prudential Corporate Bond Fund',
    category: 'Corporate Bond',
    nav: 28.45,
    returns: 7.9,
    risk: 'Low to Medium',
    minInvestment: 1000,
    description: 'Invests in high-rated corporate bonds'
  },
  {
    id: 'MF007',
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Flexi-Cap',
    nav: 56.78,
    returns: 16.4,
    risk: 'High',
    minInvestment: 1000,
    description: 'Invests across market caps with international exposure'
  },
  {
    id: 'MF008',
    name: 'Axis Banking & PSU Debt Fund',
    category: 'Banking & PSU Debt',
    nav: 2456.89,
    returns: 7.2,
    risk: 'Low',
    minInvestment: 1000,
    description: 'Invests in debt instruments of banks and PSUs'
  },
  {
    id: 'MF009',
    name: 'Mirae Asset Emerging Bluechip Fund',
    category: 'Large & Mid-Cap',
    nav: 89.45,
    returns: 15.7,
    risk: 'High',
    minInvestment: 1000,
    description: 'Focuses on emerging bluechip companies'
  },
  {
    id: 'MF010',
    name: 'Aditya Birla Sun Life Digital India Fund',
    category: 'Sectoral - Technology',
    nav: 34.67,
    returns: 19.2,
    risk: 'Very High',
    minInvestment: 1000,
    description: 'Thematic fund focusing on digital and technology companies'
  },
  {
    id: 'MF011',
    name: 'SBI Magnum Gilt Fund',
    category: 'Gilt',
    nav: 45.32,
    returns: 8.1,
    risk: 'Low to Medium',
    minInvestment: 1000,
    description: 'Invests in government securities across maturities'
  },
  {
    id: 'MF012',
    name: 'Kotak Equity Opportunities Fund',
    category: 'Multi-Cap',
    nav: 78.90,
    returns: 14.8,
    risk: 'High',
    minInvestment: 1000,
    description: 'Diversified equity fund across market capitalizations'
  },
  {
    id: 'MF013',
    name: 'Franklin India Low Duration Fund',
    category: 'Low Duration Debt',
    nav: 2567.43,
    returns: 7.4,
    risk: 'Low',
    minInvestment: 1000,
    description: 'Short-term debt fund with low interest rate risk'
  },
  {
    id: 'MF014',
    name: 'DSP Healthcare Fund',
    category: 'Sectoral - Healthcare',
    nav: 56.34,
    returns: 12.6,
    risk: 'High',
    minInvestment: 1000,
    description: 'Thematic fund focusing on healthcare and pharmaceutical sector'
  },
  {
    id: 'MF015',
    name: 'UTI Nifty 50 Index Fund',
    category: 'Index Fund',
    nav: 245.67,
    returns: 12.1,
    risk: 'Medium',
    minInvestment: 100,
    description: 'Passive fund tracking the Nifty 50 index'
  }
];

const portfolios = [];

const transactions = [];

module.exports = {
  users,
  mutualFunds,
  portfolios,
  transactions
};