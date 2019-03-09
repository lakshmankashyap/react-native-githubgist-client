import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import pluralize from 'pluralize';
import { colors } from '../../../config';

const Container = styled.TouchableOpacity`
  flex-direction: column;
  padding: 5px 10px;
  background-color: ${props => props.dark ? colors.greyLight : colors.white}
`;

const Title = styled.Text`
  font-weight: bold;
  margin: 3px 0;
  width: 80%;
  color: ${colors.black}
`;

const DetailsContainer = styled.View`;
  display: flex;
  flex-direction: row;
`;

const DetailsText = styled.Text`
  flex: 1;
  margin-right: 5px;
  text-align: ${props => props.right ? 'right' : 'left'};
  color: ${colors.greyDark}	
`;

const GistOverview = ({ gistData, onClickGist, dark }) => (
  <Container
    dark={dark}
    activeOpacity={0.8}
    onPress={() => onClickGist(gistData)}>
    <Title>
      {gistData.description ? gistData.description : Object.keys(gistData.files)[0]}
    </Title>
    <DetailsContainer>
      <DetailsText>{moment(gistData.created_at).format('DD MMM YYYY')}</DetailsText>
      <DetailsText right>{pluralize('File', Object.keys(gistData.files).length, true)}</DetailsText>
    </DetailsContainer>
  </Container>
);

GistOverview.propTypes = {
  gistData: PropTypes.instanceOf(Object).isRequired,
  onClickGist: PropTypes.func.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default GistOverview;
