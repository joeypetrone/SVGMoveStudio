using System;
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
    }
}
