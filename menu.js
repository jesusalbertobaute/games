window.addEventListener('DOMContentLoaded', (eventLoad) => {
    const menuItemGame1= document.getElementById("game1");
    const menuItemGame2= document.getElementById("game2");

    menuItemGame1.addEventListener('click',(e)=>{
        window.location.href="modules/rock-paper-scissor/rock-paper-scissor.html";
    });

    menuItemGame2.addEventListener('click',(e)=>{
        window.location.href="modules/memory/memory.html";
    });

});