const questions = [
    {
        questionText: 'What is the capital of France?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Dublin', isCorrect: false },
        ],
    },
    {
        questionText: 'Who is CEO of Tesla?',
        answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Bill Gates', isCorrect: false },
            { answerText: 'Tony Stark', isCorrect: false },
        ],
    },
    {
        questionText: 'The iPhone was created by which company?',
        answerOptions: [
            { answerText: 'Apple', isCorrect: true },
            { answerText: 'Intel', isCorrect: false },
            { answerText: 'Amazon', isCorrect: false },
            { answerText: 'Microsoft', isCorrect: false },
        ],
    },
    {
        questionText: 'How many Harry Potter books are there?',
        answerOptions: [
            { answerText: '1', isCorrect: false },
            { answerText: '4', isCorrect: false },
            { answerText: '6', isCorrect: false },
            { answerText: '7', isCorrect: true },
        ],
    },
]

const questionsElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionsElement.innerHTML = questionNo + "." + currentQuestion.questionText
    currentQuestion.answerOptions.forEach(answer=>{
        const button = document.createElement("button")
        button.innerHTML = answer.answerText
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.isCorrect){
            button.dataset.correct = answer.isCorrect
        }
        button.addEventListener("click", selectAnswer)
    })

}
function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

}
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct == 'true'
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct == 'true'){
            button.classList.add('correct') 
        }
        button.disabled  = true
    })
    nextButton.style.display = 'block'
}

function showScore(){
    resetState()
    questionsElement.innerHTML = `You Scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = 'block'
}
function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex <questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }
    else{
        startQuiz()
    }
})


startQuiz()