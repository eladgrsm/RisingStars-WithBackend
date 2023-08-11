using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using BackendRS.Models;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace BackendRS.DAL
{
    public class ArtistRepository
    {
        private readonly string _config;

        public ArtistRepository(string config)
        {
            _config = config;
        }

        public bool UpsertArtist(Artists artist)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("UpsertArtist", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@FirstName", artist.FirstName);
                        command.Parameters.AddWithValue("@LastName", artist.LastName);
                        command.Parameters.AddWithValue("@Email", artist.Email);
                        command.Parameters.AddWithValue("@PhoneNumber", artist.PhoneNumber);
                        command.Parameters.AddWithValue("@City", artist.City);
                        command.Parameters.AddWithValue("@Password", artist.Password);
                        command.Parameters.AddWithValue("@KindOfArtist", artist.KindOfArtist);
                        command.Parameters.AddWithValue("@Image", artist.Image);

                        return command.ExecuteNonQuery() > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public List<Artists> GetAllArtists()
        {
            List<Artists> artistsList = new List<Artists>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("SELECT * FROM Artists", connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Artists artist = new Artists
                                {
                                    FirstName = reader["FirstName"].ToString(),
                                    LastName = reader["LastName"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    PhoneNumber = reader["PhoneNumber"].ToString(),
                                    City = reader["City"].ToString(),
                                    Password = reader["Password"].ToString(),
                                    KindOfArtist = reader["KindOfArtist"].ToString(),
                                    Image = reader["Image"].ToString()
                                };

                                artistsList.Add(artist);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception if needed
            }

            return artistsList;
        }

        public bool SignIn(string email, string password)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("SELECT dbo.checkSign(@Email, @Password)", connection))
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