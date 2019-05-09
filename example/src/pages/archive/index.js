import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { WingBlank, List } from 'antd-mobile';

@connect(({ loading }) => ({
  loading,
}))
@createForm()
class ArchivePage extends React.Component {
  render() {
    return (
      <WingBlank size="sm">
        <List>
          <List.Item>hello ArchivePage</List.Item>
        </List>
      </WingBlank>
    );
  }
}

export default ArchivePage;
