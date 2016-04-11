import React, {PropTypes} from 'react'
import cx from 'classnames'


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

export default class Modal extends React.Component {
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
            <div className="modal animated slideInUp">
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
