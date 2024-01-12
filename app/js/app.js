// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	const navbarButtons = document.querySelectorAll('.navbar-button');
	const navbarCollapse = document.querySelector('.navbar-collapse');

	navbarButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			const target = button.getAttribute('data-target');

			if (target === 'open') {
				navbarCollapse.classList.add('is-open');
			} else if (target === 'close') {
				navbarCollapse.classList.remove('is-open');
			}
		});
	});

	document.addEventListener('keyup', function (event) {
		if (event.keyCode === 27) {
			navbarCollapse.classList.remove('is-open');
		}
	});

	window.addEventListener('popstate', function () {
		navbarCollapse.classList.remove('is-open');
	});

})
