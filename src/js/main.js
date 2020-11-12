let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
});

// const regExpValidEmail = /^\w{2,}\@\w+\.\w{2,}$/; ///^\w+@\w+\.\w{2,}$/;
const regExpValidEmail = /^(\w{2,})\@(\w+)\.(\w{2,})$/;
const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  // document.querySelector('.login-forget'),
  // document.querySelector('.login-signin'),
  loginSignup = document.querySelector('.login-signup'),
  userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit'),
  editElem = document.querySelector('.edit-info'),
  editContainer = document.querySelector('.edit-conatiner'),
  editUserName = document.querySelector('.edit-username'),
  editPhotoUrl = document.querySelector('.edit-photo'),
  userAvatarElem = document.querySelector('.user-avatar');

const listUsers = [
  {
    id: '01',
    email: 'max@mail.com',
    password: 'max2000',
    displayName: 'Max',
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123',
    displayName: 'Kate',
  },
];

const setUsers = {
  user: null,
  logIn(email, password, cb) {
    if (!regExpValidEmail.test(email)) {
      alert('invalid email syntaxis');
      return;
    }

    console.log(email, password);
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.autorizedUser(user);
      cb();
    } else {
      alert("this user and user's data not exist");
    }
  },
  logOut(cb) {
    console.log('logOut');
    this.user = null;
    cb();
  },
  signUp(email, password, cb) {
    if (!regExpValidEmail.test(email)) {
      alert('invalid email syntaxis');
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert('enter correct email and password!');
      return;
    }
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.substring(0, email.indexOf('@')) };
      listUsers.push(user);
      this.autorizedUser(user);
      cb();
    } else {
      console.log('user in listUsers!');
    }
    console.log(listUsers);
  },
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
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
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
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

exitElem.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
  setUsers.logOut(toggleAuthDom);
});

editElem.addEventListener('click', (e) => {
  e.preventDefault();
  editContainer.classList.toggle('visible');
  editUserName.value = setUsers.user.displayName;
});

editContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  setUsers.editUser(editUserName.value, editPhotoUrl.value, toggleAuthDom);
  editContainer.classList.remove('visible');
});

toggleAuthDom();
