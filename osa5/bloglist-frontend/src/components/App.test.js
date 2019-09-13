import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'

test('does not render blogs when not logged in', async () => {
  const component = render(
    <App />
  )
  component.rerender(
    <App />
  )
  await waitForElement(
    () => component.getByText('login')
  )

  const blogs = component.container.querySelectorAll('.blog')
  expect(blogs.length).toBe(0)
})

test('does render blogs when logged in', async () => {
  const user = {
    username: 'testaaja',
    token: '12123123123',
    name: 'dude testimies'
  }

  localStorage.setItem('loggedUser', JSON.stringify(user))
  const component = render(
    <App />
  )
  component.rerender(
    <App />
  )

  await waitForElement(
    () => component.container.querySelector('.blog')
  )
  const blogs = component.container.querySelectorAll('.blog')
  expect(blogs.length).toBe(1)
})