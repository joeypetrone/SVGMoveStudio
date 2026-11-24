using System.Collections.Generic;
using SVGMoveStudio.Models;

namespace SVGMoveStudio.Data
{
    // Checks elements against the Element table's column limits before saving,
    // so a bad value comes back as a clear 400 instead of a SQL error.
    public static class SvgElementValidator
    {
        public const int MaxElements = 200;

        public static string Validate(List<Element> elements)
        {
            if (elements == null)
            {
                return null;
            }

            if (elements.Count > MaxElements)
            {
                return $"An SVG can have at most {MaxElements} elements.";
            }

            foreach (var element in elements)
            {
                if (element == null)
                {
                    return "One of the elements is empty.";
                }

                var label = string.IsNullOrWhiteSpace(element.ElementName) ? "An element" : $"\"{element.ElementName}\"";

                if (element.ElementTypeId < 1 || element.ElementTypeId > 7)
                {
                    return $"{label} has an unknown element type.";
                }

                if (string.IsNullOrWhiteSpace(element.ElementName) || element.ElementName.Length > 50)
                {
                    return "Element names must be 1 to 50 characters.";
                }

                if ((element.Fill?.Length ?? 0) > 100 || (element.Stroke?.Length ?? 0) > 100)
                {
                    return $"{label} has a color value that is too long.";
                }

                if ((element.Points?.Length ?? 0) > 100 || (element.PathShape?.Length ?? 0) > 100)
                {
                    return $"{label} has too many points to save (100 characters max).";
                }

                if (element.Scale < 0 || element.Scale > 9.99m)
                {
                    return $"{label} has a scale of {element.Scale}; scale must be between 0 and 9.99.";
                }

                if (element.StrokeWidth < 0 || element.StrokeWidth > 9.99m)
                {
                    return $"{label} has a stroke width of {element.StrokeWidth}; stroke width must be between 0 and 9.99.";
                }

                if (element.Opacity < 0 || element.Opacity > 9.9m)
                {
                    return $"{label} has an opacity outside the allowed range.";
                }
            }

            return null;
        }
    }
}
