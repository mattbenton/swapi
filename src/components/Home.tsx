import * as React from 'react';
import { Container, Row, Button, Col } from 'reactstrap';
import { getPeople } from "../REST/people";
import people from 'src/types/people';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

interface State {
    isLoading: Boolean;
    data: people[];
    row?: {
        films: string[];
        name: string;
        gender: string;
        birth_year: string;
    }

    page: number;
}

export class Home extends React.Component<{}, State> {
    columns: any;
    constructor(props: {}) {
        super(props);
        this.state={
            isLoading: false,
            data: [],

            page: 1,
        }
        this.columns = [
            {
                dataField: 'name',
                text: 'Name'
            },
            {
                dataField: 'height',
                text: 'Height'
            },
            {
                dataField: 'mass',
                text: 'Mass'
            }
        ]
    }

    componentDidMount = async() => {
        let response = await getPeople(this.state.page);
        if (response) {
            response = response.results;
            this.setState({
                data: response
            })
        }
    }
    // loop through the films returned for each character and query
    getFilms = async () => {
        if (this.state.row && this.state.row.films) {
            let films = this.state.row.films

            let promiseArray = [];
            for (let i = 0; i < films.length; i++) {
                let request =  fetch(`{films[i]}`)
                promiseArray.push(request)
            }
            await Promise.all(promiseArray)
        }
    }
    // pull the details of the character from state
    details = (): JSX.Element => {
        return (
            <div>
                <Row><Col>Details</Col></Row>
                <Row>
                    <Col>Name: { this.state.row ? this.state.row.name : <></> }</Col>
                </Row>
                <Row>
                    <Col>Birth Year: { this.state.row ? this.state.row.birth_year : <></> }</Col>
                </Row>
                <Row>
                    <Col>Gender: { this.state.row ? this.state.row.gender : <></> }</Col>
                </Row>
            </div>
        )
    }
    // click on the row to get the character details
    rowEvents = {
        onClick: (e: any, row: any) => {
            this.setState({
                row: row
            })
            // await this.getFilms().then(r => console.log(r))
        }
    }
    // page forward or back
    handleChange = async(direction: string) => {
        if (direction === 'next') {
            let page = this.state.page +1;
            this.setState({
                page: page,
                isLoading: true
            })
            let response = await getPeople(page);
            if (response) {
                response = response.results;
                this.setState({
                    data: response,
                    isLoading: false
                })
            }
        }
        if (direction === 'back') {
            let page = this.state.page -1;
            this.setState({
                page: page,
                isLoading: true
            })
            let response = await getPeople(page);
            if (response) {
                response = response.results;
                this.setState({
                    data: response,
                    isLoading: false
                })
            }
        }
    }

    render() {

        return (
            <Container fluid id="main" className="flex-fill">
                <BootstrapTable
                    bootstrap4
                    keyField="name"
                    data={this.state.data}
                    columns={this.columns}
                    rowEvents={this.rowEvents}
                />

                <Button onClick={() => this.handleChange('next')}> Next </Button>
                {this.state.page >= 2 ? <Button onClick={() => this.handleChange('back')}>Back</Button> : <></>}

                <br/>
                <this.details/>

            </Container>

        );
    }
}
