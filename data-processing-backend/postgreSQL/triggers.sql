-- Add a trigger to enforce the unique_account_limit constraint separately
CREATE TRIGGER unique_account_limit_trigger
BEFORE INSERT OR UPDATE
ON profile
EXECUTE FUNCTION check_unique_account_limit();

-- Add a trigger to block the account after too many login attempts
CREATE TRIGGER account_suspension_trigger
AFTER INSERT OR UPDATE
ON Account
EXECUTE FUNCTION monitor_login_attempts();

-- Add a trigger to log activity on the Account table
CREATE TRIGGER account_log_trigger
AFTER INSERT OR UPDATE OR DELETE
ON Account
EXECUTE FUNCTION log_account_changes();