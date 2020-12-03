using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;

namespace SVGMoveStudio.Controllers
{
    [Route("api/elements")]
    [ApiController]
    public class ElementsController : ControllerBase
    {
        ElementRepository _repo;

        public ElementsController()
        {
            _repo = new ElementRepository();
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
