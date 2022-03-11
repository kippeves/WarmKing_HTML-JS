//document.getElementById('cont1');
document.onreadystatechange = function(){
    if(document.readyState === "complete"){
        document.getElementById('cont2').style.display = 'none';
        document.getElementById('cont3').style.display = 'none';
        document.getElementById('cont4').style.display = 'none';
        document.getElementById('cont5').style.display = 'none';
    }
}