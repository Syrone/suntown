// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	/** (Start) Variables CSS **/
	const transitionDuration = getComputedStyle(document.documentElement).getPropertyValue('--transition-duration').match(/\d+/)[0];
	/** (End) Variables CSS **/

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

	/** (Start) MixItUp **/
	const mixerSectionConfig = {
		classNames: {
			elementFilter: 'control-section'
		},
		load: {
			filter: '.progression'
		},
		selectors: {
			control: '.mixitup-control-section',
			target: '.control-section',
		},
		animation: {
			duration: 250,
			nudge: false,
			reverseOut: false,
			effects: "fade"
		},
		callbacks: {
			onMixClick: function (state, originalEvent) {
				const getText = originalEvent.target.innerText
				const setTextButtons = document.querySelectorAll('[data-get-text="mixitup-control-section"]')

				setTextButtons.forEach(button => {
					button.textContent = getText
				})
			}
		}
	}

	const mixerBranchConfig = {
		multifilter: {
			enable: true,
		},
		selectors: {
			control: '.mixitup-control-card',
			target: '.control-card',
		},
		animation: {
			duration: 250,
			nudge: false,
			reverseOut: false,
			effects: "fade"
		}
	}
	const catalogContents = document.querySelectorAll('.catalog-content');
	const catalogMains = document.querySelectorAll('.catalog-main');
	
	catalogMains.forEach((card) => {
		const mixerCatalog = mixitup(card, mixerSectionConfig);
	});
	
	catalogContents.forEach((card) => {
		const mixerBranch = mixitup(card, mixerBranchConfig);
	});
	
	const setActiveButtons = document.querySelectorAll('.mixitup-control-section-active')
	const getTextButtons = document.querySelectorAll('[data-get-text="mixitup-control-section"]')
	setActiveButtons.forEach(button => {
		const getText = button.innerText
		
		getTextButtons.forEach(button => {
			button.textContent = getText
		})
	})

	/** (End) MixItUp **/

	/** (Start) Set is-active Buttons Filter **/
	const containerFilters = document.querySelectorAll('[data-container-filter]')

	if (containerFilters.length > 0) {
		containerFilters.forEach((container) => {
			const buttonFilters = container.querySelectorAll('[data-filter]')

			setActiveButton(buttonFilters)
		})
	}

	function setActiveButton(button) {
		button.forEach((btn) => {
			btn.addEventListener('click', function () {
				button.forEach((btn) => {
					btn.classList.remove('is-active')
				})

				btn.classList.add('is-active')
			})
		})
	}
	/** (End) Set is-active Buttons Filter **/

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

	/** (Start) Accordion **/

	const accordions = document.querySelectorAll('.accordion')

	if (accordions.length > 0) {
		accordions.forEach((accordion) => {
			const button = accordion.querySelector('.accordion-button')
			const content = accordion.querySelector('.accordion-content')

			button.addEventListener('click', () => {
				if (!(accordion.classList.contains('is-open'))) {
					content.style.width = content.scrollWidth + 'px';
					setTimeout(() => {
						content.style = '';
					}, parseInt(transitionDuration));
				}

				accordion.classList.toggle('is-open');
			});

		})
	}

	/** (End) Accordion **/


})
