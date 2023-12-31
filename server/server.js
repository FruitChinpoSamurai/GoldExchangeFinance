const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

app.use(cors());
app.use(express.json());

// HELPERS //

// Check whether input is empty or undefined.
const checkMissOrEmpty = (value) => {
    if (value === undefined || value === "" || value === " ") { return true; }
    else { return false; }
}

// ------- //

// AUTOMATICS //

// Mainly for holidays. If balance is not manually updated by the user before the end of the day, the current day's balances will be pushed forward to the next day.
const updateBalancesOnHoliday = async () => {
    try {
        const currentDate = new Date().toLocaleString().split(', ')[0];
        const currentTime = new Date()
        if (currentTime.getHours === 23 && currentTime.getMinutes() > 30) {
            const latestBalances = await pool.query("SELECT * FROM business_balances ORDER BY balance_id DESC LIMIT 1;");
            if (currentDate !== latestBalances.rows[0].date_updated) {
                const updateForNextDay = await pool.query("INSERT INTO business_balances (date_updated, cash_balance, gold_balance, sample_balance, un_cash_balance, un_gold_balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 0;", [currentDate, latestBalances.rows[0].cash_balance, latestBalances.rows[0].gold_balance, latestBalances.rows[0].sample_balance, latestBalances.rows[0].un_cash_balance, latestBalances.rows[0].un_gold_balance]);
                if (updateForNextDay.rows[0].length === 0) {
                    console.log("Auto Balance Update Failed");
                } else {
                    console.log("Auto Balance Update Passed");
                }
            } else {
                console.log("No Need to Update Balances");
            }
        }
    } catch (error) {
        console.log(error.message);
        if (error.code === '23505') {
            response.json("Balance Already Updated")
        }
    }
}

setInterval(updateBalancesOnHoliday, 1000 * 60 * 60 * 0.5);

// ------- //

// ROUTES //

// Create a user.
app.post("/users", async (request, response) => {
    try {
        const { user_name, user_password } = request.body;
        // Throwing NOT NULLs so that ID increment is unaffected.
        if (checkMissOrEmpty(user_name) || checkMissOrEmpty(user_password)) {
            throw new Error("required data: either name or password missing");
        }
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_password) VALUES($1, $2) RETURNING *",
            [user_name, user_password]
        );
        response.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Get a user; used to login.
app.post("/users/login", async (request, response) => {
    try {
        const { user_name, user_password } = request.body;
        // Throwing NOT NULLs so that ID increment is unaffected.
        if (checkMissOrEmpty(user_name) || checkMissOrEmpty(user_password)) {
            throw new Error("required data: either name or password missing");
        }
        const loginUser = await pool.query(
            "SELECT * FROM users WHERE user_name = $1 AND user_password = $2",
            [user_name, user_password]
        );
        if (loginUser.rows.length === 0) {
            response.json(false);
        } else {
            response.json(true);
        }
    } catch (error) {
        console.error(error.message);
    }  
});

// Delete a user.
app.delete("/users/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING user_id", [id]);
        if (deleteUser.rows.length === 0) {
            console.error("incorrect data: id does not exist");
        } else {
            response.json(`User with ID ${id} has been deleted.`);
        }
    } catch (error) {
        console.log(error.message);
    }
});

// Update a user.
app.put("/users/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const findUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (findUser.rows.length === 0) {
            throw new Error("user with that id does not exist");
        }
        const { user_password } = request.body;
        if (checkMissOrEmpty(user_password)) {
            throw new Error("required data: password is missing");
        }
        const updateUser = await pool.query("UPDATE users SET user_password = $1 WHERE user_id = $2", [user_password, findUser.rows[0].user_id]);
        response.json("Updated password successfully.");
    } catch (error) {
        console.log(error.message);
    }
});

