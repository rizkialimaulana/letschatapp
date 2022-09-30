import './app.css';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)

  const ProtectedRoute = ({children})=> {
    if(!currentUser){
      return <Navigate to="/login" />
    }else{
      return children
    }
  }
  return (
    <div className="app">
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
