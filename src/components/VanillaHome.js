import React, { Component } from 'react';
import { Button, Table} from 'reactstrap';
import { getPeople } from "../REST/people";

export class VanillaHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],

            page: 1,
        }
    }

    componentDidMount = async() => {
        let response = await getPeople(this.state.page);
        if (response) {
            response = response.results;
            // loop through response and make height/mass a number so we can sort on it
            for (let i = 0; i < response.length ; i++) {
                response[i].height = parseInt(response[i].height)
                response[i].mass = parseInt(response[i].mass)
            }
            this.setState({
                data: response
            })
        }
    }

    // pull data from state and put it in jsx so we can render it
    renderRow = () => {
        let data = this.state.data;
        return data.map((i, j) => {
            return(
                <tr>
                    <td key={j}>
                        {i.name}
                    </td>
                    <td key={j}>
                        {i.height}
                    </td>
                    <td key={j}>
                        {i.mass}
                    </td>
                </tr>
            )
        })
    }

    // page forward or back
    handleChange = async(direction) => {
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

    sortBy = (order) => {
        if (order === 'asc') {
            let asc = this.state.data.sort((a,b) => (a.mass - b.mass))
            this.setState({
                data: asc
            })
        }
        if (order === 'desc') {
            let desc = this.state.data.sort((a,b) => (b.mass - a.mass))
            this.setState({
                data: desc
            })
        }
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Mass <Button size="sm" onClick={() => {this.sortBy('asc')}}>▲</Button> / <Button size="sm" onClick={() => {this.sortBy('desc')}}>▼</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderRow()}
                    </tbody>
                    <Button onClick={() => this.handleChange('next')}> Next </Button>
                    {this.state.page >= 2 ? <Button onClick={() => this.handleChange('back')}>Back</Button> : <></>}
                </Table>
            </div>
        );
    }
}

