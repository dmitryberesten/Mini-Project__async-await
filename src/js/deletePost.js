const BASE_URL = 'http://localhost:3000/posts';

// Видалення поста
export async function deletePost(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Не вдалося видалити пост');
  } catch (error) {
    console.error('deletePost Error:', error);
  }
}
