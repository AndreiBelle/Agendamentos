export interface Agendamentos {
    id: number,
    sala: boolean,
    titulo: string,
    responsavel: string,
    observacao: string,
    inicio: Date,
    fim: Date,
    criado_em: Date
}