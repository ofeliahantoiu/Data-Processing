import { useEffect, useState } from "react";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { Chart } from "react-google-charts";
import { json } from "react-router-dom";

const CountryStatistics = ({ country }) => {
    const [countryStatistics, setCountryStatistics] = useState([])
    const [error, setError] = useState(null)

    const { user } = useAuthContext();
    
    useEffect(() => {
        const fetchStatisticsByCountry = async () => {
            const response = await fetch(`http://localhost:3000/admin/statistics/${country}`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            
            if (!response.ok) {
                setError(json.error);
            }
            
            if (response.ok) {
                setCountryStatistics(json.data);
            }
        }
        
        fetchStatisticsByCountry();
    }, [user])

    const paymentData = [
        ["Payment Method", "Accounts"],
        ["Paypal", Number(countryStatistics.usage_of_paypal)],
        ["Visa", Number(countryStatistics.usage_of_visa)],
        ["Mastercard", Number(countryStatistics.usage_of_mastercard)],
        ["Apple Pay", Number(countryStatistics.usage_of_apple_pay)],
        ["Google Pay", Number(countryStatistics.usage_of_google_pay)],
        ["iDEAL", Number(countryStatistics.usage_of_ideal)],
    ];

    const paymentOptions = {
        chartArea: { width: "60%"},
        backgroundColor: {
                fill: "black",
                stroke: "black",
                strokeWidth: 1,
            },
        colors: ["#E50914", "#8E1212", "#F70505", "#680303", "#F15757"],
        legend: {
            textStyle: {
                color: 'white',
            },
        },
    };

    const subscriptionData = [
        ["Subscriptions", "Accounts"],
        ["Active", Number(countryStatistics.active_subscriptions)],
        ["Inactive", Number(countryStatistics.inactive_subscriptions)],
    ];

    const subscriptionOptions = {
        chartArea: { width: "60%"},
        backgroundColor: {
                fill: "black",
                stroke: "black",
                strokeWidth: 1,
            },
        colors: ["red", "gray"],
        legend: {
            textStyle: {
                color: 'white',
            },
        },
    };

    return(
        <div className="stats-container">
            {error && <h1 className="homepage-title">{ error } for { country }</h1>}
            {!error && <h1 className="homepage-title">{ country }</h1>}
            {!error &&
            <div className="tables-container">
                {user.role === "Senior" &&
                <div className="stats-table">
                    <div className="stats-title">
                        <p>Most Used Payment Method</p>
                    </div>
                    <div className="stats">
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={paymentData}
                            options={paymentOptions}
                        />
                    </div>
                </div>}
                <div className="stats-table">
                    <div className="stats-title">
                        <p>Active and Inactive Subscription</p>
                    </div>
                    <div className="stats">
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={subscriptionData}
                            options={subscriptionOptions}
                        />
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default CountryStatistics;