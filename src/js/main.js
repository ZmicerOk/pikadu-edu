// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDAQy_HQgj807ksUqAbX5ryFeX1Ed3zBns',
  authDomain: 'pikadu-test.firebaseapp.com',
  databaseURL: 'https://pikadu-test.firebaseio.com',
  projectId: 'pikadu-test',
  storageBucket: 'pikadu-test.appspot.com',
  messagingSenderId: '867566369144',
  appId: '1:867566369144:web:a11ef1d176ff46b55ab08d',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//islamov code
let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
});

//my code
const regExpValidEmail = /^(\w{2,})\@(\w+)\.(\w{2,})$/;
const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginForget = document.querySelector('.login-forget'),
  loginSignup = document.querySelector('.login-signup'),
  userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name'),
  exitElem = document.querySelector('.exit'),
  editElem = document.querySelector('.edit-info'),
  editContainer = document.querySelector('.edit-conatiner'),
  editUserName = document.querySelector('.edit-username'),
  editPhotoUrl = document.querySelector('.edit-photo'),
  userAvatarElem = document.querySelector('.user-avatar'),
  postsWrapper = document.querySelector('.posts'),
  buttonNewPost = document.querySelector('.button-new-post'),
  addPostElem = document.querySelector('.add-post');

const DEFAULT_PHOTO = userAvatarElem.src;

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) {
        handler();
      }
    });
  },
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('invalid email syntaxis');
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          console.log(errorMessage);
          alert('Неверный пароль');
        } else if (errorCode === 'auth/user-not-found') {
          console.log(errorMessage);
          alert('Такой пользователь ещё не зареген');
        } else {
          alert(errorMessage);
        }
        console.error(error);
      });
  },
  logOut() {
    firebase.auth().signOut();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('invalid email syntaxis');
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert('enter correct email and password!');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.editUser(email.substring(0, email.indexOf('@')), null, handler);
        console.log(data);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          console.log(errorMessage);
          alert('Слабый пароль');
        } else if (errorCode === 'auth/email-already-in-use') {
          console.log(errorMessage);
          alert('Такой пользователь уже зареген');
        } else {
          alert(errorMessage);
        }
        console.error(error);
      });
  },
  editUser(userName, userPhoto, handler) {
    const user = firebase.auth().currentUser;
    if (userName) {
      if (userPhoto) {
        user
          .updateProfile({
            displayName: userName,
            photoURL: userPhoto,
          })
          .then(handler);
      }
      user
        .updateProfile({
          displayName: userName,
        })
        .then(handler);
    }
  },
  sendForget(email) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Email sent');
      })
      .catch((error) => {
        alert('An error happened', error);
      });
  },
};

const setPosts = {
  allPosts: [],
  addPost(title, text, tags, handler) {
    const user = firebase.auth().currentUser;
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title,
      text,
      tags: tags.split(',').map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    });
    firebase
      .database()
      .ref('post')
      .set(this.allPosts)
      .then(() => this.getPosts(handler));
  },
  getPosts(handler) {
    firebase
      .database()
      .ref('post')
      .on('value', (snapshot) => {
        this.allPosts = snapshot.val() || [];
        handler();
      });
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user', user);

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
    buttonNewPost.classList.add('visible');
  } else {
    userElem.style.display = 'none';
    loginElem.style.display = '';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {
  let postHTML = '';
  setPosts.allPosts.forEach(({ title, text, like, comments, author, date, tags }) => {
    postHTML += `
     <section class="post">
     <div class="post-body">
       <h2 class="post-title">${title}</h2>
       <p class="post-text">${text}</p>
       <div class="tags">
        ${tags.map((tag) => `<a href="#${tag}" class="tag">#${tag}</a>`).join('')}
       </div>
     </div>
     <div class="post-footer">
       <div class="post-buttons">
         <button class="post-button likes">
           <svg width="19" height="20" class="icon icon-like">
             <use xlink:href="img/icons.svg#like"></use>
           </svg>
           <span class="likes-counter">${like}</span>
         </button>
         <button class="post-button comments">
           <svg width="21" height="21" class="icon icon-comment">
             <use xlink:href="img/icons.svg#comment"></use>
           </svg>
           <span class="comments-counter">${comments}</span>
         </button>
         <button class="post-button save">
           <svg width="19" height="19" class="icon icon-save">
             <use xlink:href="img/icons.svg#save"></use>
           </svg>
         </button>
         <button class="post-button share">
           <svg width="17" height="19" class="icon icon-share">
             <use xlink:href="img/icons.svg#share"></use>
           </svg>
         </button>
       </div>
       <div class="post-author">
         <div class="author-about">
           <a href="#" class="author-username">${author.displayName}</a>
           <span class="post-time">${date}</span>
         </div>
         <a href="#" class="author-link"><img src="${
           author.photo || 'img/avatar.jpeg'
         }" alt="avatar" class="author-avatar"></a>
       </div>
     </div>
   </section>
     `;
  });
  postsWrapper.innerHTML = postHTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

const init = () => {
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
    setUsers.logOut();
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
  buttonNewPost.addEventListener('click', (e) => {
    e.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    console.log(title, text, tags);
    if (title.value.length < 6) {
      alert('Заголовок слишком мал!');
      return;
    }
    if (text.value.length < 16) {
      alert('Текста слишком мало!');
      return;
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  loginForget.addEventListener('click', (e) => {
    e.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
  });

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
};

document.addEventListener('DOMContentLoaded', init);
