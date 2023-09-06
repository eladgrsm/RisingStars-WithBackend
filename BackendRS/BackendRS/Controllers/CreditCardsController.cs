using BackendRS.BLL;
using BackendRS.DAL;
using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackendRS.Controllers
{
    [RoutePrefix("api/creditCards")]
    public class CreditCardsController : ApiController
    {
        private readonly CreditCardsService _creditCardsService;
        public readonly string connectionString = "Data Source=risingstars.mssql.somee.com;Initial Catalog=risingstars;User Id=idoandelad_SQLLogin_1;password=9ka8laa7pl";


        public CreditCardsController()
        {
            _creditCardsService = new CreditCardsService(new CreditCardsRepository(connectionString));
        }

        [HttpPost]
        [Route("addCard")]
        public IHttpActionResult UpsertArtist(CreditCards creditCrads)
        {
            if (creditCrads == null)
            {
                return BadRequest("Artist data is missing.");
            }

            bool result = _creditCardsService.AddCreditCards(creditCrads);

            if (result)
            {
                return Ok("CreditCard added successfully.");
            }
            else
            {
                return InternalServerError();
            }
        }
    }
}
