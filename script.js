"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-12-01T17:01:17.194Z",
    "2024-12-02T23:36:17.929Z",
    "2024-12-04T10:51:36.790Z"
  ],
  currency: "EUR",
  locale: "pt-PT" // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z"
  ],
  currency: "USD",
  locale: "en-US"
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2020-01-15T09:45:22.078Z",
    "2021-06-10T14:30:12.098Z",
    "2022-03-22T11:25:45.125Z",
    "2023-08-05T18:50:55.150Z",
    "2024-09-13T07:20:18.178Z",
    "2024-12-20T22:33:30.200Z",
    "2024-04-30T16:40:10.225Z"
  ],
  currency: "JPY",
  locale: "ja-JP"
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2021-10-05T08:15:33.035Z",
    "2021-12-11T10:25:22.078Z",
    "2022-01-19T14:40:12.098Z",
    "2022-03-07T16:30:45.125Z",
    "2022-05-02T11:45:55.150Z"
  ],
  currency: "CHF",
  locale: "de-CH"
};

const account5 = {
  owner: "Muhammed Shafir",
  movements: [850, 4500, 2000, 21000, -800, -200, 600],
  interestRate: 2.3,
  pin: 5555,
  movementsDates: [
    "2023-01-15T08:30:00.000Z",
    "2023-03-22T14:15:00.000Z",
    "2023-06-05T10:00:00.000Z",
    "2023-07-19T18:45:00.000Z",
    "2023-09-21T09:30:00.000Z",
    "2023-10-11T11:50:00.000Z",
    "2023-12-01T08:05:00.000Z"
  ],
  currency: "INR",
  locale: "en-IN"
};

const account6 = {
  owner: "Vismay Lal",
  movements: [850, 4500, -2000],
  interestRate: 2.3,
  pin: 6666,
  movementsDates: [
    "2023-01-12T08:30:00.000Z",
    "2023-03-20T14:15:00.000Z",
    "2023-06-25T10:00:00.000Z"
  ],
  currency: "INR",
  locale: "ml-IN"
};
const account7 = {
  owner: "Muhammed Rafi",
  movements: [500, 2000, 7000, -2000, -500],
  interestRate: 2.3,
  pin: 7777,
  movementsDates: [
    "2024-11-04T07:18:42.301Z",
    "2024-11-10T07:18:42.301Z",
    "2024-11-20T07:18:42.301Z",
    "2024-12-03T07:18:42.301Z",
    "2024-12-04T07:18:42.301Z"
  ],
  currency: "INR",
  locale: "en-IN"
};

const accounts = [
  account1,
  account2,
  account3,
  account4,
  account5,
  account6,
  account7
];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"]
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//CODE STARTS FROM HERE

// DATE ARRANGE FUNCTION

const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return "1 Week ago";
  if (daysPassed > 7 && daysPassed < 30)
    return `${Math.floor(daysPassed / 7)} weeks ago`;
  if (daysPassed < 365) return `${Math.floor(daysPassed / 30)} Months ago`;
  // if (daysPassed > 365) return `${Math.floor(daysPassed / 365)} Year ago`;

  ///////////////////////////

  //////////////////////

  // const year = date.getFullYear();
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const hours = date.getHours();
  // const minutes = date.getMinutes();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(currentAccount.locale).format(date);
};
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

//format currency Function

