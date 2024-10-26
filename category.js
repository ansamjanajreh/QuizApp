const startTest = document.getElementById("start-btn");

startTest.addEventListener("click", function () {
  const testCategory = document.getElementById("test-category").value;

  localStorage.setItem("selectedCategory", testCategory);
  window.location.href = "index.html";
});

