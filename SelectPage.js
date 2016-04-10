import React, {PropTypes} from 'react'
import cx from 'classnames'
import objectAssign from 'object-assign'

export default class SelectPage extends React.Component {
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