const daysInput = document.querySelector(".input-days");
const monthsInput = document.querySelector(".input-months");
const yearsInput = document.querySelector(".input-years");
const yearsResultLabel = document.querySelector(".years-result");
const monthsResultLabel = document.querySelector(".months-result");
const daysResultLabel = document.querySelector(".days-result");
const form = document.querySelector(".card");
let anyError = false;

document.querySelectorAll("input[type='number']").forEach((el) => {
  el.addEventListener("input", function (e) {
    const target = e.target;
    if (target.value.length > target.dataset.maxlength) {
      target.value = target.value.slice(0, target.dataset.maxlength);
    }
  });
});

const isInputEmpty = function (input) {
  if (!input) {
    anyError = true;
    return true;
  }
  return false;
};

const isInputNumber = function (input) {
  return typeof input === "number";
};

const isAValidDate = function (date) {
  if (date >= 1 && date <= 31) return true;
  anyError = true;
  return false;
};

const isAValidMonth = function (month) {
  if (month >= 1 && month <= 12) return true;
  anyError = true;
  return false;
};

const isAValidYear = function (year) {
  const currentYear = new Date().getFullYear();
  if (+year <= +currentYear) return true;
  anyError = true;
  return false;
};

const isADateExist = function (date, month, year) {
  switch (month) {
    case 1:
      if (date >= 1 && date <= 31) return true;
      break;
    case 2:
      if (year % 4 === 0) {
        if (date >= 1 && date <= 29) return true;
      }
      if (date >= 1 && date <= 28) return true;
      break;
    case 3:
      if (date >= 1 && date <= 31) return true;
      break;
    case 4:
      if (date >= 1 && date <= 30) return true;
      break;
    case 5:
      if (date >= 1 && date <= 31) return true;
      break;
    case 6:
      if (date >= 1 && date <= 30) return true;
      break;
    case 7:
      if (date >= 1 && date <= 31) return true;
      break;
    case 8:
      if (date >= 1 && date <= 31) return true;
      break;
    case 9:
      if (date >= 1 && date <= 30) return true;
      break;
    case 10:
      if (date >= 1 && date <= 31) return true;
      break;
    case 11:
      if (date >= 1 && date <= 30) return true;
      break;
    case 12:
      if (date >= 1 && date <= 31) return true;
      break;

    default:
      anyError = true;
      return false;
      break;
  }
};

const addErrorStyle = function (className, errMessage = "") {
  const inputEl = document.querySelector(`.input-${className}`);
  const labelEl = document.querySelector(`.label-${className}`);
  const messageEl = document.querySelector(`.message-${className}`);
  messageEl.innerText = errMessage;

  // remove input from default syle
  inputEl.classList.remove("border-offWhite");
  inputEl.classList.remove("border-offWhite");
  inputEl.classList.remove("focus:border-purple");
  inputEl.classList.remove("outline-purple");
  // add input error syle
  inputEl.classList.add("border-lightRed");
  inputEl.classList.add("border-lightRed");
  inputEl.classList.add("focus:border-lightRed");
  inputEl.classList.add("outline-lightRed");

  labelEl.classList.remove("text-smokeyGrey");
  labelEl.classList.add("text-lightRed");
};

const removeErrorStyle = function (className) {
  const inputEl = document.querySelector(`.input-${className}`);
  const labelEl = document.querySelector(`.label-${className}`);
  const messageEl = document.querySelector(`.message-${className}`);
  messageEl.innerText = "";

  // remove input from default syle
  inputEl.classList.add("border-offWhite");
  inputEl.classList.add("border-offWhite");
  inputEl.classList.add("focus:border-purple");
  inputEl.classList.add("outline-purple");
  // add input error syle
  inputEl.classList.remove("border-lightRed");
  inputEl.classList.remove("border-lightRed");
  inputEl.classList.remove("focus:border-lightRed");
  inputEl.classList.remove("outline-lightRed");

  labelEl.classList.add("text-smokeyGrey");
  labelEl.classList.remove("text-lightRed");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const day = daysInput.value;
  const month = +monthsInput.value;
  const year = +yearsInput.value;

  removeErrorStyle("days");
  removeErrorStyle("months");
  removeErrorStyle("years");
  anyError = false;

  if (!isADateExist(day, month, year)) {
    addErrorStyle("years");
    addErrorStyle("months");
    addErrorStyle("days", "Must be a valid date");
  }

  // invalid error
  if (!isAValidYear(year)) addErrorStyle("years", "Must be in the past");
  if (!isAValidMonth(month)) addErrorStyle("months", "Must be a valid month");
  if (!isAValidDate(day)) addErrorStyle("days", "Must be a valid date");

  // empty error
  if (isInputEmpty(year)) addErrorStyle("years", "This Field is Required");
  if (isInputEmpty(month)) addErrorStyle("months", "This Field is Required");
  if (isInputEmpty(day)) addErrorStyle("days", "This Field is Required");

  // calculate process when no error
  if (!anyError) {
    const start = new Date(`${year}-${month}-${day}`);
    const now = new Date();

    let yearsPassed = now.getFullYear() - start.getFullYear();
    let monthsPassed = now.getMonth() - start.getMonth();
    let daysPassed = now.getDate() - start.getDate();

    // Menghandle kasus jika hari lahir lebih besar dari hari sekarang
    if (monthsPassed < 0 || (monthsPassed === 0 && daysPassed < 0)) {
      yearsPassed--;
      monthsPassed += 12;
    }

    // Menghandle kasus jika tanggal sekarang lebih kecil dari tanggal lahir
    if (daysPassed < 0) {
      const previousMonthDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        start.getDate()
      );
      const difference = Math.floor(
        (now - previousMonthDate) / (1000 * 60 * 60 * 24)
      );
      daysPassed = difference;
      monthsPassed--;
    }

    yearsResultLabel.innerText = yearsPassed;
    monthsResultLabel.innerText = monthsPassed;
    daysResultLabel.innerText = daysPassed;
  }
});
