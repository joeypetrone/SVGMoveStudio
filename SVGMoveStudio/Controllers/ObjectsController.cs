using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;

namespace SVGMoveStudio.Controllers
{
    [Route("api/objects")]
    [ApiController]
    public class ObjectsController : ControllerBase
    {
        ObjectRepository _repo;

        public ObjectsController()
        {
            _repo = new ObjectRepository();
        }

        [HttpGet]
        public IActionResult GetAllObjects()
        {
            var allObjects = _repo.GetAll();

            return Ok(allObjects);
        }
    }
}
