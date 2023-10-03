using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.Models
{
    public class EmailRequest
    {
        public string ToEmail { get; set; }
        public string FromEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}