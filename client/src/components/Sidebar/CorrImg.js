import React, { Component } from 'react';
import { connect } from "react-redux"

import Button from "@material-ui/core/Button";
import ProfileImg from '../resources/icons/profileIng.jpg';

const styles = {
    hidden: {
        display: 'none',
    },
    imgPreview: {
        width: '100%',
        height: '120px'
    },
    imgButton: {
        textAlign: 'center',
        backgroundColor: '#e57076'
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
            file: { ProfileImg },
        }
    };

    handleFileChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            reader.readAsDataURL(file)
        }
    }

    render() {

        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } 

        return (
            <div className="corrImg">
                <div style={styles.imgPreview}>
                    <img src={ProfileImg} alter="profileImg" style={styles.img}/>
                </div>

                <div style={styles.imgButton}>
                <input style={styles.hidden} id="raised-button-file" type="file" file={this.state.file} onChange={this.handleFileChange} />

                <label htmlFor="raised-button-file">
                    <Button variant="contained" color="primary" style={styles.imgButton} component="span" name="file">
                        사진수정
                    </Button>
                </label>
                </div>
            </div>
        )
    }
}

export default connect()(CorrImg);