import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'

import objectAssign from 'object-assign'

import MentionEditor from './src'
import Styles from './dist/MentionEditor.css'
import DemoStyles from './index.css'

const ModalService = ({
    _queue: [],
    init(){
        window.addEventListener("popstate", this._listener.bind(this), false);
        return this
    },
    destroy(){
        window.removeEventListener("popstate", this._listener.bind(this), false);
    },
    doOpen(hideFn){
        history.pushState(null, '', this._addUrlParam('modal', Date.now()));
        this._queue.push(hideFn)
    },
    _listener(){
        let fn = this._queue.pop();
        fn && fn();
    },
    _addUrlParam: function (name, value) {
        var currentUrl = location.href;
        var reg;
        if (/\?/g.test(currentUrl)) {
            reg = new RegExp(name + '=[-\\w]{4,25}', 'g');
            if (reg.test(currentUrl)) {
                currentUrl = currentUrl.replace(reg, name + "=" + value);
            } else {
                currentUrl += "&" + name + "=" + value;
            }
        } else {
            currentUrl += "?" + name + "=" + value;
        }
        return currentUrl
    }
}).init();

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        }
    }

    showModal() {
        this.setState({
            show: true
        });
        ModalService.doOpen(this.innerHideModal.bind(this));
        this.props.onShow && this.props.onShow();
        document.body.className = document.body.className + ' modalOpen';
    }

    hideModal() {
        history.go(-1);
    }

    innerHideModal() {
        this.setState({
            show: false
        });
        this.props.onHide && this.props.onHide();
        document.body.className = document.body.className.replace('modalOpen', '');
    }

    render() {
        var t = this;
        var props = this.props;
        var state = this.state;
        var Component = props.component;
        return <div className={cx({
            [t.props.className]: !!t.props.className,
            'modalWrapper': true,
            'active': state.show
        })}>
            <div className="modal">
                <span onClick={this.hideModal} className="closeIcon" />
                {state.show ? <Component {...props.data} {...props.listener} modal={this}/> : ''}
            </div>
        </div>
    }
}

Modal.propTypes = {
    data: PropTypes.object,
    show: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func
};

class SelectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            list: [
                {
                    name: 'Jason Statham',
                    avatar: 'http://img4.imgtn.bdimg.com/it/u=1328479659,3160485887&fm=21&gp=0.jpg',
                    id: 1801
                },
                {
                    name: 'Paul Walker',
                    avatar: 'http://qq1234.org/uploads/allimg/141125/3_141125135639_4.jpg',
                    id: 1802
                },
                {
                    name: 'Vin Diesel',
                    avatar: 'http://a3.att.hudong.com/34/68/01200000023882136323684597134_02_250_250.jpg',
                    id: 1803
                },
                {
                    name: 'Jordana Brewster',
                    avatar: 'http://mediamass.net/jdd/public/documents/celebrities/3877.jpg',
                    id: 1804
                },
                {
                    name: 'Dwayne Johnson',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=615024323,3632951200&fm=21&gp=0.jpg',
                    id: 1805
                }
            ],
        }
    }

    onItemClick(idx) {
        let item = this.state.list[idx];
        let id = item['id'];
        let selected = this.state.selected;
        if (id in selected) {
            delete selected[id]
        } else {
            selected[id] = item
        }
        this.setState({
            selected: objectAssign({}, selected)
        })
    }

    onSelected(){
        let map = this.state.selected;
        let persons = [];
        for(var id in map){
            if(map.hasOwnProperty(id)){
                persons.push(map[id])
            }
        }
        this.props.onSuccess && this.props.onSuccess(persons);
        this.props.modal.hideModal();
    }

    render() {
        let selectedCount = Object.keys(this.state.selected).length;
        return <div id="selectPage">
            <div id="list">
                {this.state.list.map((item, idx)=>
                    <div className={
                        cx({
                            "item": true,
                            "active": (item.id in this.state.selected)
                        })
                    } onClick={(e)=>{this.onItemClick(idx)}}>
                        <img className="avatar" src={item.avatar} alt={item.name}/>
                        <div className="desc">{item.name}</div>
                    </div>
                )}
            </div>
            <div className="actions">
                <button className="btn" onClick={this.onSelected.bind(this)}>
                    OK {selectedCount ? <span>({selectedCount} selected)</span> : null}
                </button>
            </div>
        </div>
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            addCallback: ()=>{}
        }
    }

    choosePerson(addFn) {
        let persons = [];
        let onSelected = (persons)=> {
            addFn(persons.map((person)=> {
                // can transform data here
                return {
                    id: person.id,
                    name: person.name
                }
            }))
        };

        this.setState({
            addCallback: onSelected
        });

        this.refs.modal.showModal();
    }

    triggerMention(){
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
            <div className="section">
                <p className="title">Formatted Value:</p>
                <div style={{padding: '10px'}}>{this.state.value}</div>
            </div>
            <Modal ref="modal" component={SelectPage}
                   listener={{onSuccess: this.state.addCallback}}/>
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('main'));
