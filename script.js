// ---------- Tab / Form switching ----------
function showForm(type){
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');

  if(type === 'login'){
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

// ---------- Helper ----------
function setError(fieldId, errorId, message){
  const field = fieldId ? document.getElementById(fieldId) : null;
  const error = document.getElementById(errorId);
  if(message){
    if(field) field.classList.add('invalid');
    error.textContent = message;
    return false;
  } else {
    if(field) field.classList.remove('invalid');
    error.textContent = '';
    return true;
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;

// ---------- LOGIN ----------
const loginForm = document.getElementById('loginForm');
const loginSuccess = document.getElementById('loginSuccess');

loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  loginSuccess.classList.remove('show');

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  let valid = true;
  valid = setError('loginEmailField','loginEmailError', !emailPattern.test(email) ? 'Enter a valid email' : '') && valid;
  valid = setError('loginPasswordField','loginPasswordError', password.length < 1 ? 'Please enter your password' : '') && valid;

  if(valid){
    loginSuccess.classList.add('show');
    loginForm.reset();
    setTimeout(() => loginSuccess.classList.remove('show'), 4000);
  }
});

// ---------- REGISTER ----------
const registerForm = document.getElementById('registerForm');
const registerSuccess = document.getElementById('registerSuccess');
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');

passwordInput.addEventListener('input', function(){
  const val = passwordInput.value;
  let score = 0;
  if(val.length >= 8) score++;
  if(/[A-Z]/.test(val)) score++;
  if(/[0-9]/.test(val)) score++;
  if(/[^A-Za-z0-9]/.test(val)) score++;

  const widths = ['10%','35%','65%','85%','100%'];
  const colors = ['#e0102b','#e0102b','#e0602b','#c2b21a','#2ba32b'];
  strengthBar.style.width = widths[score];
  strengthBar.style.background = colors[score];
});

registerForm.addEventListener('submit', function(e){
  e.preventDefault();
  registerSuccess.classList.remove('show');

  const name = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const terms = document.getElementById('terms').checked;

  let valid = true;

  valid = setError('nameField','nameError', name.length < 2 ? 'Please enter your full name' : '') && valid;
  valid = setError('emailField','emailError', !emailPattern.test(email) ? 'Enter a valid email' : '') && valid;
  valid = setError('phoneField','phoneError', !phonePattern.test(phone) ? 'Enter a valid 10 digit number' : '') && valid;
  valid = setError('passwordField','passwordError', password.length < 8 ? 'Password must be at least 8 characters' : '') && valid;
  valid = setError('confirmField','confirmError', confirm !== password ? 'Passwords do not match' : '') && valid;
  valid = setError(null,'termsError', !terms ? 'Please accept the terms to continue' : '') && valid;

  if(valid){
    registerSuccess.classList.add('show');
    registerForm.reset();
    strengthBar.style.width = '0%';
    setTimeout(() => {
      registerSuccess.classList.remove('show');
      showForm('login');
    }, 1500);
  }
});