const formatCurrency = function (amount, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(amount);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  //(imp)  we are doing that if sort argument is true the looping array that need to show that the sorted outputed array , other wise the original array that came from customer account

  //
  const movements = sort
    ? acc.movements.slice(0).sort((a, b) => a - b)
    : acc.movements;

  movements.forEach(function (curr, i) {
    const type = curr > 0 ? "deposit" : "withdrawal";

    // we are also looping the movementsDate array inside thid loop , its not a problem at all because the value of each arrays array have relation

    //

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMov = formatCurrency(curr, acc.locale, acc.currency);

    // removing negative sign from the formatted numb becuase now it is a string

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

/*










*/

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  // formatting tthe number

  const formattedMov = formatCurrency(acc.balance, acc.locale, acc.currency);

  // display the balance
  labelBalance.textContent = `${formattedMov}`;
};

const calcDisplaySummary = function (acc) {
  const credits = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  const formattedCredit = formatCurrency(credits, acc.locale, acc.currency);

  const debits = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  const formattedDebit = formatCurrency(debits, acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((curr) => curr > 1)
    .reduce((total, curr) => total + curr, 0);
  const formattedinterest = formatCurrency(interest, acc.locale, acc.currency);

  //
  // display total debots and credits
  //
  labelSumIn.textContent = `${formattedCredit} `;
  labelSumOut.textContent = `${formattedDebit} `;
  labelSumInterest.textContent = `${formattedinterest}`;
};

// UI update Function

const updateUI = function (acc) {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

const creatUsernames = function (acc) {
  acc.forEach(function (mov) {
    mov.username = mov.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
creatUsernames(accounts);

//

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //each call back print remaining time to user face

    labelTimer.textContent = `${min}:${sec}`;

    //timer expires 0  second stop timer and logout user

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
    // Decrease time

    time--;
  };
  //set time to 2 minutes
  let time = 120;

  //call timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

//
//
//   LOG IN
//

let currentAccount, timer;

// Fake Always Login

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

/////////////////////////////////

///////////////////////////////////

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value.toLowerCase()
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // display UI
    labelWelcome.textContent = `Welcome back ${currentAccount.owner
      .split(" ")
      .at(-1)}`;
    //currentAccount.owner.split(" ")[0]
    containerApp.style.opacity = 1;

    // create current time and date

    //         const date = new Date();
    //         const year = date.getFullYear();
    //         const month = `${date.getMonth() + 1}`.padStart(2, 0);
    //         const day = `${date.getDate()}`.padStart(2, 0);
    //         const hours =
    //             date.getHours() > 12
    //                 ? `${date.getHours() - 12}`.padStart(2, 0)
    //                 : date.getHours();
    //         const minutes =
    //             `${date.getMinutes()}`.length === 2
    //                 ? date.getMinutes()
    //                 : `${date.getMinutes()}`.padStart(2, "0");

    //         labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;

    //////////////////////

    // create current time and date

    ///////////////////////
    const date = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "long"
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(date);

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Display Movements

    // timer activate
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

//

btnTransfer.addEventListener("click", function (e) {
  //prevent default behaviour of form botton that when clicked the page reloads
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  console.log(amount);
  const receiverAccount = accounts.find(
    (curr) => curr.username === inputTransferTo.value.toLowerCase()
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  // inputTransferTo.focus();
  if (
    currentAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    //doing the transfer
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);

    // add transfer dates

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    // console.log(currentAccount);
    // console.log(receiverAccount);

    // doing the update UI
    updateUI(currentAccount);

    // resetting the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//  Account closing permanent

btnClose.addEventListener("click", function (e) {
  //prevent default behaviour of form botton that when clicked the page reloads
  e.preventDefault();

  const username = inputCloseUsername.value.toLowerCase();
  const pin = +inputClosePin.value;
  // exit focus state of input feild
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
  inputCloseUsername.blur();
  if (currentAccount.username === username && currentAccount.pin === pin) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // delete account
    accounts.splice(index, 1);

    //Hide UI

    containerApp.style.opacity = 0;
  }
});

// Loan Functionality

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  //clear input feilds and clear focus
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  const isLoanApproved = currentAccount.movements.some(
    (mov) => mov >= amount * 0.1
  );

  if (amount > 0 && isLoanApproved) {
    setTimeout(function () {
      //pushing amount
      currentAccount.movements.push(amount);

      // add transfer date

      currentAccount.movementsDates.push(new Date().toISOString());

      // Updating UI
      updateUI(currentAccount);
    }, 2000);
  }

  // resetting the timer

  clearInterval(timer);
  timer = startLogOutTimer();
});

// // Flat and Flat Map
// const total = accounts
//   .flatMap((curr) => curr.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(total);

// SORTING THE MOVEMENTS

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/*
Variable Initialization: let sorted = false; initializes a boolean variable to keep track of whether the movements are currently sorted.

Event Listener: An event listener is added to the btnSort button, which listens for click events.

Prevent Default Behavior: e.preventDefault(); prevents the default action of the click event (like submitting a form).

Display Movements: displayMovements(currentAccount, !sorted); is called with the current account and the opposite of the current sorted state to toggle sorting.

Toggle Sorted: sorted = !sorted; updates the sorted variable to its opposite value.
*/
