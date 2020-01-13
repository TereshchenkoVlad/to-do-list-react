import React, { useState } from 'react'
import PropTypes from 'prop-types'

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState('')

    return {
        bind: {
            value,
            onChange: e => setValue(e.target.value)
        },
        claer: () => setValue(''),
        value: () => value
    }
}

const AddTodo = ({ onCreate }) => {

    const input = useInputValue('')

    const submitHandler = e => {
        e.preventDefault()

        if ( input.value().trim() ) {
            onCreate(input.value())
            input.claer()
        }
    }

    return (
        <form className='todo_add-form' onSubmit={submitHandler}>
            <input className='todo_add-input' type='text' placeholder='Add new to do...' {...input.bind} />
            <button className='todo_add-button'>ADD</button>
        </form>
    )
}

AddTodo.protoType = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo