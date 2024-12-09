const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.add('open');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

window.addEventListener('click', (event) => {
    if (event.target !== sidebar && !sidebar.contains(event.target) && event.target !== menuButton) {
        sidebar.classList.remove('open');
    }
});