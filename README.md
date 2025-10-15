# Mutual Fund Portfolio Management API 💼📈

A complete RESTful API for mutual fund portfolio management with user authentication, transaction processing, and real-time portfolio tracking.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue)
![License](https://img.shields.io/badge/License-MIT-blue)
![Postman](https://img.shields.io/badge/Postman-Tested-orange)

## 🌟 Features

- **🔐 Secure Authentication** - JWT-based user registration and login
- **📊 Portfolio Management** - Track investments and performance
- **💸 Buy/Sell Transactions** - Complete transaction processing
- **📈 Real-time NAV Tracking** - Live Net Asset Value updates
- **📋 Transaction History** - Complete audit trail
- **🛡️ Input Validation** - Comprehensive error handling
- **🔒 Security** - Password hashing and CORS protection
- **🚀 RESTful Design** - Clean API endpoints

## 🛠 Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Authentication**: JWT + bcryptjs
- **Security**: CORS, input validation
- **Data Management**: In-memory storage (easily replaceable with database)
- **Testing**: Postman
- **Development**: Nodemon for hot reloading

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Postman (for testing)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mutual-fund-api.git
cd mutual-fund-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a .env file in the root directory: 

### 4. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 5. Verify Installation

Open your browser or Postman and visit:

```bash
GET http://localhost:3000/api/health
```

### 🚀 API Documentation

### Authentication Endpoints

Register New User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
### Portfolio Endpoints

### Get User Portfolio

```bash
GET /api/portfolio
Authorization: Bearer <your_jwt_token>
```

### Get Available Mutual Funds

```bash
GET /api/portfolio/funds
Authorization: Bearer <your_jwt_token>
```

### Transaction Endpoints

### Buy Mutual Funds

```bash
POST /api/transaction/buy
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "fundId": "MF001",
  "amount": 5000
}
```

### Sell Mutual Funds

```bash
POST /api/transaction/sell
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "fundId": "MF001",
  "unitsToSell": 10
}
```

### Get Transaction History

```bash
GET /api/transaction/history
Authorization: Bearer <your_jwt_token>
```

### 🧪 Testing with Postman

### Step-by-Step Testing Guide

Start with Health Check

Method: GET

URL: http://localhost:3000/api/health

User Registration

Method: POST

URL: http://localhost:3000/api/auth/register

Body: JSON with name, email, password

User Login (if already registered)

Method: POST

URL: http://localhost:3000/api/auth/login

Body: JSON with email and password

Save JWT Token from login response for authenticated requests

Explore Available Funds

Method: GET

URL: http://localhost:3000/api/portfolio/funds

Header: Authorization: Bearer <your_token>

Buy Mutual Funds

Method: POST

URL: http://localhost:3000/api/transaction/buy

Header: Authorization: Bearer <your_token>

Body: JSON with fundId and amount

Check Portfolio

Method: GET

URL: http://localhost:3000/api/portfolio

Header: Authorization: Bearer <your_token>

Sell Mutual Funds

Method: POST

URL: http://localhost:3000/api/transaction/sell

Header: Authorization: Bearer <your_token>

Body: JSON with fundId and unitsToSell

View Transaction History

Method: GET

URL: http://localhost:3000/api/transaction/history

Header: Authorization: Bearer <your_token>

### 🏦 Available Mutual Funds

The API includes real mutual fund data across various categories:


Fund ID	  Fund Name	                                 Category	                  Risk	      Min Investment
MF001	    HDFC Top 100 Fund	                         Large-Cap Equity	          High	      ₹1,000
MF002	    ICICI Prudential Bluechip Fund	           Large-Cap Equity	          High	      ₹1,000
MF003	    SBI Liquid Fund	                           Liquid Debt	              Low	        ₹500
MF004	    HDFC Hybrid Equity Fund	                   Aggressive Hybrid	        Medium	    ₹1,000
MF005	    Nippon India Small Cap Fund	               Small-Cap Equity	          Very High	  ₹1,000
MF006	    ICICI Prudential Corporate Bond Fund	     Corporate Bond	            Low-Medium  ₹1,000
MF007	    Parag Parikh Flexi Cap Fund	               Flexi-Cap	                High	      ₹1,000
MF008	    Axis Banking & PSU Debt Fund	             Banking & PSU Debt	        Low	        ₹1,000
MF009	    Mirae Asset Emerging Bluechip Fund	       Large & Mid-Cap	          High	      ₹1,000
MF010	    Aditya Birla Sun Life Digital India Fund	 Sectoral - Technology	    Very High   ₹1,000

### 🚨 Error Handling

The API provides comprehensive error handling for:

400 Bad Request - Invalid input data

401 Unauthorized - Missing or invalid authentication

403 Forbidden - Valid token but insufficient permissions

404 Not Found - Resource not found

409 Conflict - Resource already exists (duplicate email)

500 Internal Server Error - Server-side issues

### 🔒 Security Features

Password Hashing: bcryptjs for secure password storage

JWT Tokens: Stateless authentication with expiration

CORS Protection: Cross-Origin Resource Sharing enabled

Input Validation: Comprehensive request validation

Error Sanitization: No sensitive data leakage in errors

