let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  // document.querySelector('.login-forget'),
  // document.querySelector('.login-signin'),
  loginSignup = document.querySelector('.login-signup'),
  userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');

const listUsers = [
  {
    id: '01',
    email: 'max@mail.com',
    pass: 'max2000',
    displayName: 'Max',
  },
  {
    id: '02',
    email: 'kate@mail.com',
    pass: '123',
    displayName: 'Kate',
  },
];

const setUsers = {
  user: null,
  logIn(email, password, cb) {
    console.log(email, password);
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.autorizedUser(user);
      cb();
    } else {
      alert("this user and user's data not exist");
    }
  },
  logOut() {
    console.log('logOut');
  },
  signUp(email, password, cb) {
    if (!email.trim() || !password.trim()) {
      alert('enter correct email and password!');
      return;
    }

    // if (email.indexOf('@') === -1) {
    //   alert('email must include @ symbol');
    //   return;
    // }

    if (!this.getUser(email)) {
      const user = { email, pass: password, displayName: email };
      listUsers.push(user);
      this.autorizedUser(user);
      cb();
    } else {
      console.log('user in listUsers!');
    }
    console.log(listUsers);
  },
  getUser(email) {
    return listUsers.find((el) => el.email === email);
  },
  autorizedUser(user) {
    this.user = user;
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.email.split('@', 1);
  } else {
    userElem.style.display = 'none';
    loginElem.style.display = '';
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

loginSignup.addEventListener('click', (e) => {
  e.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

toggleAuthDom();
