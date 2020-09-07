const home = document.querySelector(".js-home"),
    homeTitle = home.querySelector(".js-home-title"),
    homeButton = home.querySelector(".js-home-button"),
    info = document.querySelector(".js-info"),
    userInfo = info.querySelector(".js-user-info"),
    qna = document.querySelector(".js-qna"),
    barInner = qna.querySelector(".js-bar-inner");
    question = qna.querySelector(".js-question"),
    answer = qna.querySelector(".js-answer"),
    qnaHR = qna.querySelector("hr"),
    loading = document.querySelector(".js-loading"),
    result = document.querySelector(".js-result"),
    footer = document.querySelector(".js-footer");

const HIDE_CN = "hide";
const ANSWER_BOX_CN = "answer-box";
const QUESTION_ANI_CN = "question-ani";
const ANSWER_ANI_CN = "answer-ani";
const QNA_HR_CN = "qna-hr";
const USER_INFO = "userInfo";
const USER_ANSWER = "userAnswer";
let userAnswerList = [];
let currentIndex = 0;

function resultEvent() {
    const userResult = document.createElement("div");
    result.appendChild(userResult);
    userResult.innerText = `결과 표시할 위치`;
}

function loaded() {
    loading.classList.add(HIDE_CN);
    result.classList.remove(HIDE_CN);
    resultEvent();
}

function loadingEvent() {
    setTimeout(loaded, 3000);
}

function clearAnswer(ol) {
    answer.removeChild(ol);
}

function saveAnswer(event) {
    const userAnswer = event.target;
    const li = userAnswer.parentNode;
    const ol = li.parentNode;
    userAnswerList.push(userAnswer.value);
    localStorage.setItem(USER_ANSWER, userAnswerList);
    clearAnswer(ol);

    currentIndex++;
    if (currentIndex !== qnaList.length) {
        question.classList.remove(QUESTION_ANI_CN);
        answer.classList.remove(ANSWER_ANI_CN);
        qnaHR.classList.remove(QNA_HR_CN);
        void question.offsetWidth;
        void answer.offsetWidth;
        void qnaHR.offsetWidth;
        qnaEvent();
    } else {
        qna.classList.add(HIDE_CN);
        loading.classList.remove(HIDE_CN);
        loadingEvent();
    }
}

function printAnswerList(index) {
    if (index === currentIndex) {
        const ol = document.createElement("ol");

        for (let i = 0; i < qnaList[index].a.length; i++) {
            const li = document.createElement("li");
            const answerButton = document.createElement("button");
            answerButton.innerText = qnaList[index].a[i].answer;
            answerButton.value = qnaList[index].a[i].type;
            answerButton.addEventListener("click", saveAnswer);
            answerButton.classList.add(ANSWER_BOX_CN);
            li.appendChild(answerButton);
            ol.appendChild(li);
        }
        answer.appendChild(ol);
        answer.classList.add(ANSWER_ANI_CN);
    }
}

function printQuestion(index) {
    question.innerHTML = `Q${index + 1}. ${qnaList[index].q}`;
    question.classList.add(QUESTION_ANI_CN);
    switch(index) {
        case 0:
            barInner.classList.add("firstq");
            break;
        case 1:
            barInner.classList.add("secondq");
            break;
        case 2:
            barInner.classList.add("thirdq");
            break;
        case 3:
            barInner.classList.add("fourthq");
            break;
        case 4:
            barInner.classList.add("fifthq");
            break;
    }
}

function qnaEvent() {
    for (let i = 0; i <= currentIndex; i++) {
        printQuestion(i);
        printAnswerList(i);
        qnaHR.classList.add(QNA_HR_CN);
    }
}

function saveUser(value) {
    localStorage.setItem(USER_INFO, JSON.stringify(value));
}

function handleSubmit(event) {
    event.preventDefault();
    const user = {
        year: document.getElementsByName("year")[0].value,
        month: document.getElementsByName("month")[0].value,
        day: document.getElementsByName("day")[0].value,
        calender: document.getElementsByName("calender")[0].checked ? "solar" : "lunar",
        time: document.getElementsByName("time")[0].value,
        name: document.getElementsByName("userName")[0].value,
        gender: document.getElementsByName("gender")[0].checked ? "male" : "female"
    };
    saveUser(user);
    info.classList.add(HIDE_CN);
    qna.classList.remove(HIDE_CN);
}

function infoEvent() {
    userInfo.addEventListener("submit", handleSubmit);
}

function handleClick(event) {
    event.preventDefault();
    home.classList.add(HIDE_CN);
    info.classList.remove(HIDE_CN);
}

function createRandom(num) {
    return Math.floor(Math.random()*num);
}

function titleText() {
    let randomNumber = createRandom(todaysMenu.length);
    homeTitle.innerHTML = `"${todaysMenu[randomNumber]}"`;
}

function hideOtherSec() {
    info.classList.add(HIDE_CN);
    qna.classList.add(HIDE_CN);
    loading.classList.add(HIDE_CN);
    result.classList.add(HIDE_CN);
}

function homeEvent() {
    hideOtherSec();
    titleText();
    homeButton.addEventListener("click", handleClick);
}

function init() {
    homeEvent();
    infoEvent();
    qnaEvent();
}

init();