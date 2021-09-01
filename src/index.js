import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const form = document.querySelector('#form')
const firstName = form.querySelector('#firstName')
const lastName = form.querySelector('#lastName')
const userName = form.querySelector('#userName')
const email = form.querySelector('#email')
const password = form.querySelector('#password')
const confirmPassword = form.querySelector('#confirmPassword')


form.addEventListener('submit', (e) => {
	e.preventDefault()

	checkInputs()
})

function checkInputs() {
	const firstNameValue = firstName.value.trim()
	const lastNameValue = lastName.value.trim()
	const userNameValue = userName.value.trim()
	const emailValue = email.value.trim()
	const passwordValue = password.value.trim()
	const confirmPasswordValue = confirmPassword.value.trim()

	function initListeners() {
		firstName.addEventListener('input', (e) => {
			firstNameValidation(e.target.value)
		})

		lastName.addEventListener('input', (e) => {
			lastNameValidation(e.target.value)
		})

		email.addEventListener('input', (e) => {
			emailValidation(e.target.value)
		})

		userName.addEventListener('input', (e) => {
			userNameValidation(e.target.value)
		})

		password.addEventListener('input', (e) => {
			passwordValidation(e.target.value)
		})

		confirmPassword.addEventListener('input', (e) => {
			confirmPasswordValidation(e.target.value, password.value)
		})

	}

	initListeners()

	firstNameValidation(firstNameValue)

	lastNameValidation(lastNameValue)

	userNameValidation(userNameValue)

	emailValidation(emailValue)

	passwordValidation(passwordValue)

	confirmPasswordValidation(passwordValue, confirmPasswordValue)
}

function setSuccessFor(item) {
	const formItem = item.parentElement
	const label = formItem.querySelector('label')
	const input = formItem.querySelector('input')


	label.textContent = ''

	label.classList.remove('invalid')
	input.classList.remove('invalid')
	label.classList.add('valid')
	input.classList.add('valid')
}

function setErrorFor(item, message) {
	const formItem = item.parentElement
	const label = formItem.querySelector('label')
	const input = formItem.querySelector('input')

	label.textContent = message

	label.classList.add('invalid')
	input.classList.add('invalid')
	label.classList.remove('valid')
	input.classList.remove('valid')
}

function userNameValidation(value) {
	if (value === '') {
		setErrorFor(userName, 'Please enter a User Name')
	} else if (!lengthIsCorrect(value, 4)) {
		setErrorFor(userName, 'Your User Name must consist of at least 4 characters')
	} else {
		setSuccessFor(userName)
	}
}

function firstNameValidation(value) {
	if (value === '') {
		setErrorFor(firstName, 'Please enter your First Name')
	} else {
		setSuccessFor(firstName)
	}
}

function lastNameValidation(value) {
	if (value === '') {
		setErrorFor(lastName, 'Please enter your Last Name')
	} else {
		setSuccessFor(lastName)
	}
}

function emailValidation(value) {
	if (value === '') {
		setErrorFor(email, 'Please enter a valid Email Address')
	} else if (!isEmail(value)) {
		setErrorFor(email, 'Email is invalid')
	} else {
		setSuccessFor(email)
	}
}

function passwordValidation(value) {
	if (value === '') {
		setErrorFor(password, 'Please provide a password')
	} else if (!lengthIsCorrect(value, 6)) {
		setErrorFor(password, 'Your Password must be at least 6 characters long')
	} else if (!passwordIsValid(value)) {
		setErrorFor(password, 'Password is invalid')
	} else {
		setSuccessFor(password)
	}
}

function confirmPasswordValidation(value, pswdValue) {
	if (value === '') {
		setErrorFor(confirmPassword, 'Please provide a password')
	} else if (!passwordIsTheSame(value, pswdValue)) {
		setErrorFor(confirmPassword, 'Password not the same')
	} else {
		setSuccessFor(confirmPassword)
	}
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function passwordIsValid(password) {
	return /[0-9]/.test(password) && /[A-Z\s]+/.test(password)
}

function passwordIsTheSame(password, confirmPassword) {
	return password === confirmPassword
}

function lengthIsCorrect(value, length) {
	return value.length > length
}

