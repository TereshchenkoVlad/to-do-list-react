import React, { useContext } from 'react'
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
        boxShadow: '2px 2px 3px 0px #CECECE',
        animationName: 'pulse',
        animationDuration: '1s'
    },
    input: {
        marginRight: '1rem',
        cursor: 'pointer'
    },
    strong: {
        marginRight: '.4rem'
    },
    span: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1rem'
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
            <span className={classes.join(' ')}  style={style.span}>
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