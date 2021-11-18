import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';


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

export class Curriculum extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", curriculum: new CurriculumModel(), loading: true };
        this.initialize();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
            ;
    }

    async initialize() {
        
        var id = this.props.match.params["id"];
        
        if (id > 0) {
            const response = await fetch('api/Curriculums/' + id);
            const curriculum = await response.json();

            const response2 = await fetch('api/Addresses/' + id);
            const address = await response2.json();


            this.setState({ title: "Edit", curriculum: curriculum, address: address, loading: false });
        }
        else
        {
            this.state = { title: "Create", curriculum: new CurriculumModel(), loading: false };
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/Curriculum")
    }

    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.curriculum.id > 0) {
            const response1 = fetch('api/Curriculums/' + this.state.curriculum.id, { method: "PUT", body: data });
            this.props.history.push("/Curriculum");
        }
        else
        {
            const response2 = fetch('api/Curriculums/', { method: "POST", body: data });
            this.props.history.push("/Curriculum");
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderCurriculum();
        return (
            <div>
                {contents}
            </div>
        );
    }

    renderCurriculum() {
        const textArea = document.querySelector('textarea');
        const textRowCount = textArea ? textArea.value.substring(100).length : 0;
        const rows = textRowCount + 1;
        return (
            <div>
                <div className="mb5">
                    <button onClick={this.printDocument}>Print</button>
                </div>
            
                <div id="divToPrint" className="curriculum">
                        <input type="hidden" name="id" value={this.state.curriculum.id} />
                        <div className="row">
                            <div className="curriculum_left col-md-3">
                                <div className="photograph">
                                    <img src="https://thumbs.dreamstime.com/z/3-4-mannequin-gradient-9422208.jpg" />
                                </div>
                                <div className="contacts">
                                    <h1>Contatos</h1>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <div className="div-control">
                                            <i class="bi bi-envelope-fill"></i>{this.state.curriculum.email}
                                            <i class="bi bi-envelope-fill"></i>{this.state.address.zipcode}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <div className="div-control">
                                                <i class="bi bi-telephone-fill"></i>{this.state.curriculum.telephone}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <div className="div-control">
                                                <i class="bi bi-telephone-fill"></i>{this.state.curriculum.cellphone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="curriculum_right col-md-9">
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <div className="name div-control text-center">
                                            <span>Jhoglas Shopsigner Xavier Rocha</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <div className="profession div-control text-left">
                                            Programador Full Stack
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <div className="resume div-control">
                                            {this.state.curriculum.resume}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <div className="div-control">
                                            {this.state.curriculum.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}