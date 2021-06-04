const burgerMenu = document.getElementById('burgerMenu');
const closeMenu = document.getElementById('closeMenu');
const navBar = document.getElementById('navbar');

// Handling navbar

let navbarOpen = false;

const openNavbar = () => {

    if (!(window.screen.width < 768)) return

    if (!navbarOpen) {
        burgerMenu.style.display = 'none';
        closeMenu.style.display = 'flex';

        navBar.animate([
            {transform: 'translate(0, 0)', offset: 0},
            {transform: 'translate(0, 250px)', offset: 1}
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        })

        navbarOpen = true;

    } else {
        burgerMenu.style.display = 'flex';
        closeMenu.style.display = 'none';

        navBar.animate([
            {transform: 'translate(0, 250px)'},
            {transform: 'translate(0, -250px)'}
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        })

        navbarOpen = false;
    }

    
}

burgerMenu.onclick = openNavbar;
closeMenu.onclick = openNavbar;

const navButtons = document.getElementsByClassName('nav-btn');
for (var i = 0, len = navButtons.length; i < len; i++) {
  navButtons[i].addEventListener("click", openNavbar);
}


