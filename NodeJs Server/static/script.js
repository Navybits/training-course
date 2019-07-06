$(document).ready(function() {
  //$("#spinner").show();
  $("#search").on("click", function() {
    giveResult();
  });
  $("#country").on("keypress", function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      giveResult();
    }
  });
});

function giveResult() {
  var country = $("#country").val();
  if (country.length != 0) {
    $("#spinner").show();
    //alert(country)
    $.ajax({
      url: "https://restcountries-v1.p.rapidapi.com/name/" + country,
      headers: {
        "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "694070e137msh46f079cb1fb72a2p1a0fcajsnf53fa3168a41"
      },
      success: function(result) {
        //for (var i=0;i<result.length;i++){
        $.ajax({
          url:
            "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=200&lng=" +
            result[0].latlng[1] +
            "&lat=" +
            result[0].latlng[0],
          headers: {
            "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
            "X-RapidAPI-Key":
              "694070e137msh46f079cb1fb72a2p1a0fcajsnf53fa3168a41"
          },
          success: function(result2) {
            console.log(result2);
            $("#country").val("");
            $("#results").text("");
            for (var i = 0; i < result2.length; i++) {
              $("#results").append("<span>" + result2[i].city + "</span><br>");
            }
            $("#spinner").hide();
          }
        });

        //console.log(result)
        //$("body").append("<span>"+result[i].capital+"<span>")
        //}
      }
    });
  } else {
    alert("no data inserted");
  }
}
