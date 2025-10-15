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


