// listen for submit event
const form = document.querySelector('#loan-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // make sure results are hidden
  document.querySelector('#results').style.display = 'none';
  // show loader
  document.querySelector('#loading').style.display = 'block';
  // claculate results after 2 seconds
  setTimeout(calculateResults, 2000);
});

// calculate results
function calculateResults(e) {
  // UI variables
  const amountUI = document.querySelector('#amount');
  const interestUI = document.querySelector('#interest');
  const yearsUI = document.querySelector('#years');
  const monthlyPaymentUI = document.querySelector('#monthly-payment');
  const totalPaymentUI = document.querySelector('#total-payment');
  const totalInterestUI = document.querySelector('#total-interest');

  const principal = parseFloat(amountUI.value);
  const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsUI.value) * 12;

  // compute monthly payments
  const x = (1 + calculatedInterest) ** calculatedPayments;
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPaymentUI.value = monthly.toFixed(2);
    totalPaymentUI.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestUI.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results
    document.querySelector('#results').style.display = 'block';
    // hide loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check to make sure input values are valid!');
  }

}

// show error
function showError(error) {
  // hide results
  document.querySelector('#results').style.display = 'none';
  // hide loader
  document.querySelector('#loading').style.display = 'none';
  // create error div
  const errorUI = document.createElement('div'); 
  // add bootstrap error class to the div
  errorUI.className = 'alert alert-danger';
  // set the text content of the div
  errorUI.textContent = error;
  // get position to inject errorDiv into the DOM
  const heading = document.querySelector('.heading');
  heading.after(errorUI);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// clear error
function clearError() {
  document.querySelector('.alert').remove();
}
