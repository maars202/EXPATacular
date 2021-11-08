console.log("I'm working!")
const startButton = document.getElementById('startBtn')
const nextButton = document.getElementById('nextBtn')
const triviaBody = document.getElementById('triviaBody')
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const additionalInfo = document.getElementById("additionalInfo")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame(){   
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}


// question parameter is a question object from questions array
function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("triviaBtn")
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    }) 
}

function resetState(){
    additionalInfo.innerHTML = ""
    clearStatusClass(triviaBody)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// logic for what happends after every selection of an answer
function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(triviaBody, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    additionalInfo.innerHTML = shuffledQuestions[currentQuestionIndex]['info']
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }

}

// changes class of an element to change colour in html
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else{
        element.classList.add('wrong')
    }
}

// Removes any pre-existing class from an element
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



/* 

QUESTIONS BANK

*/

// questions array contains an array of question objects
const questions = [

    {
        question: "In which year did Singapore Gain Independence?",
        answers: [
            {text: "1965", correct: true},
            {text: "1959", correct: false},
            {text: "1963", correct: false},
            {text: "1968", correct: false}
        ],
        info: "Singapore became an independent republic on the <strong>9 August 1965</strong>, after its seperation from Malaysia"
    },


    {
        question: "What is the national language of Singapore?",
        answers: [
            {text: "English", correct: false},
            {text: "Chinese", correct: false},
            {text: "Malay", correct: true},
            {text: "Tamil", correct: false}
        ],
        info: "Although Singapore's official languages included Malay, Tamil, Mandarin Chinese and English, the national language of Singapore is Malay, which plays a symbolic role, as Malays are constitutionally recognised as the indigenous peoples of Singapore"
    },


    {
        question: "Who was Singapore's first Prime Minister?",
        answers: [
            {text: "Lee Hsien Loong", correct: false},
            {text: "Lee Kuan Yew", correct: true},
            {text: "Yusof Ishak", correct: false},
            {text: "Goh Chok Tong", correct: false}
        ],
        info: "Mr Lee Kuan Yew is widely regarded as the <strong>nation's founding father</strong> and served as the first prime minister of Singapore from 1959 to 1990"
    },

    {
        question: "Military service is mandatory for all males in Singapore",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false},

        ],
        info: "<strong>National Service (NS)</strong> is a term that describes the national policy in Singapore that requires all male Singaporean citizens and second-generation permanent residents to serve a period of compulsory service in the uniformed services when they reach the age of majority"
    },


    {
        question: "There have been a total of __ Singlish words that have made it to the oxford dictionary",
        answers: [
            {text: "3", correct: false},
            {text: "14", correct: false},
            {text: "27", correct: true},
            {text: "36", correct: false}

        ],
        info: "Singlish is a variety of English spoken in Singapore, incorporating elements of Chinese and Malay."
    },

    {
        question: "Which is the best module in Singapore Management University's Information System undergraduate programme?",
        answers: [
            {text: "WAD", correct: true},
            {text: "IDP", correct: false},
            {text: "BPAS", correct: false},
            {text: "WADII", correct: true}

        ],
        info: "WAD or Web Application Development is a highly useful module which equips students with basic skills regarding web development"
    },

    {
        question: "What does MRT stand for?",
        answers: [
            {text: "Mass Rapid Transit", correct: true},
            {text: "Mono Rail Transport", correct: false},
            {text: "Mass Rapid Transport", correct: false},
            {text: "Most Reliable Transport", correct: false}

        ],
        info: "The MRT is the country's principal mode of railway transportation and spans across the entire island!"
    },

    {
        question: "A majority of Singaporeans live in a ______",
        answers: [
            {text: "Condominium", correct: false},
            {text: "Bungalow", correct: false},
            {text: "HDB Flat", correct: true},
            {text: "Terrace Estate", correct: false}

        ],
        info: "As Singapore is a very small island, space is extremely limited. The Singaporean government decided to build HDB flats instead of houses. Thus, it would take up less space."
    },

    {
        question: "A majority of Singaporeans live in a ______",
        answers: [
            {text: "Condominium", correct: false},
            {text: "Bungalow", correct: false},
            {text: "HDB Flat", correct: true},
            {text: "Terrace Estate", correct: false}

        ],
        info: "As Singapore is a very small island, space is extremely limited. The Singaporean government decided to build HDB flats instead of houses. Thus, it would take up less space."
    },

    {
        question: "What is the highest point of Singapore?",
        answers: [
            {text: "Sentosa Island", correct: false},
            {text: "Redhill", correct: false},
            {text: "Bukit Timah Hill", correct: true},
            {text: "Mount Faber", correct: false}

        ],
        info: "Bukit Timah Hill is the highest point in the island of Singapore. Its height is about 176 m/ 577 ft."
    },

    {
        question: "What language is the medium of instruction in Singaporean schools?",
        answers: [
            {text: "English", correct: true},
            {text: "Malay", correct: false},
            {text: "Chinese", correct: false},
            {text: "Tamil", correct: false}

        ],
        info: "Prime Minister Lee believed that widespread English proficiency would be key to building Singapore’s economy and developing its regional and global competitiveness. Under his plan, English would become the medium of instruction in Singaporean schools"
    },

    {
        question: "Chewing Gum is Legal in Singapore",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true}


        ],
        info: "The sale of chewing gum in Singapore has been illegal since 1992. Since 2004, an exception has existed for therapeutic, dental, and nicotine chewing gum, which can be bought from a doctor or registered pharmacist."
    },

]