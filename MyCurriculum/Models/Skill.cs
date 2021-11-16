using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }
        public virtual Curriculum Curriculum { get; set; }
        public string Title { get; set; }
        public int SkillTime { get; set; }//tempo de Experiencia
        public int SkillNivel { get; set; }//Nivel de Experiencia
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

    }
}
