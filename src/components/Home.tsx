import * as React from 'react';
import {Container, Row, Button, Table, Col} from 'reactstrap';
import { getPeople } from "../REST/people";
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import people from 'src/types/people';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

interface State {
    isLoading: Boolean;
    data: people[];
    row?: {
        name: string;
        gender: string;
        birth_year: string;
    }
}

export class Home extends React.Component<{}, State> {
    columns: any;
    showDetailsRef: any;
    constructor(props: {}) {
        super(props);
        this.state={
            isLoading: false,
            data: []
        }
        this.showDetailsRef = React.createRef();
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
        let response = await getPeople();
        if (response) {
            response = response.results;
            this.setState({
                data: response
            })
        }
    }
    details = (): JSX.Element => {
        console.log(this.state.row)
        return (
            <div>
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

    rowEvents = {
        onClick: (e: any, row: any, rowIndex: number) => {
            this.setState({
                row: row
            })
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
                <br/>
                <this.details/>
            </Container>

        );
    }
}
