import React, {PropTypes} from 'react'
import cx from 'classnames'

// just a tiny rangy instead of google rangy
// to support old ie browsers, you can just import google rangy
// and ./rangy automatically use that rangy
import rangy from './rangy';

//webkit browsers support 'plaintext-only'
const contentEditableValue = (function () {
    let div = document.createElement('div');
    div.setAttribute('contenteditable', 'PLAINTEXT-ONLY');
    return div.contentEditable === 'plaintext-only' ? 'plaintext-only' : true;
})();

export default class MentionEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            // temporarily not supported to set initial value for caret problem
            // or just can be used as prop once
            value: props.value || ''
        };
        this._markRange = null;
    }

    triggerMention() {
        let t = this;
        t.props.onMentionTrigger(t.onMentionAdd.bind(t));
    }

    _createMentionNode(persons) {
        let t = this;
        let fragment = document.createDocumentFragment();
        persons = persons || [];
        persons.map((person)=> {
            let mentionNode = document.createElement('input');
            mentionNode.setAttribute('type', 'button');
            mentionNode.setAttribute('data', JSON.stringify(person));
            mentionNode.setAttribute('tabindex', '-1');
            mentionNode.value = t.props.formatDisplay(person);
            fragment.appendChild(mentionNode);
        });
        return fragment
    }

    _setCaretToEnd(editor) {
        editor = editor || this.refs.editor;
        let selection = rangy.getSelection();
        let range = rangy.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        return range
    }

    onMentionAdd(persons) {
        if(!persons || persons.length === 0){
            return
        }
        let t = this;
        let editor = this.refs.editor;
        let selection = rangy.getSelection();
        let range = rangy.createRange();

        // go to position to insert
        if (t._markRange) {
            range = t._markRange;
        } else {
            // else to move caret to the end & use this range
            range = this._setCaretToEnd(editor);
        }

        let mentionNodes = t._createMentionNode(persons);
        range.deleteContents(); // delete origin content in range like '@' or nothing
        let lastChild = mentionNodes.lastChild; // before insert
        range.insertNode(mentionNodes);

        // reset _markRange after insert
        range.setStartAfter(lastChild);
        range.collapse(true);
        // do range select
        selection.removeAllRanges();
        selection.addRange(range);
        t._markRange = range.cloneRange();
        // trigger focus after select person in the extra modal
        //editor.blur();
        t.emitChange();
    }

    emitChange(e) { // keyup
        let t = this;
        let editor = this.refs.editor;

        // #1 mark current range
        let sel = rangy.getSelection();
        let range = sel.rangeCount === 0 ? null : sel.getRangeAt(0);

        t._markRange = range.cloneRange();

        // #2 whether a change made
        let lastHtml = t.lastHtml;
        let currentHtml = editor.innerHTML;
        if(lastHtml === currentHtml){
            // no change made
            return
        }
        t.lastHtml = currentHtml;

        // #3 trigger content change
        let content = t.extractContents(editor);
        content = content.replace(/^\n/, '').replace(/\n$/, '').replace(/\n\n/g, '\n'); //format
        if (content == '') { // clean extra <br/> in ios
            editor.innerHTML = '';
        }
        t.setState({
            value: content
        });
        t.props.onChange && t.props.onChange(content);

        // #4 if type @
        if(!range){
            // not in edit mode
            return
        }
        let lastLen = t.totalLen;
        let len = content.length;
        t.totalLen = len;
        if (lastLen && len < lastLen) {
            // delete action
            return
        }

        if (range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
            range.setStart(range.commonAncestorContainer, 0);
            let originStr = range.toString();
            if (originStr.substr(-1, 1) === '@') {
                // set range's start position before choose contact
                range.setStart(range.commonAncestorContainer, originStr.length - 1);
                // save range position
                t._markRange = range.cloneRange();
                editor.blur();
                t.triggerMention();
            }
        }
    }

    extractContents(editor) {
        editor = editor || this.refs.editor;
        let t = this;
        let nodes = editor.childNodes;
        let content = '';
        if (nodes.length === 0) {
            return ''
        }
        for (let i = 0, len = nodes.length; i < len; i += 1) {
            let node = nodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
                let tagName = node.tagName.toLowerCase();
                if (tagName === 'input') { // input element
                    let item = JSON.parse(node.getAttribute('data'));
                    content += t.props.formatValue(item);
                } else if (tagName === 'br') {
                    content += '\n';
                } else {
                    content += t.extractContents(node)
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                content += node.textContent || node.nodeValue;
            }
        }
        return content
    }

    onBlur(e) {
        let t = this;
        t.setState({focus: false});
    }

    onClick(e) {
        let t = this;
        let editor = this.refs.editor;
        let selection = rangy.getSelection();
        t._markRange = selection.getRangeAt(0).cloneRange();
        if (t.state.focus) { // in pc it is already focused
            return
        }
        // set caret to the end of editor
        if(t._markRange){
            selection.removeAllRanges();
            selection.addRange(t._markRange);
        }else{
            t._markRange = this._setCaretToEnd().cloneRange();
        }
        // make it focus faster
        editor.focus();
    }

    render() {
        let t = this;
        let _className = cx({
            'mentionField': true,
            [t.props.className]: !!t.props.className
        });
        return <div className={_className}>
            <div className={cx({"mentionEditor": true, "focus": t.state.focus})} ref="editor"
                 contentEditable={contentEditableValue}
                 style={{height: t.props.height}}
                 onKeyUp={t.emitChange.bind(t)}
                 onFocus={(e)=>{t.setState({focus: true})}}
                 onBlur={t.onBlur.bind(t)}
                 onClick={t.onClick.bind(t)}
            ></div>
            {!(t.state.focus || t.state.value) ?
                <div className="mentionPlaceholder">{t.props.placeholder}</div> : ''}
        </div>;
    }
}

MentionEditor.defaultProps = {
    formatDisplay: (person)=> {
        return '@' + person.name
    },
    formatValue: (person)=> {
        return '[' + person.name + '](' + person.id + ')'
    },
    height: '200'
};

// http://facebook.github.io/react/docs/reusable-components.html
MentionEditor.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onMentionTrigger: PropTypes.func,
    formatDisplay: PropTypes.func,
    value: PropTypes.string,
    height: PropTypes.string,
};

MentionEditor.displayName = 'MentionEditor';
