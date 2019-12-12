import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'


afterEach(cleanup)

test('renders title, author', () => {
    const blog = {
        title: 'testi',
        author: 'testaaja',
        likes: 0,
        url: 'ok',
        user: {
            username:'username'
        }
    }

    const user = {
        username: 'username'
    }

    const doNothing = () => {
        console.log('')
    }

    const component = render(
        <Blog blog={blog} user={user} handleChange={doNothing} handleRemove={doNothing}/>
    )

    expect(component.container).toHaveTextContent(
        'testi testaaja'
    )
})

test('renders title, author and likes', () => {
    const blog = {
        title: 'testi',
        author: 'testaaja',
        likes: 0,
        url: 'ok',
        user: {
            username:'username',
            name:'name'
        }
    }

    const user = {
        username: 'username',
        name: 'name'
    }

    const doNothing = () => {
        console.log('')
    }

    const component = render(
        <Blog blog={blog} user={user} handleChange={doNothing} handleRemove={doNothing}/>
    )
    const button = component.getByTestId('ok')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'testi testaajaok0likename'
    )
})