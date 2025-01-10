export interface User {
    account_id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    active_subscription: boolean;
    blocked: boolean;
    verified: boolean;
    street: string;
    zip_code: string;
    country_id: number;
    log_in_attempt_count: number;
    invited: boolean;
    user_type: string;
  }
  
  export interface Subscription {
    subscription_id: number,
    subscribed: boolean,
    type: string,
    price: number,
    date: string,
  }
  
  
  