import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
//import { shallow } from 'enzyme'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {

    const setBlogTitle = jest.fn()
    const setBlogAuthor = jest.fn()
    const setBlogUrl = jest.fn()
    const handleCreateBlog = jest.fn()
    const handleCancelBlog = jest.fn()

    const userEv = userEvent.setup()



    render(
        <BlogForm
            blogTitle={''}
            setBlogTitle={setBlogTitle}
            blogAuthor={''}
            setBlogAuthor={setBlogAuthor}
            blogUrl={''}
            setBlogUrl={setBlogUrl}
            handleCreateBlog={handleCreateBlog}
            handleCancelBlog={handleCancelBlog}
        />)


    let inputTitle = screen.getByPlaceholderText('input blog title here')
    let inputAuthor = screen.getByPlaceholderText('input blog author here')
    let inputUrl = screen.getByPlaceholderText('input blog url here')


    // await userEv.type(inputTitle, 'the_title')
    // await userEv.type(inputAuthor, 'the_author')
    // await userEv.type(inputUrl, 'the_url')
    //expect(inputTitle).toHaveValue('the_title')

    const createButton = screen.getByText('Create')
    await userEv.click(createButton)

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(inputTitle).toBeDefined()
    expect(inputAuthor).toBeDefined()
    expect(inputUrl).toBeDefined()


    // const loginComponent = shallow(<BlogForm
    //     blogTitle={''}
    //     setBlogTitle={setBlogTitle}
    //     blogAuthor={''}
    //     setBlogAuthor={setBlogAuthor}
    //     blogUrl={''}
    //     setBlogUrl={setBlogUrl}
    //     handleCreateBlog={handleCreateBlog}
    //     handleCancelBlog={handleCancelBlog}
    // />)
    // loginComponent.setState({ blogTitle: 'blyat' })
    // screen.debug(loginComponent)
    //expect(loginComponent.find(Notification).length).toBe(1)

    //Input based on state, need to test as well
})