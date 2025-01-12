-- Dummy data for Country table
INSERT INTO Country (country_name) VALUES
('United States'),
('United Kingdom'),
('Canada'),
('Australia');

-- Dummy data for Genre table
INSERT INTO Genre (title) VALUES
('Action'),
('Drama'),
('Comedy'),
('Sci-Fi');

-- Dummy data for Languages table
INSERT INTO Languages (language_name) VALUES
('English'),
('French'),
('German'),
('Spanish');

-- Dummy data for Account table
INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, country_id, log_in_attempt_count, invited, user_type)
VALUES
('user1@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
('user2@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'Jane', 'Smith', true, false, true, 2, 0, false, 'Junior'),
('user3@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'Bob', 'Johnson', false, false, true, 3, 0, false, 'Medior'),
('admin1@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'Admin', 'User', true, false, true, 1, 0, false, 'Senior');

-- Dummy data for Subscription table
INSERT INTO Subscription (title, description, subscription_price) VALUES
('Basic', 'Basic subscription', 7.99),
('Premium', 'Premium subscription', 12.99);

-- Dummy data for Account_subscription table
INSERT INTO Account_subscription (account_id, subscription_id, payment_method, price, billing_date)
VALUES
(1, 1, 'PayPal', 7.99, CURRENT_TIMESTAMP),
(2, 2, 'Visa', 12.99, CURRENT_TIMESTAMP),
(3, 1, 'MasterCard', 7.99, CURRENT_TIMESTAMP),
(4, 2, 'Apple Pay', 12.99, CURRENT_TIMESTAMP);

-- Dummy data for Profile table
INSERT INTO Profile (account_id, profile_name, age, language)
VALUES
(1, 'Profile 1', 25, 'en'),
(2, 'Profile 2', 30, 'fr'),
(3, 'Profile 3', 22, 'de'),
(4, 'Admin Profile', 35, 'en');

SELECT * FROM top_revenue_countries();
