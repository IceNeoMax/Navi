function showMenu() {
    let sideBar = document.getElementById('side-bar');
    sideBar.style.left = 0;
}
function hideMenu() {
    let sideBar = document.getElementById('side-bar');
    sideBar.style.left = '-260px';
}
function showDropBox() {
    let lang = document.getElementById('lang-drop-box');
    if(lang.clientHeight == 0){
        lang.style.height = '250px';
        lang.style.border = '1px solid #616161';
    }
    else {
        lang.style.height = 0;
        lang.style.border = '0px transparent';
    }
}