import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

const style = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #eee',
        borderRadius: '5px',
        marginBottom: '1rem',
        padding: '.5rem 1rem',
        boxShadow: '3px 3px 1px 0px #eee'
    },
    input: {
        marginRight: '1rem',
        cursor: 'pointer'
    },
    strong: {
        marginRight: '.4rem'
    }
}

const TodoItem = ({ item, index, onChange }) => {

    const { removeTodo } = useContext(Context)

    const classes = []

    if (item.completed) {
        classes.push('done')
    }

    return (
        <li style={style.li}>
            <span className={classes.join(' ')}>
                <input 
                    type='checkbox' 
                    checked={item.completed}
                    style={style.input} 
                    onChange={() => onChange(item._id)} 
                />
                <strong style={style.strong}>{ index + 1 }.</strong>
                { item.title }
            </span>

            <button className='rm' onClick={removeTodo.bind(null, item._id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem