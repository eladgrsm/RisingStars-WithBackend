using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BackendRS.DAL
{
    public class BusinessRepository
    {
        private readonly string _config;

        public BusinessRepository(string config)
        {
            _config = config;
        }

        public bool UpsertBusinessOwner(Business business)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("UpsertBusinessOwner", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PlanBusiness",business.PlanBusiness);
                        command.Parameters.AddWithValue("@BusinessName",business.BusinessName);
                        command.Parameters.AddWithValue("@City",business.City);
                        command.Parameters.AddWithValue("@PhoneNumber",business.PhoneNumber);
                        command.Parameters.AddWithValue("@Email",business.Email);
                        command.Parameters.AddWithValue("@Password",business.Password);
                        command.Parameters.AddWithValue("@KindOfArtistToShow",business.KindOfArtistToShow);
                        command.Parameters.AddWithValue("@Logo", business.Logo);

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