/**
 * Copyright 2018 OpenStack Foundation
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
import {NavLink} from "react-router-dom";

export default class MenuItem extends React.Component {


    render() {
        let {name, iconClass, show, active, link} = this.props;

        if(!show) return null;
    
        return (<NavLink to={`${link}`} id={name + '-menu'} className={"menu-item"} activeClassName={active}> 
                {T.translate('menu.' + name)}
                <i className={iconClass + ' fa'} />
            </NavLink>
        );

    }
}

