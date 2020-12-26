$(function () {
    const acidInputEl = $("#acidName");
    const previewEl = $(".preview");
    const acidModal = $("#nameModal");
    const modalDisplay = $("#modalText");
    const selectAcids = $("#acids-from-db");

    let numberString = "";
    let previewElText = "";

    //On start of page we want to get the acid names from the db
    $.ajax("/acidnames", {
        type: "GET"
    }).then(function (data) {
        if (!data) {
            return data;
        }

        for (let i = 0; i < data.titrations.length; i++) {
            let value = data.titrations[i].id;
            let name = data.titrations[i].acid_name;

            selectAcids.append(`<option value="${value}">${name}</option>`);
        }



    });

    //Display what the user enters into the calculator
    $(document).on("click", ".calc-button", function (event) {
        event.preventDefault();

        let newNumber = $(this).data("value");
        //If the delete button is selected, we trim one digit off, otherwise we add it
        if (newNumber == "Del") {
            numberString = numberString.substring(0, numberString.length - 1);
        }
        else {
            numberString += newNumber;
        }//Closes the else statement with the delete vs other value

        //We want to display the numbers to the screen as they are clicked
        previewEl.empty();
        previewElText = numberString;
        previewEl.text(previewElText);

    });//Closes on-click event for calculator numbers

    //When user hits submit button on entering an acid to the db
    $(document).on("click", ".name-submit", function (event) {
        event.preventDefault();

        //pKaorKa=1 for pKa and it equals 2 for Ka
        let pKaorKa = $(".pKaorKa").val();


        //pKa can only have two decimal places and Ka can only have 6 decimal places
        let pKa;
        let regKa;

        //We need to validate the inputs before proceeding 
        //The acid name must be a string - we only need to check it it is blank or not

        if (pKaorKa == 1) {
            //Need to take number and make it pKa
            pKa = parseInt(numberString);
            pKa = pKa.toFixed(2);
            regKa = Math.pow(10, (-1 * pKa));
            regKa = regKa.toFixed(6);

            addAcidToDB(pKa, regKa);
        } else if (pKaorKa == 2) {
            //Need to check if regKa has characters in it or not
            regKa = numberString;
            regKaSplit = regKa.split("*10^-");

            //regKaSplit will have two elements if it is entered in sci notation and one element if it is in regular notation
            if (regKaSplit.length == 1) {
                //The number was entered in regular notation
                regKa = parseInt(regKa);
                regKa = regKa.toFixed(6);
                pKa = -1 * log10(regKa);
                pKa = pKa.toFixed(2);

                addAcidToDB(pKa, regKa);

            } else if (regKaSplit.length == 2) {
                let regKaNum = regKaSplit[0];
                regKaNum = parseInt(regKaNum);
                let regKaPoT = regKaSplit[1];
                regKaPot = parseInt(regKaPoT);

                regKa = regKaNum * Math.pow(10, -1 * regKaPoT);
                regKa = regKa.toFixed(6);
                pKa = -1 * log10(regKa);
                pKa = pKa.toFixed(2);

                addAcidToDB(pKa, regKa);
            }
            else {
                alert("Invalid input, try again!");
            }

        }


        //Reset number string to zero/blank
        numberString = "";

    }); //Closes event listener for submitting the acid name 

    //When a user hits submit button to generate a titration curve
    $(document).on("click", ".titration-submit", function (event) {
        event.preventDefault();

        //Gets index of acid from db - will need to get pKa and Ka
        let acidIndex = selectAcids.val();

        //Need to get [HA]
        let haWholeNumber = $("#haWhole").val();
        haWholeNumber = parseInt(haWholeNumber);
        let haPoT = $("#haPoT").val();
        let haConc;
        if (haPoT.includes("-")) {
            haPoT = haPoT.split("-")[1];
            haConc = haWholeNumber * Math.pow(10, -1 * haPoT);
        } else {
            haConc = haWholeNumber * Math.pow(10, haPoT);
        }
        haConc = haConc.toFixed(6);

        //Need to get [OH^-]
        let ohWholeNumber = $("#ohWhole").val();
        ohWholeNumber = parseInt(ohWholeNumber);
        let ohPoT = $("#ohPoT").val();
        let ohConc;
        if (ohPoT.includes("-")) {
            ohPoT = ohPoT.split("-")[1];
            ohConc = haWholeNumber * Math.pow(10, -1 * ohPoT);
        } else {
            ohConc = haWholeNumber * Math.pow(10, ohPoT);
        }
        ohConc = ohConc.toFixed(6);

        //Need volume increments for the base
        let volIndex = $("#baseInc").val();
        let baseInc;
        if (volIndex == 1) {
            baseInc = 0.01;
        }
        else if (volIndex == 2) {
            baseInc = 0.05;
        }
        else if (volIndex == 3) {
            baseInc = 0.10;
        }
        else if (volIndex == 4) {
            baseInc = 0.5
        }
        else if (volIndex == 5) {
            baseInc = 1;
        }
        
        //Want to get the desired final volume from user
        let baseFinVol;
        baseFinVol = $("#baseFinal").val();
        

    });

    //function to store acid in db
    function addAcidToDB(pKa, regKa) {
        let acidName = acidInputEl.val().trim();

        if (acidName.length == 0) {
            modal("acidName");
        } else {
            //pKa and Ka must both be numbers
            if (isNaN(pKa) || isNaN(regKa)) {
                //A modal should pop up
                modal("pKaorKa");

            }
            else {
                let acidInput = {
                    acid_name: acidName,
                    pKa: pKa,
                    Ka: regKa
                }

                $.ajax(`/newacid/${acidName}/${pKa}/${regKa}`, {
                    type: "POST",
                    data: JSON.stringify(acidInput),
                    dataType: 'json',
                    contentType: 'application/json'
                }).then(function () {
                    //If not found we need to warn the user that the value was no good
                    location.reload();
                });
            }//Ends else statement for validating that pKa and/or Ka are numbers
        }//Ends the else statement to validate that a name has been added
    }

    function modal(type){
        let displayText;
        if(type=="acidName"){
            displayText = "You must enter a valid acid name";
        } else if(type=="pKaorKa"){
            displayText = "You must enter a valid pKa or Ka";
        }
        modalDisplay.text(displayText);
        acidModal.css("display", "block");

        $(document).on("click", "#acidClose", function (event) {
            event.preventDefault();
            acidModal.css("display", "none");
        });

    }



    //Function definition for base 10
    function log10(val) {
        return Math.log(val) / Math.LN10;
    }


});//Closes jquery function