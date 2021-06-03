let burgerMenu = document.getElementById('burgerMenu');
let y = document.getElementById('another');
let d = document.getElementById('thisBaby');

// Handling navbar

const originalIcon = burgerMenu.innerHTML
let navBarOpen = false;

const openNavbar = () => {

    let changedIcon = '<span id="BurgerMenu" class="iconify burger-menu" data-inline="false" data-icon="akar-icons:cross"></span>'
    

    const navBar = document.getElementById('navbar')


    if (!navBarOpen) {
        navBar.style.display = 'block';
        burgerMenu.innerHTML = changedIcon;
        navBarOpen = true;
    } else {
        navBar.style.display = 'none';
        burgerMenu.innerHTML = originalIcon;
        navBarOpen = false;
    }
}



burgerMenu.onclick = openNavbar;

