using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SVGMoveStudio.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace SVGMoveStudio.Data
{
    public class ElementRepository
    {
        readonly string _connectionString;

        public ElementRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SVGMoveStudio");
        }

        public List<Element> GetAll()
        {
            var db = new SqlConnection(_connectionString);

            var elements = db.Query<Element>("SELECT * FROM Element");

            return elements.ToList();
        }

        public List<Element> GetDefault()
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM Element
                          WHERE isDefault = 1";

            var defaultElements = db.Query<Element>(query);

            return defaultElements.ToList();
        }

        public Element GetElementById(int elementId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM Element
                          WHERE ElementId = @eid";

            var parameters = new { eid = elementId };

            var singleElement = db.QueryFirstOrDefault<Element>(query, parameters);

            return singleElement;
        }

        internal List<Element> GetElementsBySvgId(int svgId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM Element
                          WHERE SVGId = @svgId";

            var parameters = new { svgId };

            var svgElements = db.Query<Element>(query, parameters);

            return svgElements.ToList();
        }

        internal void Add(Element element)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[Element]
                                     ([SVGId]
                                     ,[ElementTypeId]
                                     ,[ElementName]
                                     ,[ArrangeNumber]
                                     ,[Fill]
                                     ,[FillOpacity]
                                     ,[Opacity]
                                     ,[Stroke]
                                     ,[StrokeWidth]
                                     ,[StrokeOpacity]
                                     ,[Width]
                                     ,[Height]
                                     ,[X_CoordinateStart]
                                     ,[Y_CoordinateStart]
                                     ,[X_CoordinateEnd]
                                     ,[Y_CoordinateEnd]
                                     ,[X_Radius]
                                     ,[Y_Radius]
                                     ,[Points]
                                     ,[PathShape]
                                     ,[PathLength]
                                     ,[X_Translate]
                                     ,[Y_Translate]
                                     ,[Rotate]
                                     ,[Scale]
                                     ,[X_Skew]
                                     ,[Y_Skew]
                                     ,[isDefault])
                               Output inserted.ElementId
                               VALUES                        
                                     (@svgid,
                                      @elementtypeid,
                                      @elementname,
                                      @arrangenumber,
                                      @fill,
                                      @fillopacity,
                                      @opacity,
                                      @stroke,
                                      @strokewidth,
                                      @strokeopacity,
                                      @width,
                                      @height,
                                      @x_coordinatestart,
                                      @y_coordinatestart,
                                      @x_coordinateend,
                                      @y_coordinateend,
                                      @x_radius,
                                      @y_radius,
                                      @points,
                                      @pathshape,
                                      @pathlength,
                                      @x_translate,
                                      @y_translate,
                                      @rotate,
                                      @scale,
                                      @x_skew,
                                      @y_skew,
                                      @isdefault)";
            var parameters = new
            {
                svgid = element.SVGId,
                elementtypeid = element.ElementTypeId,
                elementname = element.ElementName,
                arrangenumber = element.ArrangeNumber,
                fill = element.Fill,
                fillopacity = element.FillOpacity,
                opacity = element.Opacity,
                stroke = element.Stroke,
                strokewidth = element.StrokeWidth,
                strokeopacity = element.StrokeOpacity,
                width = element.Width,
                height = element.Height,
                x_coordinatestart = element.X_CoordinateStart,
                y_coordinatestart = element.Y_CoordinateStart,
                x_coordinateend = element.X_CoordinateEnd,
                y_coordinateend = element.Y_CoordinateEnd,
                x_radius = element.X_Radius,
                y_radius = element.Y_Radius,
                points = element.Points,
                pathshape = element.PathShape,
                pathlength = element.PathLength,
                x_translate = element.X_Translate,
                y_translate = element.Y_Translate,
                rotate = element.Rotate,
                scale = element.Scale,
                x_skew = element.X_Skew,
                y_skew = element.Y_Skew,
                isdefault = element.isDefault
            };

            db.Execute(query, parameters);
        }

        internal void Update(Element element)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"UPDATE [dbo].[Element]
                             SET [SVGId] = @svgid
                                ,[ElementTypeId] = @elementtypeid
                                ,[ElementName] = @elementname
                                ,[ArrangeNumber] = @arrangenumber
                                ,[Fill] = @fill
                                ,[FillOpacity] = @fillopacity
                                ,[Opacity] = @opacity
                                ,[Stroke] = @stroke
                                ,[StrokeWidth] = @strokewidth
                                ,[StrokeOpacity] = @strokeopacity
                                ,[Width] = @width
                                ,[Height] = @height
                                ,[X_CoordinateStart] = @x_coordinatestart
                                ,[Y_CoordinateStart] = @y_coordinatestart
                                ,[X_CoordinateEnd] = @x_coordinateend
                                ,[Y_CoordinateEnd] = @y_coordinateend
                                ,[X_Radius] = @x_radius
                                ,[Y_Radius] = @y_radius
                                ,[Points] = @points
                                ,[PathShape] = @pathshape
                                ,[PathLength] = @pathlength
                                ,[X_Translate] = @x_translate
                                ,[Y_Translate] = @y_translate
                                ,[Rotate] = @rotate
                                ,[Scale] = @scale
                                ,[X_Skew] = @x_skew
                                ,[Y_Skew] = @y_skew
                                ,[isDefault] = @isdefault
                           WHERE [Elementid] = @elementid";
            var parameters = new
            {
                elementid = element.ElementId,
                svgid = element.SVGId,
                elementtypeid = element.ElementTypeId,
                elementname = element.ElementName,
                arrangenumber = element.ArrangeNumber,
                fill = element.Fill,
                fillopacity = element.FillOpacity,
                opacity = element.Opacity,
                stroke = element.Stroke,
                strokewidth = element.StrokeWidth,
                strokeopacity = element.StrokeOpacity,
                width = element.Width,
                height = element.Height,
                x_coordinatestart = element.X_CoordinateStart,
                y_coordinatestart = element.Y_CoordinateStart,
                x_coordinateend = element.X_CoordinateEnd,
                y_coordinateend = element.Y_CoordinateEnd,
                x_radius = element.X_Radius,
                y_radius = element.Y_Radius,
                points = element.Points,
                pathshape = element.PathShape,
                pathlength = element.PathLength,
                x_translate = element.X_Translate,
                y_translate = element.Y_Translate,
                rotate = element.Rotate,
                scale = element.Scale,
                x_skew = element.X_Skew,
                y_skew = element.Y_Skew,
                isdefault = element.isDefault
            };

            db.Execute(query, parameters);
        }

        public void Remove(int elementId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"DELETE
                          FROM Element
                          WHERE ElementId = @eid";

            var parameters = new { eid = elementId };

            db.Execute(query, parameters);
        }
    }
}
