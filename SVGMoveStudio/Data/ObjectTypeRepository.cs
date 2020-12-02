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
    public class ObjectTypeRepository
    {
        const string _connectionString = "Server=localhost;Database=SVGMoveStudio;Trusted_Connection=True;";

        public List<ObjectType> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var objectTypes = db.Query<ObjectType>("SELECT * FROM ObjectType");

            return objectTypes.ToList();
        }

        internal ObjectType GetObjectTypeById(int objectTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM ObjectType
                          WHERE ObjectTypeId = @otid";

            var parameters = new { otid = objectTypeId };

            var objectType = db.QueryFirstOrDefault<ObjectType>(query, parameters);

            return objectType;
        }

        internal void Remove(int objectTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"DELETE
                          FROM ObjectType
                          WHERE ObjectTypeId = @otid";

            db.Execute(query, new {otid = objectTypeId });
        }
    }
}
