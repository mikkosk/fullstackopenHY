import React from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='2' textAlign='center'>Users</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Blogs Created</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.users.map(u =>
                    <Table.Row key={u.id}>
                        <Table.Cell>
                            <Link to={`/users/${u.id}`}>{u.name}</Link>
                        </Table.Cell>
                        <Table.Cell>
                            {u.blogs.length}
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

const mapToStateProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapToStateProps, { initializeUsers })(Users)