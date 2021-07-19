let billInput = document.querySelector('input[bill]');
let total = document.querySelector('div[total]');
let tipContainer = document.querySelectorAll('div[class=option]');
let peopleInput = document.querySelector('input[people]');
let tipAmount = document.querySelector('div[tip]');
let selectedTip;

billInput.addEventListener('input', () => {
	calculateTotal();
	if (billInput.value === '') total.textContent = `$0.00`;
});

const removeActiveClass = () => {
	tipContainer.forEach((element) => {
		if (element.classList.contains('active')) {
			element.classList.remove('active');
		}
	});
};

tipContainer.forEach((element) => {
	element.addEventListener('click', () => {
		removeActiveClass();
		element.classList.add('active');
		selectedTip = element;
		calculateTotal();
		calculateTip();
	});
});

const percentsValues = {
	'5%': 0.05,
	'10%': 0.1,
	'15%': 0.15,
	'25%': 0.25,
	'50%': 0.5,
};

const calculateTotal = () => {
	const percent = percentsValues[selectedTip.textContent];
	const price = parseInt(billInput.value);
	const peopleNumber = parseInt(peopleInput.value);
	total.textContent = `$${((price * percent + price) / peopleNumber).toFixed(
		2
	)}`;
	if (selectedTip.textContent === '' || peopleInput.value === '')
		total.textContent = `$${(price * percent + price).toFixed(2)}`;
};

const calculateTip = () => {
	const percent = percentsValues[selectedTip.textContent];
	const price = parseInt(billInput.value);
	const peopleNumber = parseInt(peopleInput.value);
	tipAmount.textContent = `$${((percent * price) / peopleNumber).toFixed(2)}`;
	if (selectedTip.textContent === '' || peopleInput.value === '')
		tipAmount.textContent = `$${(percent * billInput.value).toFixed(2)}`;
};

peopleInput.addEventListener('input', () => {
	calculateTip();
	calculateTotal();
});
