console.log(question);
console.log(answers);
document.getElementById("modal__btn-close").addEventListener("click", (e) => closeModalWindow());
document.getElementById("modal__check__option-1").addEventListener("click", (e) => { closeModalWindow(e); checkAnswer(answerElement); });
document.getElementById("modal__check__option-2").addEventListener("click", (e) => { closeModalWindow(e); });


var answerElement = null;
const startNewGame = document.getElementById("new-game");
var correctGivenAnswers = round;
startNewGame.addEventListener("click", (e) => window.location.href = `/money?correct_answers=${correctGivenAnswers}&end=true`);

const checkAnswer = async (e) => {
    e = (typeof(e) === "object") ? e : e.target;
    answerPointerEvents();
    colorAnswer(e, "yellow");
    await wait(2000);
    (e.parentNode.getElementsByClassName("answer-content__value")[0].innerText === question.correct) ? rightAnswer(e) : wrongAnswer(e);
}

const wrongAnswer = (element) => {
    console.log("1");
    colorAnswer(element, "red");
    flashAnswer(Array.from(document.getElementsByClassName("answer-content__value")).filter(elem => elem.innerText === question.correct)[0]);

}

const rightAnswer = async (element) => {
    console.log("1");
    colorAnswer(element, "green");
    correctGivenAnswers++;
    window.location.href = `/money?correct_answers=${correctGivenAnswers}`;
}

const openModalWindow = (e) => {
    document.getElementById("modal").style.display = "block";
}

const closeModalWindow = (e) => {
    document.getElementById("modal").style.display = "none";
}

const flashAnswer = async (element) => {
    var currentColor = "green";
    for (let i = 0; i < 38; i++) {
        currentColor = (currentColor == "yellow") ? "green" : "yellow";
        colorAnswer(element, currentColor);
        await wait(591);
        if (i == 4) startNewGame.style.display = "flex";
    }
}

function wait(ms) { return new Promise (resolve => setTimeout(resolve, ms)); }

function colorAnswer(element, color) {
    var arr = [element, ...getAllSiblingsOfElement(element), ...Array.from(element.parentNode.parentNode.childNodes).filter(item => item.nodeType !== 3)];
    for (const item of arr) {
        if (!item.className.includes("arrow")) item.style.backgroundColor = color;
        else {
            (item.className.includes("left")) ? item.style.borderRightColor = color : item.style.borderLeftColor = color;;
        }
    }
}

function getAllSiblingsOfElement(e) {
    var result = [];
    var element = e.parentNode.firstChild;

    while (element)  {
        if (element !== e && element.nodeType === Node.ELEMENT_NODE) 
        result.push(element);
        element = element.nextElementSibling || element.nextSibling;
    }
    return result;
}

function gameWasWon() {
    answer = "";
}

answerContents = document.getElementsByClassName("answer-content");
for (const answer of answerContents) answer.addEventListener("click", (e) => { openModalWindow(e); answerElement = e.target.parentNode.getElementsByClassName("answer-content__value")[0]} );

function answerPointerEvents() {
    for (const answer of Array.from(document.getElementsByClassName("answer"))) answer.style.pointerEvents = (answer.style.pointerEvents == "") ? "none" : "";
}

console.log(round);