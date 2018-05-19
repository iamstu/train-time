// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJ10eiLAvRAhPyaRZVUts8bHIg6bHWc30",
    authDomain: "traintime-e8993.firebaseapp.com",
    databaseURL: "https://traintime-e8993.firebaseio.com",
    projectId: "traintime-e8993",
    storageBucket: "",
    messagingSenderId: "1027250309634"
  };
  firebase.initializeApp(config);

  var database = firebase.database(); 
  console.log(moment());

$(".submit-btn").on("click", function(event){
event.preventDefault();
    var newName= $("#name-input").val().trim();
    var newDestination= $("#destination-input").val().trim();
    var newStart= $("#start-input").val().trim();
    var newFrequency= $("#frequency-input").val().trim();

  //var adjustedTime= moment(newStart, "HH:mm").subtract(1, "years");
 // console.log(adjustedTime);


if(newName.length > 0 && newDestination.length > 0 && newStart.length > 0 && newFrequency.length > 0)
    database.ref().push({
        trainName: newName,
        trainDestination: newDestination,
        trainStart: newStart,
        trainFrequency: newFrequency
    });
});

database.ref().on("child_added", function(snapshot){

    console.log(snapshot.val().trainName);

    startingTime = moment((snapshot.val().trainStart), "HH:mm").subtract( 1, "days");

    // if (startingTime > (moment())) { 
       // moment(startingTime).subtract( 1, "days")
    // };
    console.log(startingTime);

    var difference= moment().diff(startingTime, "minutes");
  console.log(difference);

    var remainder = (difference % (snapshot.val().trainFrequency));
    console.log(remainder);
    
    var minutesAway = (snapshot.val().trainFrequency) - remainder;
    console.log(minutesAway);

    var nextTrain = moment().add(minutesAway, "minutes")

    $("tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + 
        snapshot.val().trainDestination + "</td><td>" + 
        snapshot.val().trainFrequency + "</td><td>" + 
        moment(nextTrain).format("hh:mm") + "</td><td>" +
        minutesAway + "</td><td>");
});

