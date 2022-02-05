import { DotLoading } from 'antd-mobile';

import styles from './index.less';

interface Props {
  spinning: boolean;
}
const IndexPage = (props: Props) => {
  const { spinning } = props;
  return spinning ? (
    <div className={styles.wrap}>
      <DotLoading color="primary"></DotLoading>
    </div>
  ) : null;
};
export default IndexPage;
