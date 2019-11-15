import React, { Component } from 'react';
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import ProfileImg from '../resources/icons/lock.png';

const styles = {
    hidden: {
        display: 'none',
    },

    imgPreview: {
        width: '100%',
        height: '100%'
    },

    imgButton: {
        textAlign: 'center',
        backgroundColor: '#e57076',
        marginTop: '3px'
    },
    
    img: {
        width: '100%',
        height: '100%',
    },
}

class CorrImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            profile: '',
        }
    };

    handleFileChange = (e) => {
        let file = e.target.files[0];

        // 비동기적으로 데이터를 읽기 위하여
        let reader = new FileReader();

        // 읽기 동작이 성공적으로 완료되었을 때
        reader.onloadend = () => {
            this.setState({
                file: file,
                profile: reader.result
            });
        }

        // 읽을 객체 
        reader.readAsDataURL(file)
    }

    render() {

        // 프로필 이미지가 없을 때
        let uploadProfile = (<div className="previewImage"><img src={ProfileImg} alt="icon" style={styles.img} /></div>);

        // 프로필 이미지가 있을 때
        if (this.state.profile) {
            uploadProfile = (<div className="image" ><img src={this.state.profile} alt="icon" style={styles.img} /></div>);
        }

        return (
            <div className="corrImg" >
                {uploadProfile}

                <div style={styles.imgButton}>
                    <input style={styles.hidden} id="raised-button-file" type="file" file={this.state.file} onChange={this.handleFileChange} />

                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" style={styles.imgButton} onClick={this.handleSubmit} component="span" name="file">
                            사진수정
                        </Button>
                    </label>
                </div>
            </div>
        )
    }
}

export default connect()(CorrImg);