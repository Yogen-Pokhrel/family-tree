import React from 'react';
import classNames from 'classnames';
import styles from '../scss/FamilyNode.module.css';

export default React.memo(
  function FamilyNode({ node, isRoot, style }) {
    return (
      <div className={styles.root} style={style} title={node.id}>
      
        <div
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot,
          )}
        ></div>
        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
          />
        )}
      </div>
    );
  }
);
