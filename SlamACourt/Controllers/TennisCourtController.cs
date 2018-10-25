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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace SlamACourt.Models
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("SlamACourt")]
    public class TennisCourtController : ControllerBase
    {
        private readonly IConfiguration _config;

        public TennisCourtController(IConfiguration config)
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

        // GET: api/TennisCourt
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (IDbConnection conn = Connection)
            {
                string sql = "SELECT * FROM TennisCourt";

                var allTennisCourts = await Connection.QueryAsync<TennisCourt>(sql);
                return Ok(allTennisCourts);
            }
        }

        // GET: api/TennisCourt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sql = $"SELECT * FROM TennisCourt WHERE Id = {id}";

                var singleTennisCourt = (await conn.QueryAsync<TennisCourt>(sql)).Single();
                return Ok(singleTennisCourt);
            }
        }
       
        // POST: api/TennisCourt
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] TennisCourt tennisCourt)
        {
            string sql = $@"INSERT INTO TennisCourt (Surface, Name) VALUES ('{tennisCourt.Surface}', '{tennisCourt.Name}')
            select MAX(Id) from TennisCourt";

            using (IDbConnection conn = Connection)
            {
                var newTennisCourtId = (await conn.QueryAsync<int>(sql)).Single();
                tennisCourt.Id = newTennisCourtId;
                return CreatedAtRoute("GetTennisCourt", new { id = newTennisCourtId }, tennisCourt);
            }
        }

        // PUT: api/TennisCourt/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/TennisCourt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            string sql = $@"DELETE FROM TennisCourt WHERE Id = {id}";

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
