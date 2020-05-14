/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { CSSProperties } from 'react';
import { Config, ButtonManager } from '../lib/button-manager';

export interface Props extends Config {
  className?: string;
  style?: CSSProperties;
}

const CLASS = 'google-pay-button-container';

export default class GooglePayButton extends React.Component<Props> {
  private instance = new ButtonManager(`.${CLASS}`);
  private elementRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const element = this.elementRef.current;
    if (element) {
      this.instance.mount(element);
      this.instance.configure(this.props);
    }
  }

  componentWillUnmount() {
    this.instance.unmount();
  }

  componentDidUpdate() {
    this.instance.configure(this.props);
  }

  render() {
    return (
      <div
        ref={this.elementRef}
        className={[CLASS, this.props.className].filter(c => c).join(' ')}
        style={this.props.style}
      />
    );
  }
}