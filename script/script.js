document.onreadystatechange = function(){
    if(document.readyState === "complete"){
        const menuLinks = document.querySelectorAll('.navmenu a');
        for (const item of menuLinks) {
            item.addEventListener('click', (e) => {
                setActiveSection(e.target.hash);
            })
        }
    const burger = document.getElementById("burger");
    burger.addEventListener('click', () => {
        const menuItem = document.querySelector('.navmenu');
        menuItem.classList.toggle('active');
    });
    const menu = document.querySelector('.navmenu');
    window.onresize = () => {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
    let storedSection = localStorage.getItem('activeSection');
    if (storedSection !== undefined) {
        setActiveSection(storedSection);
    }
    }
}

function setActiveSection(name) {
    const setActive = document.querySelector(name);
    setActive.style.display = "block";
    localStorage.setItem('activeSection', name);
    const sections = document.querySelectorAll('#content>div');
    for (const section of sections) {
        if (section !== setActive){
            section.style.display = 'none';
        }
    }
    if(name==='#products')
        if(!$.fn.DataTable.isDataTable(('#productTable')))
            refreshTable();
}

function refreshTable(){
    fetch('script/db.json').then(
        response => response.json()
    ).then(data => {
        $('#productTable').DataTable({
            data: data.pumps,
            columns: [
                { data: 'id',visible:false},
                { data: 'name', orderData: 0, type:'num'},
                { data: 'description', type:'string' },
                { data: 'price' , type: "num-fmt"}
            ]
        });
    });
}