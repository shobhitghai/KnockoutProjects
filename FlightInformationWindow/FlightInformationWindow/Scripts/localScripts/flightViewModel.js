$(function () {
   
    $('#searchProgressBar').progressbar("option", "value", false);
        
    var flightViewModel = function () {
        var self = this;
        self.fromCityDataSource = [
            { name: 'Pune', id: 1 },
            { name: 'Mumbai', id: 2 },
            { name: 'Delhi', id: 3 },
            { name: 'Chennai', id: 4 },
            { name: 'Bangalore', id: 5 },
            { name: 'Kolkata', id: 6 },
            { name: 'Chandigarh', id: 7 },
            { name: 'Jaipur', id: 8 },
            { name: 'Mysore', id: 9 }
        ];

        self.selectedFromCity = ko.observable();
        self.destinationDataSource = ko.computed(function () {
            var self = this;
            var source = [];
            if (self.selectedFromCity()) {
                $.grep(self.fromCityDataSource, function (item, index) {
                    if (item.id != self.selectedFromCity().id)
                        source.push(item);
                });
            }
            return source;
        },this);

        //flight start and return 
        self.startDate = ko.observable(new Date());
        self.returnDate = ko.observable(new Date());

        self.startDate.subscribe(function (newValue) {
            if (newValue > this.returnDate())
            this.returnDate(newValue);
        },this);        

        //one way or return
        self.tripTypeSelected = ko.observable("roundTrip");

        //business or economy class
        self.flightClassSelected = ko.observable("economy");

        //number of travellers
        self.numberOfTravellers = ko.observable();

       
        self.airlineName = ko.observable();
        self.arrivalTime = ko.observable();
        self.departureTime = ko.observable();
        self.flightCode = ko.observable();
        self.flightDiscount = ko.observable();
        self.progressBarIsVisible = ko.observable(false);
        self.searchResultIsVisible = ko.observable(false);

        self.searchFlights = function () {
            self.progressBarIsVisible(true);
            self.searchResultIsVisible(false);
            setTimeout(function () {
                $.ajax({
                    url: "Flight/SearchFlights",
                    type: "Get",
                    success: function (data) {
                        self.progressBarIsVisible(false);
                        self.airlineName(data.AirlineName);
                        self.arrivalTime(data.ArrivalTime);
                        self.departureTime(data.DepartureTime);
                        self.flightCode(data.FlightCode);
                        self.flightDiscount(data.Discount);
                        self.searchResultIsVisible(true);
                    },
                    failure: null   
                })
            }, 1200);
        };

        //reset entire form 
        self.formReset = function () {
            this.startDate(new Date());
            this.returnDate(new Date());
            this.selectedFromCity(null);
            this.flightClassSelected("economy");
            this.tripTypeSelected("roundTrip");
            this.numberOfTravellers(1);
            this.searchResultIsVisible(false);
        };
        

    };
    ko.applyBindings(new flightViewModel());
})


