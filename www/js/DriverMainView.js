var DriverMainView = function () {

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('click', '.send-info', this.Send);
        this.render();
        window.sessionStorage['navigationId'] = navigator.geolocation.watchPosition(success, error, options);
        window.localStorage['shouldAlert'] = "ok";
    }

    this.render = function() {
        this.$el.html(this.template());
        return this;
    }

    function success(position){
        console.log(position);
        var data = JSON.stringify({
            "Position": {
                "Latitude":position.coords.latitude,
                "Longitude":position.coords.longitude
            }
        });
        
        $.ajax({
            url: 'http://212.227.108.163:20300/Driver/' + window.localStorage['id'],
            type: 'PUT',
            contentType: 'application/JSON',
            data: data,
            success: function(data){
                console.log("success");
            },
            error: function(error){
                console.log("error");
            }

        });
    }

    function error(error){
        console.log('Error - ' + error.message);
    }

    options = {
        enableHighAccuracy: true,
        timeout: 5000
    }

    this.Send = function(){

    	var data = JSON.stringify({
    		"Position":{
			    "Latitude":"44.531375",
			    "Longitude":"-0.20462"
			}
    	});
    	
    	$.ajax({
    		url: 'http://212.227.108.163:20300/Driver/' + window.localStorage['id'],
    		type: 'PUT',
    		contentType: 'application/JSON',
    		data: data,
    		success: function(data){
    			console.log("success");
    		},
    		error: function(error){
    			console.log("error");
    		}

    	});
    }

    this.initialize();

}