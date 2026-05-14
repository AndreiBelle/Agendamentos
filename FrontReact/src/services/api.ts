import type { Agendamentos } from "../interfaces/Agendamentos";

export async function getAgendamentos() : Promise<Agendamentos[]> {
    try{
        const response = await fetch("http://localhost:5231/api/Agendamento");

    if (!response.ok) {
        throw new Error("Erro ao buscar dados!")
    }

    const data: Agendamentos[] = await response.json();
    return data;
    } catch(err) {
        console.error("Erro!: ",err)
        return [];
    }
    
}

export async function postAgendamentos(novoAgendamento: Omit<Agendamentos, 'id' | 'criado_em'>) : Promise<Agendamentos | undefined> {
    try{

        const response = await fetch("http://localhost:5231/api/Agendamento", { 
            method: 'POST', 
            headers: { 'content-Type': 'application/json'}, 
            body: JSON.stringify(novoAgendamento)});

        if (!response.ok) {
            throw new Error("Erro ao mandar dados!")
        }

        const data: Agendamentos = await response.json();

        return data;
    } catch (err) {
        console.log("Erro ao acessar servidor!" + err)
    }
}

export async function deleteAgendamentos(id: number) {
    try {
        await fetch(`http://localhost:5231/api/Agendamento/${id}`, {
            method: 'DELETE'
        });
    } catch (err) {
        throw new Error("Erro ao deletar agendamento: "+err)
    }
}