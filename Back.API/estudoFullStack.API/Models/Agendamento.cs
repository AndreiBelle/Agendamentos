namespace estudoFullStack.API.Models
{
    public class Agendamento
    {
        public int Id { get; set; }
        public bool Sala { get; set; }
        public string Titulo { get; set; }
        public string Responsavel { get; set; }
        public string Observacao { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fim { get; set; }
        public DateTime criado_em { get; set; }

    }
}
