const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }
});

const wpm = document.querySelector("#wpm");
const accuracy = document.querySelector("#accuracy")


const texts = [
  "The quick brown fox jumps over the lazy dog",
  "JavaScript powers the modern web applications",
  "Typing tests improve your focus and accuracy",
  "Practice daily to get faster and more efficient",
  "Coding is not about syntax but problem solving",
  "Frontend and backend work together as a team",
  "Debugging is twice as hard as writing the code",
  "A good developer always keeps learning new skills",
  "Clean code is easy to read and simple to maintain",
  "Errors are proof that you are trying and improving"
];


function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  oscillator.type = "square"; 
  oscillator.frequency.setValueAtTime(800, ctx.currentTime); // Hz
  oscillator.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.2); 
}



function getWPM(str , inpStr){
    const strArr = str.trim().split(/\s+/);
    const inpArr = inpStr.trim().split(/\s+/);
    
    const n = strArr.length;
    const m = inpArr.length;
    const min = Math.min(n, m);

    let matched = 0;
    for (let i = 0; i < min; i++) {
        if (strArr[i] === inpArr[i]) {
            matched++;
        }
    }
    wpm.textContent = matched;
    let accu = ((matched / n) * 100).toFixed(2);
    accuracy.textContent = accu;
}


const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    const timer = document.querySelector("#timer");
    const inp = document.querySelector("#input");
    const quote = document.querySelector("#quote");
    const random = Math.floor(Math.random() * texts.length);
   


    const str =texts[random];
    quote.textContent = str;
    inp.removeAttribute("disabled");
    inp.value = "";
    inp.focus();
    wpm.textContent = "0";
    accuracy.textContent = "0";


    let count = 60;
    let t = setInterval(() => {
        timer.textContent = count;
        console.log(count)
        if (count > 0) {
            count--;
        }
        else if (count == 0) {
            inp.setAttribute("disabled", "true");
            startBtn.disabled = false;
            clearInterval(t);
            getWPM(str , inp.value);

        }
        if(count < 2){
            playBeep();
        }
        
    }, 1000);
});