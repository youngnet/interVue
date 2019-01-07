let React = require('react');
import { Radio ,Input} from "antd";
const RadioGroup = Radio.Group;
export default class ClickJump extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: props.value.link,
      linkUrl:props.value.linkUrl
    };

  }
  onChange = (e) => {
    let link = e.target.value;
    this.setState({
      link,
      linkUrl:""
    },()=>{
      this.props.onChange({link,linkUrl:""})
    });
  }
  onChangeUrl = (e) =>{
    let {link} = this.state;
    let value = e.target.value
    this.setState({
      linkUrl:value,
    },()=>{
     this.props.onChange({link,linkUrl:value})
    });
  } 
  render() {
    let { link,linkUrl } = this.state;
    return (
      <div>
        <RadioGroup onChange={this.onChange} value={link}>
          <Radio value={"1"}>链接</Radio>
          <Radio value={"2"}>无</Radio>
        </RadioGroup>
        <br/>
        {
          link=="1"?<Input
          value={linkUrl}
          type="url"
          placeholder="http://"
          onChange={this.onChangeUrl}
      /> :null
        }
      </div>
    );
  }
}