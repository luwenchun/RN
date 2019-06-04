import React from "react";

import styled from "styled-components";
import { Animated } from "react-native";

class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460)
  };
  render() {
    return (
      <AnimatedContainer
        style={{ width: this.state.width, height: this.state.height }}
      >
        <Cover>
          <Image source={this.props.image} />
          <Title>{this.props.title}你好</Title>
          <Author>by {this.props.author}ok</Author>
        </Cover>
        <Text>{this.props.text}</Text>
      </AnimatedContainer>
    );
  }
}

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;
const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;
const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;