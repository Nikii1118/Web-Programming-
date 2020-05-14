console.log('JS is working')

function submit(){
    $('form').html('<h2>Thanks for submitting your question! I will do my best to answer you as soon as I can :)</h2>');
}

$(document).ready(function(){


    function scroll(top){
        $('html, body').animate({
            scrollTop: top
        }, 500)
    }


    $('#bottom').on('click', function(){
        scroll(0) //invoke scroll function
    })


})
