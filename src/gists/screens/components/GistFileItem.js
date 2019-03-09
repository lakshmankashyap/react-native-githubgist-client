import React from 'react';
import styled from 'styled-components';
import fileSize from 'filesize';
import { colors, normalizeFont } from '../../../config';
import CardContainer from './CardContainer';

const MetaContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 2% 0;
`;
const FileName = styled.Text`
  flex: 1;
  font-weight: bold;
  font-size: ${normalizeFont(14)};
`;
const MetaDetail = styled.Text`
  flex: 1;
  font-size: ${normalizeFont(12)};
  color: ${colors.greyDark}
`;

export default ({ fileData, onFileItemPress }) => {
  return (
    <CardContainer
      activeOpacity={0.8}
      onPress={() => onFileItemPress(fileData)}>
      <FileName>{fileData.filename}</FileName>
      <MetaContainer>
        <MetaDetail>{fileData.language}</MetaDetail>
        <MetaDetail>{fileSize(fileData.size)}</MetaDetail>
      </MetaContainer>
    </CardContainer>
  );
};
