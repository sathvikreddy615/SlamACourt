using System;
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

namespace SlamACourt.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTennisCourtController : ControllerBase
    {

        private readonly IConfiguration _config;

        public UserTennisCourtController(IConfiguration config)
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

        // GET: api/UserTennisCourt
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (IDbConnection conn = Connection)
            {
                string sql = "SELECT * FROM UserTennisCourt";

                var allUserTennisCourts = await Connection.QueryAsync<UserTennisCourt>(sql);
                return Ok(allUserTennisCourts);
            }
        }

        // GET: api/UserTennisCourt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sql = $"SELECT * FROM UserTennisCourt WHERE Id = {id}";

                var singleUserTennisCourt = (await conn.QueryAsync<UserTennisCourt>(sql)).Single();
                return Ok(singleUserTennisCourt);
            }
        }
       
        // POST: api/UserTennisCourt
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserTennisCourt userTennisCourt)
        {
            string sql = $@"INSERT INTO UserTennisCourt (UserId, TennisCourtId, StartTime, EndTime) VALUES ('{userTennisCourt.UserId}', '{userTennisCourt.TennisCourtId}', '{userTennisCourt.StartTime}', '{userTennisCourt.EndTime}')
            select MAX(Id) from UserTennisCourt";

            using (IDbConnection conn = Connection)
            {
                var newUserTennisCourtId = (await conn.QueryAsync<int>(sql)).Single();
                userTennisCourt.Id = newUserTennisCourtId;
                return CreatedAtRoute("GetUserTennisCourt", new { id = newUserTennisCourtId }, userTennisCourt);
            }
        }

        // PUT: api/UserTennisCourt/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/UserTennisCourt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            string sql = $@"DELETE FROM UserTennisCourt WHERE Id = {id}";

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
