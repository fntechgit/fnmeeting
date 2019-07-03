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

import React from 'react'
import T from 'i18n-react/dist/i18n-react'
import { withRouter, Link } from 'react-router-dom'
import history from '../../history'
import MenuItem from './menu-item'
import MenuItemsDefinitions from './menu-items-definition'
import '../../styles/menu.less';

class NavMenu extends React.Component {

    constructor (props) {
        super(props);
    }
    
    render() {

        return (
            <div id="app_menu" >
                <div id="app_menu_body">
                    { MenuItemsDefinitions.map(it => (
                        <MenuItem
                            link={this.props.match.url + '/' + it.name}
                            {...it}
                        />
                    ))}
                </div>
            </div>
        );
    }

}

export default withRouter(NavMenu);
