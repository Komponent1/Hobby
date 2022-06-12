import React from 'react';
import { ArticleItem } from '../components';
import ArticleItemPresenter from '../components/articleItem/articleItemPresenter';
import { render, fireEvent } from '@testing-library/react';
import * as data from '../mockserver/data';

describe('ArticleItem', () => {
  test('Presentation', () => {
    const hover = false;
    const setHover = {
      onMouseOver: jest.fn(),
      onMouseOut: jest.fn(),
    }
    const click = jest.fn();
    const title = 'TEST TITLE';
    const date = 'TEST DATE';

    const { getByText } = render(
      <ArticleItemPresenter
        hover={hover} setHover={setHover}
        onClick={click} title={title} date={date}/>
    );

    const itemText = getByText('TEST TITLE');
    expect(itemText).toBeInTheDocument();
    expect(getByText('TEST DATE')).toBeInTheDocument();

    fireEvent.mouseOver(itemText);
    expect(setHover.onMouseOver).toBeCalledTimes(1);

    fireEvent.mouseOut(itemText);
    expect(setHover.onMouseOut).toBeCalledTimes(1);

    fireEvent.click(itemText);
    expect(click).toBeCalledTimes(1);
  });

  describe('Container', () => {
    test('Route, login -> loading, create account -> signup', () => {
      const article = data.articles[0];
      const click = jest.fn();
      
      const { getByText } = render(
        <ArticleItem
          article={article} onClick={click} />
      );
      
      const item = getByText(data.articles[0].title);
      expect(item).toBeInTheDocument();
      
      fireEvent.click(item);
      expect(click).toBeCalledTimes(1);
    });
  });
});
