﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class Curriculum
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Id")]
        public Account Account_Id { get; set; }
        public string Email { get; set; }
        public int TelePhone { get; set; }
        public int CellPhone { get; set; }
        public string Resume { get; set; }

        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        public Address Address { get; set; }
        public List<Experience> Experiences { get; set; }
        public List<AcademicEducation> AcademicEducations { get; set; }
        public List<Course> Courses { get; set; }
        public List<Skill> Skills { get; set; }
    }
}
