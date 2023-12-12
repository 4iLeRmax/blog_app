import { getGithubUsers } from '@/lib/GithubUsers';
import { getUsers } from '@/lib/getUsers';
import React from 'react';
import UserItem from './UserItem';

export default async function UsersList() {
  const users = (await getUsers()) as UserItem[];
  const githubUsers = (await getGithubUsers()) as UserItem[];

  return (
    <>
      <div className='flex flex-col w-full gap-5 mt-5'>
        <div>
          <h1>Users:</h1>
          {users.length > 0 ? (
            <div className='grid grid-cols-2 gap-3 pt-3'>
              {users.map((user) => (
                <UserItem user={user} key={user.id} />
              ))}
            </div>
          ) : (
            <div>No Users</div>
          )}
        </div>

        <div>
          <h1>Github Users:</h1>
          {githubUsers.length > 0 ? (
            <div className='grid grid-cols-2 gap-3 pt-3'>
              {githubUsers.map((user) => (
                <UserItem user={user} key={user.id} />
              ))}
            </div>
          ) : (
            <div>No Users</div>
          )}
        </div>
      </div>
    </>
  );
}
