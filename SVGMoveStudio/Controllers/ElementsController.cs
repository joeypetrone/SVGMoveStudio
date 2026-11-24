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
    [Route("api/elements")]
    [ApiController]
    public class ElementsController : FirebaseEnabledController
    {
        readonly ElementRepository _repo;
        readonly SVGRepository _svgRepo;
        readonly UserRepository _userRepo;

        public ElementsController(ElementRepository repo, SVGRepository svgRepo, UserRepository userRepo)
        {
            _repo = repo;
            _svgRepo = svgRepo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetAllElements()
        {
            var allElements = _repo.GetAll();

            return Ok(allElements);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleElement(int id)
        {
            var singleElement = _repo.GetElementById(id);

            if (singleElement == null)
            {
                return NotFound("This element does not exist in the database");
            }

            return Ok(singleElement);
        }

        [HttpGet("bySvgId/{svgId}")]
        public IActionResult GetSvgElements(int svgId)
        {
            var svgElements = _repo.GetElementsBySvgId(svgId);

            if (svgElements == null)
            {
                return NotFound("There are no elements associated with this SVG Id");
            }

            return Ok(svgElements);
        }

        [HttpGet("default")]
        public IActionResult GetDefaultElements()
        {
            var defaultElements = _repo.GetDefault();

            return Ok(defaultElements);
        }

        // Signed-in users can only delete elements of their own SVGs.
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteElementById(int id)
        {
            var element = _repo.GetElementById(id);

            if (element == null)
            {
                return NotFound("This element does not exist in the database");
            }

            if (!IsCurrentUsersSvg(_svgRepo.GetSVGById(element.SVGId), _userRepo))
            {
                return Forbid();
            }

            _repo.Remove(id);

            return Ok();
        }

    }
}
