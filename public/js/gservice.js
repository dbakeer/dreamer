/////////////////////////////////
/////// GOOGLE MAP SERVICE //////
/////////////////////////////////
angular.module('gservice', [])
  .factory('gservice', function($rootScope, $http){

    // the information for all entries
    var googleMapService = {};

    // sets latitude and longitude to zero
    googleMapService.clickLat  = 0;
    googleMapService.clickLong = 0;

    // all entered locations
    var locations = [];

    // the dropped markers from previous entries
    var lastMarker;

    // the marker for the current entry
    var currentSelectedMarker;

    // sets the map to the center of the United States
    var selectedLat = 39.50;
    var selectedLong = -98.35;

    googleMapService.refresh = function(latitude, longitude, filteredResults){

      locations = [];

      selectedLat = latitude;
      selectedLong = longitude;

      $http.get('/users').success(function(response){
        locations = convertToMapPoints(response);

        initialize(latitude, longitude);
      });
    };

    var convertToMapPoints = function(response){

      var locations = [];

      for(var i= 0; i < response.length; i++) {

        var user = response[i];

        var contentString =
        '<p><b>Username</b>: ' + user.username +
        '<br><b>Age</b>: ' + user.age + '<br>' +
        '<b>Gender</b>: ' + user.gender +
        '<br><b>Their Dream</b>: ' + user.dream +
        '</p>';

        locations.push({
          latlon: new google.maps.LatLng(user.location[1], user.location[0]),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
          }),
          username: user.username,
          gender: user.gender,
          age: user.age,
          dream: user.dream
        });
      }
      return locations;
    };

    var initialize = function(latitude, longitude){

      var styles = [
        {
          "featureType":"landscape",
          "stylers": [
            {"hue":"#F600FF"},
            {"saturation":0},
            {"lightness":0},
            {"gamma":1}
          ]
        },
        {
          "featureType":"road.highway",
          "stylers": [
            {"hue":"#DE00FF"},
            {"saturation":-4.6000000000000085},
            {"lightness":-1.4210854715202004e-14},
            {"gamma":1}
          ]
        },
        {
          "featureType":"road.arterial",
          "stylers": [
            {"hue":"#FF009A"},
            {"saturation":0},
            {"lightness":0},
            {"gamma":1}
          ]
        },
        {
          "featureType":"road.local",
          "stylers": [
            {"hue":"#FF0098"},
            {"saturation":0},
            {"lightness":0},
            {"gamma":1}
          ]
        },
        {
          "featureType":"water",
          "stylers": [
            {"hue":"#EC00FF"},
            {"saturation":72.4},
            {"lightness":0},
            {"gamma":1}
          ]
        },
        {
          "featureType":"poi",
          "stylers": [
            {"hue":"#7200FF"},
            {"saturation":49},
            {"lightness":0},
            {"gamma":1}
          ]
        }
      ];

      var options = {
        mapTypeControlOptions: {
          mapTypeIds: ['Styled']
        },
        center: myLatLng,
        zoom: 3,
        disableDefaultUI: true,
        mapTypeId: 'Styled'
      };

      var myLatLng = {
        lat: selectedLat,
        lng: selectedLong
      };

      var div = document.getElementById('map');
      var map = new google.maps.Map(div, options);
      var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
      map.mapTypes.set('Styled', styledMapType);


      locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
          position: n.latlon,
          map: map,
          title: "Big Map",
          animation: google.maps.Animation.DROP,
          icon: "http://orig08.deviantart.net/57de/f/2011/191/f/c/cute_cloud_animated_icon_by_mishavs-d3lnfhq.gif",
        });

        google.maps.event.addListener(marker, 'click', function(e){
          currentSelectedMarker = n;
          n.message.open(map, marker);

          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        });
      });

      var initialLocation = new google.maps.LatLng(latitude, longitude);

      var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://www.picgifs.com/graphics/k/kawaii-small/graphics-kawaii-small-935713.gif',
      });

      lastMarker = marker;

      map.panTo(new google.maps.LatLng(latitude, longitude));

      google.maps.event.addListener(map, 'click', function(e){
        var marker = new google.maps.Marker({
          position: e.latLng,
          animation: google.maps.Animation.BOUNCE,
          map: map,
          icon: 'http://www.picgifs.com/graphics/k/kawaii-small/graphics-kawaii-small-935713.gif'
        });

        if(lastMarker) {
          lastMarker.setMap(null);
        }

        lastMarker = marker;
        map.panTo(marker.position);

        googleMapService.clickLat = marker.getPosition().lat();
        googleMapService.clickLong = marker.getPosition().lng();
        $rootScope.$broadcast("clicked");
      });
    };

    google.maps.event.addDomListener(window, 'load', googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
  });
