import classNames from 'classnames';
import {useState, MouseEvent} from 'react';
import {useKey} from 'react-use';
import useAsyncEffect from 'use-async-effect';
import {API_URL} from 'config.ts';
import api from 'utils/api.ts';

const App = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  useAsyncEffect(async () => {
    const photos = await api.get<string[]>({path: ''});
    setPhotos(photos);

    setFileName(photos[1] || photos[0]);
  }, []);

  const processPhoto = async (
    status: 'empty' | 'fulfilled' | 'rejected',
    photo?: string,
    e?: MouseEvent<HTMLButtonElement>
  ) => {
    e && e.stopPropagation();
    const filename = photo || fileName;
    await api.post({path: '', body: {filename, status}});
    const newPhotos = photos.filter((photo) => photo !== filename);
    setPhotos(newPhotos);
    setFileName(newPhotos[1] || newPhotos[0]);
  };

  const displayPhotos = photos.slice(0, 6);

  useKey('1', () => processPhoto('empty'), {target: window}, [fileName]);
  useKey('2', () => processPhoto('fulfilled'), {target: window}, [fileName]);
  useKey('3', () => processPhoto('rejected'), {target: window}, [fileName]);

  return (
    <div className="flex w-full flex-col items-center gap-12 p-20">
      {displayPhotos.length === 0 && <div>No photo remain</div>}
      <div className="grid grid-cols-3 gap-6 w-full">
        {displayPhotos.map((photo) => (
          <div
            key={photo}
            onClick={() => setFileName(photo)}
            className={classNames(
              'transition-all group relative duration-300 cursor-pointer box-content border-4 border-white ring-opacity-20 hover:ring-opacity-20 rounded overflow-hidden shadow-md',
              {
                'ring-8 ring-red-500 !border-red-500': photo === fileName,
                'hover:ring-green-500 hover:ring-4 hover:border-green-500 active:ring-8 hover:shadow-lg':
                  photo !== fileName
              }
            )}
          >
            <div className="w-full item" style={{paddingBottom: '70%'}}>
              <div className="absolute inset-0 overflow-hidded">
                <img
                  key={photo}
                  src={`${API_URL}/photos/${photo}`}
                  alt={photo}
                  className="object-center object-cover w-full h-full"
                />

                <div className="absolute inset-0 hidden items-end justify-center group-hover:flex pointer-events-none">
                  <div className="flex gap-6 justify-center items-center pb-6">
                    <button onClick={(e) => processPhoto('empty', photo, e)}>Empty</button>
                    <button onClick={(e) => processPhoto('fulfilled', photo, e)}>Fulfilled</button>
                    <button onClick={(e) => processPhoto('rejected', photo, e)}>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
