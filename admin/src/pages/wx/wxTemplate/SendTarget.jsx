let React = require('react');
import { Select, Input, Upload, Icon, Button } from "antd";
const Option = Select.Option;
export default class SendTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      uploadMsg: "上传openId(仅支持txt格式,openid之间用英文;隔开"
    };

  }
  onChange = (e) => {
    this.setState({
      link: e.target.value,
    });
  }
  UploadProps = {
    accept: ".txt",
    showUploadList: false,
    customRequest: ({ file }) => {
      this.uploadOpenId(file)
    }
  };

  uploadOpenId = async (file) => {
    let dataform = new FormData();
    dataform.append('file', file);
    let result = await api.upload('/file/upload-openid', dataform);

    if (result.cd == 0) {
      this.setState({ countOpenId: result.data });
      this.setState({ uploadMsg: "上传成功，点击重新上传" })
      message.success("上传成功")
    } else {
      message.error(result.msg);
      this.setState({ uploadMsg: "上传openId(仅支持txt格式,openid之间用英文;隔开)" })
    }
  };
  chooseSendPerson = () => {
    let { role ,uploadMsg} = this.state;
    switch (role) {
      case "tag":
        return (
          <div id="area" style={{ position: 'relative' }}>
            <Select
              autoFocus={true}
              getPopupContainer={() => document.getElementById('area')}
              mode="multiple"
              style={{ width: "50%" }}
              placeholder="请选择粉丝标签，同步自微信平台"
              onChange={(e) => {

              }}
            // defaultValue={this.state.selectTags}
            >
              <Option key={1} value={"北京"}>北京</Option>
              <Option key={2} value={"郑州"}>郑州</Option>
            </Select>
          </div>
        );
      case "address":
        // 获取城市列表
        return (
          <Button style={{ width: "85%" }} type="dashed" block>编辑群发对象</Button>
        );
      case "openids":
        return (
          <Upload {...this.UploadProps}>
            <Button>
              <Icon type="upload" /> {uploadMsg}
            </Button>
          </Upload>
        );
      default:
        return;
    }
  };
  render() {
    let { role } = this.state;
    return (
      <div id="area" style={{ position: 'relative' }}>
        <Select
          getPopupContainer={() => document.getElementById('area')}
          value={role}
          placeholder="请选择群发对象"
          style={{ width: "40%" }}
          onChange={e => {
            this.setState({
              role: e,
              roomInfoTemp: "{}",
              sendFanTags: '',
              tagNames: '',
              countOpenId: "",
              showSelectAddress: false,
              uploadMsg: "上传openId(仅支持txt格式,openid之间用英文;隔开)",

            });
          }}>

          <Option value="all">全部粉丝</Option>
          <Option value="tag">粉丝标签</Option>
          <Option value="openids">批量openid</Option>
          <Option value="address">业主住址</Option>
        </Select>
        <br />
        {this.chooseSendPerson()}
      </div>
    );
  }
}