using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVGMoveStudio.Models
{
    public class SVG
    {
        public int SVGId { get; set; }
        public int UserId { get; set; }
        public string SVGName { get; set; }
        public bool isAnimation { get; set; }
    }
}
