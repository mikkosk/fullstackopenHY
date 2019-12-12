import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes', () => {
    const blog = {
        title: 'testi',
        author: 'testaaja',
        likes: 0
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'testi testaajablog has 0 likes'
    )
})

test('two clicks on like results two event handlers', () => {
    const blog = {
        title: 'testi',
        author: 'testaaja',
        likes: 0
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})

