/* eslint-disable cypress/no-unnecessary-waiting */
describe('Note app', () => {

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'username': 'carley',
                'password': 'carley123'
            }
        })

        cy.visit('http://localhost:3000')
    })




    it('Login page is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Login to the application')
        cy.contains('Username')
        cy.contains('Password')
    })


    describe('Login', () => {
        it('succeeds with correct credentials', function () {
            cy.get('#username_input').type('carley')
            cy.get('#password_input').type('carley123')
            cy.get('#login_button').click()
            cy.contains('blogs') //Successful login directs to blogs page

        })

        it('fails with wrong credentials', function () {
            cy.get('#username_input').type('carley')
            cy.get('#password_input').type('barley123')
            cy.get('#login_button').click()
            cy.contains('Error => Invalid username and/or password')
            cy.contains('Error => Invalid username and/or password').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })




})


describe('When logged in', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'username': 'carley',
                'password': 'carley123'
            }
        })

        cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'carley', password: 'carley123'
        }).then(response => {
            localStorage.setItem('loggedInUser', JSON.stringify(response.body))

        })
    })

    it('A blog can be created', function () {
        cy.visit('http://localhost:3000')
        cy.contains('blogs')
        cy.get('.summaryView').should('have.length', 0)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger')
        cy.get('#new_blog_author_input').type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.contains('Anya Forger by Tatsuya Endo has been added')
        cy.contains('Anya Forger by Tatsuya Endo has been added').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.summaryView').should('have.length', 1)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger2')
        cy.get('#new_blog_author_input').type('Tatsuya Endo2')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.get('.summaryView').should('have.length', 2)
    })

    it('A blog can be liked', function () {
        cy.visit('http://localhost:3000')
        cy.contains('blogs')
        cy.get('.summaryView').should('have.length', 0)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger')
        cy.get('#new_blog_author_input').type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.contains('Anya Forger by Tatsuya Endo has been added')
        cy.contains('Anya Forger by Tatsuya Endo has been added').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.summaryView').should('have.length', 1)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger2')
        cy.get('#new_blog_author_input').type('Tatsuya Endo2')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.get('.summaryView').should('have.length', 2)
        cy.contains('Likes => 0')
        cy.contains('View').first().click()
        cy.contains('Like').click()
        cy.contains('Likes => 1')
    })


    it('Blog can be deleted', function () {
        cy.visit('http://localhost:3000')
        cy.contains('blogs')
        cy.get('.summaryView').should('have.length', 0)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger')
        cy.get('#new_blog_author_input').type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.contains('Anya Forger by Tatsuya Endo has been added')
        cy.contains('Anya Forger by Tatsuya Endo has been added').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.summaryView').should('have.length', 1)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger2')
        cy.get('#new_blog_author_input').type('Tatsuya Endo2')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.get('.summaryView').should('have.length', 2)
        cy.contains('Anya Forger by Tatsuya Endo')
        cy.contains('View').first().click()
        cy.contains('Delete').click()
        cy.contains('Anya Forger by Tatsuya Endo').should('not.exist')
    })

    it('Blog can only be deleted by original creator of blog', function () {
        cy.visit('http://localhost:3000')
        cy.contains('blogs')
        cy.get('.summaryView').should('have.length', 0)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger')
        cy.get('#new_blog_author_input').type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()
        cy.contains('Anya Forger by Tatsuya Endo has been added')
        cy.contains('Anya Forger by Tatsuya Endo has been added').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.summaryView').should('have.length', 1)
        cy.contains('Logout').click()
        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'username': 'notcarley',
                'password': 'notcarley123'
            }
        })
        cy.get('#username_input').type('notcarley')
        cy.get('#password_input').type('notcarley123')
        cy.get('#login_button').click()

        cy.contains('View').first().click()
        cy.contains('Delete').should('not.exist')
    })

    it('Blogs are ordered based on number of likes', function () {
        cy.visit('http://localhost:3000')
        cy.contains('blogs')
        cy.get('.summaryView').should('have.length', 0)

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').type('Anya Forger0')
        cy.get('#new_blog_author_input').type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()


        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').clear().type('Anya Forger3')
        cy.get('#new_blog_author_input').clear().type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').clear().type('Anya Forger2')
        cy.get('#new_blog_author_input').clear().type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()

        cy.contains('Create new blog').click()
        cy.get('#new_blog_title_input').clear().type('Anya Forger1')
        cy.get('#new_blog_author_input').clear().type('Tatsuya Endo')
        cy.get('#new_blog_url_input').type('https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg')
        cy.get('#create_new_blog_button').click()


        //eq 0 is create new blog button
        cy.get('.hideWhenVisible').eq(1).contains('View').click()
        cy.get('.hideWhenVisible').eq(2).contains('View').click()
        cy.get('.hideWhenVisible').eq(3).contains('View').click()

        cy.wait(3000) //Needed to ensure notification timeout elapsed and the newly created blog is set to visible
        cy.get('.hideWhenVisible').eq(4).contains('View').click()


        //EXPLICIT WAIT REQUIRED FOR COMPONENTS TO RERENDER BASED ON THE NEW ORDER. Without them, the click would be executed before component rerender
        // and at times clicks does not register due to click during rerender
        cy.get('.showWhenVisible').eq(2).contains('Like').click()
        cy.wait(700)
        cy.get('.showWhenVisible').eq(1).contains('Like').click()
        cy.wait(700)
        cy.get('.showWhenVisible').eq(1).contains('Like').click()
        cy.wait(700)
        cy.get('.showWhenVisible').eq(3).contains('Like').click()
        cy.wait(700)
        cy.get('.showWhenVisible').eq(2).contains('Like').click()
        cy.wait(700)
        cy.get('.showWhenVisible').eq(4).contains('Like').click()
        cy.wait(700)
        // cy.get('.showWhenVisible').eq(1).contains('Like').click()
        // cy.get('.showWhenVisible').eq(1).contains('Like').click()

        cy.get('.showWhenVisible').eq(1).contains('Anya Forger3')
        cy.get('.showWhenVisible').eq(2).contains('Anya Forger2')
        cy.get('.showWhenVisible').eq(3).contains('Anya Forger1')

    })
})