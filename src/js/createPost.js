const BASE_URL = 'http://localhost:3000/posts';

// Створення нового поста
export async function createPost(title, content) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) throw new Error('Не вдалося створити пост');
    return await response.json();
  } catch (error) {
    console.error('createPost Error:', error);
  }
}
