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
    public class ElementTypeRepository
    {
        const string _connectionString = "Server=localhost;Database=SVGMoveStudio;Trusted_Connection=True;";

        public List<ElementType> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var elementTypes = db.Query<ElementType>("SELECT * FROM ElementType");

            return elementTypes.ToList();
        }

        internal ElementType GetElementTypeById(int elementTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM ElementType
                          WHERE ElementTypeId = @etid";

            var parameters = new { etid = elementTypeId };

            var singleElementType = db.QueryFirstOrDefault<ElementType>(query, parameters);

            return singleElementType;
        }

        internal void Remove(int elementTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"DELETE
                          FROM ElementType
                          WHERE ElementTypeId = @etid";

            db.Execute(query, new { etid = elementTypeId });
        }

    }
}
