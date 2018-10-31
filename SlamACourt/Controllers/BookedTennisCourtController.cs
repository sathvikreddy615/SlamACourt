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
        // GET: api/BookedTennisCourt?tennisCourtId=2
        // GET: api/BookedTennisCourt?userId=2
        [HttpGet]
        public async Task<IActionResult> Get(int? tennisCourtId, int? userId)
        {
            using (IDbConnection conn = Connection)
            {

                //string sql = "SELECT * FROM BookedTennisCourt";

                Dictionary<int, BookedTennisCourt> userCourt = new Dictionary<int, BookedTennisCourt>();

                string sql = @"SELECT
                                        btc.Id,
                                        btc.UserId,
                                        btc.TennisCourtId,
                                        btc.StartTime,
                                        btc.EndTime,
                                        tc.Id,
                                        tc.Surface,
                                        tc.Name
                                FROM BookedTennisCourt btc
                                JOIN TennisCourt tc ON tc.Id = btc.TennisCourtId";

                if (tennisCourtId != null)
                {
                    sql += $" WHERE TennisCourtId = {tennisCourtId}";
                }
                else if (userId != null)
                {
                    sql += $" WHERE UserId = {userId}";
                }

                var allBookedTennisCourts = await conn.QueryAsync<BookedTennisCourt, TennisCourt, BookedTennisCourt>(sql, 
                    (bookedTennisCourt, tennisCourt) =>
                {
                    if (!userCourt.ContainsKey(bookedTennisCourt.Id))
                    {
                        // Create an entry in the dictionary
                        userCourt[bookedTennisCourt.Id] = bookedTennisCourt;
                    }
                    userCourt[bookedTennisCourt.Id].tennisCourt = (tennisCourt);

                    return bookedTennisCourt;
                });
                return Ok(allBookedTennisCourts);
            }
        }

        // GET: api/BookedTennisCourt/5
        [HttpGet("{id}", Name="GetBookedTennisCourt")]
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
