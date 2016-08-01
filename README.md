# rc-mention ![npm version](https://img.shields.io/npm/v/rc-mention.svg?style=flat)
react mention component


<img width="630" height="430" src="https://img.alicdn.com/tps/TB1XEyKMpXXXXbBXVXXXXXXXXXX-1260-800.png" />

## Props

- placeholder(string)
- onChange(func)
- onMentionTrigger(func) trigger person select(addCallback as argument)
- formatDisplay(func) format person display in editor
- formatValue(func) format person value after change

## Demo Usage

```js
import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'

import MentionEditor from './src'
import Styles from './dist/MentionEditor.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    choosePerson(addFn) { // has addFn callback
        // open select modal
        someAPI.selectmodal.open((persons)=>{
          // transform data here need prop{id,name}
          persons = (persons || []).map((person) => {
            return {
                id: person.id,
                name: person.name
            }
          });
          // trigger add
          this.refs.editor.onMentionAdd(persons);
          // or below instead
          // addFn(persons);
        })
    }
    
    triggerMention() {
        this.refs.editor.triggerMention();
    }

    render() {
        let onChange = (value, e)=> {
            this.setState({
                value: value
            })
        };
        return <div className="demos">
            <MentionEditor ref="editor"
                           placeholder="type '@' to open mention modal"
                           onMentionTrigger={this.choosePerson.bind(this)}
                           onChange={onChange.bind(this)}
            />
            <div><span className="mentionBtn" onClick={this.triggerMention.bind(this)}>@ someone</span></div>
        </div>
    }
}
ReactDOM.render(<Page />, document.getElementById('main'));
```

## use rangy lib

[Rangy](https://github.com/timdown/rangy/) is for ie browsers(lt9).

Just include lib and enjoy(Available in v2).

```html
<!-- if you want to use rangy for lt9 ie browsers -->
<script src="//cdn.bootcss.com/rangy/1.3.0/rangy-core.min.js"></script>
```
