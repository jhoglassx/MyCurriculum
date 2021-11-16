using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class Curriculum
    {
        [Key]
        public int Id { get; set; }
        public virtual Account Account { get; set; }
        public string Email { get; set; }
        public int TelePhone { get; set; }
        public int CellPhone { get; set; }
        public string Resume { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<Experience> Experiences { get; set; }
        public virtual ICollection<AcademicEducation> AcademicEducations { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Skill> Skills { get; set; }
    }
}
