let currentPage = 1;
const postsPerPage = 10;

// Функція для отримання постів з пагінацією
async function getPostsPaginated(page = 1) {
  try {
    const response = await fetch(
      `http://localhost:3000/posts?_page=${page}&_limit=${postsPerPage}`
    );
    if (!response.ok) throw new Error('Помилка отримання постів');
    const posts = await response.json();
    renderPosts(posts);

    // Оновлення тексту номера сторінки
    document.getElementById('currentPage').textContent = `Сторінка: ${page}`;
  } catch (error) {
    console.error('Помилка пагінації:', error);
  }
}

// Функція для пошуку постів
async function searchPosts(query) {
  console.log('Пошуковий запит:', query); // Перевірка, чи є значення query
  try {
    const response = await fetch(
      `http://localhost:3000/posts?title_like=${query}`
    );
    if (!response.ok) throw new Error('Помилка при отриманні пошуку');
    const posts = await response.json();
    console.log('Знайдені пости:', posts); // Лог для перевірки відповіді сервера
    renderPosts(posts);
  } catch (error) {
    console.error('Помилка пошуку:', error);
  }
}

// Функція для відображення постів
function renderPosts(posts) {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = ''; // Очищуємо контейнер

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <button class="editPostButton" data-id="${post.id}">Редагувати</button>
      <button class="deletePostButton" data-id="${post.id}">Видалити</button>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Обробники подій для пагінації
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getPostsPaginated(currentPage);
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  currentPage++;
  getPostsPaginated(currentPage);
});

// Обробник події для пошуку
document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    console.log('Виконую пошук для запиту:', query); // Лог перевірки
    searchPosts(query);
  } else {
    console.warn('Порожній запит, завантажую пости з пагінацією');
    getPostsPaginated(currentPage);
  }
});

// Ініціалізація
getPostsPaginated(currentPage);