// Create a customer.
app.post("/customers", async (request, response) => {
    try {
        const { cust_name, cust_primary_number, cust_alternate_number, cust_nic, cust_email, cust_ptclf_number, cust_ptcls_number, cust_shop_address, cust_reference, cust_test_fees, cust_pg_charges } = request.body;
        // Throwing NOT NULLs so that ID increment is unaffected.
        if (checkMissOrEmpty(cust_name) || checkMissOrEmpty(cust_primary_number) || checkMissOrEmpty(cust_test_fees) || checkMissOrEmpty(cust_pg_charges)) {
            throw new Error("required data: either name, number, test fees, or charges missing");
        }
        // Create and save the new Customer.
        const newCustomer = await pool.query(
            "INSERT INTO customers (cust_name, cust_primary_number, cust_alternate_number, cust_nic, cust_email, cust_ptclf_number, cust_ptcls_number, cust_shop_address, cust_reference, cust_test_fees, cust_pg_charges) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [cust_name, cust_primary_number, cust_alternate_number, cust_nic, cust_email, cust_ptclf_number, cust_ptcls_number, cust_shop_address, cust_reference, cust_test_fees, cust_pg_charges]
        );
        // Create new financial Account for the Customer.
        const newAccount = await pool.query(
            "INSERT INTO accounts (cust_id, curr_gold_balance, curr_cash_balance) VALUES($1, $2, $3) RETURNING *",
            [newCustomer.rows[0].cust_id, 0, 0]
        );
        
        // Customer details plus their new accounts.
        // const finalJSON = { ...newCustomer.rows[0], ...newAccount.rows[0] };
        
        response.json({ status: true, message: "Customer record added successfully." });
    } catch (error) {
        console.log(error.message);
        if (error.code === '23505') {
            response.json({ status: false, message: (error.detail).split('=')[1] });
        }
    }
});

// Update a customer.
app.put("/customers/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { cust_name, cust_primary_number, cust_alternate_number, cust_nic, cust_email, cust_ptclf_number, cust_ptcls_number, cust_shop_address, cust_reference, cust_test_fees, cust_pg_charges } = request.body;
        // Throwing NOT NULLs so that ID increment is unaffected.
        if (checkMissOrEmpty(cust_name) || checkMissOrEmpty(cust_primary_number) || checkMissOrEmpty(cust_test_fees) || checkMissOrEmpty(cust_pg_charges)) {
            throw new Error("required data: either name, numbers, test fees, or charges missing");
        }
        const updateCustomer = await pool.query(
            "UPDATE customers SET cust_name = $1, cust_primary_number = $2, cust_alternate_number = $3, cust_nic = $4, cust_email = $5, cust_ptclf_number = $6, cust_ptcls_number = $7, cust_shop_address = $8, cust_reference = $9, cust_test_fees = $10, cust_pg_charges = $11 WHERE cust_id = $12 RETURNING cust_id",
            [cust_name, cust_primary_number, cust_alternate_number, cust_nic, cust_email, cust_ptclf_number, cust_ptcls_number, cust_shop_address, cust_reference, cust_test_fees, cust_pg_charges, id]
        );
        if (updateCustomer.rows.length === 0) {
            throw new Error("incorrect data: id does not exist")
        } else {
            response.json({ status: true, message: "Customer record updated successfully." });
        }
    } catch (error) {
        console.log(error.message);
        if (error.code === '23505') {
            response.json({ status: false, message: (error.detail).split('=')[1] });
        }
    }
});

