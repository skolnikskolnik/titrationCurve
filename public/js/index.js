$(function () {
    const acidInputEl = $("#acidName");

    //Display what the user enters into the calculator
    $(document).on("click", ".calc-button", function(event){
        event.preventDefault();

        console.log("test");
    })

    $(document).on("click", ".name-submit", function (event) {
        event.preventDefault();

        let acidName = acidInputEl.val().trim();

        console.log("test2");
        
    }); //Closes event listener for submitting the acid name 
});//Closes jquery function