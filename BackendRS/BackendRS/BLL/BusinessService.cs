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


    }
}