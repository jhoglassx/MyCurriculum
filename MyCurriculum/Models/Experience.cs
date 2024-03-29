﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCurriculum.Models
{
    public class Experience
    {
        [Key]
        public int Id { get; set; }
        public int CurriculumId { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime DateHiring { get; set; }//data de contratação

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? DateResignation { get; set; }//data de demissão
        public string Company { get; set; }//Empresa
        public string Occupation { get; set; }//Função realizada
        public string Description { get; set; }//Descrição das tarefas realizadas
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
