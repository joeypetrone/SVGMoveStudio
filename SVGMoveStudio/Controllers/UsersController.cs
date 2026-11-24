using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;
using SVGMoveStudio.Models;

namespace SVGMoveStudio.Controllers
{
    // Every users route needs a Firebase ID token. The old GET api/users and
    // GET api/users/{id} routes returned every user's email to anyone and were
    // not used by the front end, so they are gone.
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UsersController : FirebaseEnabledController
    {
        readonly UserRepository _repo;

        public UsersController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("firebaseUid")]
        public IActionResult GetUserByFirebaseUid()
        {
            var singleUserByUid = _repo.GetUserByFirebaseUid(FirebaseUserId);

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

        // A signed-in user can only delete their own account.
        [HttpDelete("{id}")]
        public IActionResult DeleteUserById(int id)
        {
            var user = _repo.GetUserById(id);

            if (user == null)
            {
                return NotFound("User with that id not found in the database.");
            }

            if (user.FirebaseUId != FirebaseUserId)
            {
                return Forbid();
            }

            _repo.Remove(id);

            return Ok();
        }
    }
}
