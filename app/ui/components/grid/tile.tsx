import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import Label from '../label';

interface GridTileImageProps extends ImageProps {
    isInteractive?: boolean;
    active?: boolean;
    label?: {
        title: string;
        amount: string;
    };
}

export const GridTileImage: React.FC<GridTileImageProps> = ({
                                                                isInteractive = true,
                                                                active,
                                                                label,
                                                                ...props
                                                            }) => {
    return (
        <div className="flex flex-col items-center w-full">
            <div
                className={clsx(
                    'group relative flex w-full items-center justify-center overflow-hidden rounded-lg border bg-white shadow-md hover:border-blue-600 dark:bg-black',
                    {
                        'border-2 border-blue-600': active,
                        'border-neutral-200 dark:border-neutral-800': !active,
                    }
                )}
                style={{ height: '300px' }} // Ensure the container has a fixed height
            >
                {props.src ? (
                    <Image
                        className={clsx('h-full w-full object-cover', {
                            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
                        })}
                        {...props}
                    />
                ) : null}
            </div>
            {label && (
                <Label
                    title={label.title}
                    amount={label.amount}
                />
            )}
        </div>
    );
};
