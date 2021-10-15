import React from 'react';
import { Card, Skeleton, Tabs } from 'antd';

const { TabPane } = Tabs;

export const ProfileSkeleton: React.FC = () => {
  return (
    <Card style={{ minHeight: '100%' }}>
      <Card.Meta
        avatar={<Skeleton.Avatar shape="square" size={150} active />}
        title={<Skeleton paragraph={{ rows: 1 }} active />}
        description={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Information" key="1">
              <Skeleton active />
            </TabPane>
            <TabPane tab="Contacts" key="2">
              <Skeleton active />
            </TabPane>
          </Tabs>
        }
      />
    </Card>
  );
};
