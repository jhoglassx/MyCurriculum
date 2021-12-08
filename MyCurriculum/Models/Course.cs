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
        public string Name { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime DateInitial { get; set; }//Data de inicio do curso

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime DateConclusion { get; set; }//Data de Conclução do curso
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
