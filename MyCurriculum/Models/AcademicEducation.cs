using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class AcademicEducation
    {
        [Key]
        public int Id { get; set; }
        public int CurriculumId { get; set; }
        public string Institution { get; set; }//Instuição de formação
        public string Course { get; set;}

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateIntial { get; set; }//Data de inicio do curso

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateConclusion { get; set; }//Data de Conclução do curso
        public DateTime Created_at { get; set; }
        public DateTime Cpdated_at { get; set; }
    }
}
