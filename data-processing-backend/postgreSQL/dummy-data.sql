-- Dummy data

-- the purpose of this part is to feed the frontend to visualize the charts and information

-- Dummy data for Country table
INSERT INTO Country (country_name) VALUES
('United States of America'),
('United Kingdom'),
('Canada'),
('Australia'),
('Germany'),
('Argentina'),
('Italy'),
('Netherlands');

-- Dummy data for Account table
INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, country_id, log_in_attempt_count, invited, user_type)
VALUES
    -- admins
    ('junior@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'Jane', 'Smith', false, false, true, 2, 0, false, 'Junior'),
    ('medior@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'Bob', 'Johnson', false, false, true, 3, 0, false, 'Medior'),
    ('senior@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'Admin', 'User', false, false, true, 1, 0, false, 'Senior'),
    -- random users
    ('user1@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user2@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user3@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user4@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user5@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user6@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user7@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user8@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user9@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user10@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user11@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user12@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user13@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user14@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user15@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user16@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user17@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user18@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user19@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user20@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user21@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user22@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user23@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user24@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user25@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user26@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user27@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user28@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user29@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user30@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user31@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user32@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user33@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user34@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user35@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user36@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user37@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user38@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user39@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user40@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user41@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user42@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user43@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user44@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user45@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user46@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user47@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user48@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user49@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user50@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user51@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user52@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user53@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user54@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user55@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user56@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user57@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user58@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user59@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user60@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user61@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user62@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user63@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user64@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user65@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user66@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user67@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user68@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user69@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user70@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user71@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user72@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user73@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user74@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user75@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user76@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user77@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user78@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user79@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user80@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user81@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user82@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user83@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user84@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user85@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user86@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user87@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user88@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user89@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user90@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user91@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user92@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user93@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user94@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user95@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user96@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user97@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user98@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user99@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user100@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user101@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user102@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user103@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user104@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user105@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user106@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user107@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user108@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user109@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user110@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user111@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user112@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user113@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 7, 0, false, 'User'),
    ('user114@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 8, 0, false, 'User'),
    ('user115@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 1, 0, false, 'User'),
    ('user116@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 2, 0, false, 'User'),
    ('user117@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 3, 0, false, 'User'),
    ('user118@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 4, 0, false, 'User'),
    ('user119@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 5, 0, false, 'User'),
    ('user120@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', true, false, true, 6, 0, false, 'User'),
    ('user121@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 6, 0, false, 'User'),
    ('user122@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 1, 0, false, 'User'),
    ('user123@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 2, 0, false, 'User'),
    ('user124@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 3, 0, false, 'User'),
    ('user125@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 4, 0, false, 'User'),
    ('user126@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 5, 0, false, 'User'),
    ('user127@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 6, 0, false, 'User'),
    ('user128@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 7, 0, false, 'User'),
    ('user129@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 8, 0, false, 'User'),
    ('user130@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 1, 0, false, 'User'),
    ('user131@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 2, 0, false, 'User'),
    ('user132@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 3, 0, false, 'User'),
    ('user133@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 4, 0, false, 'User'),
    ('user134@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 5, 0, false, 'User'),
    ('user135@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 6, 0, false, 'User'),
    ('user136@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 7, 0, false, 'User'),
    ('user137@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 8, 0, false, 'User'),
    ('user138@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 1, 0, false, 'User'),
    ('user139@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 2, 0, false, 'User'),
    ('user140@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 3, 0, false, 'User'),
    ('user141@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 4, 0, false, 'User'),
    ('user142@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 5, 0, false, 'User'),
    ('user143@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 6, 0, false, 'User'),
    ('user144@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 7, 0, false, 'User'),
    ('user145@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 8, 0, false, 'User'),
    ('user146@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 1, 0, false, 'User'),
    ('user147@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 2, 0, false, 'User'),
    ('user148@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 3, 0, false, 'User'),
    ('user149@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 4, 0, false, 'User'),
    ('user150@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 5, 0, false, 'User'),
    ('user151@example.com', '$2a$10$Tyw4J5ik7FoBR.HtZK9MOeiRNrEbLRtHMpbP9Q5S3sXzCceF.iXnm', 'John', 'Doe', false, false, true, 6, 0, false, 'User');

-- Dummy data for Subscription table
INSERT INTO Subscription(title, description, subscription_price)
VALUES
    ('Free', 'free subscription model', 0.0),
    ('SD', 'SD subscription model', 7.99),
    ('HD', 'HD subscription model', 10.99),
    ('UHD', 'UHD subscription model', 13.99);

-- Dummy data for profile table
INSERT INTO profile (account_id, profile_name, age)
VALUES
    (1, 'Blauw', 21),
    (1, 'Oranje', 19),
    (1, 'Zwart', 99),
    (1, 'Groen', 10),
    (2, 'Blauw', 21),
    (3, 'Blauw', 21),
    (3, 'Oranje', 19),
    (3, 'Zwart', 99),
    (4, 'Groen', 10),
    (5, 'Blauw', 21),
    (5, 'Oranje', 19),
    (5, 'Zwart', 99),
    (5, 'Groen', 10),
    (6, 'Blauw', 21),
    (6, 'Oranje', 19),
    (7, 'Zwart', 99),
    (8, 'Groen', 10),
    (9, 'Blauw', 21),
    (10, 'Oranje', 19),
    (11, 'Zwart', 99),
    (11, 'Groen', 10),
    (12, 'Blauw', 21),
    (13, 'Oranje', 19),
    (13, 'Zwart', 99),
    (13, 'Groen', 10),
    (13, 'Blauw', 21),
    (14, 'Oranje', 19),
    (14, 'Zwart', 99),
    (15, 'Groen', 10),
    (16, 'Blauw', 21),
    (17, 'Oranje', 19),
    (18, 'Zwart', 99),
    (19, 'Groen', 10),
    (20, 'Blauw', 21);

-- Dummy data for Account_subscription table
INSERT INTO Account_subscription (account_id, subscription_id, payment_method, price, billing_date)
VALUES

    (1, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (2, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (3, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (4, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (5, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (6, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (7, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (8, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (9, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (10, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (11, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (12, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (13, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (14, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (15, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (16, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (17, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (18, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (19, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (20, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (21, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (22, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (23, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (24, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (25, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (26, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (27, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (28, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (29, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (30, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (31, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (32, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (33, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (34, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (35, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (36, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (37, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (38, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (39, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (40, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (41, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (42, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (43, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (44, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (45, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (46, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (47, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (48, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (49, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (50, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (51, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (52, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (53, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (54, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (55, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (56, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (57, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (58, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (59, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (60, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (61, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (62, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (63, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (64, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (65, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (66, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (67, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (68, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (69, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (70, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (71, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (72, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (73, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (74, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (75, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (76, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (77, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (78, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (79, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (80, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (81, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (82, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (83, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (84, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (85, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (86, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (87, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (88, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (89, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (90, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (91, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (92, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (93, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (94, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (95, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (96, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (97, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (98, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (99, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (100, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (101, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (102, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (103, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (104, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (105, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (106, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (107, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (108, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (109, 2, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (110, 3, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (111, 4, 'MasterCard', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (112, 2, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2) , CURRENT_DATE),
    (113, 3, 'Google Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (114, 4, 'iDEAL', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (115, 2, 'Google Pay', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (116, 3, 'Apple Pay',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (117, 4, 'PayPal', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE),
    (118, 2, 'Visa', (SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 2), CURRENT_DATE),
    (119, 3, 'iDEAL',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 3), CURRENT_DATE),
    (120, 4, 'MasterCard',(SELECT s.subscription_price FROM subscription s WHERE s.subscription_id = 4), CURRENT_DATE);

-- the purpose of this part is to feed all table with data so postman/API tests are working

--Add Genre dummy data
INSERT INTO public.genre (genre_id, title) VALUES (10, 'Documentary');
INSERT INTO public.genre (genre_id, title) VALUES (11, 'Drama');
INSERT INTO public.genre (genre_id, title) VALUES (12, 'Action');
INSERT INTO public.genre (genre_id, title) VALUES (13, 'Adventure');
INSERT INTO public.genre (genre_id, title) VALUES (14, 'Comedy');
INSERT INTO public.genre (genre_id, title) VALUES (15, 'Horror');
INSERT INTO public.genre (genre_id, title) VALUES (16, 'Thriller');


INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (2, 'John Cena Documentary', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 10);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (3, 'The Rock Documentary', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 10);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (4, 'The Undertaker Documentary', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 10);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (5, 'The Miz Documentary', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 10);

INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (6, 'The Shawsank Redemption', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 11);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (7, 'The Godfather', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 11);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (23, 'The Godfather: Part II', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 11);


INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (8, 'The Dark Knight', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 12);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (10, 'The Matrix', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 12);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (1, 'Tomorrow', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 12);

INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (12, 'The Lord of the Rings: The Fellowship of the Ring', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 13);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (13, 'The Lord of the Rings: The Two Towers', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 13);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (14, 'The Lord of the Rings: The Return of the King', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 13);

INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (15, 'The Hangover', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 14);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (16, 'The Hangover Part II', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 14);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (17, 'The Hangover Part III', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 14);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (18, 'The Hangover Part IV', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 14);

INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (19, 'The Conjuring', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 15);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (20, 'The Conjuring 2', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 15);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (21, 'IT', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 15);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (22, 'IT Chapter Two', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 15);

INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (9, 'Inception', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 16);
INSERT INTO public.movie (movie_id, title, duration, genre_id) VALUES (11, 'The Prestige', '0 years 0 mons 0 days 3 hours 30 mins 0.0 secs', 16);

INSERT INTO public.series (series_id, title, genre_id) VALUES (1, 'The Office', 14);
INSERT INTO public.series (series_id, title, genre_id) VALUES (2, 'Friends', 14);
INSERT INTO public.series (series_id, title, genre_id) VALUES (3, 'Breaking Bad', 11);
INSERT INTO public.series (series_id, title, genre_id) VALUES (4, 'Game of Thrones', 13);
INSERT INTO public.series (series_id, title, genre_id) VALUES (5, 'The Walking Dead', 15);
INSERT INTO public.series (series_id, title, genre_id) VALUES (6, 'The Big Bang Theory', 14);

INSERT INTO public.season (season_id, series_id, title) VALUES (1, 1, 'Season 1');
INSERT INTO public.season (season_id, series_id, title) VALUES (2, 1, 'Season 2');
INSERT INTO public.season (season_id, series_id, title) VALUES (3, 1, 'Season 3');
INSERT INTO public.season (season_id, series_id, title) VALUES (4, 1, 'Season 4');

INSERT INTO public.season (season_id, series_id, title) VALUES (5, 2, 'Season 1');
INSERT INTO public.season (season_id, series_id, title) VALUES (6, 2, 'Season 2');
INSERT INTO public.season (season_id, series_id, title) VALUES (7, 2, 'Season 3');
INSERT INTO public.season (season_id, series_id, title) VALUES (8, 2, 'Season 4');

INSERT INTO public.season (season_id, series_id, title) VALUES (9, 3, 'Season 1');
INSERT INTO public.season (season_id, series_id, title) VALUES (10, 3, 'Season 2');
INSERT INTO public.season (season_id, series_id, title) VALUES (11, 3, 'Season 3');
INSERT INTO public.season (season_id, series_id, title) VALUES (12, 3, 'Season 4');

INSERT INTO public.season (season_id, series_id, title) VALUES (13, 4, 'Season 1');
INSERT INTO public.season (season_id, series_id, title) VALUES (14, 4, 'Season 2');
INSERT INTO public.season (season_id, series_id, title) VALUES (15, 4, 'Season 3');
INSERT INTO public.season (season_id, series_id, title) VALUES (16, 4, 'Season 4');

INSERT INTO public.season (season_id, series_id, title) VALUES (17, 5, 'Season 1');
INSERT INTO public.season (season_id, series_id, title) VALUES (18, 5, 'Season 2');
INSERT INTO public.season (season_id, series_id, title) VALUES (19, 5, 'Season 3');
INSERT INTO public.season (season_id, series_id, title) VALUES (20, 5, 'Season 4');

INSERT INTO public.season (season_id, series_id, title) VALUES (21, 6, 'Season 1');
INSERT INTO public.season (season_id, series_id, title) VALUES (22, 6, 'Season 2');
INSERT INTO public.season (season_id, series_id, title) VALUES (23, 6, 'Season 3');
INSERT INTO public.season (season_id, series_id, title) VALUES (24, 6, 'Season 4');


INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (1, 1, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (2, 1, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (3, 1, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (4, 1, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (5, 2, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (6, 2, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (7, 2, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (8, 2, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (9, 3, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (10, 3, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (11, 3, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (12, 3, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (13, 4, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (14, 4, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (15, 4, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (16, 4, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (17, 5, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (18, 5, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (19, 5, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (20, 5, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (21, 6, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (22, 6, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (23, 6, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (24, 6, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (25, 7, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (26, 7, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (27, 7, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (28, 7, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (29, 8, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (30, 8, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (31, 8, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (32, 8, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (33, 9, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (34, 9, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (35, 9, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (36, 9, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (37, 10, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (38, 10, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (39, 10, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (40, 10, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (41, 11, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (42, 11, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (43, 11, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (44, 11, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (45, 12, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (46, 12, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (47, 12, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (48, 12, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (49, 13, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (50, 13, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (51, 13, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (52, 13, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (53, 14, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (54, 14, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (55, 14, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (56, 14, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (57, 15, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (58, 15, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (59, 15, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (60, 15, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (61, 16, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (62, 16, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (63, 16, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (64, 16, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (65, 17, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (66, 17, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (67, 17, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (68, 17, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (69, 18, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (70, 18, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (71, 18, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (72, 18, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (73, 19, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (74, 19, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (75, 19, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (76, 19, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (77, 20, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (78, 20, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (79, 20, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (80, 20, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (81, 21, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (82, 21, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (83, 21, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (84, 21, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (85, 22, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (86, 22, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (87, 22, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (88, 22, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (89, 23, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (90, 23, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (91, 23, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (92, 23, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (93, 24, 'Episode 1', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (94, 24, 'Episode 2', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (95, 24, 'Episode 3', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');
INSERT INTO public.episode (episode_id, season_id, title, duration) VALUES (96, 24, 'Episode 4', '0 years 0 mons 0 days 0 hours 30 mins 0.0 secs');

INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (9, 'location/nl_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (8, 'location/pl_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (7, 'location/ru_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (6, 'location/hu_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (4, 'location/ger_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (3, 'location/sp_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (2, 'location/fr_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (10, 'location/ro_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (5, 'location/it_sub.txt');
INSERT INTO public.subtitle (subtitle_id, subtitle_location) VALUES (1, 'location/eng_sub.txt');

INSERT INTO public.languages (language_id, language_name) VALUES (1, 'English');
INSERT INTO public.languages (language_id, language_name) VALUES (2, 'French');
INSERT INTO public.languages (language_id, language_name) VALUES (3, 'Spanish');
INSERT INTO public.languages (language_id, language_name) VALUES (4, 'German');
INSERT INTO public.languages (language_id, language_name) VALUES (5, 'Italian');
INSERT INTO public.languages (language_id, language_name) VALUES (6, 'Hungarian');
INSERT INTO public.languages (language_id, language_name) VALUES (7, 'Russian');
INSERT INTO public.languages (language_id, language_name) VALUES (8, 'Polish');
INSERT INTO public.languages (language_id, language_name) VALUES (9, 'Dutch');
INSERT INTO public.languages (language_id, language_name) VALUES (10, 'Romanian');

INSERT INTO public.available_languages (movie_id, series_id, language_id, subtitle_id)
SELECT
    movie_id,
    NULL,
    language_id,
    language_id
FROM
    generate_series(1, 23) AS movie_id,
    generate_series(1, 10) AS language_id;

INSERT INTO public.available_languages (movie_id, series_id, language_id, subtitle_id)
SELECT
    NULL,
    series_id,
    language_id,
    language_id
FROM
    generate_series(1, 6) AS series_id,
    generate_series(1, 10) AS language_id;