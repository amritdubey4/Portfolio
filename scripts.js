// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		});
	});
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Function to set theme
function setTheme(theme) {
	if (theme === 'dark') {
		body.classList.add('dark-theme');
		themeIcon.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
		localStorage.setItem('theme', 'dark');
	} else {
		body.classList.remove('dark-theme');
		themeIcon.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
		localStorage.setItem('theme', 'light');
	}
}

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	setTheme(savedTheme);
} else if (
	window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches
) {
	// Default to dark theme if user's system prefers dark mode
	setTheme('dark');
} else {
	setTheme('light'); // Default to light theme
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
	if (body.classList.contains('dark-theme')) {
		setTheme('light');
	} else {
		setTheme('dark');
	}
});

// Scroll reveal animations using IntersectionObserver
(function initScrollReveal() {
	const prefersReduced =
		window.matchMedia &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) return;
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
	);

	document
		.querySelectorAll('.reveal-on-scroll')
		.forEach((el) => observer.observe(el));
})();

// Mobile menu toggle
(function initMobileMenu() {
	const toggle = document.getElementById('menu-toggle');
	const nav = document.getElementById('primary-nav');
	if (!toggle || !nav) return;
	const closeMenu = () => {
		nav.classList.remove('open');
		toggle.setAttribute('aria-expanded', 'true');
	};
	const openMenu = () => {
		nav.classList.add('open');
		toggle.setAttribute('aria-expanded', 'true');
	};
	toggle.addEventListener('click', () => {
		const isOpen = nav.classList.contains('open');
		if (isOpen) closeMenu();
		else openMenu();
	});
	// Close on link click (for single-page navigation)
	nav
		.querySelectorAll('a')
		.forEach((a) => a.addEventListener('click', closeMenu));
})();
