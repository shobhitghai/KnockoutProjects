using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlightInformationWindow.Models
{
    public class FlightSearchResponse
    {
        public string AirlineName { get; set; }

        public string FlightCode { get; set; }

        public string DepartureTime { get; set; }

        public string ArrivalTime { get; set; }

        public string Discount { get; set; }

        public string Price { get; set; }

    }
}