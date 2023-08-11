using BackendRS.DAL;
using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.BLL
{
    public class CreditCardsService
    {
        private readonly CreditCardsRepository _creditCardsRepository;


        public CreditCardsService(CreditCardsRepository creditCardsRepository)
        {
            _creditCardsRepository = creditCardsRepository;
        }

        public bool AddCreditCards(CreditCards creditCards)
        {
            return _creditCardsRepository.AddCreditCards(creditCards);
        }
    }
}