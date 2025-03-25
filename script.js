

//темная тема
const btnDarkMode = document.querySelector(".dark-mode-btn");
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn__active");
    document.body.classList.toggle('dark')
}


//живщй инрут бренда
document.querySelector('#elastic').oninput = function(){
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('.elastic li');
    if(val !='') {
        elasticItems.forEach(function(elem){
            if(elem.innerText.search(val) == -1){
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        })
    }
    else {
        elasticItems.forEach(function(elem){
            elem.classList.remove('hide');
    })
    }
}



