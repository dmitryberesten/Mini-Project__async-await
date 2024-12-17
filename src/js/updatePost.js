const BASE_URL = 'http://localhost:3000/posts';

// Оновлення поста
export async function updatePost(id, title, content) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) throw new Error('Не вдалося оновити пост');
    return await response.json();
  } catch (error) {
    console.error('Помилка редагування поста:', error);
  }
}
