window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("splash-screen").style.display = "none";
    document.querySelector(".container").style.display = "block";
  }, 3000);

  const startTest = document.getElementById("start-btn");

  startTest.addEventListener("click", function () {
    const testCategory = document.getElementById("test-category").value;

    localStorage.setItem("selectedCategory", testCategory);
    window.location.href = "index.html";
  });
});
