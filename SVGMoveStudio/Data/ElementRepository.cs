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
