import React,{Component} from "react";

import { message, Upload,Icon, Modal} from "antd";

import styles from "./styles.less";
import api from "../../utils/api";

export default class UploadImage extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading:false,
            url:props.value||props["data-__meta"].initialValue
        }
    }

    

    uploadFile = async (file) => {
        this.setState({loading:true})
        let dataform = new FormData();
        dataform.append('file', file);
        dataform.append('type', "YANXUAN");
        let result = await api.upload('/file/upload-imgs', dataform);
        this.setState({loading:false})
        if (result.cd == 0) {
            this.props.onChange(result.data.url);
            this.setState({url:result.data.url})
            message.success("上传成功")
        } else {
            message.error(result.msg);
        }
    }

     beforeUpload = (file)=> {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isPic = isJPG || isPNG || isBMP;
        if (!isPic) {
          message.error('请上传正确格式的图片文件');
          return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片最大2M');
          return false
        }
        return true
      }

    viewImage = () => {
    	let {url} = this.state;
    	if(!url) return;
        let img = <img src={url} style={{width:400}} />;
    	Modal.info({
            className:'img-modal',
            iconType:' ',
            title:"查看",
            width:500,
            maskClosable:true,
            content:img
        })
    }

    deleteImage = () => {
        this.setState({url:""});
        this.props.onChange("")
    }

    render(){
        let {url} = this.state;
        return (
            <Upload
                style={{position:"relative"}}
                listType="picture-card"
                
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                customRequest={({ file }) => {
                    this.uploadFile(file)
                }}
               >
               {url?
                <div>
                    <img src={url} style={{width:102,height:102}} />
                    <div className={styles.imageView} onClick={(e) => {e.stopPropagation()}}>
                        <div className={styles.imageViewIcons}>
                            <Icon onClick={this.viewImage} type={"eye"} fill="#fff" style={{color:"#fff",fontSize:18}} />
                            <Icon onClick={this.deleteImage} type={"delete"} style={{marginLeft:5}} fill="#fff" style={{color:"#fff",fontSize:18}} />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">上传图片</div>
                </div>
               }

            </Upload>
        )
    }
}