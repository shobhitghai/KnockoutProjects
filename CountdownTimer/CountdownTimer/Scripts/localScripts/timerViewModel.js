$(function () {

    var timerViewModel = function () {
        var self = this;
        var unitsSec, tensSec;
        var unitsMin, tensMin;
        var unitsHour, tensHour;
        var second, minutes, hours;
        var totalSeconds, timerValue ;
        var hoursSeconds, minuteSeconds, remainingSeconds;

        var secondInMinute = 60;
        var secondInHour = 60 * 60;
        var secondInDay = 24 * 60 * 60;
        
        self.unitsSec = ko.observable();
        self.tensSec = ko.observable();
        self.unitsMin = ko.observable();
        self.tensMin = ko.observable();
        self.unitsHour = ko.observable();
        self.tensHour = ko.observable();

        self.minutesEntered = ko.observable(0);
        self.secondsEntered = ko.observable(0);
        self.hoursEntered = ko.observable(0);

        self.isInValidStartTime = ko.computed(function () {
            var self = this;

            //Validation to check time is +ve and not greater than 1 day
            return (self.minutesEntered() <= 0 || self.secondsEntered() <= 0 || self.hoursEntered() <= 0) ||
                (self.hoursEntered() == 24 && (self.secondsEntered() > 0 || self.minutesEntered() > 0)) || self.hoursEntered() > 24;
        }, this);


        self.startTimer = function () {
            totalSeconds = parseInt(self.hoursEntered()) * 3600 + parseInt(self.minutesEntered()) * 60 + parseInt(self.secondsEntered());
            clearInterval(timerValue); //clear previous timer if start timer is clicked again
            timerValue = setInterval(function () {
                --totalSeconds;

                hoursSeconds = totalSeconds % secondInDay;
                hours = Math.floor(hoursSeconds / secondInHour);
                unitsHour = self.extractUnitValue(hours);
                tensHour = self.extractTensValue(hours, unitsHour);

                minuteSeconds = hoursSeconds % secondInHour;
                minutes = Math.floor(minuteSeconds / secondInMinute);
                unitsMin = self.extractUnitValue(minutes);
                tensMin = self.extractTensValue(minutes, unitsMin);

                remainingSeconds = minuteSeconds % secondInMinute;
                second = remainingSeconds;
                unitsSec = self.extractUnitValue(second);
                tensSec = self.extractTensValue(second, unitsSec);


                self.unitsSec(unitsSec);
                self.tensSec(tensSec);
                self.unitsMin(unitsMin);
                self.tensMin(tensMin);
                self.unitsHour(unitsHour);
                self.tensHour(tensHour);

                if (totalSeconds <= 0)
                    clearInterval(timerValue);

            }, 1000);
        };

        self.extractUnitValue = function (timeValue) {
            return timeValue % 10;
        };

        self.extractTensValue = function (timeValue, unitValue) {
            return (timeValue - unitValue) / 10;
        };
    };
    
    ko.applyBindings(new timerViewModel());
})