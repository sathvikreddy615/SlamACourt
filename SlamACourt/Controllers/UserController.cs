﻿using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SlamACourt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Cors;

namespace SlamACourt.Models
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("SlamACourt")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;

        public UserController(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> Get(string email)
        {
            using (IDbConnection conn = Connection)
            {
                string sql = "SELECT * FROM [User]";

                if (email != null)
                {
                    sql += $" WHERE Email = {email}";
                }

                var allUsers = await Connection.QueryAsync<User>(sql);
                return Ok(allUsers);
            }    
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sql = $"SELECT * FROM [User] WHERE Id = {id}";

                var singleUser = (await conn.QueryAsync<User>(sql)).Single();
                return Ok(singleUser);
            }
        }

       // POST: api/User
       [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            string sql = $@"INSERT INTO [User] (Name, Email, Password) VALUES ('{user.Name}', '{user.Email}', '{user.Password}')
            select MAX(Id) from [User]";

            using (IDbConnection conn = Connection)
            {
                var newUserId = (await conn.QueryAsync<int>(sql)).Single();
                user.Id = newUserId;
                return CreatedAtRoute("GetUserById", new { id = newUserId }, user);
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            string sql = $@"DELETE FROM [User] WHERE Id = {id}";

            using (IDbConnection conn = Connection)
            {
                int rowsAffected = await conn.ExecuteAsync(sql);
                if (rowsAffected > 0)
                {
                    return new StatusCodeResult(StatusCodes.Status204NoContent);
                }
                throw new Exception("No rows affected");
            }
        }
    }
}
