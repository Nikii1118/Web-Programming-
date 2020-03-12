angular.module("app",[])
    .controller("cent",function($scope,$http)
    {
        $scope.Searchit = function() {
            $scope.name1='';
            $scope.desc1='';
            $scope.desc2='';
            $scope.imgurl = ' ';
            var inp = document.getElementById("filter").value;
            var result = $http.get("https://kgsearch.googleapis.com/v1/entities:search?query="+ inp +
                "&key=AIzaSyBR1xoSqFIo8eU_2u1KKJTaC3U3ma9l9Sg&limit=1&indent=True");
            result.success(function(data)
                {
                    $scope.name1 ="Data Not Found";
                    if(data.itemListElement[0].result.name != null && data.itemListElement[0].result.name != " ")
                    {
                        $scope.name1 =data.itemListElement[0].result.name;
                    }
                    $scope.name1 = data.itemListElement[0].result.name;
                    $scope.desc1 = data.itemListElement[0].result.description;
                    $scope.desc2 = data.itemListElement[0].result.detailedDescription.articleBody;
                    $scope.imgurl = data.itemListElement[0].result.image.contentUrl;

                }
            )
            result.error(function (data) {
                alert("There was some error processing your request. Please try after some time");

            })
        }



    });



