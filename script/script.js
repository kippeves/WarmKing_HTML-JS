document.onreadystatechange = ()=>{
    if(document.readyState === "complete"){
        const storedSection = localStorage.getItem('activeSection');
        const section = storedSection?storedSection:'#home';
        setActive(section);
        const   menu = document.querySelectorAll('.navmenu a');
        for(const item of menu){
            item.addEventListener('click',(e)=> {
                setActive(e.target.hash);
            })
        }
        const burger = document.getElementById("burger");
        burger.addEventListener('click',()=>{
            document.querySelector('.navmenu').classList.toggle('active');
        });
    }
}

const setActive = (name) => {
    const   setActive = document.querySelector(name);
            setActive.style.display="block";
            localStorage.setItem('activeSection',name);
    const sections = document.querySelector('.content').querySelectorAll('div');
    for(const section of sections){
        if(section !== setActive)
            section.style.display = 'none';
    }
}