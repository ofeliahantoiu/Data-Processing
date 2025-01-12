-- Privileges for netflix database

-- senior privileges
CREATE ROLE senior;
SELECT revoke_all_privileges('senior');
GRANT SELECT ON  account, account_subscription, profile TO senior;

-- medior privileges
CREATE ROLE medior;
SELECT revoke_all_privileges('medior');
GRANT SELECT (email,first_name,last_name,street,zip_code,country_id,active_subscription) ON account TO medior;
GRANT SELECT ON profile TO medior;
GRANT SELECT ON medior TO medior;

-- junior privileges
CREATE ROLE junior;
GRANT SELECT (email,active_subscription, blocked, verified, country_id) ON account TO junior;
GRANT SELECT (profile_id,account_id,profile_name) ON profile TO junior;
GRANT SELECT ON junior TO medior;