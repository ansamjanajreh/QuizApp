function selectCategory(category) {
  localStorage.setItem('selectedCategory', category);
  window.location.href = 'index.html';
}
