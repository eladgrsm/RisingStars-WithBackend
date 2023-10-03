using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using System.Windows.Forms;

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
                        command.Parameters.AddWithValue("@TitleShow", showDetails.TitleShow);
                        command.Parameters.AddWithValue("@Description", showDetails.Description);

                        return command.ExecuteNonQuery() > 0;
                    }
                }
            }catch(Exception ex)
            {
                return false;
            }
        }


        public bool AddRequestShow(RequestStatus requestShowDetails)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("AddRequestShow", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@SelectDate", requestShowDetails.SelectDate);
                        command.Parameters.AddWithValue("@StartTime", requestShowDetails.StartTime);
                        command.Parameters.AddWithValue("@PerformanceInfo", requestShowDetails.PerformanceInfo);
                        command.Parameters.AddWithValue("@VideoLink", requestShowDetails.VideoLink);
                        command.Parameters.AddWithValue("@BusinessOwnerEmail", requestShowDetails.BusinessOwnerEmail);
                        command.Parameters.AddWithValue("@ArtistEmail", requestShowDetails.ArtistEmail);
                        command.Parameters.AddWithValue("@StatusRequest", requestShowDetails.StatusRequest);
                        command.Parameters.AddWithValue("@TitleShow", requestShowDetails.TitleShow);

                        return command.ExecuteNonQuery() > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public List<Business> GetAllArtistData(string email)
        {
            List<Business> businessData = new List<Business>();

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
                                string PlanBusiness = reader.GetString(1);
                                string BusinessName = reader.GetString(2);
                                string City = reader.GetString(3);
                                string phoneNumber = reader.GetString(4);
                                string Email = reader.GetString(5);
                                string password = reader.GetString(6);
                                string KindOfArtistToShow = reader.GetString(7);
                                string Logo = reader.GetString(8);

                                Business business = new Business
                                {
                                    PlanBusiness = PlanBusiness,
                                    BusinessName = BusinessName,
                                    City = City,
                                    PhoneNumber = phoneNumber,
                                    Email = Email,
                                    Password = password,
                                    KindOfArtistToShow = KindOfArtistToShow,
                                    Logo = Logo
                                };

                                businessData.Add(business);
                            }


                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }

            return businessData;
        }


        public List<BusinessOwnerInfo> GetBusinessOwnerInfo()
        {
            List<BusinessOwnerInfo> businessOwnerInfoData = new List<BusinessOwnerInfo>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("GetBusinessOwnerInfo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string userEmail = reader.GetString(0);
                                string userLogo = reader.GetString(1);
                                string userBusinessName = reader.GetString(2);
                                string userCity = reader.GetString(3);

                                BusinessOwnerInfo businessOwnerDetail = new BusinessOwnerInfo
                                {
                                    UserEmail = userEmail,
                                    UserLogo = userLogo,
                                    UserBusinessName = userBusinessName,
                                    UserCity = userCity
                                };

                                businessOwnerInfoData.Add(businessOwnerDetail);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle the exception as needed
                Console.WriteLine(ex.ToString());
            }

            return businessOwnerInfoData;
        }



        public List<RequestStatus> GetRequestStatusByArtistEmail(string artistEmail)
        {
            List<RequestStatus> requestStatusList = new List<RequestStatus>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("GetRequestStatusByArtistEmail", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@ArtistEmail", artistEmail));

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string SelectDate = reader.GetDateTime(0).ToString("yyyy-MM-dd");
                                string StartTime = reader.GetTimeSpan(1).ToString();
                                string performanceInfo = reader.GetString(2);
                                string videoLink = reader.GetString(3);
                                string businessOwnerEmail = reader.GetString(4);
                                string artistEmailResult = reader.GetString(5);
                                string statusRequest = reader.GetString(6);
                                string titleShow = reader.GetString(7);

                                RequestStatus requestStatus = new RequestStatus
                                {
                                    SelectDate = SelectDate,
                                    StartTime = StartTime,
                                    PerformanceInfo = performanceInfo,
                                    VideoLink = videoLink,
                                    BusinessOwnerEmail = businessOwnerEmail,
                                    ArtistEmail = artistEmailResult,
                                    StatusRequest = statusRequest,
                                    TitleShow = titleShow,
                                };

                                requestStatusList.Add(requestStatus);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle or log the exception here
                Console.WriteLine(ex.ToString());
            }

            return requestStatusList;
        }





        public List<ShowDetails> GetShowDetailsByEmail(string email)
        {
            List<ShowDetails> showDetailsData = new List<ShowDetails>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_config))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("GetShowDataByEmail", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@Email", email)); // Use the correct parameter name from your stored procedure

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int ShowId = reader.GetInt32(0);
                                string SelectedDate = reader.GetDateTime(1).ToString("yyyy-MM-dd");
                                string StartTime = reader.GetTimeSpan(2).ToString();
                                int CrowdCapacity = reader.GetInt32(3);
                                decimal Price = reader.GetDecimal(4);
                                string BusinessOwnerEmail = reader.GetString(5);
                                string TitleShow = reader.GetString(6);
                                string Description = reader.GetString(7);

                                // Create a ShowDetails object
                                ShowDetails showDetail = new ShowDetails
                                {
                                    ShowId = ShowId,
                                    SelectedDate = SelectedDate,
                                    StartTime = StartTime,
                                    CrowdCapacity = CrowdCapacity,
                                    Price = Price,
                                    BusinessOwnerEmail = BusinessOwnerEmail,
                                    TitleShow = TitleShow,
                                    Description = Description
                                };

                                showDetailsData.Add(showDetail);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle the exception appropriately (e.g., log or rethrow)
            }

            return showDetailsData;
        }



        public bool SendEmail(string toEmail, string subject, string body,string fromEmail)
        {
            try
            {
                // SMTP server settings (e.g., Gmail)
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 587;
                string smtpUsername = fromEmail; // Your Gmail email address
                string smtpPassword = "ayca dsmy ihlf zezv"; // Your Gmail password

                using (SmtpClient smtpClient = new SmtpClient(smtpServer))
                {
                    smtpClient.Port = smtpPort;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true;

                    using (MailMessage mailMessage = new MailMessage())
                    {
                        mailMessage.From = new MailAddress(smtpUsername);
                        mailMessage.To.Add(toEmail);
                        mailMessage.Subject = subject;
                        mailMessage.Body = body;

                        smtpClient.Send(mailMessage);

                        return true; // Email sent successfully
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle the exception, log it, or return false if sending fails
                Console.WriteLine("Error sending email: " + ex.Message);
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