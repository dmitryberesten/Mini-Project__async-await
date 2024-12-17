export function renderPosts(posts, query) {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = ''; // Очистка контейнера перед додаванням нових постів

  // Якщо постів немає
  if (posts.length === 0) {
    postsContainer.innerHTML = '<p>Пости не знайдено.</p>';
    return;
  }

  // Рендерим всі пости або фільтруємо їх за запитом
  const filteredPosts = posts.filter(post => {
    return (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Якщо є фільтровані пости, додаємо їх в контейнер
  if (filteredPosts.length > 0) {
    filteredPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="editPostButton" data-id="${post.id}">Редагувати</button>
        <button class="deletePostButton" data-id="${post.id}">Видалити</button>
      `;
      postsContainer.appendChild(postElement);

      // Обробник для кнопки Редагувати
      const editButton = postElement.querySelector('.editPostButton');
      editButton.addEventListener('click', () => {
        const postId = post.id;
        const title = post.title;
        const content = post.content;

        // Логіка для редагування поста
        editPost(postId, title, content);
      });

      // Обробник для кнопки Видалити
      const deleteButton = postElement.querySelector('.deletePostButton');
      deleteButton.addEventListener('click', () => {
        const postId = post.id;

        // Логіка для видалення поста
        deletePost(postId);
      });
    });
  } else {
    postsContainer.innerHTML = '<p>Пости не знайдено за цим запитом.</p>';
  }
}

// Функція редагування поста
function editPost(postId, title, content) {
  console.log(`Редагуємо пост ${postId}`);
  const titleInput = document.getElementById('titleInput');
  const contentInput = document.getElementById('contentInput');
  const form = document.getElementById('editPostForm');

  // Перевірка на наявність елементів на сторінці
  if (titleInput && contentInput && form) {
    titleInput.value = title; // Заповнюємо поля вводу значеннями поста
    contentInput.value = content;

    // Показуємо форму
    form.classList.add('active');

    // Зберігаємо зміни
    const saveButton = document.getElementById('savePostButton');
    saveButton.addEventListener('click', () => {
      savePost(postId, titleInput.value, contentInput.value);
      form.classList.remove('active'); // Приховуємо форму після збереження
    });
  } else {
    console.error('Не знайдено елементи для редагування');
  }
}


// Функція для збереження змін
function savePost(postId, newTitle, newContent) {
  console.log(`Зберігаємо пост ${postId} з новим заголовком: ${newTitle} та змістом: ${newContent}`);
  // Тут додайте логіку для збереження змін на сервері через API
}


// Функція видалення поста
function deletePost(postId) {
  console.log(`Видаляємо пост ${postId}`);
  // Додайте логіку для видалення поста з сервера
}
