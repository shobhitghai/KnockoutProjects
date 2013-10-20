using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FlightInformationWindow.Models;

namespace FlightInformationWindow.Controllers
{
    public class FlightController : Controller
    {
        //
        // GET: /Flight/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SearchFlights()
        {   
            var searchFlightResponse = new FlightSearchResponse
            {
                AirlineName = "Indigo",
                FlightCode = "GE406",
                ArrivalTime = "8 pm",
                DepartureTime = "10 pm"

            };

            return Json(searchFlightResponse, JsonRequestBehavior.AllowGet);
        }
    }
}
