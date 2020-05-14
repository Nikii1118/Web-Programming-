$(function() {
    $('.container li a').each(function() {
        const cont_text = $(this).text()
        $(this).click(function(){
            if(cont_text==='BMI calculator')
            {
                $('#heh, .height, #height' ).show('slow', function() {
                });
                $('#weigth').val('');
                $('#height').val('');
                $('#display').empty();
                $('#display').css('background-color', '')
                $('#check').click(function(){ ////function called after button click
                    bmi();
                })
                $('.activity, .activity2, #activ, .list').hide('slow', function() {
                });

            }
            else if(cont_text==="Calories Calculator")
            {   $('#display').css('background-color', '')
                $('#heh' ).show('slow', function() {
                });
                $('.activity').text('-Choose Activity-')
                $('#activ').text('Activity')
                $( ".activity" ).show('fast', function(){

                })
                $('#weigth').val('');
                $('#height').val('');
                $('#display').empty();


                $('#activ').show('slow', function() {
                });

                $('#check').click(function(){ ////function called after button click
                    calories_calculator();
                })
                $('#height, .height, .activity2, .list2').hide('slow', function() {
                });
                $('#weigth').val('');



            }
            else

            {       $('#display').css('background-color', '')
                $('.activity2').text('-Choose Sex-')
                $('#weigth').val('');
                $('#height').val('');
                $('#display').empty();
                $('#check').click(function(){ ////function called after button click
                    fat();
                })
                $('#height, .height, .activity, .list').hide('slow', function() {
                });
                $('#activ').text('Sex')
                $('#heh, #activ, .activity2, .height, #height' ).show('slow', function() {
                });







            }


        })
    });
});



$(function() {
    $('#test2').click(function() {
        $('.activity, #activ').show('slow', function() {
        });
        $('#weigth').val('');
        $('#height').val('');
    });
});

$(function() {
    $('.activity').click(function() {
        $('.list').show('slow', function() {
        });
    });
});

$(function() {
    $('.activity2').click(function() {

        $('.list2').show('slow', function() {
        });

    });
});

$(function(){
    $('#check').click(function(){
        $('#display').css('background-color', '#fff')

    });
});
$(function(){                                 ///// loop for drop down list
    $('.list li').each(function(){
        $(this).click(function(){
            $('.list').hide('slow', function() {
            });
            const text  = $(this).text()
            const atr  = $(this).attr('value')
            $('.activity').text(text)
            $('#help').val(atr)





        })
    })
})

$(function(){                                 ///// loop for drop down list
    $('.list2 li').each(function(){
        $(this).click(function(){
            $('.list2').hide('slow', function() {
            });
            const text  = $(this).text()
            const atr  = $(this).attr('value')
            $('.activity2').text(text)
            $('#help').val(atr)



        })
    })
})


function bmi()
{
    let a = document.getElementById("weigth").value;
    let b = document.getElementById("height").value;
    a = Math.floor(100*a) / 100;
    b = Math.floor(100*b) / 100;
    const c = Math.round(a / (b * b) * 10000);

    if((isNaN(a)) || (isNaN(b)) || a==='' || b==='')
    {
        document.getElementById("display").innerHTML = "Some of data provided is incorrect";
    }
    else
    {
        for(let i=0; i<=1; i++)
        {
            if(c<16)
            {
                display.style.color='rgba(216, 37, 6, 0.856)';
                document.getElementById("display").innerHTML = "Your bmi: "+c+", You are almost dead!";
                continue;
            }

            else if ((c>16) && (c<=18.3))
            {
                display.style.color='rgba(224, 169, 17, 0.76)';
                document.getElementById("display").innerHTML = "Your bmi: "+c+", You should eat more";
                continue;
            }
            else if ((c>18.4) && (c<=24.99))
            {
                display.style.color='green';
                document.getElementById("display").innerHTML = "Your bmi: "+c+", All is fine";
                continue;
            }
            else if ((c>24.99) && (c<=29.99))
            {
                display.style.color='rgba(224, 169, 17, 0.76)';
                document.getElementById("display").innerHTML = "Your bmi: "+c+", You eat too much!!";
                continue;
            }
            else
            {
                display.style.color='rgba(216, 37, 6, 0.856)';
                document.getElementById("display").innerHTML = "Your bmi: "+c+", You are really obsessed!!";
                continue;
            }



        }
    }


}
function calories_calculator()
{
    $('#display').css('color', '#000')
    let a = document.getElementById('weigth').value;
    let b = parseFloat(document.getElementById('help').value);
    a = Math.floor(100*a) / 100;
    b = Math.floor(100*b) / 100;
    const c = Math.round(((a * 24) * b));
    if((isNaN(a)) || a==='')
    {
        document.getElementById('display').innerHTML = 'Some data provided is incorrect';
    }
    else
    {
        document.getElementById('display').innerHTML = 'Your daily calorie need: '+c;
    }
}
function fat()
{
    let a = document.getElementById('weigth').value;
    const b = parseFloat(document.getElementById('help').value);
    let d = document.getElementById('height').value;
    let f;
    a = Math.floor(100*a) / 100;
    d = Math.floor(100*d) / 100;

    if(isNaN(a) || isNaN(d) || a==='' || d==='')
    {
        document.getElementById('display').innerHTML = 'Values must be a numbers!';
    }
    else if($('.activity2').text() === "-Choose Sex-")
    {
        document.getElementById('display').innerHTML = 'You have to choose your sex!';
    }
    else
    {
        if(b ===0.512)
        {
            f = 0.089
        }
        else
        {
            f = 0.177
        }
        const score = Math.floor(b * a - f * d);
        document.getElementById('display').innerHTML = 'Your fat percentage: '+score+'%';
    }
}
