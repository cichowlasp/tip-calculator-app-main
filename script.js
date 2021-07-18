let billInput = document.querySelector('input[bill]');
let total = document.querySelector('div[total]');

billInput.addEventListener('input', () => {
	total.textContent = `$${parseFloat(billInput.value).toFixed(2)}`;
	if (billInput.value === '') total.textContent = `$0.00`;
});
