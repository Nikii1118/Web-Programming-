const app = angular.module('courseRegApp', []);

app.controller('courseRegCtrl', function($scope) {

    //  Below Lists Will be iterated in html using Angular JS
    $scope.EdcLevel = ["Bachelors", "Masters", "PHD"];
    $scope.Terms = ["Fall", "Spring", "Summer"];
    $scope.EnrollmentYear = [2020,2021];
    $scope.SchoolOptions = ["School of Computer Science", " School of Law", "School of Science", "School of Psychology","School of Philosophy, School of Math"];
    $scope.OpenSeats = [{text:'Class Capacity', seats:40},{text:'Open Seats', seats: 22}];

    $scope.search = function () {
        window.location = "Course.html";
    };

    $scope.signOut = function () {
        window.location = "Login.html";
    };

    $scope.enrollForCourse = function (courseName) {
        window.location.href = "Enrollment.html";
    };

    // Function to Enroll/Drop for a Course
    $scope.enrollOrDrop = function (event) {
        $scope.modifiedSeats = [];

        // If Event is Enroll, then Modifying the Available Seats
        if(event.target.innerHTML === 'Enroll'){
            $scope.OpenSeats.forEach(function (value) {
                if(value.text === 'Open Seats'){
                    // Decreasing the Available Seats
                    value.seats = value.seats-1;
                }
                $scope.modifiedSeats.push(value);
            });
            $scope.OpenSeats = $scope.modifiedSeats;
            // Showing a Success Message
            $("#successEnrolling").text("You Successfully Enrolled");
            // Changing the Button text to Drop
            $("#course1Enroll").text('Drop');
        }else{
            // Else, if Button Event is Drop
            $scope.OpenSeats.forEach(function (value) {
                if(value.text === 'Open Seats'){
                    // Increasing the Available Seats on Click of Drop
                    value.seats = value.seats+1;
                }
                $scope.modifiedSeats.push(value);
            });
            $scope.OpenSeats = $scope.modifiedSeats;
            // Showing Success message of Dropping the class
            $("#successEnrolling").text("You Are No Longer Enroll In This Course");
            // Changing the button text to Enroll
            $("#course1Enroll").text('Enroll');
        }
    };

});

// Function for Greeting, checks if the local Storage email Id is present or not
// Else, it will greet as 'Guest'
$(function() {
    // Setting Greeting for Signed In user
    let signedInUser = null;
    const loginEmail = localStorage.getItem("emailId");
    if(loginEmail != null){
        signedInUser = loginEmail;
    } else {
        signedInUser = "Guest";
    }
    const greeting = "Hi, " + signedInUser;
    $("#homePage").html(greeting);

});
