import { getPostsPaginated } from './js/getPosts.js';
import { renderPosts } from './js/renderPosts.js';
import { updatePost } from './js/updatePost.js';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const editPostForm = document.getElementById('editPostModal');
const savePostButton = document.getElementById('savePostButton');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
const closeModalButton = document.getElementById('closeModal');

let currentPage = 1;
const postsPerPage = 10;
let editingPostId = null; // ID для редагованого поста

// Завантаження постів із серверу
async function fetchAndRenderPosts(page = 1, query = '') {
  console.log(`Fetching posts for page ${page} with query "${query}"`);
  try {
    const posts = await getPostsPaginated(page, postsPerPage, query);
    renderPosts(posts, query); // Рендер постів з фільтрацією
    currentPageSpan.textContent = `Сторінка: ${page}`;
  } catch (error) {
    console.error('Помилка завантаження постів:', error);
  }
}

// Обробник пошуку
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    console.log(`Searching for posts with query: ${query}`);
    await fetchAndRenderPosts(1, query);
    searchInput.value = ''; // Очищаємо поле після пошуку
  } else {
    console.warn('Порожній запит, завантажую пости з пагінацією');
    fetchAndRenderPosts(currentPage); // Завантажуємо пости без пошуку
  }
});

// Обробники пагінації
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchAndRenderPosts(currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  currentPage++;
  fetchAndRenderPosts(currentPage);
});

// Обробка редагування поста
document.addEventListener('click', async e => {
  if (e.target.classList.contains('editPostButton')) {
    const postId = e.target.dataset.id;
    console.log(`Редагуємо пост ${postId}`);

    // Отримуємо пост за ID та заповнюємо форму
    const posts = await getPostsPaginated(1, postsPerPage);
    const postToEdit = posts.find(post => post.id == postId);

    titleInput.value = postToEdit.title;
    contentInput.value = postToEdit.content;
    editingPostId = postId; // Зберігаємо ID редагованого поста

    // Відображаємо форму редагування
    editPostForm.style.display = 'block';
  }

  if (e.target.classList.contains('deletePostButton')) {
    const postId = e.target.dataset.id;
    console.log(`Видаляємо пост ${postId}`);
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
      });
      fetchAndRenderPosts(currentPage); // Оновлюємо список після видалення
    } catch (error) {
      console.error('Помилка видалення поста:', error);
    }
  }

  // Обробка закриття модального вікна
  if (e.target === closeModalButton || e.target === editPostForm) {
    editPostForm.style.display = 'none'; // Закриваємо модальне вікно
    editingPostId = null; // Скидаємо ID редагованого поста
    titleInput.value = ''; // Очищаємо поля
    contentInput.value = '';
  }
});

// Збереження змін в пості
savePostButton.addEventListener('click', async () => {
  if (editingPostId) {
    const updatedPost = {
      title: titleInput.value,
      content: contentInput.value,
    };

    // Викликаємо функцію оновлення поста
    try {
      await updatePost(editingPostId, updatedPost.title, updatedPost.content);
      console.log('Пост оновлено!');
      fetchAndRenderPosts(currentPage); // Оновлюємо список постів
      editPostForm.style.display = 'none'; // Закриваємо модальне вікно
      titleInput.value = ''; // Очищаємо поля
      contentInput.value = '';
      editingPostId = null; // Скидаємо ID редагованого поста
    } catch (error) {
      console.error('Помилка оновлення поста:', error);
    }
  }
});

// Ініціалізація: Завантажуємо пости при першому запуску
fetchAndRenderPosts(currentPage);
