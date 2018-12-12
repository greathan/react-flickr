import React, { Component } from 'react';
import { connect } from 'react-redux';

import init from './actions';
import flickr from './actions/flickr';

import Photo from './components/photo';
import Modal from './components/modal';

class App extends Component {
    componentWillMount() {
        // this.props.init();
        // this.props.search('fuji XE3');
    }

    render() {
        const {
            loading,
            msg,
            photos,
            getExif,
            popLoading,
            exif,
            search
        } = this.props;

        // if (loading) {
        //     return <div>Loading...</div>;
        // }

        if (msg) {
            return <div className="error">{msg}</div>;
        }

        return (
            <div className="App">
                <input
                    className="search-input"
                    type="text"
                    onChange={e => {
                        this.setState({
                            keyword: e.target.value
                        });
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            this.state.keyword && search(this.state.keyword);
                        }
                    }}
                />
                <div>
                    {photos
                        ? photos.photo.map(photo => {
                              return (
                                  <Photo
                                      {...photo}
                                      getExif={getExif}
                                      exif={exif[photo.id]}
                                  />
                              );
                          })
                        : null}
                </div>
                {(popLoading || loading) && <Modal content="loading..." />}
            </div>
        );
    }
}

const mapStateToProps = ({ flickr }) => flickr;

export default connect(
    mapStateToProps,
    {
        init,
        search: flickr.search,
        getExif: flickr.getExif
    }
)(App);
