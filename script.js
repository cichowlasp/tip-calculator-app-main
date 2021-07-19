let billInput = document.querySelector('input[bill]');
let total = document.querySelector('div[total]');
let tipContainer = document.querySelectorAll('div[class=option]');
let peopleInput = document.querySelector('input[people]');
let tipAmount = document.querySelector('div[tip]');
let selectedTip;

billInput.addEventListener('input', () => {
	total.textContent = `$${parseFloat(billInput.value).toFixed(2)}`;
	if (billInput.value === '') total.textContent = `$0.00`;
});

tipContainer.forEach((element) => {
	element.addEventListener('click', () => {
		tipContainer.forEach((element) => {
			if (element.classList.contains('active')) {
				element.classList.remove('active');
			}
		});
		element.classList.add('active');
		selectedTip = element;
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

const calculateTip = () => {
	const percent = percentsValues[selectedTip.textContent];
	const price = parseInt(billInput.value);
	const peopleNumber = parseInt(peopleInput.value);
	tipAmount.textContent = `$${((percent * price) / peopleNumber).toFixed(2)}`;
	console.log(peopleInput.value);
	if (selectedTip.textContent === '' || peopleInput.value === '')
		tipAmount.textContent = (percent * billInput.value).toFixed(2);
};

peopleInput.addEventListener('input', () => {
	calculateTip();
});
