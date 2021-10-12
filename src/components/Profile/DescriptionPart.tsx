import React from 'react';

import { Tabs, Typography } from 'antd';
import { UserContactsType } from '../../types/types';

const { TabPane } = Tabs;

type PropsType = {
  isLookingForAJob: boolean;
  jobDescription: string | null;
  contacts: UserContactsType;
  aboutMe: string | null;
};

export const DescriptionPart: React.FC<PropsType> = ({
  contacts,
  isLookingForAJob,
  jobDescription,
  aboutMe,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Information" key="1">
        <Typography.Paragraph type="secondary">
          <Typography.Text>Looking for a job: </Typography.Text>
          {isLookingForAJob ? 'Yes' : 'No'}
        </Typography.Paragraph>
        {jobDescription && (
          <Typography.Paragraph type="secondary">
            <Typography.Text>Job description: </Typography.Text>
            {jobDescription}
          </Typography.Paragraph>
        )}
        {aboutMe && (
          <Typography.Paragraph type="secondary">
            <Typography.Text>About me: </Typography.Text>
            {aboutMe}
          </Typography.Paragraph>
        )}
      </TabPane>
      <TabPane tab="Contacts" key="2">
        {(Object.keys(contacts) as Array<keyof typeof contacts>).map((c) => {
          if (!contacts[c]) return null;
          return (
            <Typography.Paragraph type="secondary" key={c}>
              <Typography.Text>{`${c[0].toUpperCase()}${c.slice(
                1
              )}: `}</Typography.Text>
              {contacts[c]}
            </Typography.Paragraph>
          );
        })}
      </TabPane>
    </Tabs>
  );
};
