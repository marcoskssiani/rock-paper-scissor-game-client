/**
 * Rock Paper Scissor Game by Marcos Cassiani
 **/
  
$(document).ready(function() {

    createMatch();

    $("#play-round-button").click(function(e){
        //disable play round button
        let button = $(this);

        $(button).addClass('disabled');

        playRound();

        // enable button
        setTimeout(function () {
                $(button).removeClass('disabled'); }, 1150);

        // enable reset button
        $('#reset-round-button').removeClass('disabled');
    });

    $("#reset-round-button").click(function(){
        $('#reset-round-button').addClass('disabled');
        createMatch();
    });

})

const createMatch = function() {
    $.post(SERVER_URL + "/matches", {},
        function(data,status) {
            if (status === "success") {
                sessionStorage.setItem("matchId", data.id);
                $('#table-rounds-played').empty();
                $('#rounds-played').html(0);
            } else {
                alert("Oops, the match could not be created! Please reload the page.");
            }
        });
}

const playRound = function() {

    //start animation
    var src = $('#animated-image').attr("src");
    $('#animated-image').attr("src", src.replace(/\.jpg$/i, ".gif"));

    $.post(SERVER_URL + "/matches/" + sessionStorage.getItem("matchId") + "/rounds", {},
        function(data,status) {

            if (status === "success") {

                setTimeout(function () {
                    $('#animated-image').attr("src", src.replace(/\.gif$/i, ".jpg"));
                    buildRoundsPlayedTable(data);
                    }
                    , 1100);
            } else {
                alert("Oops, that round could not be played! Please try again");
            }
        });
}

const buildRoundsPlayedTable = function(data) {

    function getWinner(round) {

        if (round.result == 'P1_WINS') {
            return "Lisa";
        } else if (round.result == 'P2_WINS') {
            return "Bart";
        } else {
            return "Its a draw";
        }
    }

    $.get(SERVER_URL + "/matches/" + sessionStorage.getItem("matchId") ,
        function(data,status) {

            if (status === "success") {
                $('#table-rounds-played').empty();

                let counter = 1;
                data.rounds.forEach(round => {

                    let row = '<tr><th scope="row">' + counter++ + '</th>' +
                        '<td>' + round.player1Shape + '</td>' +
                        '<td>' + round.player2Shape + '</td>' +
                        '<td>' + getWinner(round) + '</td></tr>';

                    $('#table-rounds-played').append(row);
                });
                //update counter
                $('#rounds-played').html(data.rounds.length);

                //auto scroll
                $('#table-container').scrollTop($('#table-container').height());
            } else {
                alert("Oops, something went wrong, please try again.");
            }
        });
}