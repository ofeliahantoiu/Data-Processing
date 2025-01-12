-- 3.2 creating script for tables in Netflix

CREATE TABLE Country (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR (255)
);

CREATE TABLE Genre (
    genre_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL UNIQUE
);

CREATE TABLE Languages (
    language_id SERIAL PRIMARY KEY,
    language_name VARCHAR (255) NOT NULL UNIQUE
);

CREATE TABLE Account ( -- not all fields are mandatory because the "admins" also are registered in this table
    account_id SERIAL PRIMARY KEY,
    email VARCHAR (255) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    active_subscription BOOLEAN DEFAULT false,
    blocked BOOLEAN,
    verified BOOLEAN,
    street VARCHAR (255),
    zip_code VARCHAR (10),
    country_id INT,
    log_in_attempt_count INT,
    invited BOOLEAN,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('User','Junior','Medior','Senior'))
);

CREATE TABLE Movie (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL UNIQUE,
    duration INTERVAL DEFAULT '00:00:00',
    genre_id INT NOT NULL,
    available_qualities JSON NOT NULL DEFAULT '{
        "available_qualities": []
    }',
    FOREIGN KEY (genre_id) REFERENCES Genre (genre_id) ON DELETE NO ACTION
);

CREATE TABLE Profile (
    profile_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    profile_image VARCHAR(255) DEFAULT 'location/placeholder.jpg',
    profile_name VARCHAR(255),
    profile_child BOOLEAN DEFAULT false,
    age INT NOT NULL,
    preferences JSON NOT NULL DEFAULT '{
        "movie": [],
        "series": [],
        "genre": [],
        "min_age": [],
        "viewing_class": []
    }',
    language VARCHAR(25) NOT NULL DEFAULT 'en',
    FOREIGN KEY (account_id) REFERENCES Account (account_id) ON DELETE CASCADE
);

CREATE TABLE Series (
    series_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    genre_id INT NOT NULL,
    available_qualities JSON NOT NULL DEFAULT '{
        "available_qualities": []
    }',
    FOREIGN KEY (genre_id) REFERENCES Genre (genre_id) ON DELETE NO ACTION
);

CREATE TABLE Rating(
    rating_id SERIAL PRIMARY KEY,
    movie_id INT,
    series_id INT,
    user_rating INT NOT NULL CHECK (user_rating BETWEEN 1 AND 5),
    FOREIGN KEY (movie_id) REFERENCES Movie (movie_id) ON DELETE NO ACTION,
    FOREIGN KEY (series_id) REFERENCES Series (series_id) ON DELETE NO ACTION
);

CREATE TABLE Season (
    season_id SERIAL PRIMARY KEY,
    series_id INT NOT NULL,
    title VARCHAR (255),
    FOREIGN KEY (series_id) REFERENCES Series (series_id) ON DELETE CASCADE
);

CREATE TABLE Episode (
    episode_id SERIAL PRIMARY KEY,
    title VARCHAR (255),
    duration INTERVAL DEFAULT '00:00:00',
    season_id INT NOT NULL,
    FOREIGN KEY (season_id) REFERENCES season (season_id)
);

CREATE TABLE Subscription (
    subscription_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    description TEXT NOT NULL,
    subscription_price FLOAT NOT NULL DEFAULT 7.99
);

