$(document).ready(function() {
    //logic for Survey page

    //initializations
    var count = 0;
    $('.btn').addClass('disabled'); //disable submit button initially

    var nameField;
    var photoField;

    var qArray = {
        "name": "",
        "photo": "",
        "scores": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]
    }

    //change events for fields
    $('#name').on('input', function(e) {
        qArray.name = $('#name').val().trim();
        buttonCheck(qArray); //check
    });

    $('#photo').on('input', function(e) {
        qArray.photo = $('#photo').val().trim();
        buttonCheck(qArray); //check
    });

    $("#q1").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[0] = parseInt(this.value);
        } else {
            qArray.scores[0] = 0;
        }

        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q2").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[1] = parseInt(this.value);
        } else {
            qArray.scores[1] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q3").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[2] = parseInt(this.value);
        } else {
            qArray.scores[2] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q4").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[3] = parseInt(this.value);
        } else {
            qArray.scores[3] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q5").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[4] = parseInt(this.value);
        } else {
            qArray.scores[4] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q6").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[5] = parseInt(this.value);
        } else {
            qArray.scores[5] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q7").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[6] = parseInt(this.value);
        } else {
            qArray.scores[6] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q8").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[7] = parseInt(this.value);
        } else {
            qArray.scores[7] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q9").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[8] = parseInt(this.value);
        } else {
            qArray.scores[8] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    $("#q10").change(function() {

        if (parseInt(this.value) > 0) {
            qArray.scores[9] = parseInt(this.value);
        } else {
            qArray.scores[9] = 0;
        }
        buttonCheck(qArray.scores); //check how many questions are unanswered
    });

    //button submission of answers
    $("#submit").on("click", function(event) {
        event.preventDefault();
        console.log((qArray));

        //form the object for export
        var friendObject = {
            name: nameField,
            photo: photoField,
            scores: qArray
        };


        $.post("/api/friends", qArray, function(data) {
            //sends object
            //receives results

            $('#modName').text(data.name);
            $('#modPhoto').attr('src', data.photo).attr('height', '300');
            $('#myModal').modal('show');

        });

    });

    // custom functions:

    function buttonCheck(array) {
        //checks if fields/questions are answerred - enables/disables submit button accordingly
        count = 0; //set to 0 every time

        //loop through object and count how many not answered
        for (let index = 0; index < array.length; index++) {

            if (array[index] === 0) {
                count++;
            }

        }

        //get field values
        qArray.name = $('#name').val().trim();
        qArray.photo = $('#photo').val().trim();

        //test to see if everything answered
        //order: check name field -> check photo field -> check answers
        if (nameField !== '') { //check name

            if (photoField !== '') { //check photo link

                if (count === 0) { //check to see id any questions unanswered
                    $('.btn').removeClass('disabled'); //enable submit button

                } else {
                    $('.btn').addClass('disabled'); //disable submit button
                }

            } else {
                $('.btn').addClass('disabled'); //disable submit button
            }
        } else {
            $('.btn').addClass('disabled'); //disable submit button
        }
    } // end buttonCheck
});
