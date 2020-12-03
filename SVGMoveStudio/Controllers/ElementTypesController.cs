using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;

namespace SVGMoveStudio.Controllers
{
    [Route("api/elementTypes")]
    [ApiController]
    public class ElementTypesController : ControllerBase
    {
        ElementTypeRepository _repo;

        public ElementTypesController()
        {
            _repo = new ElementTypeRepository();
        }

        [HttpGet]
        public IActionResult GetAllElementTypes()
        {
            var allElementTypes = _repo.GetAll();

            return Ok(allElementTypes);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleElementType(int id)
        {
            var singleElementType = _repo.GetElementTypeById(id);

            if (singleElementType == null)
            {
                return NotFound("This element type does not exist in the database");
            }

            return Ok(singleElementType);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteElementType(int id)
        {
            if (_repo.GetElementTypeById(id) == null)
            {
                return NotFound("This element type does not exist in the database");
            }

            _repo.Remove(id);

            return Ok();
        }
    }
}
