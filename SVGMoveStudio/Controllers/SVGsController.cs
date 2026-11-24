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

        // Creates a new SVG, with its elements, for the signed-in user.
        [Authorize]
        [HttpPost]
        public IActionResult CreateSVG(SaveSvgRequest request)
        {
            var currentUser = FirebaseUserId == null ? null : _userRepo.GetUserByFirebaseUid(FirebaseUserId);

            if (currentUser == null)
            {
                return BadRequest("Your account isn't set up yet. Sign out, sign back in, and try again.");
            }

            var name = request.SvgName?.Trim();

            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Give your SVG a name.");
            }

            if (name.Length > 50)
            {
                return BadRequest("SVG names can be at most 50 characters.");
            }

            var elementsProblem = SvgElementValidator.Validate(request.Elements);

            if (elementsProblem != null)
            {
                return BadRequest(elementsProblem);
            }

            var svg = new SVG
            {
                UserId = currentUser.UserId,
                SVGName = name,
                isAnimation = request.IsAnimation
            };

            var created = _repo.CreateWithElements(svg, request.Elements ?? new List<Element>());

            return Created($"/api/SVGs/{created.SVGId}", created);
        }

        // Replaces the elements of one of the signed-in user's SVGs.
        [Authorize]
        [HttpPut("{id}/elements")]
        public IActionResult SaveSVGElements(int id, List<Element> elements)
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

            var elementsProblem = SvgElementValidator.Validate(elements);

            if (elementsProblem != null)
            {
                return BadRequest(elementsProblem);
            }

            _repo.ReplaceElements(id, elements ?? new List<Element>());

            return Ok();
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
