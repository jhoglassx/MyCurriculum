import React, { Compoment } from 'react'
import { Link } from 'react-router-dom'

export class Curriculum extends Compoment {
    static displayName = "Curriculo";

    constructor() {
        super();

        this.state = {curriculum:[],loading: true }
    }

    compomentDidMount() {

        this.loadCuriculum();

    }

    static handleEdit(id) {
        window.location.href = "/Curriculums/edit" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Vocêdeseja deletar o Curriculum : " + id)) {
            return;
        }
        else {
            fetch('api/Curriculums/' + id, { method: 'delete' })
            .then(json => {
                window.location.hre = "Curriculum";
                alert('Deletado com Sucesso');
            })
        } 
    }

    async loadCuriculum() {
        const response = await fetch('api/Curriculums');
        const date = await response.json();
        this.setState({ corriculum: date, loading:false });
    }

    render() {

    }
}