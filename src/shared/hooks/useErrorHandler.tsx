import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/configure-store';
import {resetError} from '../../redux/feedSlice';

export const useErrorHandler = (
  error: string | null,
  timeout: number = 3000,
) => {
  const dispatch: AppDispatch = useDispatch();
  const [displayError, setDisplayError] = useState<string | null>(error);

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      const timer = setTimeout(() => {
        setDisplayError(null);
        dispatch(resetError());
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      setDisplayError(null);
    }
  }, [error, timeout]);

  return displayError;
};
