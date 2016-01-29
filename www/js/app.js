// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var slider = new PageSlider($('body'));

    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
    DriverMainView.prototype.template = Handlebars.compile($("#driver-main-tpl").html());
    TechnicianMainView.prototype.template = Handlebars.compile($("#technician-main-tpl").html());

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#003A84');
        StatusBar.styleDefault();
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Mobile", // title
                    'OK'        // buttonName
                );
            };
        }
        FastClick.attach(document.body);
      
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        router.addRoute('', function() {
            slider.slidePage(new LoginView().render().$el);
        });

        router.addRoute('mainPage', function() {
            if(window.sessionStorage['token'] != undefined && window.sessionStorage['token'] != "") {
                if (window.sessionStorage['userType'] == "Driver") {
                    slider.slidePage(new DriverMainView().render().$el);
                } else if (window.sessionStorage['userType'] == "Technician") {
                    slider.slidePage(new TechnicianMainView().render().$el);
                }
            } else {
                window.location.href = "#";
            }
        })

        router.start();
    };

    this.initialize();

}());