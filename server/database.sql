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
    points NUMERIC(4,1),
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
    inventory_details JSONB,
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
    current_balance VARCHAR(50),
    previous_balance VARCHAR(50),
    global_id VARCHAR(20),
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

INSERT INTO business_balances (date_updated, cash_balance, gold_balance, sample_balance, un_cash_balance, un_gold_balance) VALUES('5/7/2024', 4500000, 1800.00, 0, 0, 0.00);

CREATE TABLE inventory(
    item_id INTEGER GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(25) NOT NULL,
    subcategory VARCHAR(20),
    quantity INTEGER DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO inventory (category, subcategory) VALUES('Millat', '1.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '2.50 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '5.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', 'Half Tola');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '10.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '1 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Millat', 'Half Ounce');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '20.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '2 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '1 Ounce');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '50.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '5 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '100.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Millat', '10 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '1.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '2.50 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '5.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', 'Half Tola');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '10.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '1 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', 'Half Ounce');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '20.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '2 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '1 Ounce');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '50.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '5 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '100.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Small Pieces', '10 Tola');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '1.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '2.50 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '5.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', 'Half Tola');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '10.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '1 Tola');
INSERT INTO inventory (category, subcategory) VALUES('KBE', 'Half Ounce');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '20.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '2 Tola');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '1 Ounce');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '50.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '5 Tola');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '100.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('KBE', '10 Tola');
INSERT INTO inventory (category, subcategory) VALUES('Coins', '1.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Coins', '2.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Coins', '4.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('Coins', '8.00 Gram');
INSERT INTO inventory (category, subcategory) VALUES('10 Tola Standard Bar', 'NA');
INSERT INTO inventory (category, subcategory) VALUES('Articles', 'NA');

CREATE TABLE suggested_transactions(
    suggested_transaction_id INTEGER,
    transaction_date VARCHAR(10),
    customer_name VARCHAR(60),
    contact VARCHAR(13),
    sample_weight NUMERIC(6, 2),
    expected_points NUMERIC(4,1),
    expected_pure NUMERIC(6, 2),
    discussed_rate INTEGER,
    remarks VARCHAR(500),
    PRIMARY KEY (suggested_transaction_id)
);

CREATE TABLE metals(
    metal_type VARCHAR(15) NOT NULL UNIQUE,
    metal_weight NUMERIC(10, 2) DEFAULT 0.00,
    PRIMARY KEY (metal_type) 
);

INSERT INTO metals (metal_type) VALUES('Gold');
INSERT INTO metals (metal_type) VALUES('Platinum');
INSERT INTO metals (metal_type) VALUES('Paladium');
INSERT INTO metals (metal_type) VALUES('Silver');
INSERT INTO metals (metal_type) VALUES('Copper');
INSERT INTO metals (metal_type) VALUES('Tin');
INSERT INTO metals (metal_type) VALUES('Zinc');
INSERT INTO metals (metal_type) VALUES('Rhodium');
INSERT INTO metals (metal_type) VALUES('Lead');
INSERT INTO metals (metal_type) VALUES('Rhutenium');
INSERT INTO metals (metal_type) VALUES('Zirconium');
INSERT INTO metals (metal_type) VALUES('Iridium');
INSERT INTO metals (metal_type) VALUES('Tungsten');
INSERT INTO metals (metal_type) VALUES('Osmium');
INSERT INTO metals (metal_type) VALUES('Cadmium');
INSERT INTO metals (metal_type) VALUES('Arsenic');
INSERT INTO metals (metal_type) VALUES('Bismuth');
INSERT INTO metals (metal_type) VALUES('Antimony');
INSERT INTO metals (metal_type) VALUES('Molybdenum');
INSERT INTO metals (metal_type) VALUES('Nickel');
INSERT INTO metals (metal_type) VALUES('Titanium');

CREATE TABLE donations(
    donation_id INTEGER GENERATED ALWAYS AS IDENTITY,
    donation_date VARCHAR(10) NOT NULL,
    donation_type VARCHAR(20) NOT NULL,
    cash_amount INTEGER NOT NULL,
    PRIMARY KEY (donation_id)
);

CREATE TABLE general_expenses(
    g_expense_id INTEGER GENERATED ALWAYS AS IDENTITY,
    g_expense_date VARCHAR(10) NOT NULL,
    g_expense_purpose VARCHAR(20) NOT NULL,
    cash_amount INTEGER NOT NULL,
    desccription VARCHAR(500) NOT NULL,
    PRIMARY KEY (g_expense_id)
);

CREATE TABLE salaries(
    salary_id INTEGER GENERATED ALWAYS AS IDENTITY,
    salary_date VARCHAR(10) NOT NULL,
    employee_name VARCHAR(50) NOT NULL,
    cash_amount INTEGER NOT NULL,
    PRIMARY KEY (salary_id)
);

CREATE TABLE capital_gain_loss(
    capital_gl_id INTEGER GENERATED ALWAYS AS IDENTITY,
    capital_gl_date VARCHAR(10) NOT NULL,
    capital_gl_purpose VARCHAR(20) NOT NULL,
    cash_amount INTEGER NOT NULL,
    desccription VARCHAR(500) NOT NULL,
    PRIMARY KEY (capital_gl_id)
);

CREATE TABLE inventory_gold_gain_loss(
    invengold_gl_id INTEGER GENERATED ALWAYS AS IDENTITY,
    invengold_gl_date VARCHAR(10) NOT NULL,
    invengold_gl_type VARCHAR(20) NOT NULL,
    invengold_gl_subtype VARCHAR(20) NOT NULL,
    invengold_gl_weight NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    PRIMARY KEY (invengold_gl_id)
);

CREATE TABLE standard_weights_to_prices(
    weight_class VARCHAR(25) NOT NULL,
    gold_weight NUMERIC(10, 3) DEFAULT 0.000 NOT NULL,
    price INTEGER NOT NULL,
    PRIMARY KEY (weight_class)
);

INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('1.00 Gram', 1.000, 700);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('2.50 Gram', 2.500, 700);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('5.00 Gram', 5.000, 700);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('Half Tola', 5.830, 700);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('10.00 Gram', 10.000, 850);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('1 Tola', 11.664, 850);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('Half Ounce', 15.550, 850);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('20.00 Gram', 20.000, 1150);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('2 Tola', 23.328, 1150);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('1 Ounce', 31.100, 1150);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('50.00 Gram', 50.000, 1300);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('5 Tola', 58.320, 1300);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('100.00 Gram', 100.000, 2000);
INSERT INTO standard_weights_to_prices (weight_class, gold_weight, price) VALUES('10 Tola', 116.64, 3500);

CREATE TABLE workshop(
    workshop_id INTEGER GENERATED ALWAYS AS IDENTITY,
    date_created VARCHAR(25) NOT NULL UNIQUE,
    finalized_impure NUMERIC(10, 2) DEFAULT 0.00,
    finalized_pure NUMERIC(10, 2) DEFAULT 0.00,
    to_workshop_impure NUMERIC(10, 2) DEFAULT 0.00,
    to_workshop_pure NUMERIC(10, 2) DEFAULT 0.00,
    remaining_impure NUMERIC(10, 2) DEFAULT 0.00,
    remaining_pure NUMERIC(10, 2) DEFAULT 0.00,
    actual_impure NUMERIC(10, 2),
    missing_impure NUMERIC(10, 2),
    impure_at_workshop NUMERIC(10, 2),
    workshop_missing_impure NUMERIC(10, 2),
    pure_at_workshop NUMERIC(10, 2),
    workshop_mix_impure NUMERIC(10, 2),
    points NUMERIC(4,1),
    workshop_mix_pure NUMERIC(10, 2),
    final_pure NUMERIC(10, 2),
    PRIMARY KEY (workshop_id)
);

CREATE TABLE global_rates(
    sell_rate INTEGER,
    buy_rate INTEGER,
    PRIMARY KEY (sell_rate, buy_rate)
);

INSERT INTO global_rates (sell_rate, buy_rate) VALUES(225000, 225000);