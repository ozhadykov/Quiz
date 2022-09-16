const questions = [
  {
    'id' : 1,
    'question' : 'Lorem ipsum dolor, sit amet consectetur adipisicing?',
    'answer1' : 'lsjkgblsj',
    'answer2' : 'skjfgbsrjk',
    'answer3' : 'slrjgbsrjgb',
    'correct' : 'skjfgbsrjk',
  },
  {
    'id' : 2,
    'question' : 'quetions number 2?',
    'answer1' : 'lsjkgblsj2',
    'answer2' : 'skjfgbsrjk2',
    'answer3' : 'slrjgbsrjgb2',
    'correct' : 'slrjgbsrjgb2',
  },

]

//Root Functions
//Message shower
function showMessage(text) {
  window.alert(text)
}
//Button coloring
function ShowButtonMessage(color, btn) {
  btn.style.backgroundColor = color
}
//sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//Start again button
function createStartAgain() {
  const controls = document.querySelector('.controls')
  controls.removeChild(document.querySelector('.start'))
  controls.removeChild(document.querySelector('.end'))

  const newBtn = document.createElement('button')
  newBtn.id = 'controlbtn'
  newBtn.classList = 'start-again'
  newBtn.innerText = 'Start Again'

  controls.appendChild(newBtn)
  newBtn.addEventListener('click', startQuiz)
}

//Start and End btns
function createStartEndBtn() {
  const controls = document.querySelector('.controls')
  const start = document.createElement('button')
  const end = document.createElement('button')
  const removeBtn = document.querySelector('.start-again')

  start.id = 'controlbtn'
  start.classList = 'start'
  start.innerText = 'Start'

  end.id = 'controlbtn'
  end.classList = 'end'
  end.innerText = 'End'

  controls.appendChild(start)
  controls.appendChild(end)
  controls.removeChild(removeBtn)
  started = false
  ended = false
  curQuestion = 0
  correctAnswers = 0
}

//Calculating Animation
async function calculateResults() {
  const container = document.querySelector('.question-container')
  const div = document.createElement('div')
  div.classList = 'downloading-field'
  container.appendChild(div)
  
  for(let i = 0; i < 30; i++){
    div.style.width = `${i}vw`
    console.log('i')
    await sleep(100)
  }
   clearField('.question-container', '.downloading-field')
}
//Show Results In UI
function showResults() {
  const container = document.querySelector('.question-container')
  const div = document.createElement('div')
  div.classList = 'results-field'

  div.innerHTML = `
    <p>Good Job, you have scored ${correctAnswers} points of ${questions.length}</p>
  `

  container.appendChild(div)
}

//Clear question field 
function clearField(from, what) {
  const toRemove = document.querySelector(what)
  document.querySelector(from).removeChild(toRemove)
}

//Adding Questions to the html
function addQuestion(id) {
  const questionContainer = document.querySelector('.question-container')

  const questionDiv = document.createElement('div')
  questionDiv.classList.add('question')

  questionDiv.innerHTML = `
    <p>${questions[id].question}</p>
    <button class="ans" value="${questions[id].answer1}">${questions[id].answer1}</button>
    <button class="ans" value="${questions[id].answer2}">${questions[id].answer2}</button>
    <button class="ans" value="${questions[id].answer3}">${questions[id].answer3}</button>
  `

  questionContainer.appendChild(questionDiv)
}

//^^Root functions^^

//All variables
let curQuestion = 0
let started = false
let ended = false
let correctAnswers = 0

//All constants
const startBtn = document.querySelector('.start')
const endBtn = document.querySelector('.end')

//Start button eventlistener
startBtn.addEventListener('click', startQuiz)
//Starting quiz function
function startQuiz () {
  if (document.querySelector('.results-field') !== null){
    clearField('.question-container', '.results-field')
    createStartEndBtn()
  }  
  if (started === false) {
    setNewQuestion(curQuestion)
    started = true
    startChecking()
  } else {
    showMessage('You have alredy started quiz')
  }  

}

//ending quiz event listener
endBtn.addEventListener('click', endQuiz)
//ending quiz function
async function endQuiz() {
  if (!started) {
    showMessage('Plese start the quiz, if you want to end it!')
  } else if (!ended){
    ended = true
    if (document.querySelector('.question') !== null){
      showMessage(`You have ${questions.length - curQuestion} question/s, which you did not answer, are you sure?`)
      clearField('.question-container', '.question')
    }  
    //Create start again button
    createStartAgain()
    //Animation of calculating results
    calculateResults()
    await sleep(3500)
    //Showing Results
    showResults()
  }
}

//function for setting new questions
function setNewQuestion (id) {
  if (id === questions.length) {
    clearField('.question-container' ,'.question')
    endQuiz()
  } else if (id !== 0) {
    clearField('.question-container' ,'.question')
    addQuestion(id)
  } 
  if (id === 0) {
    addQuestion(id)
  }

}

//Adding eventlisteners for quiz butons
function startChecking () {
  if (started === true) {
    const buttons = document.querySelectorAll('.ans')
    buttons.forEach((btn) => {
      btn.addEventListener('click',  async () => {
        if (btn.value === questions[curQuestion].correct) {
          correctAnswers += 1
          ShowButtonMessage('green', btn)
          await sleep(500)
        } else {
          ShowButtonMessage('red', btn)
          await sleep(500)
        }

        curQuestion += 1
        setNewQuestion(curQuestion)  
        startChecking()

      })
    })
  }
}

