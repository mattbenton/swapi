import React, { Component } from 'react';
import {Button, Input, Table} from 'reactstrap';
import { getPeople } from "../REST/people";

export class VanillaHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            filteredData: [],

            page: 1,
            search: ''
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
        const search = this.state.search;
        const filtered = data.filter(row => {
            if (search) {
                return row.name.indexOf(search) >= 0
            }
            return true
        })
        return filtered.map((i, j) => {
            return(
                <tr key={j}>
                    <td>
                        {i.name}
                    </td>
                    <td>
                        {i.height}
                    </td>
                    <td>
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

    handleSearch = (e) => {
        let searchValue = e.target.value;
        this.setState({
            search: searchValue
        })
        // if (searchValue !== null && searchValue.length > 0) {
            
            // let matchData = searchValue.trim().toLowerCase();
            // let newData = this.state.data.filter((e) => {return e.name.toLowerCase().match(matchData)})
            // console.log(newData);
            // return newData.map((i, j) => {
            //     return(
            //         <tr>
            //             <td key={j}>
            //                 {i.name}
            //             </td>
            //             <td key={j}>
            //                 {i.height}
            //             </td>
            //             <td key={j}>
            //                 {i.mass}
            //             </td>
            //         </tr>
            //     )
            // })
        // }
    }

    render() {
        return (
            <div>
                    <Input placeholder="search names"
                           onChange={(e) => this.handleSearch(e)} />
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Mass <Button size="sm" onClick={() => {this.sortBy('asc')}}>▲</Button> / <Button size="sm" onClick={() => {this.sortBy('desc')}}>▼</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {this.state.search !== null && this.state.search.length ? this.handleSearch : this.renderRow()} */}
                    {this.renderRow()}
                    </tbody>
                </Table>
                    <Button onClick={() => this.handleChange('next')}> Next </Button>
                    {this.state.page >= 2 ? <Button onClick={() => this.handleChange('back')}>Back</Button> : <></>}
            </div>
        );
    }
}

