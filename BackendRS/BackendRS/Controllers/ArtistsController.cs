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
    [RoutePrefix("api/artists")]
    public class ArtistsController : ApiController
    {
        private readonly ArtistService _artistService;
        public readonly string connectionString = "Data Source=sql.bsite.net\\MSSQL2016;Initial Catalog=risingstars_;User Id=risingstars_;password=QWEasd1$";


        public ArtistsController()
        {
            _artistService = new ArtistService(new ArtistRepository(connectionString));
        }

        [HttpPost]
        [Route("upsert")]
        public IHttpActionResult UpsertArtist(Artists artist)
        {
            if (artist == null)
            {
                return BadRequest("Artist data is missing.");
            }

            bool result = _artistService.UpsertArtist(artist);

            if (result)
            {
                return Ok("Artist upserted successfully.");
            }
            else
            {
                return InternalServerError();
            }
        }


        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAllArtists()
        {
            List<Artists> artists = _artistService.GetAllArtists();

            if (artists != null && artists.Count > 0)
            {
                return Ok(artists);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpPost]
        [Route("signin")]
        public IHttpActionResult SignIn(Artists credentials)
        {
            if (credentials == null || string.IsNullOrEmpty(credentials.Email) || string.IsNullOrEmpty(credentials.Password))
            {
                return BadRequest("Sign-in credentials are missing.");
            }

            bool signInResult = _artistService.SignIn(credentials.Email, credentials.Password);

            if (signInResult)
            {
                return Ok("Sign-in successful.");
            }
            else
            {
                return BadRequest("Sign-in unsuccessful. Invalid credentials.");
            }
        }


    }
}
