  var config = {
    apiKey: "AIzaSyAa4ZNteB5rkzR8cROzoH5D1iCmue615yc",
    authDomain: "myfirstdbproject-e9fc8.firebaseapp.com",
    databaseURL: "https://myfirstdbproject-e9fc8.firebaseio.com",
    projectId: "myfirstdbproject-e9fc8",
    storageBucket: "myfirstdbproject-e9fc8.appspot.com",
    messagingSenderId: "436892585122"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#form-submit").on("click", function() {
      event.preventDefault();
      database.ref().push({
          name: $("#train-name").val().trim(),
          destination: $("#destination").val().trim(),
          time: $("#departure-time").val().trim(),
          frequency: $("#frequency").val().trim()
      });
  });



  database.ref().on("child_added", function(snapshot) {
        
        var trainName = snapshot.val().name;
        var trainDestination = snapshot.val().destination;    
        var trainDisembark = snapshot.val().time;
        var trainMin = snapshot.val().frequency;


        var timeConvert = moment(trainDisembark, "hh:mm");
        timeMinutes = moment().diff(moment(timeConvert), "minutes");
        remain = timeMinutes % trainMin;
        minUntil = trainMin - remain;
        nextTrain = moment().add(minUntil, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm A");

        var newRow = 
        $("<tr>").append( 
          $("<td>").text(trainName),            //Train Name
          $("<td>").text(trainDestination),     //Destination
          $("<td>").text(trainMin),             //Frequencey Min
          $("<td>").text(nextTrainFormatted),   //Next Arrival HH:mm
          $("<td>").text(minUntil),            //Min away
        );

    $("table tbody").append(newRow);


  }, function(errorObject) {
      console.log("the read failed: " + errorObject.code);
  });