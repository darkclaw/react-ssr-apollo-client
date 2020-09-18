import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import UsersList from '../../components/UsersList';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div>
          Welcome to Razzle. <Button>StyledComponent button</Button>
        </div>
        <UsersList />
        <ul className="Home-resources">
          <li>
              <Link to="about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
