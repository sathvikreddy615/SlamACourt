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
using Microsoft.AspNetCore.Cors;

namespace SlamACourt.Models
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("SlamACourt")]
    public class BookedTennisCourtController : ControllerBase
    {

        private readonly IConfiguration _config;

        public BookedTennisCourtController(IConfiguration config)
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

        // GET: api/BookedTennisCourt
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (IDbConnection conn = Connection)
            {
                string sql = "SELECT * FROM BookedTennisCourt";

                var allBookedTennisCourts = await Connection.QueryAsync<BookedTennisCourt>(sql);
                return Ok(allBookedTennisCourts);
            }
        }

        // GET: api/BookedTennisCourt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sql = $"SELECT * FROM BookedTennisCourt WHERE Id = {id}";

                var singleBookedTennisCourt = (await conn.QueryAsync<BookedTennisCourt>(sql)).Single();
                return Ok(singleBookedTennisCourt);
            }
        }
       
        // POST: api/BookedTennisCourt
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BookedTennisCourt bookedTennisCourt)
        {
            string sql = $@"INSERT INTO BookedTennisCourt (UserId, TennisCourtId, StartTime, EndTime) VALUES ('{bookedTennisCourt.UserId}', '{bookedTennisCourt.TennisCourtId}', '{bookedTennisCourt.StartTime}', '{bookedTennisCourt.EndTime}')
            select MAX(Id) from BookedTennisCourt";

            using (IDbConnection conn = Connection)
            {
                var newBookedTennisCourtId = (await conn.QueryAsync<int>(sql)).Single();
                bookedTennisCourt.Id = newBookedTennisCourtId;
                return CreatedAtRoute("GetBookedTennisCourt", new { id = newBookedTennisCourtId }, bookedTennisCourt);
            }
        }

        // PUT: api/BookedTennisCourt/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/BookedTennisCourt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            string sql = $@"DELETE FROM BookedTennisCourt WHERE Id = {id}";

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
