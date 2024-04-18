import clsx from 'clsx';

const Platform = ({
  platform,
  type
}: {
  platform: string;
  type: string;
} & React.ComponentProps<'p'>) => (

    <div className="group flex h-full w-full">

        <div className="rounded-full bg-pink-600 p-2 text-sm text-white">
          <p>
              {platform}
          </p>
        </div>
        <div className=" rounded-full bg-pink-600 p-2 text-sm text-white">
            <p>
                {type}
            </p>
        </div>
    </div>
);

export default Platform;
