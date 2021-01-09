/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";
import Logout, { LogoutProps } from "./Logout";

const TwHeader = tw.header`flex justify-between mb-10`;
const Title = tw.h1`text-2xl`;

interface Props extends LogoutProps {}

const Header: React.FC<Props> = ({ token, setToken }) => {
  return (
    <TwHeader>
      <Title>Event Management</Title>
      <Logout token={token} setToken={setToken} />
    </TwHeader>
  );
};

export default Header;
