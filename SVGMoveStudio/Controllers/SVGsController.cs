using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;

namespace SVGMoveStudio.Controllers
{
    [Route("api/SVGs")]
    [ApiController]
    public class SVGsController : ControllerBase
    {
        SVGRepository _repo;

        public SVGsController()
        {
            _repo = new SVGRepository();
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

        [HttpDelete("{id}")]
        public IActionResult DeleteSVGById(int id)
        {
            if (_repo.GetSVGById(id) == null)
            {
                return NotFound("There is no SVG with that id in the database");
            }

            _repo.Remove(id);

            return Ok();
        }
    }
}
