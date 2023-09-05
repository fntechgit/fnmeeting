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
import T from "i18n-react/dist/i18n-react";
import {stopLoading, startLoading, createAction, getBackURL} from "openstack-uicore-foundation/lib/utils/actions";
import swal from "sweetalert2";
export const apiBaseUrl         = process.env['API_BASE_URL'];
export const RECEIVE_COUNTRIES  = 'RECEIVE_COUNTRIES';
export const VALIDATE           = 'VALIDATE';
const LOGOUT_USER               = 'LOGOUT_USER';



