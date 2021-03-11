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
    [Route("api/elements")]
    [ApiController]
    public class ElementsController : FirebaseEnabledController
    {
        readonly ElementRepository _repo;

        public ElementsController(ElementRepository repo)
        {
            _repo = repo;
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

        [Authorize]
        [HttpPost]
        public IActionResult CreateNewElements(List<Element> elements)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteElementById(int id)
        {
            if (_repo.GetElementById(id) == null)
            {
                return NotFound("This element does not exist in the database");
            }

            _repo.Remove(id);

            return Ok();
        }

    }
}
