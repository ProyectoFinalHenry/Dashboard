import { useState } from 'react';
import './AdminLogin.css';
import { validateAdminLogin } from './validation';
import { FaUser } from 'react-icons/fa';
import { BiSolidLockAlt } from 'react-icons/bi';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError } from '../../functions/toastify';
import { ToastContainer } from "react-toastify";

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Estado para los mensajes de error
  const [errors, setErrors] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateAdminLogin(value, password);
    setErrors(error);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validateAdminLogin(email, value);
    setErrors(error);
  };

  // Manejador para el envío del formulario
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {email, password}
    try {
      const { auth_token } = (await axios.post("management/login", data)).data
      localStorage.setItem("auth_token", auth_token);
      navigate("/products");
    } catch (error) {
      notifyError(error.response.data.error);
    }
  };

  return (
    <div className="admin-login">
      <ToastContainer></ToastContainer>
      <form className='admin-login__form' onSubmit={handleSubmit}>
        <h2 className="admin-login__title">Admin Login</h2>
        <div className="admin-login__form-group">
          <label className='admin-login__form-label'>Enter your email</label>
          <FaUser className='admin-login__form-icon' />
          <input className='admin-login__form-input'
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className= "admin-login__form-group">
          <label className='admin-login__form-label'>Enter your password</label>
          <BiSolidLockAlt className='admin-login__form-icon' />
          <input
            className="admin-login__form-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className='admin-login__form-group-message-btn'>
          <span className='admin-login__form-span'>Recover my account</span>
          <button className='admin-login__form-button' type="submit"
          disabled={errors}
          >Login</button>
        </div>

        {errors && <span className={errors? "admin-login__error" : ''}>{errors === true ? "Enter your credentials" : errors}</span>}
      </form>

    </div>
  );
}

export default AdminLogin;
