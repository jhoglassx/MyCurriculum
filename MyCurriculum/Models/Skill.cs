namespace MyCurriculum.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int SkillTime { get; set; }//tempo de Experiencia
        public int SkillNivel { get; set; }//Nivel de Experiencia
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

    }
}
