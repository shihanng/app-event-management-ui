/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";

interface Props extends React.ComponentProps<"button"> {}

const TwButton = tw.button`py-1 px-2 bg-purple-400 text-white rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-75`;

const Button: React.FC<Props> = (props: Props) => {
  return <TwButton {...props}></TwButton>;
};

export default Button;
