import { Card, Skeleton, Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

export const ProfileSkeleton: React.FC = () => {
  return (
    <Card style={{ minHeight: '100%' }}>
      <Card.Meta
        avatar={<Skeleton.Avatar shape="square" size={150} />}
        title={<Skeleton paragraph={{ rows: 1 }} />}
        description={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Information" key="1">
              <Skeleton />
            </TabPane>
            <TabPane tab="Contacts" key="2">
              <Skeleton />
            </TabPane>
          </Tabs>
        }
      />
    </Card>
  );
};
