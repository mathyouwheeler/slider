import React from 'react';
import classNames from 'classnames';

const Marks = ({className, vertical, marks, included, upperBound, lowerBound, max, min}) => {
  const marksKeys = Object.keys(marks);
  const marksCount = marksKeys.length;
  const unit = 100 / (marksCount - 1);
  const markWidth = unit * 0.9;

  const range = max - min;
  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map((point) => {
    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const markClassName = classNames({
      [className + '-text']: true,
      [className + '-text-active']: isActived,
    });

    const bottomStyle = {
      // height: markWidth + '%',
      marginBottom: '-200' + '%',
      bottom: (point - min) / range * 100 + '%',
    };

    const leftStyle = {
      width: markWidth + '%',
      marginLeft: -markWidth / 2 + '%',
      left: (point - min) / range * 100 + '%',
    };

    const style = vertical ? bottomStyle : leftStyle;

    const markPoint = marks[point];
    const markPointIsObject = typeof markPoint === 'object' &&
            !React.isValidElement(markPoint);
    const markLabel = markPointIsObject ? markPoint.label : markPoint;
    const markStyle = markPointIsObject ?
            { ...style, ...markPoint.style } : style;
    return (<span className={markClassName} style={markStyle} key={point}>
             {markLabel}
            </span>);
  });

  return <div className={className}>{elements}</div>;
};

export default Marks;
