using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVGMoveStudio.Models
{
    public class Element
    {
        public int ElementId { get; set; }
        public int SVGId { get; set; }
        public int ElementTypeId { get; set; }
        public string ElementName { get; set; }
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
        public int X_Translate { get; set; }
        public int Y_Translate { get; set; }
        public int Rotate { get; set; }
        public int Scale { get; set; }
        public int X_Skew { get; set; }
        public int Y_Skew { get; set; }
        public bool isDefault { get; set; }
    }
}
