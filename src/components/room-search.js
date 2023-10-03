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
import Select from 'react-select';
import T from "i18n-react";
import {getFormatedDate} from '../utils/helpers'
import 'awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'

class RoomSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      size: props.size || '',
      ammenities: props.ammenities || [],
    };

    this.options = props.availableDays.map(day => {
      const label = `${getFormatedDate(day.epoch)} ${day.summitDayNumber ? ` - ${T.translate("book_meeting.day", {day: day.summitDayNumber})}` : ''}`;
      return {value: day.epoch, label: label}
    });

    if (props.date) {
      this.state.date = this.options.find(o => o.value == props.date)
    }

    this.numberChange = this.numberChange.bind(this);
    this.selectAmmenity = this.selectAmmenity.bind(this);
  }

  /* Form Actions */
  dateSelect(option) {
    this.setState({'date': option})
  }

  numberChange(event) {
    this.setState({'size': event.target.value})
  }

  selectAmmenity(event) {
    let ammenity = event.target.value
    let newAmmenities
    let ammenityExists = this.state.ammenities.find((a) => {
      return a === ammenity
    })

    // Checked
    if (event.target.checked) {
      // If this ammenity has already been added, return
      if (ammenityExists) {
        return
      }
      newAmmenities = [...this.state.ammenities, ammenity]
      this.setState({'ammenities': newAmmenities})
    }

    // Unchecked
    if (!event.target.checked) {
      // If this ammenity has already been added, return
      if (ammenityExists) {
        newAmmenities = this.state.ammenities.filter(a => (a == ammenity ? false : true))
        this.setState({'ammenities': newAmmenities})
      } else {
        return
      }
    }

  }

  submitSearch = (e) => {
    e.preventDefault();
    this.props.onSubmit({date: this.state.date.value, size: this.state.size, ammenities: this.state.ammenities})
  }

  render() {
    return (
      <form onSubmit={this.submitSearch} className="filters-form">
        <div className="form-group">
          <label>{T.translate("book_meeting.i_need_to_book")}</label>
          <Select
            id="day-select"
            value={this.state.date}
            onChange={(option) => {
              this.dateSelect(option)
            }}
            options={this.options}
            placeholder={T.translate("general.select") || this.state.date}
            isClearable={false}
          />
        </div>
        {this.state.date &&
          <div>
            <div className="form-group form-inline inline-number-field">
              <label className={"pr-1"}>{T.translate("book_meeting.for_how_many")}</label>
              <div className="input-group">
                <input
                  type="number"
                  min="1"
                  className="input-number form-control size-input"
                  value={this.state.size}
                  onChange={this.numberChange}
                />
              </div>
            </div>

            <div className="form-group">
              {this.props.allowed_attributes.filter(a => a.values.length > 0).map((a) => (
                <div className={'ammenities-section'} key={`attribute_${a.id}`}>
                  <label className={"ammenities-section-title"}>{a.type}</label>
                  <div className="checkboxes-div">
                    {a.values.map((v) => {
                      let isChecked = this.state.ammenities.includes(`${v.id}`);
                      return (
                        <div key={`att_val_${v.id}`} className="form-check abc-checkbox checkbox-inline">
                          <input
                            id={v.id}
                            value={v.id}
                            className="form-check-input ammenities-label"
                            onChange={this.selectAmmenity}
                            checked={isChecked}
                            type="checkbox"
                          />
                          <label className="form-check-label" htmlFor={v.id}>{v.value}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {this.state.size &&
              <input
								type="submit"
								className={'btn btn-warning btn-lg btn-block'}
								value={T.translate("book_meeting.find_a_room")}
							/>
            }
          </div>
        }
      </form>
    );
  }
}

export default RoomSearch;
