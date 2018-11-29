/// reference path="angular-1.7.5/angular.js" />
var app = angular
.module('api', ["ui.router"])
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        $stateProvider
        .state("movie_details",{
            url: "/movie_details/:id/:name",
            templateUrl:"movie_details.html",
            controller: "movie_details_controller"
        })
        .state("home",{
            url:"/home",
            templateUrl:"home.html",
            controller: "movies"
        })
    })
    .controller('movie_details_controller',function($http,$stateParams,$scope){
        var md = this;
        $http({
            url:'https://api.themoviedb.org/4/list/1?page=1&api_key=62fdeaede80b5fa694e2f71173a022fa',
            method:"get",
        }).then(function(response){
            md.movie = response.data;
            id = $stateParams.id;
            for (var i = 0;i < md.movie.results.length;i++){
                if (id == md.movie.results[i].id){
                    $scope.vote_average = md.movie.results[i].vote_average;
                    $scope.vote_count = md.movie.results[i].vote_count;
                    $scope.popularity = md.movie.results[i].popularity;
                    $scope.original_language = md.movie.results[i].original_language;
                    $scope.release_date = md.movie.results[i].release_date;
                    $scope.backdrop_path = md.movie.results[i].backdrop_path;
                    $scope.overview = md.movie.results[i].overview;
                    $scope.title = md.movie.results[i].title;
                    $scope.audience = md.movie.results[i].adult;
                    
                }
            }
            $scope.language = function(lang){
                if(lang == "en"){
                    return "English"
                }
            }
            $scope.getAudience = function(audience){
                if(audience){
                    return "For Full age people"
                }else{
                    return "Family"
                }
            }
        })
        
        
    })
    .controller('movies', function($scope, $http) {
    $http.get('https://api.themoviedb.org/4/list/1?page=1&api_key=62fdeaede80b5fa694e2f71173a022fa').
        then(function(response) {
            $scope.movies = response.data;
        });
        $http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=62fdeaede80b5fa694e2f71173a022fa').
        then(function(response) {
            $scope.categories = response.data;
        });
});