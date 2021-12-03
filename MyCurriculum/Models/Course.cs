using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public int CurriculumId { get; set; }
        public string Institution { get; set; }//Instuição de formação
        public string Nome { get; set; }
        public DateTime DateIntial { get; set; }//Data de inicio do curso
        public DateTime DateConclusion { get; set; }//Data de Conclução do curso
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
