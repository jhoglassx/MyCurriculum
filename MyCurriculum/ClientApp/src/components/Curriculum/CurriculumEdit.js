import React, { Component } from 'react';

export class CurriculumModel {
    constructor(props) {
        this.id = props.id > 0 ? props.id : 0;
        this.title = props.id > 0 ? props.title : "";
        this.name = props.id > 0 ? props.name : "";
        this.profession = props.id > 0 ? props.profession : "";
        this.email = props.id > 0 ? props.email : "";
        this.telephone = props.id > 0 ? props.telephone : "";
        this.cellphone = props.id > 0 ? props.cellphone : "";
        this.resume = props.id > 0 ? props.resume : "";
    }
}

export class AdressModel {
    constructor(props) {
        this.id = props.id > 0 ? props.id : 0;
        this.curriculumId = props.id > 0 ? props.curriculumId : 0;
        this.zipCode = props.id > 0 ? props.zipCode : "";
        this.road = props.id > 0 ? props.road : "";
        this.district = props.id > 0 ? props.district : "";
        this.city = props.id > 0 ? props.city : "";
        this.state = props.id > 0 ? props.state : "";
    }
}

export class CurriculumEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            curriculum: "",
            adress: "",
            loading: true
        };
        this.initialize();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveCurriculum = this.handleSaveCurriculum.bind(this);
    }

    async initialize() {
        
        var id = Number(this.props.match.params["id"]);
        
        if (id > 0) {
            const response = await fetch('api/Curriculums/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", curriculum: data, loading: false });
            this.loadAdress(Number(id));
        }
        else
        {
            this.state = { title: "Create", curriculum: new CurriculumModel({ id: 0 }), adress: new AdressModel({id:0}), loading: false };
        }
        
    }

    async loadAdress(id) {
        const response = await fetch('api/Addresses');

        const data = await response.json();
        const dataFilter = data.filter(adress => adress?.curriculumId === id);

        const adress = this.state.adress;

        for (var i = 0; i < dataFilter.length; i++) {
            //adress.push(dataFilter[i]);
            this.setState({ title: "Edit", curriculum: this.state.curriculum, adress: dataFilter[i], loading: false });
        }

    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/Curriculum/Edit")
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
                .then((response) => { this.handleSaveAdress(this.state.curriculum.id) });
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

    async handleSaveAdress(cId) {
        const adress = this.state.adress;
        adress["curriculumId"] = cId;

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
                body: JSON.stringify(adress)
            })
                .then(result => result.text())
                .then(data => console.log(data));
        }

        this.props.history.push("/curriculo/exp/" + cId);
    }

    handleChangeCurriculum(e) {
        const target = e.target;

        var cur = this.state.curriculum;
        cur[target.name] = target.value;
        this.setState({ curriculum: cur });
    }

    handleChangeAdress(e) {
        const target = e.target;

        var adr = this.state.adress;
        adr[target.name] = target.value;
        this.setState({ adress: adr });
    }

    async handleChangeCep(event) {
        
        const value = event.target.value;
        const cep = value?.replace(/[^0-9]/g,'')
        if (cep?.length !== 8) {
            return;
        }

        const newAdress = this.state.adress //copy the array

        const response = await fetch('https://viacep.com.br/ws/' + cep + '/json')
            .then((res) => res.json())
            .then((data) => {
                newAdress["zipCode"] = cep;
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
                                <input className="form-control title" type="text" name="title" placeholder="Titulo" defaultValue={this.state.curriculum.title} onBlur={(e) => this.handleChangeCurriculum(e)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control name" type="text" name="name" placeholder="Nome" defaultValue={this.state.curriculum.name} onBlur={(e) => this.handleChangeCurriculum(e)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control profession" type="text" name="profession" placeholder="Profissão" defaultValue={this.state.curriculum.profession} onBlur={(e) => this.handleChangeCurriculum(e)} required />
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
                        <div className="row">
                            <div className="input-group col-md-12">
                                <textarea className="form-control resume" name="resume" onBlur={(e) => this.handleChangeCurriculum(e)} required>
                                    {this.state.curriculum.resume}
                                </textarea>
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