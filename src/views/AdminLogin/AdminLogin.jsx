import { useState } from 'react';
import './AdminLogin.css';
import { validateAdminLogin } from './validation';
import { FaUser } from 'react-icons/fa';
import { BiSolidLockAlt } from 'react-icons/bi';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError } from '../../functions/toastify';
import { ToastContainer } from "react-toastify";
import { useCallback } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";

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
      navigate("/panel");
    } catch (error) {
      notifyError(error.response.data.error);
    }
  };

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);


  return (
    <div className="admin-login">
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#0a0a0a",
                    },
                    links: {
                        color: "#0a0a0a",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />

      
      <ToastContainer></ToastContainer>
      <form className='admin-login__form' onSubmit={handleSubmit}>
        <h2 className="admin-login__title">Admin Login</h2>
        <div className="admin-login__form-group">
          <label className='admin-login__form-label'>Ingresa tu Email</label>
          <FaUser className='admin-login__form-icon' />
          <input className='admin-login__form-input'
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className= "admin-login__form-group">
          <label className='admin-login__form-label'>Ingresa tu contraseña</label>
          <BiSolidLockAlt className='admin-login__form-icon' />
          <input
            className="admin-login__form-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className='admin-login__form-group-message-btn'>
          <span className='admin-login__form-span'>Recuperar mi cuenta</span>
          <button className='admin-login__form-button' type="submit"
          disabled={errors}
          >Ingresar</button>
        </div>

        {errors && <span className={errors? "admin-login__error" : ''}>{errors === true ? "Enter your credentials" : errors}</span>}
      </form>

    </div>
  );
}

export default AdminLogin;
