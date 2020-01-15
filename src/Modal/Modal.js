import React, { Component } from 'react'
import './Modal.scss'

export default class Modal extends Component {
    state = {
        isOpen: false
    }

    render() {
        return (
            <>
                <button className='openModal__button' onClick={() => this.setState({isOpen: true})}>Say Hello!</button>
                { this.state.isOpen && (
                    <div className='modal'>
                        <div className='modal__body bounce'>
                            <h1 className='modal__body-title'>{this.props.title}</h1>
                            <p className='modal__body-message'>{this.props.message}</p>
                            <button className='modal__body-button' onClick={() => this.setState({isOpen: false})}>{this.props.buttonText}</button>
                        </div>
                    </div>
                )}
                
            </>
        )
    }
}