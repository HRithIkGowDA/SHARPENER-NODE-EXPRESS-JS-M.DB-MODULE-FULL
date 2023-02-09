const express = require('express');
const router = express.Router();
const path = require('path');
const expenseController = require('../controllers/expenseController');
const login_authenticate = require('../Middleware/authorization')

router.post('/expense/add-expense',login_authenticate.authenticate,expenseController.addExpense);
router.get('/expense/add-expense',login_authenticate.authenticate,expenseController.getExpense);
router.delete('/expense/delete-expense/:id',login_authenticate.authenticate,expenseController.deleteExpense);
router.post('/expense/edit-expense/:id',login_authenticate.authenticate,expenseController.editExpense);




module.exports=router;