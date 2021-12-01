import React, { Component } from 'react';
import { CurriculumExperience } from '../Curriculum/CurriculumExperience';

export class CurriculumModel {
    constructor() {
        this.id = 0;
        this.title = "";
        this.email = "";
        this.telephone = "";
        this.cellphone = "";
        this.resume = "";
    }
}

export class AdressModel {
    constructor() {
        this.id = 0;
        this.curriculumId = 0;
        this.zipCode = "";
        this.road = "";
        this.district = "";
        this.city = "";
        this.state = "";
    }
}

export class CurriculumEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            curriculum: new CurriculumModel(),
            adress: new AdressModel(),
            loading: true
        };
        this.initialize();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveCurriculum = this.handleSaveCurriculum.bind(this);
    }

    async initialize() {
        
        var id = this.props.match.params["id"];
        
        if (id > 0) {
            const response = await fetch('api/Curriculums/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", curriculum: data, loading: false });
            this.loadAdress();
        }
        else
        {
            this.state = { title: "Create", curriculum: new CurriculumModel(), adress: new AdressModel(), loading: false };
        }
        
    }

    async loadAdress() {
        var id = this.props.match.params["id"];
        const response = await fetch('api/Addresses');

        const data = await response.json();
        const dataFilter = data.filter(adress => adress?.curriculumId === id);

        var adress = this.state.adress;

        for (var i = 0; i < dataFilter.length; i++) {
            adress.push(dataFilter[i]);
            this.setState({ title: "Edit", curriculum: this.state.curriculum, adress: adress, loading: false });
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/CurriculumEdit")
    }

    async handleSaveCurriculum(event) {
        event.preventDefault();

        const cur = this.state.curriculum;

        if (this.state.curriculum.id > 0) 
        {
            await fetch('api/Curriculums/' + this.state.curriculum.id, {
                method: "PUT",
                contentType: 'application/json; charset=UTF-8',
                headers: { 'Content-Type': 'application/json' },
                dataType: 'json',
                body: JSON.stringify(cur)
            })
                .then(result => result.text())
                .then((response) => { this.handleSaveAdress(response.data) });
        }
        else
        {
            await fetch('api/Curriculums/', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cur)
            })
                .then(result => result.text())
                .then((response) => { this.handleSaveAdress(response) })
                .then((response) => console.log(response));
        }
        
    }

    async handleSaveAdress(curId) {
        const adress = this.state.adress;

        if (this.state.curriculum.id > 0) {
            await fetch('api/Addresses/' + this.state.adress.id, {
                method: "PUT",
                contentType: 'application/json; charset=UTF-8',
                headers: { 'Content-Type': 'application/json' },
                dataType: 'json',
                body: JSON.stringify(adress)
            })
                .then(result => result.text())
                .then(data => this.setState({ Id: data.id }));
        }
        else {
            await fetch('api/Addresses/', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(adress,[{curriculumId: curId }])
            })
                .then(result => result.text())
                .then(data => console.log(data));
        }
    }

    handleChangeCurriculum(e) {
        const target = e.target;
        this.state.curriculum[target.name] = target.value;
    }

    handleChangeAdress(e) {
        const target = e.target;
        this.state.adress[target.name] = target.value;
    }

    async handleChangeCep(event, setFieldValue) {
        
        const value = event.target.value;
        const cep = value?.replace(/[^0-9]/g,'')
        if (cep?.length !== 8) {
            return;
        }

        const newAdress = this.state.adress //copy the array

        const response = await fetch('https://viacep.com.br/ws/' + cep + '/json')
            .then((res) => res.json())
            .then((data) => {
                newAdress["road"] = data.logradouro;
                newAdress["district"] = data.bairro;
                newAdress["city"] = data.localidade;
                newAdress["state"] = data.uf;
            });
        this.setState({ adress: newAdress })
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderEditCurriculum();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>Tela do Curriculum</p>
                {contents}
            </div>
        );
    }

    renderEditCurriculum(setFieldValue) {
        return (
            <div>
                <form onSubmit={this.handleSaveCurriculum}>
                <input type="hidden" name="id" value={this.state.curriculum.id} />
                    <div className="col-md-12 dados">
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control name" type="text" name="name" placeholder="Nome" defaultValue={this.state.curriculum.name} onBlur={(e) => this.handleChangeCurriculum(e)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control profession" type="text" name="profession" placeholder="Profissão" defaultValue={this.state.curriculum.name} onBlur={(e) => this.handleChangeCurriculum(e)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <textarea className="form-control resume" name="resume" required>
                                    {this.state.curriculum.resume}
                                </textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control title" type="text" name="title" placeholder="Titulo" defaultValue={this.state.curriculum.title} onBlur={(e) => this.handleChangeCurriculum(e)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-6"> 
                                <input className="form-control email" type="text" name="email" placeholder="Email" defaultValue={this.state.curriculum.email} onBlur={(e) => this.handleChangeCurriculum(e)} required />
                            </div>
                            <div className="input-group col-md-3">
                                <input className="form-control telephone" type="text" name="telephone" placeholder="Telefone" defaultValue={this.state.curriculum.telephone} onBlur={(e) => this.handleChangeCurriculum(e)} required />
                            </div>
                            <div className="input-group col-md-3">
                                <input className="form-control cellphone" type="text" name="cellphone" placeholder="Celular" defaultValue={this.state.curriculum.cellphone} onBlur={(e) => this.handleChangeCurriculum(e)} required />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 address">
                        <div className="row">
                            <div className="input-group col-md-2">
                                {/*<input className="form-control zip-code" type="text" name="zip-code" placeholder="00000-000" onBlur={(e) => this.handleCep(e,setFieldValue)} defaultValue={this.state.curriculum.name} required />*/}
                                <input className="form-control zip-code" type="text" name="zipCode" placeholder="00000-000" defaultValue={this.state.adress.zipCode} onBlur={(e) => this.handleChangeCep(e)} required />
                            </div>
                            <div className="input-group col-md-6">
                                <input className="form-control road" type="text" name="road" placeholder="rua" defaultValue={this.state.adress.road} onBlur={(e) => this.handleChangeAdress(e)} required />
                            </div>
                            <div className="input-group col-md-4">
                                <input className="form-control district" type="text" name="district" placeholder="bairro" defaultValue={this.state.adress.district} onBlur={(e) => this.handleChangeAdress(e)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-8">
                                <input className="form-control city" type="text" name="city" placeholder="Cidade" defaultValue={this.state.adress.city} onBlur={(e) => this.handleChangeAdress(e)} required />
                            </div>
                            <div className="input-group col-md-4">
                                <input className="form-control state" type="text" name="state" placeholder="Estado" defaultValue={this.state.adress.state} onBlur={(e) => this.handleChangeAdress(e)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <button type="submit" className="btn btn-success" value={this.state.curriculum.id}>Avançar</button>
                            <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}