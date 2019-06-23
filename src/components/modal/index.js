/**
 * Copyright 2017 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react';
import T from 'i18n-react/dist/i18n-react';
import moment from 'moment-timezone';
import { Modal } from 'react-bootstrap';
import './schedule-modal.less';


export default class FilterModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {children, show, title, onClose} = this.props;

        return (
            <Modal show={show} onHide={onClose} dialogClassName="oes-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        );

    }
}

