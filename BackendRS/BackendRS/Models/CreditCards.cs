using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.Models
{
    public class CreditCards
    {
        public string Name { get;set; }

        public string Number { get;set; }

        public string Expiry { get;set; }

        public string Cvc { get;set; }

        public string Type { get;set; }

        public string Email { get;set; }
    }
}