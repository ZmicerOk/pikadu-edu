//islamov code
let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
});

//1-st lesson consts
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
//2-nd lesson consts
const exitElem = document.querySelector('.exit'),
  editElem = document.querySelector('.edit-info'),
  editContainer = document.querySelector('.edit-conatiner'),
  editUserName = document.querySelector('.edit-username'),
  editPhotoUrl = document.querySelector('.edit-photo'),
  userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

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
    urlPhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLbPURGP3tu5EH1KWYtOfsq9QQUdLW8SvQQA&usqp=CAU',
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

const setPosts = {
  allPosts: [
    {
      title: 'заголовок поста',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, cupiditate incidunt? Ea deserunt quaerat ipsum nihil nostrum velit maiores adipisci! Nostrum amet ut saepe dolor quis similique soluta tempore! Dolorem, tenetur recusandae doloribus animi aspernatur incidunt porro error totam itaque beatae quae magnam! Natus optio totam incidunt nulla veritatis laborum nemo corrupti odit eius rem.',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'max@mail.com',
      date: '11.11.2020, 20:54:00',
      likes: 13,
      comments: 22,
    },
    {
      title: 'заголовок поста2',
      text:
        'NeДалеко a blizko за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'kate@mail.com',
      date: '10.11.2020, 22:54:00',
      likes: 113,
      comments: 2,
    },
  ],
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

const showAllPosts = () => {
  let postHTML = '';
  setPosts.allPosts.forEach(({ title, text, likes, comments, author, date, tags }) => {
    postHTML += `
     <section class="post">
     <div class="post-body">
       <h2 class="post-title">${title}</h2>
       <p class="post-text">${text}</p>
       <div class="tags">
        ${tags.map((tag) => `<a href="#" class="tag">#${tag}</a>`).join('')}
       </div>
     </div>
     <div class="post-footer">
       <div class="post-buttons">
         <button class="post-button likes">
           <svg width="19" height="20" class="icon icon-like">
             <use xlink:href="img/icons.svg#like"></use>
           </svg>
           <span class="likes-counter">${likes}</span>
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
           <a href="#" class="author-username">${author}</a>
           <span class="post-time">${date}</span>
         </div>
         <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
       </div>
     </div>
   </section>
     `;
  });
  postsWrapper.innerHTML = postHTML;
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

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', init);
