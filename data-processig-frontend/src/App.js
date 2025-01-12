import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Footer from './components/footer/footer';
import Profile from './pages/profile/profile';
import Homepage from "./pages/home/homepage";
import Header from './components/header/header';
import Login from './pages/login/login';
import ResetPassword from './pages/reset password/resetPassword';
import UserOverview from './pages/user overview/userOverview';
import { useAuthContext } from './components/hooks/useAuthContext';

function App() {

  const { user } = useAuthContext()

  return (
        <div className='main-container'>
            {user !== null &&
            <Router>
                <Header />
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/userOverview' element={<UserOverview />} />
                        <Route path='/resetPassword' element={<ResetPassword />} />
                    </Routes>
                <Footer />
            </Router>
            }
            {user === null &&
            <Router>
                <Header />
                    <Routes>
                        <Route path='/' element={<Login />} />
                    </Routes>
                <Footer />
            </Router>
            }
        </div>
  );
}

export default App;
