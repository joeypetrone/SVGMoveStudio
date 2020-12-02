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
    public class ObjectRepository
    {
        const string _connectionString = "Server=localhost;Database=SVGMoveStudio;Trusted_Connection=true;";
        
        public List<Models.Object> GetAll()
        {
            var db = new SqlConnection(_connectionString);

            var objects = db.Query<Models.Object>("SELECT * FROM Object");

            return objects.ToList();
        }
    }
}
