﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SVGMoveStudio.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Dapper; 

namespace SVGMoveStudio.Data
{
    public class UserRepository
    {
        const string _connectionString = "Server=localhost;Database=SVGMoveStudio;Trusted_Connection=true;";

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