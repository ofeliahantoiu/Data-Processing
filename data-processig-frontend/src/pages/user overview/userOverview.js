import { useEffect, useState } from "react";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const UserOverview = () => {
    const { user } = useAuthContext();
  
    const [seniorData, setSeniorData] = useState([]);
    const [mediorData, setMediorData] = useState([]);
    const [juniorData, setJuniorData] = useState([]);

    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchJuniorOverview = async () => {
            const response = await fetch(`http://localhost:3000/admin/juniorView`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            
            if (!response.ok) {
                setError(json.error);
            }
            
            if (response.ok) {
                setJuniorData(json.data);
            }
        }

        fetchJuniorOverview();
    }, [user])
    
    useEffect(() => {
        const fetchMediorOverview = async () => {
            const response = await fetch(`http://localhost:3000/admin/mediorView`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error);
            }

            if (response.ok) {
                setMediorData(json.data);
            }
        }

        fetchMediorOverview();
    }, [user])

    useEffect(() => {
        const fetchSeniorOverview = async () => {
            const response = await fetch(`http://localhost:3000/admin/seniorView`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error);
            }

            if (response.ok) {
                setSeniorData(json.data)
            }
        }

        fetchSeniorOverview();
    }, [user])

    switch(user.role) {
        case 'Senior':
            return (
                <div className="container">
                    <table className="user-overview-table">
                        <thead className="table-header">
                        <tr>
                            <th className="column-name">Email</th>
                            <th className="column-name">First Name</th>
                            <th className="column-name">Last Name</th>
                            <th className="column-name">Address</th>
                            <th className="column-name">Payment Method</th>
                            <th className="column-name">Subscription</th>
                            <th className="column-name">Number of profiles</th>
                            <th className="column-name">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                                {seniorData.map((row) => (
                                <tr key={row.id}>
                                    <td className="table-cell">{ row.email }</td>
                                    <td className="table-cell">{ row.first_name }</td>
                                    <td className="table-cell">{ row.last_name }</td>
                                    <td className="table-cell">{ row.full_address }</td>
                                    <td className="table-cell">{ row.payment_method }</td>
                                    <td className="table-cell">{ row.subscription_title }</td>
                                    <td className="table-cell">{ row.profile_count }</td>
                                    <td className="table-cell">{ row.active_subscription ? 'Active' : 'Inactive' }</td>
                                </tr>
                                ))}
                            
                        </tbody>
                    </table>
                </div>  
            );
            break;

        case 'Medior':
            return (
                <div className="container">
                    <table className="user-overview-table">
                        <thead className="table-header">
                        <tr>
                            <th className="column-name">Email</th>
                            <th className="column-name">First Name</th>
                            <th className="column-name">Last Name</th>
                            <th className="column-name">Address</th>
                            <th className="column-name">Number of profiles</th>
                            <th className="column-name">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {mediorData.map((row) => (
                                <tr key={row.id}>
                                    <td className="table-cell">{ row.email }</td>
                                    <td className="table-cell">{ row.first_name }</td>
                                    <td className="table-cell">{ row.last_name }</td>
                                    <td className="table-cell">{ row.full_address }</td>
                                    <td className="table-cell">{ row.profile_count }</td>
                                    <td className="table-cell">{ row.active_subscription ? 'Active' : 'Inactive' }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>   
            );
            break;

        case 'Junior':
            return (
                <div className="container">
                    <table className="user-overview-table">
                        <thead className="table-header">
                        <tr>
                            <th className="column-name">Email</th>
                            <th className="column-name">Number of profiles</th>
                            <th className="column-name">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {juniorData.map((row) => (
                                <tr key={row.id}>
                                    <td className="table-cell">{ row.email }</td>
                                    <td className="table-cell">{ row.profile_count }</td>
                                    <td className="table-cell">{ row.active_subscription ? 'Active' : 'Inactive' }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            break;

        default:
            console.log(error);
    }
  };
  
  export default UserOverview;