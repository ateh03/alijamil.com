
let count = 2;

const quote = () =>{
    const currentQuote = document.querySelector(`#quotes :nth-child(${count})`);
    count++;
    
    let nextQuote = currentQuote.nextElementSibling;

    if(nextQuote == null){
        count = 2;
        nextQuote = document.querySelector(`#quotes :nth-child(${count})`);
    }

    currentQuote.classList.add("hide");
    nextQuote.classList.remove("hide");

};

window.onload = () => {
    setInterval(quote, 1000);
    document.getElementById("display-rainbow").onclick = rainbow;
};