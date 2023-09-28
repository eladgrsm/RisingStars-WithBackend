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
using System.Windows.Forms;

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

        public bool UpdateArtist(Artists artist)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("UpdateArtistInfo", connection))
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

        public List<Artists> GetAllArtistData(string email)
        {
            List<Artists> artistData = new List<Artists>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("GetUserData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@email", email));

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string firstName = reader.GetString(1);
                                string lastName = reader.GetString(2);
                                string userEmail = reader.GetString(3);
                                string phoneNumber = reader.GetString(4);
                                string city = reader.GetString(5);
                                string password = reader.GetString(6);
                                string kindOfArtist = reader.GetString(7);
                                string image = reader.GetString(8);

                                Artists artist = new Artists
                                {
                                    FirstName = firstName,
                                    LastName = lastName,
                                    Email = userEmail,
                                    PhoneNumber = phoneNumber,
                                    City = city,
                                    Password = password,
                                    KindOfArtist = kindOfArtist,
                                    Image = image
                                };

                                artistData.Add(artist);
                            }
                                                    

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }

            return artistData;
        }


        public List<string> GetAllCities()
        {
            List<string> citiesList = new List<string>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("SELECT * FROM Cities", connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string city = reader["value"].ToString();
                                citiesList.Add(city);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception if needed
            }

            return citiesList;
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