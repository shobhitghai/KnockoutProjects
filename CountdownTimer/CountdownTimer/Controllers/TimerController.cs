using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CountdownTimer.Controllers
{
    public class TimerController : Controller
    {
        //
        // GET: /Timer/

        public ActionResult Index()
        {
            return View();
        }

    }
}
