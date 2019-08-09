const openMenu = () => {
    if(!document.querySelectorAll('.menu-burger__bar').forEach(bar => bar.classList.contains('menu-burger__bar--active'))){
        document.querySelectorAll('.menu-burger__bar').forEach(bar => bar.classList.toggle('menu-burger__bar--active'));
    }
    document.querySelector('.menu-mobile').classList.toggle('menu-mobile--active');
}

document.querySelector('.menu-burger').addEventListener('click', openMenu)