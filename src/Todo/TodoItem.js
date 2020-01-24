import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

const style = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '40px',
        height: 'auto',
        border: '1px solid #eee',
        borderRadius: '5px',
        marginBottom: '1rem',
        boxShadow: '2px 2px 3px 0px #CECECE'
    },
    input: {
        margin: '0 1rem',
        cursor: 'pointer'
    },
    span: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1rem',
        fontSize: '19px',
        margin: '10px 0',
        width: '555px'
    }
}

const TodoItem = ({ item, index, onChange }) => {

    const { removeTodo, editTodo } = useContext(Context)
    const [value, setValue] = useState(item.title)
    const [editable, setEditable] = useState(false)
    const classes = []

    if (item.completed) {
        classes.push('done')
    }

    const editableHandler = event => {
        setEditable(true)
        editTodo(event)
    }

    return (
        <li style={style.li}>
            <span className={classes.join(' ')}  style={style.span} onDoubleClick={editableHandler}>
                <input 
                    type='checkbox' 
                    checked={item.completed}
                    style={style.input} 
                    onChange={() => onChange(item.id)} 
                />
                
                <strong style={style.strong}>{ index + 1 }.</strong>
                <input 
                    data={item.id}
                    className='inputItem'
                    type='text' 
                    value={value}
                    disabled={!editable}
                    onChange={e => setValue(e.target.value)}
                />
                {
                    editable && <button className='button_save' onClick={() => setEditable(false)}>Save</button>
                }
            </span>

            <button className='rm' onClick={removeTodo.bind(null, item.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem