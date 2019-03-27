import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Card, Header, Image } from 'semantic-ui-react';
import capitalize from 'lodash/capitalize';
import { sprintf } from 'sprintf-js';

import pages from '../../pages';
import { User } from '../../services/github/models';
import Spinner from '../common/Spinner';

import styles from './members_.module.css';

export interface CompanyMembersProps {
  companyName: string;
  users: User[];
  isLoading?: boolean;
}

const CompanyMembers: FC<CompanyMembersProps> = ({
  companyName = '<会社名>',
  users = [],
  isLoading = false,
}) => {
  const title = sprintf(pages.companies.members.title, capitalize(companyName));

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={styles.members}>
        <Header as="h2" className={styles.header}>
          {title}
        </Header>
        {isLoading ? (
          <Spinner />
        ) : (
          <Card.Group>
            {users.map(user => (
              <Card key={user.id} href={user.htmlUrl} target="_blank">
                <Card.Content>
                  <Image floated="right" size="mini" src={user.avatarUrl} />
                  <Card.Header>{user.login}</Card.Header>
                  <Card.Meta>GitHub ID: {user.id}</Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
      </div>
    </>
  );
};

export default CompanyMembers;
