using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.Models
{
    public class Business
    {
        public string PlanBusiness { get; set; }
        public string BusinessName { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string KindOfArtistToShow { get; set; }
        public string Logo { get; set; }
    }
}