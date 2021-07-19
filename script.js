let billInput = document.querySelector('input[bill]');
let total = document.querySelector('div[total]');
let tipContainer = document.querySelectorAll('div[class=option]');
let peopleInput = document.querySelector('input[people]');
let tipAmount = document.querySelector('div[tip]');
let customInput = document.querySelector('[placeholder="Custom"]');
let selectedTip = 0;
let resetButton = document.querySelector('button[reset]');

const defaultValue = `$0.00`;
const percentsValues = {
	'5%': 0.05,
	'10%': 0.1,
	'15%': 0.15,
	'25%': 0.25,
	'50%': 0.5,
};

const errorMessages = {
	peopleInput: 'Must be bigger than zero',
	billInput: 'Must be bigger than zero',
};

const setInputError = (inputName, paragraph, text) => {
	let error = document.querySelector(paragraph);
	let input = document.querySelector(inputName);
	error.textContent = text;
	input.classList.add('error');
};

const clearInputError = (inputName, paragraph) => {
	let error = document.querySelector(paragraph);
	let input = document.querySelector(inputName);
	error.textContent = '';
	input.classList.remove('error');
};

billInput.addEventListener('input', () => {
	clearInputError('input[bill]', 'p[bill-error]');
	calculateTip();
	calculateTotal();
	if (billInput.value <= 0) {
		total.textContent = defaultValue;
		setInputError('input[bill]', 'p[bill-error]', errorMessages.billInput);
	}
});

const removeActiveClass = () => {
	tipContainer.forEach((element) => {
		if (element.classList.contains('active')) {
			element.classList.remove('active');
		}
	});
};

customInput.addEventListener('input', () => {
	removeActiveClass();
	selectedTip = customInput.value / 100;
	calculateTip();
	calculateTotal();
});

tipContainer.forEach((element) => {
	element.addEventListener('click', () => {
		removeActiveClass();
		element.classList.add('active');
		selectedTip = element;
		calculateTotal();
		calculateTip();
	});
});

const calculateTotal = () => {
	const percent =
		percentsValues[selectedTip.textContent] !== undefined
			? percentsValues[selectedTip.textContent]
			: selectedTip;
	const price = parseFloat(billInput.value) ? parseFloat(billInput.value) : 0;
	const peopleNumber = parseInt(peopleInput.value);
	total.textContent = `$${((price * percent + price) / peopleNumber).toFixed(
		2
	)}`;
	if (selectedTip.textContent === '' || peopleInput.value === '')
		total.textContent = `$${(price * percent + price).toFixed(2)}`;
};

const calculateTip = () => {
	const percent =
		percentsValues[selectedTip.textContent] !== undefined
			? percentsValues[selectedTip.textContent]
			: selectedTip;
	const price = billInput.value;
	const peopleNumber = parseInt(peopleInput.value);
	tipAmount.textContent = `$${((percent * price) / peopleNumber).toFixed(2)}`;
	console.log(price);
	if (selectedTip.textContent === '' || peopleInput.value === '') {
		tipAmount.textContent = `$${(percent * billInput.value).toFixed(2)}`;
	}
};

peopleInput.addEventListener('input', () => {
	if (peopleInput.value >= 1) {
		clearInputError('input[people]', 'p[people-error]');
		peopleInput.classList.remove('error');
		calculateTip();
		calculateTotal();
	} else {
		setInputError(
			'input[people]',
			'p[people-error]',
			errorMessages.peopleInput
		);
		total.textContent = defaultValue;
		tipAmount.textContent = defaultValue;
	}
});

resetButton.addEventListener('click', () => {
	removeActiveClass();
	clearInputError('input[people]', 'p[people-error]');
	clearInputError('input[bill]', 'p[bill-error]');
	billInput.value = undefined;
	customInput.value = undefined;
	peopleInput.value = undefined;
	total.textContent = defaultValue;
	tipAmount.textContent = defaultValue;
});
