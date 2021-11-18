import React, { Component } from 'react'
export class htmlCurriculum extends Component {
    static render() {
        return (
            <div className="">
                <form onSubmit={this.handleSave}>

                    <div className="form-group row">
                        <input type="hidden" name="id" value={this.state.curriculum.id} />
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="title" value={this.state.curriculum.title} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="email" value={this.state.curriculum.email} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="telephone" value={this.state.curriculum.telephone} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="cellphone" value={this.state.curriculum.cellphone} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <input className="form-control" type="text" name="resume" value={this.state.curriculum.resume} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn btn-success" value={this.state.curriculum.id}>Salvar</button>
                        <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        );
    }
}