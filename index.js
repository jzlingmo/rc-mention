import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'

import MentionEditor from './src'
import Modal from './Modal'
import SelectPage from './SelectPage'

import Styles from './dist/MentionEditor.css'
import DemoStyles from './index.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            addCallback: ()=> {
            }
        }
    }

    choosePerson(addFn) {
        this.refs.modal.showModal();
    }

    onSelected(persons) {
        this.refs.editor.onMentionAdd((persons || []).map((person)=> {
            // can transform data here
            return {
                id: person.id,
                name: person.name
            }
        }));
    }

    triggerMention() {
        this.refs.editor.triggerMention();
    }

    render() {
        let onChange = (value, e)=> {
            this.setState({
                value: value.replace(/\n/g, '<br/>'),
            })
        };
        return <div className="demos">
            <MentionEditor ref="editor"
                           placeholder="type '@' to open mention modal"
                           onMentionTrigger={this.choosePerson.bind(this)}
                           onChange={onChange.bind(this)}
            />
            <div><span className="mentionBtn" onClick={this.triggerMention.bind(this)}>@ someone</span></div>
            <div>
                <p className="title">Formatted Value:</p>
                <div style={{padding: '10px'}}>{this.state.value}</div>
            </div>
            <Modal ref="modal"
                   component={SelectPage}
                   onOk={this.onSelected.bind(this)}
                   okText="Ok"
                   cancelText="Cancel"
            />
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('main'));
