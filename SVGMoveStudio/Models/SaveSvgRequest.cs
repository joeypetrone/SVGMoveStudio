using System.Collections.Generic;

namespace SVGMoveStudio.Models
{
    // Body of POST api/SVGs: a new SVG and the elements on its canvas.
    public class SaveSvgRequest
    {
        public string SvgName { get; set; }
        public bool IsAnimation { get; set; }
        public List<Element> Elements { get; set; } = new List<Element>();
    }
}
