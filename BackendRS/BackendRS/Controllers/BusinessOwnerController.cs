﻿using BackendRS.BLL;
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
        public readonly string connectionString = "Data Source=risingstars.mssql.somee.com;Initial Catalog=risingstars;User Id=idoandelad_SQLLogin_1;password=9ka8laa7pl";


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


        [HttpPost]
        [Route("signin")]
        public IHttpActionResult SignIn(Artists credentials)
        {
            if (credentials == null || string.IsNullOrEmpty(credentials.Email) || string.IsNullOrEmpty(credentials.Password))
            {
                return BadRequest("Sign-in credentials are missing.");
            }

            bool signInResult = _businessService.SignIn(credentials.Email, credentials.Password);

            if (signInResult)
            {
                return Ok("Sign-in successful.");
            }
            else
            {
                return BadRequest("Sign-in unsuccessful. Invalid credentials.");
            }
        }


        [HttpPost]
        [Route("addShow")]
        public IHttpActionResult AddShow(ShowDetails showDetails)
        {
            if (showDetails == null)
            {
                return BadRequest("Details are missing.");
            }

            bool result = _businessService.AddSHow(showDetails);

            if (result)
            {
                return Ok("Show added successfully.");
            }
            else
            {
                return InternalServerError();
            }
        }


        [HttpPost]
        [Route("sendRequest")]
        public IHttpActionResult AddRequestShow(RequestStatus requestShowDetails)
        {
            if (requestShowDetails == null)
            {
                return BadRequest("Details are missing.");
            }

            bool result = _businessService.AddRequestShow(requestShowDetails);

            if (result)
            {
                return Ok("Request send successfully.");
            }
            else
            {
                return InternalServerError();
            }
        }


        [HttpPost]
        [Route("detailsShow")]
        public IHttpActionResult ShowDetails(ShowDetails showDetails)
        {
            string email = showDetails.BusinessOwnerEmail;

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is missing.");
            }

            List<ShowDetails> showData = _businessService.GetShowDetailsByEmail(email);


            if (showData.Count > 0)
            {
                return Ok(showData);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("getRequestsData")]
        public IHttpActionResult GetRequestStatusByArtistEmail(RequestStatus RequestStatus)
        {
            if (string.IsNullOrEmpty(RequestStatus.ArtistEmail))
            {
                return BadRequest("Email parameter is missing.");
            }

            List<RequestStatus> requestData = _businessService.GetRequestStatusByArtistEmail(RequestStatus.ArtistEmail);

            if (requestData.Count > 0)
            {
                return Ok(requestData);
            }
            else
            {
                return NotFound();
            }
        }



        [HttpGet]
        [Route("getinfo")]
        public IHttpActionResult GetBusinessOwnerInfo()
        {
            try
            {
                List<BusinessOwnerInfo> businessOwnerInfoData = _businessService.GetBusinessOwnerInfo();

                if (businessOwnerInfoData != null && businessOwnerInfoData.Count > 0)
                {
                    return Ok(businessOwnerInfoData);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                // Handle the exception as needed
                Console.WriteLine(ex.ToString());
                return InternalServerError();
            }
        }



        [HttpPost]
        [Route("sendEmail")]
        public IHttpActionResult SendEmail(EmailRequest emailRequest)
        {
            if (emailRequest == null || string.IsNullOrEmpty(emailRequest.ToEmail) || string.IsNullOrEmpty(emailRequest.Subject) || string.IsNullOrEmpty(emailRequest.Body) || string.IsNullOrEmpty(emailRequest.FromEmail))
            {
                return BadRequest("Email request data is missing.");
            }

            bool result = _businessService.SendEmail(emailRequest.ToEmail, emailRequest.Subject, emailRequest.Body, emailRequest.FromEmail);

            if (result)
            {
                return Ok("Email sent successfully.");
            }
            else
            {
                return InternalServerError();
            }
        }

    }
}
