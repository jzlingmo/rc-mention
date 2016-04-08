import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'

import objectAssign from 'object-assign'

import MentionEditor from './src'
import Styles from './dist/MentionEditor.css'
import DemoStyles from './index.css'

const parseUA = ()=> {
    var ua = navigator.userAgent;
    var isIpad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !isIpad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isOtherMobile = ua.match(/Windows Phone|BB/);
    return {
        isIpad: isIpad,
        isIphone: isIphone,
        isAndroid: isAndroid,
        isMobile: isIphone || isAndroid || isOtherMobile,
    };
};

const UA = parseUA();

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
            title: '',
            show: props.show
        };
        this.hasActions = (props.okText + props.cancelText) !== '';
    }

    showModal() {
        this.setState({
            show: true
        });
        ModalService.doOpen(this.innerHideModal.bind(this));
        this.props.onShow && this.props.onShow();
        document.body.className = document.body.className + ' modalOpen';
    }

    onOk() {
        var data;
        if (this.onBeforeOk) {
            data = this.onBeforeOk();
            if (!data) {
                return false
            }
        }
        this.props.onOk && this.props.onOk(data);
        this.hideModal();
    }

    onCancel() {
        this.props.onCancel && this.props.onCancel();
        this.hideModal();
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
        var actions = [];
        if (this.hasActions) {
            this.props.okText && actions.push(
                <button className="btn btn-ok" onClick={this.onOk.bind(this)}>{this.props.okText}</button>
            );
            this.props.cancelText && actions.push(
                <button className="btn btn-cancel" onClick={this.onCancel.bind(this)}>{this.props.cancelText}</button>
            );
            if (actions.length === 2 && UA.isMobile) {
                actions = actions.reverse();
            }
        }
        return <div className={cx({
            [t.props.className]: !!t.props.className,
            'modalWrapper': true,
            'active': state.show
        })}>
            <div className="modal">
                <div className="modalTitle">{this.state.title}</div>
                <span className="closeIcon" onClick={this.hideModal.bind(this)}/>
                <div className={cx({"modalContent": true, "hasActions": this.hasActions})}>
                    {state.show ? <Component {...props.data} {...props.listener} modal={this}/> : ''}
                </div>
                {this.hasActions ? <div className="modalActions">{actions}</div> : null}
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
                    avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3407298466,4230891213&fm=58',
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

    componentDidMount() {
        let t = this;
        this._setModalTitle();
        this.props.modal && (this.props.modal.onBeforeOk = ()=> {
            return t.getSelectedArr();
        });
    }

    getSelectedArr(){
        let arr = [];
        let map = this.state.selected;
        for(let id in map){
            if(map.hasOwnProperty(id)){
                arr.push(map[id])
            }
        }
        return arr;
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
        });
        this._setModalTitle();
    }

    _setModalTitle() {
        var keys = Object.keys(this.state.selected);
        this.props.modal.setState({
            title: keys.length + ' Selected'
        });
    }

    render() {
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
        </div>
    }
}

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
            <div className="section">
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
