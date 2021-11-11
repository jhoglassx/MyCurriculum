﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Id")]
        public Curriculum Curriculum_Id { get; set; }
        public int ZipCode { get; set; }
        public string Road { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
