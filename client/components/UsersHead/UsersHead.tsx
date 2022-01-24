import React from 'react';
import './UsersHead.scss';

type Props = {
  names: string[];
}

const UsersHead: React.FC<Props> = ({ names }) => (
  <div className="UsersHead">
    <div className="UsersHead__row">
      {names.map((name) => <div className="UsersHead__cell">{name}</div>)}
    </div>
  </div>
);

export default UsersHead;
