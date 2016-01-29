var TechnicianMainView = function () {

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.tabMessages = null;
        this.render();
        window.sessionStorage['navigationId'] = navigator.geolocation.watchPosition(success, error, options);
        window.localStorage['shouldAlert'] = "ok";
        io.socket.on('AlertMessage', function(data){
            console.log("connecté");
            console.log(data);
        });
        rappel();
    }

    function rappel(){
        io.socket.get('/AlertMessage/', function(data){
            var shouldFill = false;
            if (this.tabMessages == null){
                console.log("rappel");
                shouldFill = true;
                this.tabMessages = [];
            }
            for (i = 0; i < data.length; i++){
                if (shouldFill){
                    this.tabMessages[i] = data[i];
                } else {
                    if (data[i].updatedAt != this.tabMessages[i].updatedAt){
                        this.tabMessages[i] = data[i];
                        var shouldAlert = window.localStorage['shouldAlert'];
                        if (shouldAlert == "ok"){
                            console.log("ok");
                            console.log(this.tabMessages[i].body);
                            alert(this.tabMessages[i].body);
                        }
                    }
                }
            }
            rappel();
        });
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
            url: 'http://212.227.108.163:20300/Technician/' + window.localStorage['id'],
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

    this.initialize();

}