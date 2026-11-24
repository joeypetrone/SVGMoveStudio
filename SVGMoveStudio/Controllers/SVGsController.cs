using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;

namespace SVGMoveStudio.Controllers
{
    [Route("api/SVGs")]
    [ApiController]
    public class SVGsController : FirebaseEnabledController
    {
        readonly SVGRepository _repo;
        readonly UserRepository _userRepo;

        public SVGsController(SVGRepository repo, UserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetAllSVGs()
        {
            var allSVGs = _repo.GetAll();

            return Ok(allSVGs);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleSVG(int id)
        {
            var singleSVG = _repo.GetSVGById(id);

            if (singleSVG == null)
            {
                return NotFound("There is no SVG with that id in the database");
            }

            return Ok(singleSVG);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserSVGs(int userId)
        {
            var userSVGs = _repo.GetSVGsByUserId(userId);

            if (userSVGs == null)
            {
                return NotFound("There are no SVGs with that User's id in the database");
            }

            return Ok(userSVGs);
        }

        // Signed-in users can only delete their own SVGs.
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteSVGById(int id)
        {
            var svg = _repo.GetSVGById(id);

            if (svg == null)
            {
                return NotFound("There is no SVG with that id in the database");
            }

            if (!IsCurrentUsersSvg(svg, _userRepo))
            {
                return Forbid();
            }

            _repo.Remove(id);

            return Ok();
        }
    }
}
