using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;
using SVGMoveStudio.Models;

namespace SVGMoveStudio.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string FirebaseUserId => User.FindFirst(x => x.Type == "user_id").Value;
    } 

    [Route("api/users")]
    [ApiController]
    public class UsersController : FirebaseEnabledController
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

        [HttpGet("firebaseUid")]
        public IActionResult GetUserByFirebaseUid()
        {
            var uid = FirebaseUserId;

            var singleUserByUid = _repo.GetUserByFirebaseUid(uid);

            if (singleUserByUid == null)
            {
                return NotFound("User with that id not found in the database.");
            }

            return Ok(singleUserByUid);
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            user.FirebaseUId = FirebaseUserId;

            _repo.Add(user);

            return Created($"/api/users/{user.UserId}", user);
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
