let countSpan = document.querySelector(".count span");
let progressStepsContainer = document.querySelector(".steps .spans");
let questionContainer = document.querySelector(".quiz-container");
let answersContainer = document.querySelector(".answers-container");
let submitButton = document.querySelector(".submit-button");
let steps = document.querySelector(".steps");
let resultsConatiner = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;
function getQuestions(jsonFile) {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;
      createSteps(qCount);
      addQuestionData(questionsObject[currentIndex], qCount);
      countdown(15, qCount);
      submitButton.onclick = () => {
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        currentIndex++;
        checkAnswer(theRightAnswer, qCount);
        questionContainer.innerHTML = "";
        answersContainer.innerHTML = "";
        addQuestionData(questionsObject[currentIndex], qCount);
        handleSteps();
        clearInterval(countdownInterval);
        countdown(15, qCount);

        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", jsonFile, true);
  myRequest.send();
}
window.addEventListener("load", function () {
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (document.getElementById("category-name")) {
    if (selectedCategory) {
      document.getElementById("category-name").textContent =
        selectedCategory.toUpperCase();

      let jsonFile;
      switch (selectedCategory) {
        case "html":
          jsonFile = "../data/html-questions.json";
          break;
        case "css":
          jsonFile = "../data/css-questions.json";
          break;
        case "js":
          jsonFile = "../data/js-questions.json";
          break;
        default:
          jsonFile = "../data/html_questions.json";
      }
      getQuestions(jsonFile);
    }
  }
});

function createSteps(num) {
  countSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let theBullet = document.createElement("span");
    if (i == 0) {
      theBullet.className = "on";
      theBullet.textContent = i + 1;
    }
    progressStepsContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);
    questionContainer.appendChild(questionTitle);

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
      answersContainer.appendChild(mainDiv);
    }
  }
}
function checkAnswer(answer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (answer === theChoosenAnswer) {
    rightAnswers++;
  }
}
function handleSteps() {
  let stepsSpans = document.querySelectorAll(".steps .spans span");
  let arrayOfSpans = Array.from(stepsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
      span.textContent = index + 1;
    }
  });
}
function showResults(count) {
  let results;
  if (currentIndex === count) {
    questionContainer.remove();
    answersContainer.remove();
    submitButton.remove();
    steps.remove();
    if (rightAnswers > count / 2 && rightAnswers < count) {
      results = `<span class="good">Good &#128522;<br><br></span> your score ${rightAnswers} out of ${count} `;
    } else if (rightAnswers === count) {
      results = `<span class="perfect">Perfect &#128512;<br><br></span> your score ${rightAnswers} out of ${count}`;
    } else {
      results = `<span class="bad">Bad &#128530;<br><br></span> your score ${rightAnswers} out of ${count} `;
    }
    resultsConatiner.innerHTML = results;
  }
}
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
