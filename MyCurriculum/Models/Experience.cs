namespace MyCurriculum.Models
{
    public class Experience
    {
        public int Id { get; set; }
        public Curriculum Curriculum_Id { get; set; }
        public DateTime DateHiring { get; set; }//data de contratação
        public DateTime DateResignation { get; set; }//data de demissão
        public string Company { get; set; }//Empresa
        public string Occupation { get; set; }//Função realizada
        public string Description { get; set; }//Descrição das tarefas realizadas
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
