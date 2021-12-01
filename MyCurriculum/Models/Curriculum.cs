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
        public int AccountId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Profession { get; set; }
        public string Email { get; set; }
        public int Telephone { get; set; }
        public int Cellphone { get; set; }
        public string Resume { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

        //public ICollection<Address> Addresses { get; set; }
        //public ICollection<Experience> Experiences { get; set; }
        //public ICollection<AcademicEducation> AcademicEducations { get; set; }
        //public ICollection<Course> Courses { get; set; }
        //public ICollection<Skill> Skills { get; set; }
    }
}
