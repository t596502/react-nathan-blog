import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Tag, Input, Tooltip, Icon } from 'antd';
const {CheckableTag} = Tag;
const RADIO = 'radio'

class EditableTagGroup extends Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
        selectedList:[]
    };
    static propTypes = {
        list: PropTypes.array,
    };
    componentWillReceiveProps(nextProps) {
        if(this.props.list !== nextProps.list){
            this.setState({
                tags:nextProps.list,
                // selectedList:[nextProps.list[0]]
            })
        }
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };
    handleChange = (value,checked) => {

        // const {selectedList} =  this.state;
        // if(selectedList.indexOf(value) > -1){
        //     selectedList.splice(selectedList.indexOf(value), 1);
        // }else {
        //     selectedList.push(value)
        // }
        console.log(value,checked);
        let selectedList =[]
        if(this.props.type === RADIO){
            selectedList =[]
        }else {

            let isSelect = true

            // if(!isSelect) return
            // if(this.state.selectedList)
            selectedList = this.state.selectedList
        }

        if(checked){
            selectedList.push(value);
        }else {
            let {selectedList:tagsList} = this.state;
            if(tagsList.length){
                tagsList.forEach((item,index)=>{
                    if(item === value){
                        selectedList.splice(index,1);
                        console.log(selectedList);
                    }
                })

            }
        }

        this.setState({
            selectedList
        });
        this.props.selectFn(selectedList)
    };
    saveInputRef = input => (this.input = input);

    render() {
        const { tags, inputVisible, inputValue,selectedList } = this.state;
        // const {list} = this.props;
        return (
            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <CheckableTag key={tag} checked={selectedList.includes(tag)}  onChange={(checked) =>this.handleChange(tag,checked)} onClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </CheckableTag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <Icon type="plus" /> New Tag
                    </Tag>
                )}
            </div>
        );
    }
}


export default EditableTagGroup
