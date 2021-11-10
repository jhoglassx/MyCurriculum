namespace MyCurriculum.Models
{
    public class Course
    {
        public int Id { get; set; }
        public Curriculum Curriculum_Id { get; set; }
        public string Institution { get; set; }//Instuição de formação
        public string Title { get; set; }
        public DateTime DateIntial { get; set; }//Data de inicio do curso
        public DateTime DateConclusion { get; set; }//Data de Conclução do curso
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
