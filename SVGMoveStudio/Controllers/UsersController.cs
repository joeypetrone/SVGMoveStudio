﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;

namespace SVGMoveStudio.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;

        public UsersController()
        {
            _repo = new UserRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetAll();

            return Ok(allUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleUser(int id)
        {
            var singleUser = _repo.GetUserById(id);

            if (singleUser == null)
            {
                return NotFound("User with that id not found in the database.");
            }

            return Ok(singleUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserById(int id)
        {
            if (_repo.GetUserById(id) == null)
            {
                NotFound("User with that id not found in the database.");
            }

            _repo.Remove(id);

            return Ok();
        }
    }
}