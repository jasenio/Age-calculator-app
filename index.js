
const errorState = () => {
    const calcDay = document.querySelector('.dayCalc');
    calcDay.style.color = 'hsl(0, 100%, 67%)';
    const calcMonth = document.querySelector('.monthCalc');
    calcMonth.style.color = 'hsl(0, 100%, 67%)';
    const calcYear = document.querySelector('.yearCalc');
    calcYear.style.color = 'hsl(0, 100%, 67%)';
    const inputBoxes = document.querySelectorAll('input[type="number"]');
    for (const inputBox of inputBoxes) {
        inputBox.style.border = '1px solid hsl(0, 100%, 67%)';
    }
}
const resetErrorState = () => {
    const calcDay = document.querySelector('.dayCalc');
    calcDay.style.color = 'hsl(0, 0%, 8%)';
    const calcMonth = document.querySelector('.monthCalc');
    calcMonth.style.color = 'hsl(0, 0%, 8%)';
    const calcYear = document.querySelector('.yearCalc');
    calcYear.style.color = 'hsl(0, 0%, 8%)';
    const inputBoxes = document.querySelectorAll('input[type="number"]');
    for (const inputBox of inputBoxes) {
        inputBox.style.border = '1px solid hsl(0, 0%, 8%)';
    }
}
const displayError = (errorMessage, timeUnit) => {
    errorState();
    const display = document.querySelector(timeUnit);
    display.innerText = errorMessage;
}
const displayAge = (valid, years, months, days) =>{
    const displayDay = document.querySelector('.displayDay');
    const displayMonth = document.querySelector('.displayMonth');
    const displayYear = document.querySelector('.displayYear');
    if (!valid){
        displayDay.innerText = "- -";
        displayMonth.innerText = "- -";
        displayYear.innerText = "- -";
    }
    else{
        resetErrorState();
        let upto = displayYear.innerText === "- -"? 0 : parseInt(displayYear.innerText);
        displayYear.innerText = upto;
        let counts = setInterval(function() {
            if (upto < years) displayYear.innerText = ++upto;
            else if (upto > years) displayYear.innerText = --upto;
            if (upto === years){
                clearInterval(counts);
            }
        }, 2000/(1+Math.abs(years-upto)));
        let upto1 = displayMonth.innerText === "- -"? 0 : parseInt(displayMonth.innerText);
        displayMonth.innerText = upto1;
        let counts1 = setInterval(function() {
            if (upto1 < months) displayMonth.innerText = ++upto1;
            else if (upto1 > months) displayMonth.innerText = --upto1;
            if (upto1 === months){
                clearInterval(counts1);
            }
        }, 2000/(1+Math.abs(months-upto1)));
        let upto2 = displayDay.innerText === "- -"? 0 : parseInt(displayDay.innerText);
        displayDay.innerText = upto2;
        let counts2 = setInterval(function() {
            if (upto2 < days) displayDay.innerText = ++upto2;
            else if (upto2 > days) displayDay.innerText = --upto2;
            if (upto2 === days){
                clearInterval(counts2);
            }
        }, 2000/(1+Math.abs(days-upto2)));
    }
}
const checkErrorState = () => {
    let noError = true;
    const inputDay = parseInt(document.getElementById('day').value);
    const inputMonth = parseInt(document.getElementById('month').value);
    const inputYear = parseInt(document.getElementById('year').value);
    const date = new Date();
    const currentDay = parseInt(String(date.getDate()).padStart(2, '0'));
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    let maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let years = 0;
    let months = 0;
    let days = 0;

    if (inputYear === ''){
        noError = false;
        errorState();
        displayError('This field is required', '.yearError');
    }
    else if (inputYear > currentYear){
        noError = false;
        errorState();
        displayError('Must be in the past', '.yearError');
    }
    else{
        document.querySelector('.yearError').innerText = "";
    }

    if (inputMonth === ''){
        noError = false;
        errorState();
        displayError('This field is required', '.monthError');
    }
    else if (inputMonth > 12 || inputMonth === 0 || (inputYear === currentYear && inputMonth > currentMonth)){
        noError = false;
        errorState();
        displayError('Must be a valid month', '.monthError');
    }
    else{
        document.querySelector('.monthError').innerText = "";
    }

    if (inputDay === ''){
        noError = false;
        errorState();
        displayError('This field is required', '.dayError');
    }
    else if (inputDay > maxDays[inputMonth-1] || inputDay === 0 || (inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay)){
        noError = false;
        errorState();
        displayError('Must be a valid day', '.dayError');
    }
    else{
        document.querySelector('.dayError').innerText = "";
    }

    if (noError){
        years = currentYear - inputYear;
        if (currentMonth < inputMonth){
            years -= 1;
            months = 12 - inputMonth + currentMonth;
        }
        else{
            months = currentMonth-inputMonth;
        }
        if (currentDay < inputDay){
            months-= 1;
            if (currentMonth - 1 === 0) days = currentDay + 31 - inputDay;
            else{
                days = currentDay + maxDays[currentMonth -2] - inputDay;
            }
            if (months < 0){
                years -= 1;
                months = 11;
            }
        }
        else{
            days = currentDay - inputDay;
        }
    }
    displayAge(noError, years, months, days);
}

const calculate = document.querySelector('button');
calculate.addEventListener('click', checkErrorState);

