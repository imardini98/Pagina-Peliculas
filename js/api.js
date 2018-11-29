/// reference path="angular-1.7.5/angular.js" />
/* @Author Ivan Mardini @note Modulo, config y controladores del proyecto @param app .Variable que almacena al modulo */
var app = angular
/* @param ui-router . Se agrega la dependencia ui-router al modulo */
.module('api', ["ui.router"])
  
    .config(function(/* @param $stateProvider se llama al servicio de 
        ui-router para enlazar templates*/$stateProvider,/* @param $urlRouterProvider 
        Permite colocar un template por defecto en caso de escribir mal el url */$urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        $stateProvider
        /* @param .state Se agrega un template  */.state("movie_details",{
            /*@param url: Hace referencia al URL del template */url: "/movie_details/:id/:name",
            /*@param tempalteUrl: Hace referencia a la ruta donde se encuentra el docuemnto
              */templateUrl:"movie_details.html",
            /* @param controller Hace referencia al controlador asociado al template
             */controller: "movie_details_controller"
        })
        .state("home",{
            url:"/home",
            templateUrl:"home.html",
            controller: "movies"
        })
    })
    /* @note Se escribe el controlador del template movie_details */.controller('movie_details_controller',
    function(/*@param $http Servicio http */$http,/* @param $stateParams servicio para envío de 
        parámetros entre templates*/$stateParams,/* @param $scope Servicio que permite enlazar
        el modelo con la vista y viceversa */$scope){
        /* @param md Se inicializa la variable md como this */var md = this;
        /* @note Se usa el método get para obtener JSON que contiene los datos */$http({
            url:'https://api.themoviedb.org/4/list/1?page=1&api_key=62fdeaede80b5fa694e2f71173a022fa',
            method:"get",
        }).then(function(response){
            /* @param md.movie Almacena los datos recibidos a través de GET */md.movie = response.data;
           /* @param id Almacena id de pelicula */ id = $stateParams.id;
           /* @note Se recorre todo el JSON */ for (var i = 0;i < md.movie.results.length;i++){
               /* @note Si se encuentra un id de pelicula que concuerde con el extraido
               de la pelicula individual */ if (id == md.movie.results[i].id){
                   /* @param $scope.vote_average
                   Se obtiene el promedio de votos de la pelicula */ $scope.vote_average = md.movie.results[i].vote_average;
                    /* @param $scope.vote_count
                   Se obtiene votos de la pelicula */$scope.vote_count = md.movie.results[i].vote_count;
                    /* @param $scope.popularity
                   Se obtiene la popularidad de la pelicula */$scope.popularity = md.movie.results[i].popularity;
                    /* @param $scope.original_language
                   Se obtiene lenguaje original de la pelicula */$scope.original_language = md.movie.results[i].original_language;
                    /* @param $scope.release_date
                   Se obtiene fecha de estreno de la pelicula */$scope.release_date = md.movie.results[i].release_date;
                    /* @param $scope.backdrop_path
                   Se obtiene el poster de la pelicula */$scope.backdrop_path = md.movie.results[i].backdrop_path;
                    /* @param $scope.overview
                   Se obtiene overview de la pelicula */$scope.overview = md.movie.results[i].overview;
                    /* @param $scope.title
                   Se obtiene titulo de la pelicula */$scope.title = md.movie.results[i].title;
                    /* @param $scope.audience
                   Se obtiene el atributo adult de la pelicula */$scope.audience = md.movie.results[i].adult;
                    
                }
            }
            /* @note Funcion que envia a la vista el lenguaje, 
            dependiendo de la salida del atributo adult */$scope.language = function(/* @param lang 
                parametro de entrada */lang){
                /* @note Si el atributo original_language es "en" */if(lang == "en"){
                   /* @return English Retorna el lenguage original de forma leíble */ return "English"
                /* @note Si el atributo original_language es "es" */}else if(lang == "es"){
                    /* @return Spanish Retorna el lenguaje original de forma leíble  */return "Spanish"
                }
            }
            /* @note Funcion que obtiene la audiencia de la pelicula
             */$scope.getAudience = function(/* @param audience Parametro de entrada */audience){
                /* @note Si el parametro audience es verdadero */if(audience){
                 /* @note Para mayores de edad */   return "For Full age people"
                }else{
                   /* @note Para todo publico */ return "Family"
                }
            }
        })
        
        
    })
    /* @note Se escribe el controlador del template home */.controller('movies', function($scope, $http) {
    $http.get('https://api.themoviedb.org/4/list/1?page=1&api_key=62fdeaede80b5fa694e2f71173a022fa').
        then(function(response) {
            /* @param $scope.movies Se envía a la vista los datos 
            de peliculas obtenidos por get */$scope.movies = response.data;
        });
        $http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=62fdeaede80b5fa694e2f71173a022fa').
        then(function(response) {
            /* @param $scope.movies Se envía a la vista los datos 
            de categorias de peliculas obtenidos por get */$scope.categories = response.data;
        });
});