import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import concat from 'lodash/concat';
import uniqBy from 'lodash/uniqBy';
import GistItem from './SingleGistOverview';
import EmptyList from './EmptyListComponent';
import ListItemSeparator from './ListItemSeparator';

const styles = StyleSheet.create({
  endOfViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  noMoreGistText: {
    fontSize: 25,
  },
});

const getGistItem = item => ({ type: item, id: item });

class GistListContent extends React.Component {
  componentDidMount() {
    if (this.props.gistList.length < 1) {
      this.props.fetchGists();
    }
  }

  handleListEndReached = () => {
    this.props.fetchGists();
  }

  handleGistItemClick = gistData => {
    this.props.navigation.navigate('GistDetails', {
      gistData,
    });
  }

  renderListItem = ({ item, index }) => {
    switch (item.type) {
    case 'preloader':
      return (
        <View style={styles.endOfViewStyle}>
          <ActivityIndicator
            size="large"
          />
        </View>
      );
    case 'noData':
      return (
        <View style={styles.endOfViewStyle}>
          <EmptyList
            message="No more gists found for this category"
          />
        </View>
      );
    default:
      return (
        <GistItem
          dark={index % 2 == 0}
          gistData={item}
          onClickGist={this.handleGistItemClick}
        />
      );
    }
  }

  render() {
    const { gistList, hasMoreData } = this.props;
    const toAppendData = hasMoreData ? getGistItem('preloader') : getGistItem('noData');
    const uniqGists = uniqBy(concat(gistList, toAppendData), ({ id }) => (id));

    return (
      <View>
        <FlatList
          data={uniqGists}
          keyExtractor={item => item.id}
          renderItem={this.renderListItem}
          onEndReachedThreshold={0.01}
          onEndReached={this.handleListEndReached}
          ListEmptyComponent={() => <EmptyList message={this.props.emptyListMessage} />}
          removeClippedSubviews />
      </View>
    );
  }
}

GistListContent.propTypes = {
  emptyListMessage: PropTypes.string,
  fetchGists: PropTypes.func.isRequired,
  gistList: PropTypes.array, // eslint-disable-line
  hasMoreData: PropTypes.bool.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

GistListContent.defaultProps = {
  emptyListMessage: 'This user has not created any Gist yet',
  gistList: [],
};

export default GistListContent;
