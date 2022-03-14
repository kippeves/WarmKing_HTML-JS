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
    if(name==='#product')
        if(!$.fn.DataTable.isDataTable(('#product__table')))
            refreshTable();
    if(name==='#home')
        loadNews();
}

function openNews(e, article) {
    e.preventDefault();
    const   articleTitle = document.createElement('h2');
            articleTitle.innerText = article.header;
            articleTitle.className = 'articleheader';

    const   articleDate = document.createElement('span');
            articleDate.innerText = article.date;
            articleDate.className = 'articledate';

    const   articleText = document.createElement('p');
            articleText.innerText = article.text;
            articleText.className = 'articletext';

    const   link = document.createElement('a');
            link.href="#home";
            link.text='Tillbaka';
            link.className='articlelink';
            link.addEventListener('click',()=>{loadNews()});

    const   articleElement = document.createElement('article');
            articleElement.appendChild(articleTitle)
            articleElement.appendChild(articleDate)
            articleElement.appendChild(articleText);
            articleElement.appendChild(link);

    const   newsElement = document.getElementById('news');
            clearChildNodes(newsElement);
            newsElement.appendChild(articleElement);
}

function clearChildNodes(container){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}

function loadNews(){
    let news = document.getElementById('news');
    clearChildNodes(news);
    fetch('script/db.json').then(
        response => response.json()
    ).then(data => {
        let articles = data.news.sort((a, b) => {
            if (Date.parse(a['date']) > Date.parse(b['date']))
                return 1;
            else if (Date.parse(a['date']) < Date.parse(b['date']))
                return -1;
            return 0;
        });
        for(let article of articles){
            let {header, date, text} = article;
            const   articleTitle = document.createElement('h2');
                    articleTitle.innerText = header;
                    articleTitle.className = 'articleheader';

            const   articleDate = document.createElement('span');
                    articleDate.innerText = date;
                    articleDate.className = 'articledate';

            const   articleText = document.createElement('p');
                    articleText.innerText = text;
                    articleText.className = 'shortarticletext';

            const   link = document.createElement('a');
                    link.className='articlelink';
                    link.href="#home";
                    link.text='Läs Mer';
                    link.addEventListener('click',(e)=>openNews(e, article));

            const   articleElement = document.createElement('article');
                    articleElement.appendChild(articleTitle)
                    articleElement.appendChild(articleDate)
                    articleElement.appendChild(articleText);
                    articleElement.appendChild(link);

            document.getElementById('news').appendChild(articleElement);
        }
    })
}

function refreshTable(){
    fetch('script/db.json').then(
        response => response.json()
    ).then(data => {
        $('#product__table').DataTable({
            data: data.pumps,
            columns: [
                { data: 'id',visible:false},
                { data: 'name', orderData: 0, type:'num'},
                { data: 'description', type:'string' },
                { data: 'price' , type: "num-fmt"},
                { data: 'installation', type: "num-fmt"}
            ]
        });
    });
}