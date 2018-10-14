import React from 'react';
import styles from './PageNotFound.css';

export default function PageNotFound(){
return(
  <div>
      <div id="clouds">
                 <div className={[styles.cloud, styles.x1]}></div>
                 <div className={[styles.cloud, styles.x1_5]}></div>
                 <div className={[styles.cloud, styles.x2]}></div>
                 <div className={[styles.cloud, styles.x3]}></div>
                 <div className={[styles.cloud, styles.x4]}></div>
                 <div className={[styles.cloud, styles.x5]}></div>
      </div>
      <div className={styles.c}>
                 <div className={styles._404}>404</div>
                 <hr />
                 <div className={styles._1}>THE PAGE</div>
                 <div className={styles._2}>WAS NOT FOUND</div>
                 <a className={styles.btn} href='#'>BACK TO MARS</a>
      </div>
  </div>
);

}
