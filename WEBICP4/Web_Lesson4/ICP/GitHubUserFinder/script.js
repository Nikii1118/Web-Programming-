function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    const xhr=new XMLHttpRequest(); // creating object for request
    xhr.overrideMimeType("application/json")// overiding so that it shows json

    xhr.open('GET',"https://api.github.com/users/" + user,true);//sending the request
    xhr.onload=function(){
        if (xhr.status==200){
             showUser(JSON.parse(xhr.responseText))
        }
        else{
            noSuchUser(user)
        }
    };
    xhr.send();
}

function showUser(user) {
    console.log(user)
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#name").text(user.login);
    $(".avatar").html("<img height='250' width='250' src='"+ user.avatar_url+ "'/>");
    const link = "<a target='_blank' href='" + user.html_url + "'>Click here</a>";


    $(".information").html("<label><u><strong>Detail of the user</strong></strong></u></label>"
        +
        "<br/><br/><label style ='color: red' align='left'>Login Name :</label>"+user.name
        +"<br/><label style ='color: red' align='left'>Login ID :</label>"+user.id
        +"<br/><label style ='color: red' align='left'>Github URL :</label>"+link
        +"<br/><label style ='color: red' align='left'>Repo count :</label>"+ user.public_repos);

    $("#profile").show();
}


function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#name").text("Sorry, The user '"+username+"' does not exist");
    $(".avatar").text('');
    $(".information").html('');
    $("#profile").show();

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
