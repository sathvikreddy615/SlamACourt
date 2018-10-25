using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SlamACourt.Models
{
    public class BookedTennisCourt
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TennisCourtId { get; set; }

        [Range(typeof(TimeSpan), "08:00", "20:00")]
        public DateTime StartTime { get; set; }

        [Range(typeof(TimeSpan), "08:00", "20:00")]
        public DateTime EndTime { get; set; }
    }
}
