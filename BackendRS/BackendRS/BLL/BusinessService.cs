using BackendRS.DAL;
using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.BLL
{
    public class BusinessService
    {
        private readonly BusinessRepository _businessRepository;

        public BusinessService(BusinessRepository businessRepository)
        {
            _businessRepository = businessRepository;
        }

        public bool UpsertBusinessOwner(Business business)
        {
            return _businessRepository.UpsertBusinessOwner(business);
        }

        public bool SignIn(string email, string password)
        {
            return _businessRepository.SignIn(email, password);
        }

        public bool AddSHow(ShowDetails showDetails)
        {
            return _businessRepository.AddSHow(showDetails);
        }

        public bool AddRequestShow(RequestStatus requestShowDetails)
        {
            return _businessRepository.AddRequestShow(requestShowDetails);
        }

        public List<RequestStatus> GetRequestStatusByArtistEmail(string email)
        {
            return _businessRepository.GetRequestStatusByArtistEmail(email);
        }


        public List<ShowDetails> GetShowDetailsByEmail(string email)
        {
            return _businessRepository.GetShowDetailsByEmail(email);
        }


        public bool SendEmail(string toEmail, string subject, string body, string fromEmail)
        {
            if (!IsValidEmail(toEmail))
            {
                return false;
            }

            return _businessRepository.SendEmail(toEmail, subject, body,fromEmail);
        }

        // Helper method to validate an email address.
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }


        public List<BusinessOwnerInfo> GetBusinessOwnerInfo()
        {
            return _businessRepository.GetBusinessOwnerInfo();
        }

    }
}