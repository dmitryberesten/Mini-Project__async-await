export async function createComment(postId, comment) {
  try {
    const response = await fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, comment }),
    });
    if (!response.ok) throw new Error('Помилка створення коментаря');
    return await response.json();
  } catch (error) {
    console.error('createComment Error:', error);
  }
}
