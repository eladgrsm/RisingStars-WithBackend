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

        public bool AddSHow(ShowDetails showDetails)
        {
            try
            {
                using(SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();
                    using(SqlCommand command = new SqlCommand("AddShowDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@SelectedDate", showDetails.SelectedDate);
                        command.Parameters.AddWithValue("@StartTime", showDetails.StartTime);
                        command.Parameters.AddWithValue("@CrowdCapacity", showDetails.CrowdCapacity);
                        command.Parameters.AddWithValue("@Price", showDetails.Price);
                        command.Parameters.AddWithValue("@BusinessOwnerEmail", showDetails.BusinessOwnerEmail);

                        return command.ExecuteNonQuery() > 0;
                    }
                }
            }catch(Exception ex)
            {
                return false;
            }
        }


        public bool SignIn(string email, string password)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("SELECT dbo.checkSignBusiness(@Email, @Password)", connection))
                    {
                        command.Parameters.AddWithValue("@Email", email);
                        command.Parameters.AddWithValue("@Password", password);

                        int signInResult = (int)command.ExecuteScalar();

                        return signInResult == 1;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception if needed
                return false;
            }
        }
    }
}