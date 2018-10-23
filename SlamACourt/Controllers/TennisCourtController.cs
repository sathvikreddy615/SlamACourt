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
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/TennisCourt/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
