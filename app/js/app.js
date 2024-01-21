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

	/** (Start) Swiper **/

	const swiperReviews = new Swiper('.swiper-reviews', {
		slidesPerView: 3,
		spaceBetween: 60,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-reviews-next',
			prevEl: '.swiper-reviews-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 60,
			}
		}
	})

	const swiperCardBigger = new Swiper('.swiper-card', {
		slidesPerView: 5,
		spaceBetween: 48,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-card-next',
			prevEl: '.swiper-card-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 32,
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 32,
			},
			1600: {
				slidesPerView: 5,
				spaceBetween: 48,
			}
		}
	})

	const swiperImage = new Swiper('.swiper-image', {
		slidesPerView: 4,
		spaceBetween: 48,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-image-next',
			prevEl: '.swiper-image-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 32,
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 32,
			},
			1600: {
				slidesPerView: 4,
				spaceBetween: 48,
			}
		}
	})

	const swiperHolidayDetail = new Swiper('.swiper-holiday-detail', {
		slidesPerView: 1,
		spaceBetween: 40,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-holiday-detail-next',
			prevEl: '.swiper-holiday-detail-prev',
		},
	})

	const swiperDetailImageThumb = new Swiper('.swiper-image-detail-thumb', {
		slidesPerView: 4,
		spaceBetween: 20,
		grabCursor: true,
		watchSlidesProgress: true,
		breakpoints: {
			0: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			400: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			576: {
				slidesPerView: 4,
				spaceBetween: 20
			},
		}
	})

	const swiperDetailImage = new Swiper('.swiper-image-detail', {
		slidesPerView: 1,
		spaceBetween: 40,
		grabCursor: true,
		thumbs: {
			swiper: swiperDetailImageThumb,
		},
	})

	/** (End) Swiper **/

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

	/** (Start) Modal **/
	const modalButtons = document.querySelectorAll('[data-modal-target]');

	function removePageScroll() {
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
	}

	function addPageScroll() {
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
	}

	if (modalButtons.length > 0) {
		modalButtons.forEach(function (button) {
			button.addEventListener('click', function () {
				const target = this.getAttribute('data-modal-target');
				const modal = document.querySelector(target);

				modal.style.display = 'block';
				removePageScroll()
			});
		});
	}

	const closeModalButtons = document.querySelectorAll('[data-modal-dismiss="modal"]');

	if (closeModalButtons.length > 0) {
		closeModalButtons.forEach(function (button) {
			button.addEventListener('click', function () {
				const modal = button.closest('.modal');

				modal.style.display = '';
				addPageScroll()
			});
		});
	}

	const modals = document.querySelectorAll('.modal');

	if (modals.length > 0) {
		modals.forEach(function (modal) {
			modal.addEventListener('click', function (event) {
				if (event.target === modal) {
					modal.style.display = '';
					addPageScroll()
				}
			});
	
			document.addEventListener('keydown', function (event) {
				if (event.key === 'Escape') {
					modal.style.display = '';
					addPageScroll()
				}
			});
	
			window.addEventListener('popstate', function (event) {
				modal.style.display = '';
				addPageScroll()
			});
		});
	}
	/** (End) Modal **/

	/** (Start) Load Video **/

	const wrapperVideo = document.querySelectorAll('.wrapper-video')

	if (wrapperVideo.length > 0) {
		wrapperVideo.forEach((item) => {
			const preview = item.querySelector('.preview')
	
			function appendVideo(container, element) {
				const srcVideo = element.getAttribute('data-src-video');
				const srcYoutube = element.getAttribute('data-src-youtube');
			
				if (srcYoutube !== null && srcYoutube !== '') {
					if (container.classList.contains('is-ready')) {
						return;
					}
			
					const iframeElement = document.createElement('iframe');
					iframeElement.setAttribute('src', srcYoutube);
					iframeElement.setAttribute('title', 'YouTube video player');
					iframeElement.setAttribute('frameborder', '0');
					iframeElement.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
					iframeElement.setAttribute('allowfullscreen', '');
			
					container.classList.add('is-ready');
					container.appendChild(iframeElement);
				} else if (srcVideo !== null && srcVideo.trim() !== '') {
					if (container.classList.contains('is-ready')) {
						return;
					}
			
					const videoElement = document.createElement('video');
					videoElement.setAttribute('controls', 'controls');
			
					const sourceElement = document.createElement('source');
					sourceElement.setAttribute('src', srcVideo);
					sourceElement.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
			
					container.classList.add('is-ready');
					videoElement.appendChild(sourceElement);
					container.appendChild(videoElement);
				}
			}
	
			preview.addEventListener('click', function () {
				appendVideo(item, preview);
			});
		})
	}

	/** (End) Load Video **/

})
