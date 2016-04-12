var myrangy;
if(window.rangy){
    window.rangy.init();
    myrangy = window.rangy
}else{
    myrangy = {
        getSelection(){
            return window.getSelection();
        },
        createRange (){
            return document.createRange();
        }
    };
}

module.exports = myrangy;
