const selectbtn = document.querySelector(".select-btn");
const instructions = document.querySelector(".instructions");
const exitbtn = document.querySelector(".exit-btn");
const contbtn = document.querySelector(".continue-btn");

const main = document.querySelector(".main");

selectbtn.onclick = () => {
  instructions.classList.add("active");
  main.classList.add("active");
};
exitbtn.onclick = () => {
  instructions.classList.remove("active");
  main.classList.remove("active");
};
contbtn.onclick = () => {
  window.location.href = "./pages/category.html";
};
