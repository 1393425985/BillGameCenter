
import Spinner from '@/components/spinner';
import { Button, Space } from 'antd-mobile'
import { useEffect } from 'react';
import styles from './home.less';

const IndexPage = () => {
  useEffect(()=>{
    
  },[])

  return (
    <div className={styles.wrap}>
      <Button color='primary'>Primary</Button>
          <Button color='success'>Success</Button>
          <Button color='danger'>Danger</Button>
          <Button color='warning'>Warning</Button>
    </div>
  );
};
export default IndexPage;
