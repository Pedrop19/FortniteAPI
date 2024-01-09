let btn = document.querySelectorAll('.sidebarCollapse');
let sidebar = document.getElementById('sidebar');

btn.forEach(function (btn) {
    btn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            btn.classList.add('active');
        } else {      
            btn.classList.remove('active');
        }
    });
});