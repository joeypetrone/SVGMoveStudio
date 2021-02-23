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

        internal List<SVG> GetSVGsByUserId(int userId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM SVG
                          WHERE UserId = @userId";

            var parameters = new { userId };

            var userSVGs = db.Query<SVG>(query, parameters);

            return userSVGs.ToList(); 
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
