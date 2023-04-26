import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders blog default', () => {
    const blog = {
        title: 'Peanuts',
        author: 'Anya',
        url: 'https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png',
        likes: 5,
        user: {
            name: 'james',
            username: 'james_username'
        }

    }

    const user = {
        name: 'james',
        username: 'james_username'
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const divSum = container.querySelector('.hideWhenVisible')
    const divDetails = container.querySelector('.showWhenVisible')

    expect(divSum).not.toHaveStyle('display: none')
    expect(divDetails).toHaveStyle('display: none')

    expect(divSum).toHaveTextContent('Peanuts')
    expect(divSum).toHaveTextContent('Anya')
    expect(divSum).not.toHaveTextContent('URL')
    expect(divSum).not.toHaveTextContent('Likes')


    expect(divDetails).toHaveTextContent('URL')
    expect(divDetails).toHaveTextContent('Likes')


})

test('renders blog show button', async () => {
    const blog = {
        title: 'Peanuts',
        author: 'Anya',
        url: 'https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png',
        likes: 5,
        user: {
            name: 'james',
            username: 'james_username'
        }

    }

    const user = {
        name: 'james',
        username: 'james_username'
    }

    const userEv = userEvent.setup()


    const { container } = render(<Blog blog={blog} user={user} />)
    const toggleVisibilityButton = container.querySelector('.toggleVisibilityButton')

    const divSum = container.querySelector('.hideWhenVisible')
    const divDetails = container.querySelector('.showWhenVisible')

    expect(divSum).not.toHaveStyle('display: none')
    expect(divDetails).toHaveStyle('display: none')

    await userEv.click(toggleVisibilityButton)

    expect(divSum).toHaveStyle('display: none')
    expect(divDetails).not.toHaveStyle('display: none')

    expect(divDetails).toHaveTextContent('Likes => 5')
    expect(divDetails).toHaveTextContent('URL => https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png')



})


test('Blog like button pressed', async () => {

    const blog = {
        title: 'Peanuts',
        author: 'Anya',
        url: 'https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png',
        likes: 5,
        user: {
            name: 'james',
            username: 'james_username'
        }

    }

    const user = {
        name: 'james',
        username: 'james_username'
    }

    const handleAddLike = jest.fn()
    const handleDeleteBlog = jest.fn()
    const userEv = userEvent.setup()



    const { container } = render(<Blog blog={blog} user={user} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />)
    const toggleVisibilityButton = container.querySelector('.toggleVisibilityButton')
    await userEv.click(toggleVisibilityButton)


    const likeButton = screen.getByText('Like')
    screen.debug(likeButton)
    await userEv.click(likeButton)
    await userEv.click(likeButton)

    expect(handleAddLike.mock.calls).toHaveLength(2)
})