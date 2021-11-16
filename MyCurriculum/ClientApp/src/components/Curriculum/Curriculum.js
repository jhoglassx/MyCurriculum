import { data } from 'jquery';
import React, { Component } from 'react'
//import './components/Curriculum/Curriculum.css'

export class Curriculum extends Component {
    static displayName = "Curriculo";

    constructor() {
        super();
        this.state = { curriculums: Object, loading: true }
    }

    async loadCurriculum() {
        const response = await fetch('api/Curriculums/1');
        const data = await response.json;
        this.setState({ curriculums: data, loading: false });
    }

    componentDidMount() {
        this.loadCurriculum();
    }

    render() {
        return (
            <div className="curiculum">
                <span>{this.state.curriculums}</span>
            </div>
        );
    }
}