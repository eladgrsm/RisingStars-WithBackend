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
        public readonly string connectionString = "Data Source=sql.bsite.net\\MSSQL2016;Initial Catalog=risingstars_;User Id=risingstars_;password=QWEasd1$";


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
