import { useState } from 'react';
import './AdminLogin.css';
import { validateAdminLogin } from './validation';
import { FaUser } from 'react-icons/fa';
import { BiSolidLockAlt } from 'react-icons/bi';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para los mensajes de error
  const [errors, setErrors] = useState(false);
  console.log(errors);

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
  const handleSubmit = (e) => {
    e.preventDefault();

  };



  return (
    <div className="admin-login">

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

        {errors && <span className={errors? "admin-login__error" : ''}>{errors}</span>}
      </form>

    </div>
  );
}

export default AdminLogin;
