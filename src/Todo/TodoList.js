import React from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

const TodoList = props => {
    const style = {
        ul: {
            listStyle: 'none',
            margin: '0',
            padding: '0',
        }
    }
    return (
        <ul style={style.ul}>
            { 
                props.todos.map(
                    (item, index) => 
                        <TodoItem 
                            item={item} 
                            index={index} 
                            key={item.id} 
                            onChange={props.onToggle}
                        />
                )
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default TodoList