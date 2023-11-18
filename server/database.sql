-- Create the database.
CREATE DATABASE goldbuysell;

SET timezone = 'Asia/Karachi';

-- Users to login to the system.
CREATE TABLE users(
    user_id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(25) UNIQUE NOT NULL,
    user_password VARCHAR(25) NOT NULL,
    PRIMARY KEY (user_id)
);

-- Customers whose details are stored in the system.
CREATE TABLE customers(
    cust_id INTEGER GENERATED ALWAYS AS IDENTITY,
    cust_name VARCHAR(50) NOT NULL,
    cust_primary_number VARCHAR(15) NOT NULL UNIQUE,
    cust_alternate_number VARCHAR(15) UNIQUE,
    cust_nic VARCHAR(13) UNIQUE,
    cust_email VARCHAR(50) UNIQUE,
    cust_ptclf_number VARCHAR(15) UNIQUE,
    cust_ptcls_number VARCHAR(15) UNIQUE,
    cust_shop_address VARCHAR(500) UNIQUE,
    cust_reference VARCHAR(255),
    cust_test_fees INTEGER DEFAULT 250,
    cust_pg_charges INTEGER DEFAULT 15,
    cust_thumb_scan BYTEA,
    cust_nfc_scan BYTEA,
    PRIMARY KEY (cust_id)
);

-- The financial accounts of customers.
CREATE TABLE accounts(
    acco_id INTEGER GENERATED ALWAYS AS IDENTITY,
    cust_id INTEGER NOT NULL REFERENCES customers,
    curr_cash_balance INTEGER DEFAULT 0,
    curr_gold_balance NUMERIC(6, 2) DEFAULT 0.00,
    curr_sample_balance NUMERIC(6, 2) DEFAULT 0.00,
    PRIMARY KEY (acco_id)
);

CREATE TABLE transactions(
    tran_id INTEGER GENERATED ALWAYS AS IDENTITY,
    acco_id INTEGER REFERENCES accounts NOT NULL,
    date_created VARCHAR(25) NOT NULL,
    date_finalized VARCHAR(25),
    dates_modified VARCHAR(600),
    acco_tran_id VARCHAR(25) NOT NULL,
    test_id  VARCHAR(25),
    use_transaction_id VARCHAR(25),
    first_weight NUMERIC(6, 2),
    second_weight NUMERIC(6, 2),
    third_weight NUMERIC(6, 2),
    total_sample_weight NUMERIC(6, 2),
    points INTEGER,
    pure_weight NUMERIC(6, 2),
    taken_cash INTEGER,
    taken_gold NUMERIC(6, 2),
    fees INTEGER,
    charges VARCHAR(50),
    rate INTEGER,
    discount INTEGER,
    amount VARCHAR(50),
    remarks VARCHAR(255),
    test_type VARCHAR(8),
    premium INTEGER,
    standard_weight NUMERIC(6, 2),
    egr_weight NUMERIC(6, 2),
    item_type VARCHAR(20),
    sample_returned BOOLEAN,
    received VARCHAR(50),
    receivable VARCHAR(50),
    paid VARCHAR(50),
    payable VARCHAR(50),
    transaction_type VARCHAR(20) NOT NULL,
    transferred BOOLEAN,
    pending_taken_cash INTEGER,
    pending_taken_gold NUMERIC(6, 2),
    gold_in_cash INTEGER,
    gross_amount VARCHAR(50),
    net_amount VARCHAR(50),
    carried_fees INTEGER,
    include_test_fees BOOLEAN,
    pure_minus_gold_in_cash INTEGER,
    taken_cash_in_gold NUMERIC(6, 2), 
    final_gold VARCHAR(10),
    PRIMARY KEY (tran_id)
);

CREATE TABLE customer_statements(
    tran_id INTEGER REFERENCES transactions NOT NULL,
    acco_id INTEGER REFERENCES accounts NOT NULL,
    date_created VARCHAR(25) NOT NULL,
    acco_tran_id VARCHAR(25) NOT NULL,
    total_sample_weight NUMERIC(6, 2),
    pure_weight NUMERIC(6, 2),
    taken_cash INTEGER,
    taken_gold NUMERIC(6, 2),
    charges VARCHAR(50),
    rate INTEGER,
    amount VARCHAR(50),
    received VARCHAR(50),
    receivable VARCHAR(50),
    paid VARCHAR(50),
    payable VARCHAR(50),
    PRIMARY KEY (tran_id)
);

CREATE TABLE business_statement(
    tran_id INTEGER REFERENCES transactions NOT NULL,
    acco_id INTEGER REFERENCES accounts NOT NULL,
    date_created VARCHAR(25) NOT NULL,
    acco_tran_id VARCHAR(25) NOT NULL,
    total_sample_weight NUMERIC(6, 2),
    pure_weight NUMERIC(6, 2),
    given_cash INTEGER,
    given_gold NUMERIC(6, 2),
    charges VARCHAR(50),
    rate INTEGER,
    amount VARCHAR(50),
    paid VARCHAR(50),
    payable VARCHAR(50),
    received VARCHAR(50),
    receivable VARCHAR(50),
    PRIMARY KEY (tran_id)
);

CREATE TABLE business_balances(
    balance_id INTEGER GENERATED ALWAYS AS IDENTITY,
    date_updated VARCHAR(25) NOT NULL UNIQUE,
    cash_balance INTEGER NOT NULL,
    gold_balance NUMERIC(6, 2) NOT NULL,
    sample_balance NUMERIC(6, 2) NOT NULL,
    un_cash_balance INTEGER NOT NULL,
    un_gold_balance NUMERIC(6, 2) NOT NULL,
    PRIMARY KEY (balance_id)
);

INSERT INTO business_balances (date_updated, cash_balance, gold_balance, sample_balance, un_cash_balance, un_gold_balance) VALUES('10/4/2023', 1500000, 900.00, 0.00, 0, 0.00);

CREATE TABLE business_inventory(
    item_id INTEGER GENERATED ALWAYS AS IDENTITY,
    item_name VARCHAR(30),
    total_weight NUMERIC(6, 2),
    PRIMARY KEY (item_id)
);

INSERT INTO business_inventory (item_name, total_weight) VALUES('Pure Gold', 0);
INSERT INTO business_inventory (item_name, total_weight) VALUES('10 Tola Bar', 0);
INSERT INTO business_inventory (item_name, total_weight) VALUES('Millat', 0);
INSERT INTO business_inventory (item_name, total_weight) VALUES('Small Pieces', 0);
INSERT INTO business_inventory (item_name, total_weight) VALUES('Coins', 0);
INSERT INTO business_inventory (item_name, total_weight) VALUES('Article', 0);
INSERT INTO business_inventory (item_name, total_weight) VALUES('Metals', 0);