CREATE TABLE Account_subscription(
    account_subscription_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    subscription_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('PayPal','Visa','MasterCard','Apple Pay','Google Pay','iDEAL')),
    price FLOAT NOT NULL,
    billing_date DATE NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Account (account_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES Subscription (subscription_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Subtitle (
    subtitle_id SERIAL PRIMARY KEY,
    subtitle_location VARCHAR (255) DEFAULT 'location/subtitle.txt'
);

CREATE TABLE Available_languages (
    available_language_id SERIAL PRIMARY KEY,
    movie_id INT,
    series_id INT,
    language_id INT NOT NULL,
    subtitle_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movie (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (series_id) REFERENCES Series (series_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (language_id) REFERENCES Languages (language_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (subtitle_id) REFERENCES Subtitle (subtitle_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Watch_history (
    watch_history_id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    watch_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('Start','End')),
    finished BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (profile_id) REFERENCES Profile (profile_id) ON DELETE CASCADE
);

CREATE TABLE Movie_watch_history (
    movie_watch_history_id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    watch_history_id INT NOT NULL,
    pause_time INTERVAL DEFAULT '00:00:00',
    language_settings VARCHAR(255) NOT NULL DEFAULT 'en',
    FOREIGN KEY (movie_id) REFERENCES Movie (movie_id) ON DELETE CASCADE,
    FOREIGN KEY (watch_history_id) REFERENCES Watch_history (watch_history_id) ON DELETE CASCADE
);

CREATE TABLE Series_watch_history (
    series_watch_history_id SERIAL PRIMARY KEY,
    series_id INT NOT NULL,
    season_id INT NOT NULL,
    episode_id INT NOT NULL,
    watch_history_id INT NOT NULL,
    pause_time INTERVAL DEFAULT '00:00:00',
    language_settings VARCHAR(25) NOT NULL DEFAULT 'en',
    FOREIGN KEY (series_id) REFERENCES Series (series_id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES Season (season_id) ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES Episode (episode_id) ON DELETE CASCADE,
    FOREIGN KEY (watch_history_id) REFERENCES Watch_history (watch_history_id) ON DELETE CASCADE
);

CREATE TABLE Invite (
    invite_id SERIAL PRIMARY KEY,
    inviting_email VARCHAR(100) NOT NULL,
    invited_email VARCHAR(255) NOT NULL,
    invite_send TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (inviting_email) REFERENCES Account (email) ON DELETE CASCADE
);
-- Add index on email of invited account to be able run faster queries on the table
CREATE INDEX invited_email ON Invite (invited_email);

CREATE TABLE available_shows_country (
    show_country_id SERIAL PRIMARY KEY,
    country_id INT NOT NULL,
    series_id INT,
    movie_id INT,
    FOREIGN KEY (country_id) REFERENCES Country (country_id) ON DELETE NO ACTION,
    FOREIGN KEY (series_id) REFERENCES Series (series_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES  Movie (movie_id) ON DELETE CASCADE
);

-- Views:

CREATE VIEW country_information_show AS (
    SELECT
        C.country_name,
        'Movie' AS show_type,
        M.title AS show_title,
        AVG(R.user_rating) AS show_avg_rating,
        G.title AS show_genre
    FROM
        Country C
    LEFT JOIN available_shows_country SC ON C.country_id = SC.country_id
    LEFT JOIN Movie M ON SC.movie_id = M.movie_id
    LEFT JOIN Rating R ON M.movie_id = R.movie_id
    LEFT JOIN Genre G ON M.genre_id = G.genre_id
    GROUP BY
        C.country_id, M.title, G.title

    UNION ALL

    SELECT
        C.country_name,
        'Series' AS show_type,
        S.title AS show_title,
        AVG(R.user_rating) AS show_avg_rating,
        G.title AS show_genre
    FROM
        Country C
    LEFT JOIN available_shows_country SC ON C.country_id = SC.country_id
    LEFT JOIN Series S ON SC.series_id = S.series_id
    LEFT JOIN Rating R ON S.series_id = R.series_id
    LEFT JOIN Genre G ON S.genre_id = G.genre_id
    GROUP BY C.country_id, S.title, G.title
);

--stored procedure that needs to be created before country_statistics view
CREATE OR REPLACE FUNCTION calculate_country_total_revenue(country text)
RETURNS DECIMAL AS $$
    DECLARE
        total_revenue DECIMAL := 0;
    BEGIN
        SELECT
            COALESCE(SUM(AC.price), 0)
        INTO
            total_revenue
        FROM
            Account A
        LEFT JOIN Country C ON A.country_id = C.country_id
        LEFT JOIN Account_subscription AC ON AC.account_id = A.account_id
        LEFT JOIN Subscription S ON AC.subscription_id = S.subscription_id
        WHERE
            C.country_id = (SELECT country_id FROM country c WHERE c.country_name = country);
        RETURN total_revenue;
    END;
$$ LANGUAGE plpgsql;

CREATE VIEW country_statistics AS (
    SELECT
        C.country_name,
        COUNT(A.account_id) AS total_accounts,
        COUNT(CASE WHEN A.active_subscription = true THEN A.account_id END) AS active_subscriptions,
        COUNT(CASE WHEN A.active_subscription = false THEN A.account_id END) AS inactive_subscriptions,
        COUNT(CASE WHEN AC.payment_method = 'PayPal' THEN AC.account_id END) AS usage_of_paypal,
        COUNT(CASE WHEN AC.payment_method = 'Visa' THEN AC.account_id END) AS usage_of_visa,
        COUNT(CASE WHEN AC.payment_method = 'MasterCard' THEN AC.account_id END) AS usage_of_mastercard,
        COUNT(CASE WHEN AC.payment_method = 'Apple Pay' THEN AC.account_id END) AS usage_of_apple_pay,
        COUNT(CASE WHEN AC.payment_method = 'Google Pay' THEN AC.account_id END) AS usage_of_google_pay,
        COUNT(CASE WHEN AC.payment_method = 'iDEAL' THEN AC.account_id END) AS usage_of_ideal,
        COALESCE((SELECT calculate_country_total_revenue(C.country_name)), 0) AS total_subscription_revenue
    FROM
        Country C
    LEFT JOIN available_shows_country SC ON C.country_id = SC.country_id
    LEFT JOIN Account A ON C.country_id = A.country_id
    LEFT JOIN Account_subscription AC ON AC.account_id = A.account_id
    LEFT JOIN Subscription S ON AC.subscription_id = S.subscription_id
    GROUP BY C.country_name
    ORDER BY C.country_name DESC
);

CREATE VIEW senior AS (
    SELECT
        A.email,
        A.first_name,
        A.last_name,
        A.street || ' ' || A.zip_code || ' ' || C.country_name AS "full_address",
        AC.payment_method,
        S.title AS subscription_title,
        S.subscription_price,
        A.active_subscription,
        COUNT(P.profile_id) AS profile_count
    FROM
        Account A
    LEFT JOIN Country C ON A.country_id = C.country_id
    LEFT JOIN Account_subscription AC ON AC.account_id = A.account_id
    LEFT JOIN Subscription S ON AC.subscription_id = S.subscription_id
    LEFT JOIN Profile P ON A.account_id = P.account_id
    WHERE a.user_type = 'User'
    GROUP BY A.email, A.first_name, A.email, A.last_name, A.street || ' ' || A.zip_code || ' ' || C.country_name, AC.payment_method, S.title, S.subscription_price, A.active_subscription
    ORDER BY a.email DESC
);

CREATE VIEW medior AS (
    SELECT
        A.email,
        A.first_name,
        A.last_name,
        A.street || ' ' || A.zip_code || ' ' || C.country_name AS "full_address",
        A.active_subscription,
        COUNT(P.profile_id) AS profile_count
    FROM
        Account A
    LEFT JOIN Country C ON A.country_id = C.country_id
    LEFT JOIN Profile P ON A.account_id = P.account_id
    WHERE a.user_type = 'User'
    GROUP BY A.email, A.email, A.first_name, A.last_name, A.street || ' ' || A.zip_code || ' ' || C.country_name, A.active_subscription
    ORDER BY a.email DESC
);

CREATE VIEW junior AS (
    SELECT
        A.email,
        A.active_subscription,
        COUNT(P.profile_id) AS profile_count
    FROM
        Account A
    LEFT JOIN Profile P ON A.account_id = P.account_id
    WHERE a.user_type = 'User'
    GROUP BY A.email, A.email, A.active_subscription
    ORDER BY a.email DESC
);

-- table to log account table activities
CREATE TABLE account_log (
    log_id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL DEFAULT 'Account',
    operation_type VARCHAR(50) NOT NULL,
    account_email VARCHAR(255) NOT NULL,
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    old_data JSONB,
    new_data JSONB
);
