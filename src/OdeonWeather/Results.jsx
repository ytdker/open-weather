import React from 'react'

const Results = (props) => <table className="table">
    <thead className="thead-dark">
        <tr>
            <th scope="col">City</th>
            <th scope="col">12:00 PM</th>
            <th scope="col">3:00 PM</th>
            <th scope="col">6:00 PM</th>
            <th scope="col">9:00 PM</th>
            <th scope="col">12:00 AM</th>
            <th scope="col">3:00 AM</th>
            <th scope="col">6:00 AM</th>
            <th scope="col">9:00 AM</th>
        </tr>
    </thead>
    <tbody>
        {
            props.cities.map((c) => <Result key={c.id} data={c} />)
        }

    </tbody>
</table>


const Result = (props) => <tr>
    <td>{props.data["city"]}</td>
    <td>{props.data["12:00 PM"]}°</td>
    <td>{props.data["03:00 PM"]}°</td>
    <td>{props.data["06:00 PM"]}°</td>
    <td>{props.data["09:00 PM"]}°</td>
    <td>{props.data["12:00 AM"]}°</td>
    <td>{props.data["03:00 AM"]}°</td>
    <td>{props.data["06:00 AM"]}°</td>
    <td>{props.data["09:00 AM"]}°</td>
</tr>

export default Results