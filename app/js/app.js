// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	/** (Start) Active Nav Menu **/
	const navLinks = document.querySelectorAll('.nav-link');
	const currentPage = window.location.href;

	navLinks.forEach(function (link) {
		if (link.href === currentPage) {
			link.classList.add('is-active');
		}
	});
	/** (End) Active Nav Menu **/

	/** (Start) Open/Close Nav Menu **/
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
	/** (End) Open/Close Nav Menu **/

	/** (Start) Button Back **/
	const backButtons = document.querySelectorAll('.btn-back')

	if (backButtons.length > 0) {
		backButtons.forEach((button) => {
			button.addEventListener('click', () => {
				history.back();
			});
		});
	}
	/** (End) Button Back **/

	/** (Start) Set is-active Buttons Filter **/
	const loaderFilters = document.querySelectorAll('[data-loader-filter]')

	if (loaderFilters.length > 0) {
		loaderFilters.forEach((wrapperFilter) => {
			const buttonFilters = wrapperFilter.querySelectorAll('[data-filter]')

			buttonFilters.forEach((button) => {
				button.addEventListener('click', function () {
					buttonFilters.forEach((btn) => {
						btn.classList.remove('is-active');
					});

					button.classList.add('is-active');
				});
			});
		});
	}
	/** (Start) Set is-active Buttons Filter **/

	/** (Start) Save Value Filter **/
	const saveButtons = document.querySelectorAll('[data-filters-save]')

	if (saveButtons.length > 0) {
		saveButtons.forEach((saveButton) => {
			saveButton.addEventListener('click', function () {
				const activeFilters = document.querySelectorAll('[data-filter].is-active');

				const filters = [];

				activeFilters.forEach(button => {
					const filterValue = button.getAttribute('data-filter');
					filters.push(filterValue);
				});

				localStorage.setItem('filters', JSON.stringify(filters));
			});
		})
	}
	/** (End) Save Value Filter **/

	/** (Start) Get Value Filter **/
	const savedFilters = JSON.parse(localStorage.getItem('filters'));
	const loaderTargets = document.querySelectorAll('[data-loader-target]');

	if (loaderTargets.length > 0) {
		loaderTargets.forEach((loaderTarget) => {
			const filterTargets = loaderTarget.querySelectorAll('[data-filter-target]');

			filterTargets.forEach((filterTarget) => {
				let hasMatch = false;

				savedFilters.forEach((savedFilter) => {
					if (filterTarget.getAttribute('data-filter-target').includes(savedFilter)) {
						hasMatch = true;
					}
				});

				if (!hasMatch) {
					filterTarget.style.display = 'none';
				}
			});
		});
	}
	/** (End) Get Value Filter **/


})
