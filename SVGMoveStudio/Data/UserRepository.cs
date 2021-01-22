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
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SVGMoveStudio");
        }

        public void Add(User userToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[User]
                                   ([FirebaseUid]
                                   ,[DateCreated]
                                   ,[UserName]
                                   ,[Email])
                        Output inserted.UserId
                        VALUES
                               (@firebaseuid, 
                                getdate(), 
                                @username, 
                                @email)";

            var parameters = new
            {
                firebaseuid = userToAdd.FirebaseUId,
                username = userToAdd.UserName,
                email = userToAdd.Email
            };

            var newId = db.ExecuteScalar<int>(query, parameters);

            userToAdd.UserId = newId;
        }

        public List<User> GetAll()
        {
            var db = new SqlConnection(_connectionString);

            var allUsers = db.Query<User>("SELECT * FROM [User]");

            return allUsers.ToList();
        }

        public User GetUserById(int userId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM [User]
                          WHERE UserId = @uid";

            var parameters = new { uid = userId };

            var singleUser = db.QueryFirstOrDefault<User>(query, parameters);

            return singleUser;
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"SELECT *
                          FROM [User]
                          WHERE FirebaseUid = @firebaseUid";

            var parameters = new { firebaseUid };

            var singleUserByUid = db.QueryFirstOrDefault<User>(query, parameters);

            return singleUserByUid;
        }

        public void Remove(int userId)
        {
            var db = new SqlConnection(_connectionString);

            var query = @"DELETE
                          FROM [User]
                          WHERE UserId = @uid";

            var parameters = new { uid = userId };

            db.Execute(query, parameters);
        }
    }
}
