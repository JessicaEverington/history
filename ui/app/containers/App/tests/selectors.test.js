/* global describe, expect, test */

import {
  selectAlbum,
  selectPage,
  selectCurrentMemory,
  makeSelectThumbsError,
  makeSelectThumbsLoading,
} from '../selectors';

describe('selectAlbum', () => {
  test('should select the album state', () => {
    const albumState = {
      anything: '',
    };
    const mockedState = {
      albums: albumState,
    };
    expect(selectAlbum(mockedState)).toEqual(albumState);
  });
});

describe('selectPage', () => {
  test('should select the page state', () => {
    const pageState = {
      albums: '',
    };
    const mockedState = {
      albumViewPage: pageState,
    };
    expect(selectPage(mockedState)).toEqual(pageState);
  });
});

describe('selectCurrentMemory', () => {
  test('should select the current memory', () => {
    const albumState = {
      gallery: 'demo',
      album: 'sample',
      currentMemory: null,
    };
    const mockedState = {
      albumViewPage: albumState,
    };
    expect(selectCurrentMemory(mockedState)).toEqual(albumState);
  });
});

describe('makeSelectThumbsLoading', () => {
  const galleryErrorSelector = makeSelectThumbsLoading();
  test('should select the error status', () => {
    const thumbsLoading = true;
    const mockedState = {
      albumViewPage: {
        thumbsLoading,
      },
    };
    expect(galleryErrorSelector(mockedState)).toEqual(thumbsLoading);
  });
});

describe('makeSelectThumbsError', () => {
  const galleryLoadingSelector = makeSelectThumbsError();
  test('should select the loading status', () => {
    const thumbsError = true;
    const mockedState = {
      albumViewPage: {
        thumbsError,
      },
    };
    expect(galleryLoadingSelector(mockedState)).toEqual(thumbsError);
  });
});
