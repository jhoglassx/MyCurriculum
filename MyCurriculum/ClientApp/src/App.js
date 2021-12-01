import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Curriculums } from './components/Curriculum/Curriculums';
import { Curriculum } from './components/Curriculum/Curriculum';
import { CurriculumEdit } from './components/Curriculum/CurriculumEdit';
import { CurriculumExperience } from './components/Curriculum/CurriculumExperience';
import './custom.css';
/*import './components/Curriculum/Curriculum.css';*/
import './components/Curriculum/CurriculumEdit.css';

export default class App extends Component {
  static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/curriculos' component={Curriculums} />
                <Route path='/c/:id/:name' component={Curriculum} />
                <Route path='/curriculo/edit/:id' component={CurriculumEdit} />
                <Route path='/curriculo/new' component={CurriculumEdit} />
                <Route path='/curriculo/exp/:id' component={CurriculumExperience} />
                
            </Layout>
        );
    }
}
