var Questions = { "question" : [
    {
      "question"  : "What is the name of Draco Malfoy's son?",
       "choice1"  : "Scorpius",
       "choice2"  : "Lucius",
       "choice3"  : "Diego",
       "choice4"  : "Severus",
       "choice5"  : "Dane",                    
       "correct"  : 1
    },
    
    {
      "question"  : "What creature does Dumbledore have as a pet?",
       "choice1"  : "Efreet",
       "choice2"  : "Fey",
       "choice3"  : "Troll",
       "choice4"  : "Phoenix",
       "choice5"  : "Basilisk",                    
       "correct"  : 4
    },
    
    {
      "question"  : "What is Voldemort's final horcrux?",
       "choice1"  : "A mirror",
       "choice2"  : "A snake",
       "choice3"  : "A brooch",
       "choice4"  : "Harry Potter",
       "choice5"  : "A violin",                    
       "correct"  : 2
    },
    
    {
      "question"  : "Who takes over as headmaster of Hogwarts after Dumbledore's death?",
       "choice1"  : "Voldemort",
       "choice2"  : "Narcissa Black",
       "choice3"  : "Professor Trelawny",
       "choice4"  : "Delores Umbridge",
       "choice5"  : "Professor Snape",                    
       "correct"  : 5
    },
    
    {
      "question"  : "Who killed Deatheater Antonin Dolohov during the Battle of Hogwarts?",
       "choice1"  : "Professor Flitwick",
       "choice2"  : "Ron Weasley",
       "choice3"  : "Falling Debris",
       "choice4"  : "Hermione Granger",
       "choice5"  : "A Troll",                    
       "correct"  : 1
    }
  ]};

const question = document.getElementById("question");
const a_rep = document.getElementById("a_rep");
const b_rep = document.getElementById("b_rep");
const c_rep = document.getElementById("c_rep");
const d_rep = document.getElementById("d_rep");
const e_rep = document.getElementById("e_rep");
const clickButton = document.getElementById("submit")
const quizz = document.body;

let currentQuestion = 0;
let score = 0;
  
loadQuizz();

function loadQuizz() {
  resetSelector();
  const currentQuestionData = Questions["question"][currentQuestion];

  question.innerText = currentQuestionData.question;
  a_rep.innerText = currentQuestionData.choice1;
  b_rep.innerText = currentQuestionData.choice2;
  c_rep.innerText = currentQuestionData.choice3;
  d_rep.innerText = currentQuestionData.choice4;
  e_rep.innerText = currentQuestionData.choice5;

}

function getSelected(){
  const responses = document.querySelectorAll(".answer");
  let reponse = undefined;
  responses.forEach((response) => {
    if(response.checked){
      reponse = response.id;
    }
  });
  return reponse;
}

function resetSelector(){
  const responses = document.querySelectorAll(".answer");
  responses.forEach((response) => {
    response.checked = false;
  });
}

clickButton.addEventListener('click', () => {
  
  const answer = getSelected();
  if(answer){
    if(answer == Questions["question"][currentQuestion].correct){
      score++;
    }
    currentQuestion++;
    if(currentQuestion <= Questions["question"].length-1){
      loadQuizz();
    }
    else {
      quizz.innerHTML = '<div class="quizz-container"><h1> Vous avez obtenu '+score+'/'+Questions["question"].length+'</h1>'
      +'<button onClick=location.reload()>Rejouer</button></div>';
    }
  }
});



  