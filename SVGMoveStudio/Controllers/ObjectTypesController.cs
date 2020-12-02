using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SVGMoveStudio.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SVGMoveStudio.Controllers
{
    [Route("api/objectTypes")]
    [ApiController]
    public class ObjectTypesController : ControllerBase
    {
        ObjectTypeRepository _repo;

        public ObjectTypesController()
        {
            _repo = new ObjectTypeRepository();
        }

        [HttpGet]
        public IActionResult GetAllObjectTypes()
        {
            var allObjectTypes = _repo.GetAll();

            return Ok(allObjectTypes);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleObjectType(int id)
        {
            var singleObjectType = _repo.GetObjectTypeById(id);

            if (singleObjectType == null)
            {
                return NotFound("This object type does not exist in the database");
            }

            return Ok(singleObjectType);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteObjectType(int id)
        {
            if (_repo.GetObjectTypeById(id) == null)
            {
                return NotFound("This object type does not exist in the database");
            }

            _repo.Remove(id);

            return Ok();
        }

    }
}
