using BackendRS.BLL;
using BackendRS.DAL;
using BackendRS.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace BackendRS.Controllers
{
    [RoutePrefix("api/business")]
    public class BusinessOwnerController : ApiController
    {
        private readonly BusinessService _businessService;
        public readonly string connectionString = "Data Source=sql.bsite.net\\MSSQL2016;Initial Catalog=risingstars_;User Id=risingstars_;password=QWEasd1$";


        public BusinessOwnerController()
        {
            _businessService = new BusinessService(new BusinessRepository(connectionString));
        }

        [HttpPost]
        [Route("upsert")]
        public IHttpActionResult UpsertBusinessOwner(Business business)
        {
            if (business == null)
            {
                return BadRequest("Artist data is missing.");
            }

            bool result = _businessService.UpsertBusinessOwner(business);

            if (result)
            {
                return Ok("Business upserted successfully.");
            }
            else
            {
                return InternalServerError();
            }
        }
    }
}
