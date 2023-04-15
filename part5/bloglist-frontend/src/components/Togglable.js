import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'



const Togglable = forwardRef((props, refs) => {
    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        console.log('before ', visibility)
        setVisibility(!visibility)
        console.log('after ', visibility)
    }
    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <div style={hideWhenVisible} className='hideWhenVisible'>
                <button className='toggleVisibilityButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
                {props.children[0] === undefined ? null : props.children[0]}
            </div>

            <div style={showWhenVisible} className='showWhenVisible'>
                {props.children[1] === undefined ? null : <button onClick={toggleVisibility}>{props.buttonLabelHide}</button>}
                {props.children[1] === undefined ? props.children : props.children[1]}

            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonLabelHide: PropTypes.string.isRequired
}

export default Togglable