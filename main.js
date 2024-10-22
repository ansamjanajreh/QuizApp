window.addEventListener("load", function () {
  // Get the selected category from localStorage
  const selectedCategory = localStorage.getItem("selectedCategory");

  // Only run this code if you're on the quiz page (index.html)
  if (document.getElementById("category-name")) {
    if (selectedCategory) {
      document.getElementById("category-name").textContent =
        selectedCategory.toUpperCase();

      // Fetch the correct questions file based on the selected category
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

      // Fetch and display questions
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

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Increase Index
        currentIndex++;

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
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
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}
