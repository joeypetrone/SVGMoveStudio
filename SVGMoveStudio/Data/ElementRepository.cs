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
    public class ElementRepository
    {
        const string _connectionString = "Server=localhost;Database=SVGMoveStudio;Trusted_Connection=true;";

        public List<Element> GetAll()
        {
            var db = new SqlConnection(_connectionString);

            var elements = db.Query<Element>("SELECT * FROM Element");

            return elements.ToList();
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
