using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BackendRS.DAL
{
    public class CreditCardsRepository
    {
        private readonly string _config;

        public CreditCardsRepository(string config)
        {
            _config = config;
        }

        public bool AddCreditCards(CreditCards creditCards)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("AddCreditCard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Name",creditCards.Name);
                        command.Parameters.AddWithValue("@Number",creditCards.Number);
                        command.Parameters.AddWithValue("@Expiry",creditCards.Expiry);
                        command.Parameters.AddWithValue("@Cvc",creditCards.Cvc);
                        command.Parameters.AddWithValue("@Type", creditCards.Type);
                        command.Parameters.AddWithValue("@Email",creditCards.Email);

                        return command.ExecuteNonQuery() > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}