import './Loader.css';
import { FC, JSX } from 'react';
export const Loader: FC = (): JSX.Element => {
  return (
    <div className={'loader__container'}>
      <div className="loader" />
    </div>
  );
};
