using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.Models
{
    public class ShowDetails
    {
        public string SelectedDate { get; set; }
        public string StartTime { get; set; }
        public int CrowdCapacity { get; set; }
        public decimal Price { get; set; }
        public string BusinessOwnerEmail { get; set; }
        public string TitleShow { get; set; }
        public string Description { get; set; }

    }
}