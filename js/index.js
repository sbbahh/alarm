const select = document.querySelectorAll("select"),
  theTime = document.querySelector(".theTime"),
  setAlarmButton = document.querySelector(".setAlarm"),
  timeContent = document.querySelector(".time"),
  empty = document.querySelector(".empty");

let alarmTime;
let ringtone = new Audio("./Ring/file3.mp3");
let isalarm = false;
let alarmImage = document.querySelector(".alarmImage");


// ############### CLOCK ###############
// Hours
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + `${i}` : i;
  let option = `<option value="${i}">${i}</option>`;

  select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Minuts
for (let i = 0; i < 60; i++) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;

  select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Am Pm
for (let i = 0; i < 2; i++) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;

  select[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  // GET HOURS MINUTES SECONDS
  let date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  //if hours is 0 set value to 12
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  theTime.innerHTML = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    alarmImage.style = "animation-name: rotate";
}
}, 1000);

// ############### ALARM ###############

function setAlarm() {
    
    if (isalarm) {
        alarmTime = "";
        ringtone.pause();
        timeContent.classList.remove("disabled");
        setAlarmButton.innerHTML = "Set alarm";
        alarmImage.style = "animation: none";
        return isalarm = false;
    }

  let time = `${select[0].value}:${select[1].value} ${select[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minuts") ||
    time.includes("AM/PM")
  ) {
    empty.classList.add("overlay");
    let box = `
    <div class="popup"><p>Please select a valid time to set 😡!</p></div>
    `;
    document.body.innerHTML += box;
    setTimeout(() => {
      document.querySelector(".popup").remove();
      document.querySelector(".empty").remove();
      // RELOAD THE PAGE AFTER THE BOX DISAPPEAR
      location.reload();
    }, 3000);
  }
  isalarm = true;
  alarmTime = time;
  timeContent.classList.add("disabled");
  //Clear alarm
  setAlarmButton.innerHTML = "Delete alarm";
}
setAlarmButton.addEventListener("click", setAlarm);