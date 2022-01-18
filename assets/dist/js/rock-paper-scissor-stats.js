/**
 * Rock Paper Scissor Game by Marcos Cassiani
 **/
  
$(document).ready(function() {

    getStats();
})

const getStats = function() {
    $.get(SERVER_URL + "/matches-stats",
        function(data,status) {
            if (status === "success") {

                // update rounds played
                $('#total-rounds-played').html(data.totalRounds);
                // update p1 values
                $('#total-rounds-p1').text(data.totalWinsP1);
                $('#total-rounds-p1-percentage').text("(" + ((data.totalWinsP1 / data.totalRounds) * 100).toFixed(2) +" %)");
                // update p2 values
                $('#total-rounds-p2').text(data.totalWinsP2);
                $('#total-rounds-p2-percentage').text("(" + ((data.totalWinsP2 / data.totalRounds) * 100).toFixed(2) +" %)");
                // update draw values
                $('#total-rounds-draw').text(data.totalDraws);
                $('#total-rounds-draw-percentage').text("(" + ((data.totalDraws / data.totalRounds) * 100).toFixed(2) +" %)");

            } else {
                alert("Oops, the matches stats not be obtained! Please reload the page.");
            }
        });
}