'use client';

import React, { useState } from 'react';
import UserItem from './UserItem';
import UserSearch from './UserSearch';

type UsersListProps = {
  commonUsers: UserItem[];
};

export default function UsersList({ commonUsers }: UsersListProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredUsers = commonUsers.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <div>
      {/* <div className='flex w-full gap-5 pt-3'> */}
      <div className='flex flex-col-reverse w-full gap-5 p-2 mt-3 md:flex-row glassEffect'>
        <div className='w-full'>
          {filteredUsers.length > 0 ? (
            <>
              <div className='grid gap-3'>
                {filteredUsers.map((user) => (
                  <UserItem user={user} key={user.id} />
                ))}
              </div>
            </>
          ) : (
            <div>Can't find any matches</div>
          )}
        </div>
        <UserSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </div>
  );
}
