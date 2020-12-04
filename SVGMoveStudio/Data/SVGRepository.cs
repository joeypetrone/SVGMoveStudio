using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SVGMoveStudio.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Dapper;

namespace SVGMoveStudio.Data
{
    public class SVGRepository
    {
        const string _connectionString = "Server=localhost;Database=SVGMoveStudio;Trusted_Connection=true;";

        public List<SVG> GetAll()
        {
            var db = new SqlConnection(_connectionString);

            var SVGs = db.Query<SVG>("SELECT * FROM SVG");

            return SVGs.ToList();
        }

        public SVG GetSVGById(int svgId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM SVG
                          WHERE SVGId = @svgid";

            var parameters = new { svgId };

            var singleSVG = db.QueryFirstOrDefault<SVG>(query, parameters);

            return singleSVG;
        }

        public void Remove(int svgId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"DELETE
                          FROM SVG
                          WHERE SVGId = @svgid";

            var parameters = new { svgId };

            db.Execute(query, parameters);
        }

    }
}
