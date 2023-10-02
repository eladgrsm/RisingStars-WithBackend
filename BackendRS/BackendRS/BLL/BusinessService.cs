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


        public List<ShowDetails> GetShowDetailsByEmail(string email)
        {
            return _businessRepository.GetShowDetailsByEmail(email);
        }


        public List<BusinessOwnerInfo> GetBusinessOwnerInfo()
        {
            return _businessRepository.GetBusinessOwnerInfo();
        }

    }
}