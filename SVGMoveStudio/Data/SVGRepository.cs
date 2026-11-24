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
    public class SVGRepository
    {
        readonly string _connectionString;

        public SVGRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SVGMoveStudio");
        }

        public List<SVG> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var SVGs = db.Query<SVG>("SELECT * FROM SVG");

            return SVGs.ToList();
        }

        public SVG GetSVGById(int svgId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM SVG
                          WHERE SVGId = @svgid";

            var parameters = new { svgId };

            var singleSVG = db.QueryFirstOrDefault<SVG>(query, parameters);

            return singleSVG;
        }

        internal List<SVG> GetSVGsByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM SVG
                          WHERE UserId = @userId";

            var parameters = new { userId };

            var userSVGs = db.Query<SVG>(query, parameters);

            return userSVGs.ToList(); 
        }

        // Deletes the SVG and its elements together (the Element table has no
        // foreign key to SVG, so nothing else would clean them up).
        public void Remove(int svgId)
        {
            using var db = new SqlConnection(_connectionString);
            db.Open();
            using var transaction = db.BeginTransaction();

            db.Execute("DELETE FROM Element WHERE SVGId = @svgId AND isDefault = 0", new { svgId }, transaction);
            db.Execute("DELETE FROM SVG WHERE SVGId = @svgId", new { svgId }, transaction);

            transaction.Commit();
        }

        // Inserts a new SVG and its elements in one transaction and returns the
        // saved SVG with its new id.
        public SVG CreateWithElements(SVG svg, IEnumerable<Element> elements)
        {
            using var db = new SqlConnection(_connectionString);
            db.Open();
            using var transaction = db.BeginTransaction();

            var insertSvg = @"INSERT INTO SVG (UserId, SVGName, isAnimation)
                              OUTPUT inserted.SVGId
                              VALUES (@UserId, @SVGName, @isAnimation)";

            svg.SVGId = db.ExecuteScalar<int>(insertSvg, svg, transaction);

            InsertElements(db, transaction, svg.SVGId, elements);

            transaction.Commit();

            return svg;
        }

        // Replaces everything on an SVG's canvas with the given elements.
        public void ReplaceElements(int svgId, IEnumerable<Element> elements)
        {
            using var db = new SqlConnection(_connectionString);
            db.Open();
            using var transaction = db.BeginTransaction();

            db.Execute("DELETE FROM Element WHERE SVGId = @svgId AND isDefault = 0", new { svgId }, transaction);

            InsertElements(db, transaction, svgId, elements);

            transaction.Commit();
        }

        static void InsertElements(SqlConnection db, SqlTransaction transaction, int svgId, IEnumerable<Element> elements)
        {
            var rows = elements.Select((element, index) =>
            {
                element.SVGId = svgId;
                element.ArrangeNumber = index;
                element.isDefault = false;
                return element;
            }).ToList();

            if (rows.Count == 0)
            {
                return;
            }

            var insertElement = @"INSERT INTO Element
                (SVGId, ElementTypeId, ElementName, ArrangeNumber, Fill, FillOpacity, Opacity,
                 Stroke, StrokeWidth, StrokeOpacity, Width, Height,
                 X_CoordinateStart, Y_CoordinateStart, X_CoordinateEnd, Y_CoordinateEnd,
                 X_Radius, Y_Radius, Points, PathShape, PathLength,
                 X_Translate, Y_Translate, Rotate, Scale, X_Skew, Y_Skew, isDefault)
                VALUES
                (@SVGId, @ElementTypeId, @ElementName, @ArrangeNumber, @Fill, @FillOpacity, @Opacity,
                 @Stroke, @StrokeWidth, @StrokeOpacity, @Width, @Height,
                 @X_CoordinateStart, @Y_CoordinateStart, @X_CoordinateEnd, @Y_CoordinateEnd,
                 @X_Radius, @Y_Radius, @Points, @PathShape, @PathLength,
                 @X_Translate, @Y_Translate, @Rotate, @Scale, @X_Skew, @Y_Skew, @isDefault)";

            db.Execute(insertElement, rows, transaction);
        }

    }
}