// Get all customers for Customers view in getAllCustomers().
app.get("/customers", async (request, response) => {
    try {
        const allCustomers = await pool.query(
            "SELECT TO_CHAR(cust_id, '00000') AS cust_id, cust_name, cust_primary_number, COALESCE(cust_alternate_number, '') AS cust_alternate_number, COALESCE(cust_nic, '') AS cust_nic, COALESCE(cust_email, '') AS cust_email, COALESCE(cust_ptclf_number, '') AS cust_ptclf_number, COALESCE(cust_ptcls_number, '') AS cust_ptcls_number, COALESCE(cust_shop_address, '') AS cust_shop_address, COALESCE(cust_reference, '') AS cust_reference, cust_test_fees, cust_pg_charges FROM customers ORDER BY cust_id"
        );
        response.json(allCustomers.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get specific customer's accounts by ID.; for the Customers view in getCustomerAccounts().
app.get("/customers/:id/accounts", async (request, response) => {
    try {
        const { id } = request.params;
        const customer = await pool.query("SELECT TO_CHAR(acco_id, '000000') AS acco_id FROM accounts WHERE cust_id = $1", [id]);
        response.json(customer.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create a financial account, for use with createAccount().
app.post("/accounts", async (request, response) => {
    try {
        const { cust_id } = request.body;
        // Throwing NOT NULLs so that ID increment is unaffected.
        if (checkMissOrEmpty(cust_id)) {
            throw new Error("incomplete data: customer id missing");
        }
        // Create new financial Account for the Customer.
        const newAccount = await pool.query(
            "INSERT INTO accounts (cust_id, curr_gold_balance, curr_cash_balance) VALUES($1, $2, $3) RETURNING *",
            [cust_id, 0, 0]
        );
        response.json({ status: true, message: "Account created." });
    } catch (error) {
        console.error(error.message);
    }
});

// Get all financial accounts; for the Accounts view with getAllAccounts().
app.get("/accounts", async (request, response) => {
    try {
        const allAccounts = await pool.query("SELECT TO_CHAR(acco_id, '000000') AS acco_id, TO_CHAR(accounts.cust_id, '00000') AS cust_id, cust_name, cust_primary_number, curr_gold_balance, curr_cash_balance FROM customers INNER JOIN accounts ON accounts.cust_id = customers.cust_id");
        response.json(allAccounts.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get specific financial account details by ID, for use with getAccount().
app.get("/accounts/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const account = await pool.query("SELECT TO_CHAR(accounts.cust_id, '00000') AS cust_id, cust_name, cust_test_fees, cust_pg_charges, curr_cash_balance, curr_gold_balance, cust_primary_number FROM accounts INNER JOIN customers ON accounts.cust_id = customers.cust_id WHERE accounts.acco_id = $1;", [id]);
        if (account.rows.length === 0) {
            response.json({ status: false, message: "ID does not exist." });
            throw new Error("incorrect data: id does not exist")
        } else {
            response.json({ status: true, message: account.rows[0] });
        }
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/transactions", async (request, response) => {
    try {
        let { acco_id, date_created, date_finalized, dates_modified, acco_tran_id, test_id, use_transaction_id, first_weight, second_weight, third_weight, total_sample_weight, points, pure_weight, taken_cash, taken_gold, fees, charges, rate, discount, amount, remarks, test_type, premium, standard_weight, egr_weight, item_type, sample_returned, received, receivable, paid, payable, transaction_type, transferred, pending_taken_cash, pending_taken_gold, gold_in_cash, gross_amount, net_amount, carried_fees, include_test_fees, pure_minus_gold_in_cash, taken_cash_in_gold, final_gold } = request.body;
        // If what customer has paid is equal to the payable fees, we set 'true' for the Testing Transaction.
        if (transaction_type === 'Testing') {
            let feesPaid = paid.split(' ')[1];
            if (feesPaid === payable || feesPaid === payable.split(' ')[1] - taken_cash) {
                transferred = true;
            }
            if (test_type === 'Other' && payable === paid) {
                transferred = true;
            }
        } else if (transaction_type === 'Bar Exchange In' || transaction_type === 'Bar Exchange Out' || transaction_type === 'Advance' || transaction_type === 'Loan') {
            charges = null;
            fees = null;
        }
        const transaction = await pool.query(
            "INSERT INTO transactions (acco_id, date_created, date_finalized, dates_modified, acco_tran_id, test_id, use_transaction_id, first_weight, second_weight, third_weight, total_sample_weight, points, pure_weight, taken_cash, taken_gold, fees, charges, rate, discount, amount, remarks, test_type, premium, standard_weight, egr_weight, item_type, sample_returned, received, receivable, paid, payable, transaction_type, transferred, pending_taken_cash, pending_taken_gold, gold_in_cash, gross_amount, net_amount, carried_fees, include_test_fees, pure_minus_gold_in_cash, taken_cash_in_gold, final_gold) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43) RETURNING *",
            [acco_id, date_created, date_finalized, dates_modified, acco_tran_id, test_id, use_transaction_id, first_weight, second_weight, third_weight, total_sample_weight, points, pure_weight, taken_cash, taken_gold, fees, charges, rate, discount, amount, remarks, test_type, premium, standard_weight, egr_weight, item_type, sample_returned, received, receivable, paid, payable, transaction_type, transferred, pending_taken_cash, pending_taken_gold, gold_in_cash, gross_amount, net_amount, carried_fees, include_test_fees, pure_minus_gold_in_cash, taken_cash_in_gold, final_gold]
        );
        response.json('true');
        // Set non-relevant fields 'null' and update every transaction that is tied to each 'Taken' and 'Given' transaction.
        if (transaction_type === 'Taken' || transaction_type === 'Given') {
            amount = null;
            charges = null;
            fees = null;
            transferred = true;
            let listIDs = use_transaction_id.split(' ');
            for(let i = 0; i < listIDs.length; i++) {
                let updateTransactions = await pool.query(
                    "UPDATE transactions SET transferred = 'true' WHERE acco_tran_id = $1 AND acco_id = $2;",
                    [listIDs[i], acco_id]
                );
            }
        } else if (transaction_type === 'Impure' || transaction_type === 'Exchange' || transaction_type === 'Both') {
            if (transaction_type === 'Impure') {
                amount = gold_in_cash + 'R';
                taken_cash = pending_taken_cash;
            } else if (transaction_type === 'Both') {
                taken_cash = pending_taken_cash;
                taken_gold = pending_taken_gold;
                if (taken_cash_in_gold !== '' && pure_minus_gold_in_cash !== '') {
                    amount = `${taken_cash_in_gold}G ${pure_minus_gold_in_cash}R`;
                } else if (taken_cash_in_gold !== '') {
                    amount = `${taken_cash_in_gold}G`;
                } else if (pure_minus_gold_in_cash !== '') {
                    amount = `${pure_minus_gold_in_cash}R`;
                }
            }
            sample_returned = null;
            if (include_test_fees) {
                let updateTestTransaction = await pool.query("UPDATE transactions SET transferred = $1, date_finalized = $2, sample_returned = $3 WHERE acco_tran_id = $4 AND acco_id = $5;", [transferred, date_finalized, sample_returned, test_id, acco_id]);
            } else {
                let updateTestTransaction = await pool.query("UPDATE transactions SET date_finalized = $1, sample_returned = $2 WHERE acco_tran_id = $3 AND acco_id = $4;", [date_finalized, sample_returned, test_id, acco_id]);
            }
        } else if (transaction_type === 'Testing') {
            charges = fees;
            if (test_type === 'Other') {
                acco_tran_id = acco_tran_id + '*';
            }
        } else if (transaction_type === 'Pure Gold Buy' || transaction_type === 'Pure Gold Sell') {
            charges = premium;
            amount = `${gross_amount}R`;
        } else if (transaction_type === 'Bar Exchange In' || transaction_type === 'Bar Exchange Out') {
            charges = premium;
            pure_weight = transaction_type === 'Bar Exchange In' ? standard_weight : egr_weight;
        }
        const customerStatment = await pool.query (
            "INSERT INTO customer_statements (tran_id, acco_id, date_created, acco_tran_id, total_sample_weight, pure_weight, taken_cash, taken_gold, charges, rate, amount, received, receivable, paid, payable) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);",
            [transaction.rows[0].tran_id, acco_id, date_created, acco_tran_id, total_sample_weight, pure_weight, taken_cash, taken_gold, charges, rate, amount, received, receivable, paid, payable]
        );
        const businessStatment = await pool.query (
            "INSERT INTO business_statement (tran_id, acco_id, date_created, acco_tran_id, total_sample_weight, pure_weight, given_cash, given_gold, charges, rate, amount, paid, payable, received, receivable) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);",
            [transaction.rows[0].tran_id, acco_id, date_created, acco_tran_id, total_sample_weight, pure_weight, taken_cash, taken_gold, charges, rate, amount, received, receivable, paid, payable]
        );
    } catch (error) {
        console.error(error.message);
        // response.json('false');
    }
});

// getAccoTranID();
app.get("/transactions/:type/:id", async (request, response) => {
    try {
        const { type, id } = request.params;
        if (id === '0') {
            response.json(0);
            throw new Error("getAccoTranID: id does not exist")
        } else {
            const latestAccoTranID = await pool.query("SELECT COUNT(*) FROM transactions where acco_id = $1 AND transaction_type = $2;", [id, type]);
            response.json(Number(latestAccoTranID.rows[0].count) + Number(1));
        }
    } catch (error) {
        console.error(error.message);
    }
});

// getAllAccoTranIDs();
app.get("/transactions/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const AccoTranIDs = await pool.query("SELECT acco_tran_id, received, receivable, paid, payable FROM transactions WHERE acco_id = $1 AND transferred = 'false';", [id]);
        response.json(AccoTranIDs.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// getTranID();
app.get("/transactions", async (request, response) => {
    try {
        const latestTranID = await pool.query("SELECT TO_CHAR(Count(*) + 1, '000000000') AS tran_id FROM transactions;");
        response.json(latestTranID.rows[0].tran_id);
    } catch (error) {
        console.error(error.message);
    }
});

// getTestingTransaction();
app.get("/transactions/:id/testing/:test", async (request, response) => {
    try {
        const { id, test } = request.params;
        if (test.slice(0, 2) !== 'TE') {
            response.json({ status: false, data: 'Not a Testing transaction.' });    
        } else {
            const testingData = await pool.query("SELECT fees, total_sample_weight, points, pure_weight, charges, taken_cash, taken_gold, date_finalized, transferred FROM transactions WHERE acco_id = $1 AND acco_tran_id = $2;", [id, test]);
            if (testingData.rows.length === 0) {
                response.json({ status: false, data: 'Transaction does not exist.' });    
            } else {
                if (testingData.rows[0].date_finalized !== null) {
                    response.json({ status: false, data: 'Already finalized.'})
                } else {
                    response.json({ status: true, data: testingData.rows[0] });
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});

// getTakenGivenRelateds();
app.get("/transactions/:id/relateds/:transaction", async (request, response) => {
    try {
        const { id, transaction } = request.params;
        const relatedTransactions = await pool.query("SELECT use_transaction_id FROM transactions WHERE acco_id = $1 AND acco_tran_id = $2;", [id, /-/.test(transaction) ? transaction.split('-')[1] : transaction]);
        response.json(relatedTransactions.rows[0].use_transaction_id);
    } catch (error) {
        console.error(error.message);
    }
});

// getAdvanceLoanTransaction();
app.get("/transactions/:id/all/:transaction", async (request, response) => {
    try {
        const { id, transaction } = request.params;
        const testingData = await pool.query("SELECT date_created, date_finalized FROM transactions WHERE acco_id = $1 AND acco_tran_id = $2;", [id, transaction]);
        if (testingData.rows.length === 0) {
            response.json({ status: false, data: 'Transaction does not exist.' });    
        } else {
            if (testingData.rows[0].date_finalized !== null) {
                response.json({ status: false, data: 'Already finalized.'})
            } else {
                response.json({ status: true, data: testingData.rows[0] });
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});

// Retrieve a transaction  using a customer's account ID and the account-transaction ID; getOneByIDs().
app.get("/transactions/:id/one/:transaction", async (request, response) => {
    try {
        const { id, transaction } = request.params;
        if (id !== 'undefined' && transaction !== 'undefined') {
            const records = await pool.query("SELECT * FROM transactions WHERE acco_id = $1 AND acco_tran_id = $2;", [id, transaction]);
            response.json(records.rows[0]);
        } else {
            response.json(null);
        }
    } catch (error) {
        console.log(error.message);
    }
});

// Retrieve all the transactions of a customer's account using their account ID; getAllByID().
app.get("/customer_statement/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const records = await pool.query("SELECT tran_id, acco_id, date_created, acco_tran_id, total_sample_weight, pure_weight, taken_cash, taken_gold, charges, rate, amount, COALESCE(received, '') AS received, COALESCE(receivable, '') AS receivable, COALESCE(paid, '') AS paid, COALESCE(payable, '') AS payable  FROM customer_statements WHERE acco_id = $1 ORDER BY tran_id ASC;", [id]);
        response.json(records.rows);
    } catch (error) {
        console.log(error.message);
    }
});


// Update that customer's balances into their account.
app.post("/customer_statement/balance/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { cash, gold, sample } = request.body;
        const balanceUpdate = await pool.query("UPDATE accounts SET curr_cash_balance = $1, curr_gold_balance = $2, curr_sample_balance = $3 WHERE acco_id = $4;", [cash, gold, sample, id]);
        response.json(true);
    } catch (error) {
        console.log(error.message);
    }
});

// Retrieve all the transactions from the business side for the statement; getAll().
app.get("/business_statement/:title/:date", async (request, response) => {
    try {
        const { title, date } = request.params;
        if (date === null || date === '') {
            response.json([]);
        } else {
            if (title === 'Daily') {
                const dailyDate = date.replaceAll('-', '/');
                const records = await pool.query("SELECT * FROM business_statement WHERE date_created LIKE $1 ORDER BY tran_id;", [dailyDate + '%']);
                response.json(records.rows);
            } else if (title === 'Monthly') {
                const monthlyDate = date.split('-');
                const records = await pool.query("SELECT * FROM business_statement WHERE date_created LIKE $1 OR date_created LIKE $2 ORDER BY tran_id;", [monthlyDate[0] + '/_/' + monthlyDate[2] + '%', monthlyDate[0] + '/__/' + monthlyDate[2] + '%']);
                response.json(records.rows);
            } else if (title === 'Yearly') {
                const yearlyDate = date.split('-');
                const records = await pool.query("SELECT * FROM business_statement WHERE date_created LIKE $1 ORDER BY tran_id;", ['%' + yearlyDate[2] + '%']);
                response.json(records.rows);
            }
        }
    } catch (error) {
        console.log(error.message);
    }
});

// Retrieve latest balances on the business side; getLatestBalances().
app.get("/business_statement/balance/info/:date", async (request, response) => {
    try {
        const { date } = request.params;
        if (date === null || date === '') {
            response.json([]);
        } else {
            const cleanedDate = date.replaceAll('-', '/');
            const records = await pool.query("SELECT * FROM business_balances WHERE date_updated = $1;", [cleanedDate]);
            response.json(records.rows[0]);
        }
    } catch (error) {
        console.log(error.message);
    }
});

// Update the balances on the business side; updateBalances().
app.post("/business_statement/balance/", async (request, response) => {
    try {
        const { date_updated, cash_balance, gold_balance, sample_balance, un_cash_balance, un_gold_balance } = request.body;
        const balanceUpdate = await pool.query("INSERT INTO business_balances (date_updated, cash_balance, gold_balance, sample_balance, un_cash_balance, un_gold_balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 0;", [date_updated, cash_balance, gold_balance, sample_balance, un_cash_balance, un_gold_balance]);
        if (balanceUpdate.rows[0].length === 0) {
            response.json("Failed");
        } else {
            response.json("Updated");
        }
    } catch (error) {
        console.log(error.message);
        if (error.code === '23505') {
            response.json("Balances Already Updated")
        }
    }
});

// ------ //

app.listen(5000, () => {
    console.log("Server has started on port 5000.");
});