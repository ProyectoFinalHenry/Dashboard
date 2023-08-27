export function validateAdminLogin(email, password) {

  let emailError;
  let passwordError;

  // Validación del email
  if (!email) {
    emailError = 'El email es obligatorio';
  } else if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) {
    emailError = 'Email inválido';
  }

  // Validación de la contraseña
  if (!password) {
    passwordError = 'La contraseña es obligatoria';
  } else if (password.length < 5) {
    passwordError = 'El password debe tener al menos 5 caracteres';
  } else if (password.length > 15) {
    passwordError = 'El password debe tener menos de 15 caracteres';
  } else if (/\s/.test(password)) {
    passwordError = 'El password no puede contener espacios en blanco';
  }


  if(emailError || passwordError){
    return emailError || passwordError
  } return false


}
