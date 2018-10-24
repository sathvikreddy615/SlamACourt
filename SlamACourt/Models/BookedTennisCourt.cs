﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlamACourt.Models
{
    public class BookedTennisCourt
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TennisCourtId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}