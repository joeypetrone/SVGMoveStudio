using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVGMoveStudio.Models
{
    public class Object
    {
        public int ObjectId { get; set; }
        public int SVGId { get; set; }
        public int ObjectTypeId { get; set; }
        public string ObjectName { get; set; }
        public int ArrangeNumber { get; set; }
        public string Fill { get; set; }
        public decimal FillOpacity { get; set; }
        public decimal Opacity { get; set; }
        public string Stroke { get; set; }
        public int StrokeWidth { get; set; }
        public decimal StrokeOpacity { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int X_CoordinateStart { get; set; }
        public int Y_CoordinateStart { get; set; }
        public int X_CoordinateEnd { get; set; }
        public int Y_CoordinateEnd { get; set; }
        public int X_Radius { get; set; }
        public int Y_Radius { get; set; }
        public string Points { get; set; }
        public string PathShape { get; set; }
        public int PathLength { get; set; }
        public bool isDefault { get; set; }
    }
}
