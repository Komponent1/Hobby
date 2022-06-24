import React from 'react';
import { ArticleItem } from '../components';
import ArticleItemPresenter from '../components/articleItem/articleItemPresenter';
import { render, fireEvent } from '@testing-library/react';
import * as data from '../mockserver/data';

describe('ArticleItem', () => {
  test('Presentation', () => {
    const hover = false;
    const checkHover = {
      onMouseOver: jest.fn(),
      onMouseOut: jest.fn(),
    }
    const move2Article = jest.fn();
    const title = 'TEST TITLE';
    const date = 'TEST DATE';

    const { getByText } = render(
      <ArticleItemPresenter
        hover={hover} checkHover={checkHover}
        move2Article={move2Article} title={title} date={date}/>
    );

    const itemText = getByText('TEST TITLE');
    expect(itemText).toBeInTheDocument();
    expect(getByText('TEST DATE')).toBeInTheDocument();

    fireEvent.mouseOver(itemText);
    expect(checkHover.onMouseOver).toBeCalledTimes(1);

    fireEvent.mouseOut(itemText);
    expect(checkHover.onMouseOut).toBeCalledTimes(1);

    fireEvent.click(itemText);
    expect(move2Article).toBeCalledTimes(1);
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
