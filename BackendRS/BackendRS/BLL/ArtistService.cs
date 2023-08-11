using BackendRS.DAL;
using BackendRS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendRS.BLL
{
    public class ArtistService
    {
        private readonly ArtistRepository _artistRepository;
        

        public ArtistService(ArtistRepository artistRepository)
        {
            _artistRepository = artistRepository;
        }

        public bool UpsertArtist(Artists artist)
        {
            return _artistRepository.UpsertArtist(artist);
        }


        public List<Artists> GetAllArtists()
        {
            return _artistRepository.GetAllArtists();
        }

        public bool SignIn(string email, string password)
        {
            return _artistRepository.SignIn(email, password);
        }
    }
}