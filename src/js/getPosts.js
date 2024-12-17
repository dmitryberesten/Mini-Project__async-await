export async function getPostsPaginated(
  page = 1,
  postsPerPage = 10,
  query = ''
) {
  // Формуємо URL для запиту на сервер
  const url = query
    ? `http://localhost:3000/posts?title_like=${encodeURIComponent(
        query
      )}&_page=${page}&_limit=${postsPerPage}`
    : `http://localhost:3000/posts?_page=${page}&_limit=${postsPerPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Помилка отримання постів');
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('getPostsPaginated Error:', error);
  }
}
