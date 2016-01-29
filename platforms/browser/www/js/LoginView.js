var LoginView = function () {

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('click', '.connexion-button', this.Login);
        window.localStorage['id'] = "";
        window.localStorage['name'] = "";
        window.localStorage['email'] = "";
        window.sessionStorage['token'] = "";
        window.localStorage['shouldAlert'] = "not";
        navigator.geolocation.clearWatch(window.sessionStorage['navigationId']);
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template());
        return this;
    }

    this.Login = function() {
        var identifiant = $("#identifiant").val();
        var motdepasse = $("#motdepasse").val();
        $("#error-Authent").html("");
        $("#errors-fields").html("");
        if ((identifiant == undefined || identifiant === "") && (motdepasse == undefined || motdepasse === "")) {
            $("#errors-fields").html("<p style='color:#d9534f;'>Veuillez renseigner les champs identifiant et mot de passe</p>");
        } else if ((identifiant == undefined || identifiant === "")) {
            $("#errors-fields").html("<p style='color:#d9534f;'>Veuillez renseigner le champ identifiant</p>");
        } else if ((motdepasse == undefined || motdepasse === "")) {
            $("#errors-fields").html("<p style='color:#d9534f;'>Veuillez renseigner le champ mot de passe</p>");
        } else {
            $("#spinner-loader").html("<img src='assets/pics/spinner.gif' style='width:100px;height:100px;margin:auto;' />");
            Connection(identifiant, motdepasse, $("#user-type").val());
        }
    }

    function Connection(name, password, userType){
        var urlString = "";
        var theUserType = "";

        if (userType == "Driver"){
            urlString = "http://212.227.108.163:20300/api/login/Driver";
            theUserType = "Driver";
        } else {
            urlString = "http://212.227.108.163:20300/api/login/Technician";
            theUserType = "Technician";
        }

        $.post(urlString,
            {
                "name": name,
                "password": password
            },
            function(data, status) {
                $("#spinner-loader").html("");
                window.localStorage['id'] = data.id;
                window.localStorage['name'] = data.name;
                window.localStorage['email'] = data.email;
                window.sessionStorage['token'] = data.token;

                $.ajaxSetup({
                    headers: {
                        Authorization: window.sessionStorage['token']
                    }
                });

                window.sessionStorage['userType'] = theUserType;

                window.location.href = "#mainPage";
            }
        ).error(function(data){
            $("#spinner-loader").html("");
            $("#error-Authent").html("<p style='color:#d9534f;'>Veuillez saisir des identifiants corrects</p>");
        });
    }

    this.initialize();

}