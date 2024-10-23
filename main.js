window.addEventListener("load", function () {
  const selectedCategory = localStorage.getItem("selectedCategory");

  if (document.getElementById("category-name")) {
    if (selectedCategory) {
      document.getElementById("category-name").textContent =
        selectedCategory.toUpperCase();

      let jsonFile;
      switch (selectedCategory) {
        case "html":
          jsonFile = "./data/html-questions.json";
          break;
        case "css":
          jsonFile = "./data/css-questions.json";
          break;
        case "js":
          jsonFile = "./data/js-questions.json";
          break;
        default:
          jsonFile = "./data/html_questions.json";
      }

      getQuestions(jsonFile);
    }
  }
});
let countSpan = document.querySelector(".count span");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");

let currentIndex = 0;
function getQuestions(jsonFile) {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      createBullets(qCount);

      addQuestionData(questionsObject[currentIndex], qCount);

      submitButton.onclick = () => {
        currentIndex++;

        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        addQuestionData(questionsObject[currentIndex], qCount);
      };
    }
  };

  myRequest.open("GET", jsonFile, true);
  myRequest.send();
}

getQuestions(jsonFile);

function createBullets(num) {
  countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");

      mainDiv.className = "answer";

      let radioInput = document.createElement("input");

      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      if (i === 1) {
        radioInput.checked = true;
      }
      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);
      theLabel.appendChild(theLabelText);
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answersArea.appendChild(mainDiv);
    }
  }
}
