import cx from 'classnames'

// just a tiny rangy instead of google rangy
// to support old ie browsers, you can use google rangy instead
// but bookmark methods are different with google rangy
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
            value: props.value
        };
        this._bookmark = null;
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
        if (t._bookmark && document.getElementById(t._bookmark.startNode)) {
            range = rangy.moveToBookmark2(t._bookmark, range);
        } else {
            // else to move caret to the end & use this range
            range = this._setCaretToEnd(editor);
        }

        let mentionNodes = t._createMentionNode(persons);
        range.deleteContents(); // delete origin content in range like '@' or nothing
        let lastChild = mentionNodes.lastChild; // before insert
        range.insertNode(mentionNodes);

        // reset _bookmark after insert
        range.setStartAfter(lastChild, 0);
        range.collapse(true);
        // do range select
        selection.removeAllRanges();
        selection.addRange(range);
        t._clearBookmark();
        t._bookmark = rangy.createBookmark2(range, true);
        // trigger focus after select person in the extra modal
        editor.blur();
        t.emitChange();
    }

    emitChange() {
        let t = this;
        let editor = this.refs.editor;
        let content = t.extractContents(editor);
        content = content.replace(/^\n/, '').replace(/\n$/, '').replace(/\n\n/g, '\n'); //format
        if (content == '') { // clean extra <br/> in ios
            editor.innerHTML = '';
        }
        t.setState({
            value: content
        });
        t.props.onChange && t.props.onChange(content);

        // type @
        let lastLen = t.totalLen;
        let len = content.length;
        t.totalLen = len;
        if (lastLen && len < lastLen) { // delete action
            return
        }
        let sel = rangy.getSelection();
        let range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
            range.setStart(range.commonAncestorContainer, 0);
            let originStr = range.toString();
            if (originStr.substr(-1, 1) === '@') {
                // set range's start position before choose contact
                range.setStart(range.commonAncestorContainer, originStr.length - 1);
                // save range position
                t._clearBookmark();
                t._bookmark = rangy.createBookmark2(range, true);
                t._isAtBlur = true;
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
        if(t._isAtBlur){
            t._isAtBlur = false;
            return
        }
        let sel = rangy.getSelection();
        if(sel.rangeCount === 0){
            t._bookmark = null;
        }else{
            let range = sel.getRangeAt(0);
            range.collapse(false);
            t._clearBookmark();
            t._bookmark = rangy.createBookmark2(range, true);
        }
    }

    _clearBookmark(){
        let t = this;
        let start, end;
        if(t._bookmark && t._bookmark.serializable){
            start = document.getElementById(t._bookmark.startNode);
            end = document.getElementById(t._bookmark.endNode);
            start && start.remove();
            end && end.remove();
        }
    }

    onClick(e) {
        let t = this;
        if (t.state.focus) {
            return
        }
        // set caret to the end of editor
        this._setCaretToEnd();
        // make it focus faster
        e.target.focus();
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
                 onInput={t.emitChange.bind(t)}
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
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onMentionTrigger: React.PropTypes.func,
    formatDisplay: React.PropTypes.func,
    value: React.PropTypes.string,
    height: React.PropTypes.string,
};

MentionEditor.displayName = 'MentionEditor';
